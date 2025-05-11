

import PagesButtons from '../PagesButtons/PagesButtons';
import './CircleMenu.scss'


interface CircleMenuProps {
  circleRef: React.RefObject<HTMLUListElement>;
  menuRotate: { style: React.CSSProperties };
  eventList: {
    id: number;
    page: number;
    title: string;
    style: React.CSSProperties;
    styleButton: React.CSSProperties;
  }[];
  activeId: number;
  handleRotateMenu: (page: number) => void;
}

function CircleMenu({circleRef, menuRotate, eventList, activeId, handleRotateMenu}: CircleMenuProps){


    return (
        <>
      <div className="circle-box">
      
      <ul className="circle-menu" ref={circleRef} style={menuRotate.style}>
        {eventList.map((event) => (
          <li key={event.id} className="circle-item" style={event.style}>
            <div className="circle-info">
              <button
                className={`buttonTitle ${activeId === event.id ? 'active' : ''}`}
                onClick={() => handleRotateMenu(event.page)}
                style={event.styleButton}
              >
                {event.id}
                <span
                  className={`circle-item-title ${
                    activeId === event.id ? 'active' : ''
                  }`}                >
                  {event.title}
                </span>
              </button>
            </div>
          </li>
        ))}
      </ul>
        
      </div>
        </>
    )
};

export default CircleMenu;