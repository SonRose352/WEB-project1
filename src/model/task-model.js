import { tasks } from "../mock/task.js";
import { generateID } from "../utils.js";

export default class TasksModel {
    #boardtasks = tasks;
    #observers = [];

    get tasks() {
        return this.#boardtasks;
    }

    addTask(title) {
        const newTask = {
            title,
            status: 'backlog',
            id: generateID(),
        };
        this.#boardtasks.push(newTask);
        this._notifyObservers();
        return newTask;
    }

    clearTrashBin() {
        const newBoardtasks = [];
        for (let i = 0; i < this.#boardtasks.length; i++) {
            if (this.#boardtasks[i].status !== "trash-bin") {
                newBoardtasks.push(this.#boardtasks[i]);
            }
        }
        this.#boardtasks = newBoardtasks;
        this._notifyObservers();
    }

    addObserver(observer) {
        this.#observers.push(observer);
    }

    removeObserver(observer) {
        this.#observers = this.#observers.filter((obs) => obs !== observer);
    }

    _notifyObservers() {
        this.#observers.forEach((observer) => observer());
    }
}