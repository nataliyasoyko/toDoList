{
    let tasks = [];

    const resetInput = (inputContent) => {
        inputContent.value = "";
    };

    const deleteTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ]
        render();
    };

    const toggleDoneTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ]
        render();
    };

    const addNewTask = (newTaskContent) => {
        tasks = [{
                content: newTaskContent
            },
            ...tasks,
        ]
        render();
    };

    const bindEvents = () => {
        const buttonsTaskDelete = document.querySelectorAll(".js-buttonDelete");

        buttonsTaskDelete.forEach((buttonTaskDelete, index) => {
            buttonTaskDelete.addEventListener("click", () => {
                deleteTask(index);
            });
        });

        const buttonsTaskDone = document.querySelectorAll(".js-buttonDone");

        buttonsTaskDone.forEach((buttonTaskDone, index) => {
            buttonTaskDone.addEventListener("click", () => {
                toggleDoneTask(index);
            });
        });
    };

    const render = () => {
        let htmlString = "";

        for (let task of tasks) {
            htmlString += `
            <li  ${task.done ? "class=\"section__item section__item--crossed\"" : "class=\"section__item\""}  >   
            <button class="list__button list__button--done js-buttonDone">
            <i ${task.done ? "class=\"fas fa-check\"" : "class=\"fas fa-check fa-check--none\"" }></i>
            </button>
            <span class="list__text">${task.content}</span>
            <button class="list__button list__button--delete js-buttonDelete">
            <i class="far fa-trash-alt"></i>
            </button>
            </li>
            `
        }
        document.querySelector(".js-tasksList").innerHTML = htmlString;

        bindEvents();
    }

    const onSubmitAddTask = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-addTaskField");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent === "") {
            newTaskElement.focus()
            return;
        };

        addNewTask(newTaskContent);
        render();
        resetInput(newTaskElement);
    }

    const init = () => {

        const addTask = document.querySelector(".js-form");

        addTask.addEventListener("submit", onSubmitAddTask)
    };

    init();

}