import HeaderComponent from "./view/header-component.js";
import FormAddTaskComponent from "./view/form-add-task-component.js";
import { render, RenderPosition } from "./framework/render.js";
import TaskListComponent from "./view/task-list-component.js";

const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.add-new-task');
const taskListContainer = document.querySelector('.boardtask');

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(new FormAddTaskComponent(), formContainer, RenderPosition.AFTERBEGIN);

const demoTasks = [
    { text: 'Первая задача' },
    { text: 'Вторая задача' },
    { text: 'Третья задача' }
];

const taskListsData = [
    { 
        title: 'Бэклог', 
        className: 'boardtask-backlog',
        tasks: demoTasks
    },
    { 
        title: 'В работе', 
        className: 'boardtask-in-progress',
        tasks: demoTasks
    },
    { 
        title: 'Готово', 
        className: 'boardtask-complete',
        tasks: demoTasks
    },
    { 
        title: 'Корзина', 
        className: 'boardtask-trash-bin',
        tasks: demoTasks
    }
];
  
taskListsData.forEach(data => {
    const taskList = new TaskListComponent({
        title: data.title,
        className: data.className,
        tasks: data.tasks
    });
    render(taskList, taskListContainer);
});