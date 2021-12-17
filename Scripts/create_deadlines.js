window.addEventListener("load", function () {
    const container = document.getElementById('deadlines');
    class Deadline {
        constructor(task, date) {
            this.task = task;
            this.date = date;
        }
    }
    let deadlines = JSON.parse(localStorage.getItem("deadlines"))
    displayDeadlines()
    let taskInput = document.getElementById("task_input");
    let dateInput = document.getElementById("date_input");
    let submit = document.getElementById("submit");
    submit.addEventListener("click",
        function (event) {
            event.preventDefault();
            let task = taskInput.value
            taskInput.value=''
            let date = dateInput.value
            dateInput.value=''
            deadlines.push(new Deadline(task, date));
            localStorage.setItem("deadlines", JSON.stringify(deadlines))
            displayDeadlines()
        }
    )

    function displayDeadlines() {
        deadlines.sort(function (a, b) {
            if ((a.date !== '') && (b.date !== '')) {
                if (a.date < b.date) {
                    return -1
                }
                if (a.date > b.date) {
                    return 1
                }
                return a.task.localeCompare(b.task)
            }
            if (a.date !== '') {
                return -1
            }
            if (b.date !== '') {
                return 1
            }
            return a.task.localeCompare(b.task)
        })
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        deadlines.forEach(function (deadline, i, deadlines){
            const newElem = document.createElement("p");
            newElem.innerHTML=deadline.task + deadline.date.toString();
            container.appendChild(newElem)
        });
    }
})
