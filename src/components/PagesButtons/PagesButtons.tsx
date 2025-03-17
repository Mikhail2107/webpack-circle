import './PagesButtons.scss';
interface GridContainerProps {
  activeId: number;
  eventList: {
    id: number;
    page: number;
    title: string;
    style: React.CSSProperties;
    styleButton: React.CSSProperties;
  }[];
  handleNextPage: () => void;
  handlePrevPage: () => void;
}

function PagesButtons({ activeId, eventList, handleNextPage, handlePrevPage }: GridContainerProps) {
  return (
    <>
          <div className="history-pages-button">
            <span className="pages">0{activeId}/0{eventList.length}</span>
            <div className="buttons">
              <div
                className="button-prev pages-button"
                onClick={handlePrevPage}
              ></div>
              <div
                className="button-next pages-button"
                onClick={handleNextPage}
              ></div>
            </div>
          </div>
    </>
  )
}

export default PagesButtons