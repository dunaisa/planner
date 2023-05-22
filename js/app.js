const lists = document.querySelectorAll('.list');

const addTaskBtn = document.querySelector('.start__btn');

addTaskBtn.addEventListener('click', addTask);

function addTask() {

  const item = `<div class="task" draggable="true">
      <div class="task__placeholder">
        <textarea class="task__text" placeholder="Напишите задачу..."></textarea>
        <button class="task__btn">
          <img class="task__btn-img" src="img/cross.svg" alt="Удалить заметку">
        </button>
      </div>
    </div>`;

  lists[0].insertAdjacentHTML('afterbegin', item);
};

lists.forEach((listTask) => {
  listTask.addEventListener('click', deleteTask);

  listTask.addEventListener('dragstart', dragstart);
  listTask.addEventListener('dragend', dragend);
});

function deleteTask(event) {
  const task = event.target.closest('.task');
  if (event.target.classList.contains('task__btn-img')) {
    task.remove();
  };
};

function dragstart(event) {
  event.target.classList.add('hold');
  event.target.classList.add('is-dragging');
  setTimeout(() =>
    event.target.classList.add('hide'), 0
  );
};

function dragend(event) {
  event.target.classList.remove('hold');
  event.target.classList.remove('hide');
  event.target.classList.remove('is-dragging');
};

lists.forEach((zone) => {
  zone.addEventListener('dragover', (event) => {
    event.preventDefault();
    const bottomTask = insertAboveTask(zone, event.clientY);
    const currentTask = document.querySelector('.hold');

    if (!bottomTask) {
      zone.appendChild(currentTask)
    } else {
      zone.insertBefore(currentTask, bottomTask)
    };
  });
});

const insertAboveTask = (zone, mouseY) => {
  const els = zone.querySelectorAll('.task:not(.hold)');

  let closestTask = null;
  let closestOffSet = Number.NEGATIVE_INFINITY;

  els.forEach((task) => {
    const { top } = task.getBoundingClientRect();
    const offset = mouseY - top;

    if (offset < 0 && offset > closestOffSet) {
      closestOffSet = offset;
      closestTask = task;
    };
  });
  return closestTask;
};
