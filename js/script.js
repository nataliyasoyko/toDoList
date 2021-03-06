{
    let tasks = [];
    let hideDoneTasks = false;



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

    const finishAllTasks = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const showHideTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    }


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

    const bindButtonsEvents = () => {
        const finishAllTasksButton = document.querySelector(".js-finishButton");

        if (finishAllTasksButton) {
            finishAllTasksButton.addEventListener("click", () => {
                finishAllTasks();
            })
        }

        const showHideTasksButton = document.querySelector(".js-showHideButton");

        if (showHideTasksButton) {
            showHideTasksButton.addEventListener("click", () => {
                showHideTasks();
            })
        };
    }

    const renderTasks = () => {
        const taskToHTML = tasks.map(task =>
            `
            <li  ${task.done && hideDoneTasks ? "class=\"section__item section__item--hidden\"" : "class=\"section__item\""}  >   
            <button class="list__button list__button--done js-buttonDone">
            <i ${task.done ? "class=\"fas fa-check\"" : "class=\"fas fa-check fa-check--none\"" }></i>
            </button>
            <span class="list__text${task.done ? " list__text--done" : ""}">${task.content}</span>
            <button class="list__button list__button--delete js-buttonDelete">
            <i class="far fa-trash-alt"></i>
            </button>
            </li>
            
            `
        );
        const tasksToHTML = taskToHTML.join("");

        document.querySelector(".js-tasksList").innerHTML = tasksToHTML;

        bindEvents();
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");

        if (!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        }
        buttonsElement.innerHTML = `
        <button class="section__button section__button--hide js-showHideButton">
        ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone</button>
        <button class="section__button js-finishButton" ${tasks.every(({done}) => done) ? " disabled" : ""}>Ukończ wszystkie</button>
        `

    };

    const onSubmitAddTask = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-addTaskField");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent === "") {
            newTaskElement.focus()
            return;
        };
        resetInput(newTaskElement);
        addNewTask(newTaskContent);
        render();

    };

    const render = () => {
        renderTasks();
        renderButtons();
        bindButtonsEvents();
        addButtons();

    }

    const init = () => {

        const addTask = document.querySelector(".js-form");

        addTask.addEventListener("submit", onSubmitAddTask)
    };

    init();

}
