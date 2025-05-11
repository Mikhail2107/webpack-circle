import { makeAutoObservable } from "mobx";

interface EventItem {
  id: number;
  page: number;
  title: string;
  style: React.CSSProperties;
  styleButton: React.CSSProperties;
}

interface MenuRotate {
  style: React.CSSProperties;
}

class HistoryStore {
  activeId = 1;
  eventList: EventItem[] = [
    { id: 1, page: 1, title: "История", style: {}, styleButton: {} },
    { id: 2, page: 2, title: "Наука", style: {}, styleButton: {} },
    { id: 3, page: 3, title: "Кино", style: {}, styleButton: {} },
    { id: 4, page: 4, title: "Музыка", style: {}, styleButton: {} },
    { id: 5, page: 5, title: "Литература", style: {}, styleButton: {} },
    { id: 6, page: 6, title: "Искусство", style: {}, styleButton: {} },
  ];
  menuRotate: MenuRotate = { style: {} };

  constructor() {
    makeAutoObservable(this);
    this.initEventListStyles();
  }

  initEventListStyles() {
    const sectorAngle = 360 / this.eventList.length;
    this.eventList = this.eventList.map((event, index) => {
      const angle = sectorAngle * index + 75;
      return {
        ...event,
        style: { 
          transform: `rotate(${angle}deg)`, 
          transformOrigin: "100% 100%" 
        },
        styleButton: { 
          transform: `rotate(${-75}deg)` 
        },
      };
    });
  }

  rotateMenu(page: number) {
    const sectorAngle = 360 / this.eventList.length;
    const deg = (page - 1) * sectorAngle;
    this.menuRotate = { style: { transform: `rotate(-${deg}deg)` } };
    this.activeId = page;
  }

  prevPage() {
    const newActiveId = this.activeId === 1 ? this.eventList.length : this.activeId - 1;
    this.rotateMenu(newActiveId);
  }

  nextPage() {
    const newActiveId = this.activeId === this.eventList.length ? 1 : this.activeId + 1;
    this.rotateMenu(newActiveId);
  }
}

export const historyStore = new HistoryStore();