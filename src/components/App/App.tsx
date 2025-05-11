import { useRef, useLayoutEffect, useState } from 'react';

import HistoryBox from '../HistoryBox/HistoryBox';
import HistoryPeriod from '../HistoryPeriod/HistoryPeriod';
import GridContainer from '../GridContainer/GridContainer';
import CircleMenu from '../CircleMenu/CircleMenu';
import historyDate from '../../data/historyDate';

import './App.scss';
import PagesButtons from '../PagesButtons/PagesButtons';
import HistoryTitle from '../HistoryTitle/HistoryTitle';


interface MenuRotate {
  style: React.CSSProperties;
}
interface EventItem {
  id: number;
  page: number;
  title: string;
  style: React.CSSProperties;
  styleButton: React.CSSProperties;
}


function App() {
  const circleRef = useRef(null);
  const [eventList, setEventList] = useState<EventItem[]>([
    { id: 1, page: 1, title: 'История', style: {}, styleButton: {} },
    { id: 2, page: 2, title: 'Наука', style: {}, styleButton: {} },
    { id: 3, page: 3, title: 'Кино', style: {}, styleButton: {} },
    { id: 4, page: 4, title: 'Музыка', style: {}, styleButton: {} },
    { id: 5, page: 5, title: 'Литература', style: {}, styleButton: {} },
    { id: 6, page: 6, title: 'Искусство', style: {}, styleButton: {} },
  ]);
  
  const [menuRotate, setMenuRotate] = useState<MenuRotate>({ style: {} });
  const [activeId, setActiveId] = useState<number>(1); 

  useLayoutEffect(() => {
    const circle = circleRef.current;
    if (circle) {
      const sectorAngle = 360 / eventList.length;

      setEventList((prevEventList) =>
        prevEventList.map((event, index) => {
          const angle = sectorAngle * index + 75;
          return {
            ...event,
            style: {
              transform: `rotate(${angle}deg)`,
              transformOrigin: '100% 100%',
            },
            styleButton: { transform: `rotate(${-75}deg)` },
          };
        })
      );
    }
  }, []);

  const handleRotateMenu = (page: number) => {
    const sectorAngle = 360 / eventList.length;
    const deg = (page - 1) * sectorAngle;
    setMenuRotate({ style: { transform: `rotate(-${deg}deg)` } });
    setActiveId(page); 
  };

  const handlePrevPage = () => {
    const newActiveId = activeId === 1 ? eventList.length : activeId - 1;
    handleRotateMenu(newActiveId);
  };

  const handleNextPage = () => {
    const newActiveId = activeId === eventList.length ? 1 : activeId + 1;
    handleRotateMenu(newActiveId);
  };

  return (
    <>
    <main>
        <div className="history-container">
        <GridContainer /> 
        <HistoryTitle />
        <CircleMenu circleRef={circleRef}             
              menuRotate={menuRotate} 
              eventList={eventList} 
              activeId={activeId} 
              handleRotateMenu={handleRotateMenu} /> 
        <HistoryPeriod 
            activeId={activeId} 
            historyDate={historyDate} 
          />
        <PagesButtons activeId={activeId} 
              eventList={eventList} 
              handleNextPage={handleNextPage} 
              handlePrevPage={handlePrevPage} />  
        <HistoryBox activeId={activeId} 
          historyDate={historyDate} />
      </div>   
      
    </main>
     
    </>
  );
}

export default App;