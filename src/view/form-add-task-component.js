import { AbstractComponent } from "../framework/view/abstract-component.js";

function createFormAddTaskComponentTemplate() {
    return (
        `
          <section class="add-new-task">
            <div class="task-form-container">
              <h3>Новая задача</h3>
              <form class="task-form" action="/tasks" method="post">
                <input type="text" class="add-new-task-input" name="title" placeholder="Название задачи...">
                <input type="submit" class="add-new-task-button" value="+ Добавить">
              </form>
            </div>
          </section>
        `
    );
}

export default class FormAddTaskComponent extends AbstractComponent {
  
  get template() {
    return createFormAddTaskComponentTemplate();
  }

}