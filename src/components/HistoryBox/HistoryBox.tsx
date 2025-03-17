import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";  

import { Navigation, Mousewheel, Keyboard, Pagination } from 'swiper/modules';

import './HistoryBox.scss';
import './swiper.scss';
import { useRef } from "react";
import { useMediaQuery } from 'react-responsive';
import {HistoryItem} from '../../data/historyDate';

interface HistoryBoxProps {
  activeId: number; 
  historyDate: HistoryItem[];
}

function HistoryBox({ activeId, historyDate }: HistoryBoxProps) { 
  const swiperRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 500 });
  
  return (
      <>
      <Swiper
        ref={swiperRef}
        slidesPerView={'auto'}
        spaceBetween={30}
        cssMode={true}
        pagination={isMobile ? true : false}
        navigation={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Mousewheel, Keyboard, Pagination]}
        className="history-box"
      >
      <div >        
        <ul className="history-date-list">
          {historyDate[activeId - 1].years &&
          Object.entries(historyDate[activeId - 1].years).map(
            ([year, description]) => (
              <SwiperSlide key={year} className="history-event" style={{width: isMobile ? '150px' : "350px"}}>
                <span className="history-year">{year}</span>
                <span className="history-year-description">
                  {description}
                </span>
              </SwiperSlide>
            )
          )}
        </ul>
      </div>  
      </Swiper>
      </>
  )
}

export default HistoryBox;