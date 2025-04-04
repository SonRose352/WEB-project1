const Status = {
    BACKLOG: 'backlog',
    INPROGRESS: 'in-progress',
    COMPLETE: 'complete',
    TRASHBIN: 'trash-bin',
};

const StatusLabel = {
    [Status.BACKLOG]: 'Бэклог',
    [Status.INPROGRESS]: 'В работе',
    [Status.COMPLETE]: 'Готово',
    [Status.TRASHBIN]: 'Корзина',
};

export {Status, StatusLabel};