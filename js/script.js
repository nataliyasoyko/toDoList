{
    const tasks = [];


    const render = () => {
        let htmlString = "";

        for (let task of tasks) {
            htmlString += `
            <li  ${task.done ? "class=\"section__item section__item--crossed\"" : "class=\"section__item\""}  >   
                   
            <button class="list__button list__button--done js-buttonDone">
            <i class="fas fa-check-square"></i>
            </button>
            ${task.content}
            <button class="list__button list__button--delete js-buttonDelete"><i class="far fa-trash-alt"></i></button>
            </li>
            `
        }
        document.querySelector(".js-tasksList").innerHTML = htmlString;

        const buttonsTaskDelete = document.querySelectorAll(".js-buttonDelete");


        const taskDelete = (taskIndex) => {
            tasks.splice(taskIndex, 1)
            render();
        }

        buttonsTaskDelete.forEach((buttonTaskDelete, index) => {
            buttonTaskDelete.addEventListener("click", () => {
                taskDelete(index)
            })
        })

        const buttonsTaskDone = document.querySelectorAll(".js-buttonDone");


        const taskDone = (taskIndex) => {
            tasks[taskIndex].done = !tasks[taskIndex].done;
            render();
        }

        buttonsTaskDone.forEach((buttonTaskDone, index) => {
            buttonTaskDone.addEventListener("click", () => {
                taskDone(index);
            })
        })
    }


    const onSubmitAddTask = (event) => {
        event.preventDefault();

        let newTaskContent = document.querySelector(".js-addTaskField");

        if (newTaskContent.value.trim() === "") {
            newTaskContent.focus()
            return;
        }

        tasks.push({
            content: newTaskContent.value.trim(),
            done: false,
        });

        render();

        newTaskContent.value = "";
    }

    const init = () => {

        const addTask = document.querySelector(".js-form");

        addTask.addEventListener("submit", onSubmitAddTask)
    };

    init();

}