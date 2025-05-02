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

const UserAction = {
    UPDATE_TASK: 'UPDATE_TASK',
    ADD_TASK: 'ADD_TASK',
    DELETE_TASK: 'DELETE_TASK',
};

const UpdateType = {
    PATCH: 'PATCH',
    MINOR: 'MINOR',
    MAJOR: 'MAJOR',
    INIT: 'INIT'
};

export {Status, StatusLabel, UserAction, UpdateType};