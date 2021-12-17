window.addEventListener("load", function () {
    const container = document.getElementById('deadlines');
    class Deadline {
        constructor(task, date) {
            this.task = task;
            this.date = date;
        }
    }
    let deadlines=[]
    // deadlines = JSON.parse(localStorage.getItem("deadlines"))
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
            // localStorage.setItem("deadlines", JSON.stringify(deadlines))
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
            const newElem = document.createElement("div");
            const leftSide = document.createElement("div");
            const rightSide = document.createElement("div");
            newElem.appendChild(leftSide)
            newElem.appendChild(rightSide)
            const number=document.createElement("p")
            number.innerHTML=i+1
            const task=document.createElement("p")
            task.innerHTML=deadline.task
            const date=document.createElement("p")
            date.innerHTML=deadline.date
            const deleteButton=document.createElement("button")
            deleteButton.classList.add("deadline_delete_button")
            deleteButton.innerHTML="X"
            leftSide.appendChild(number)
            leftSide.appendChild(task)
            rightSide.appendChild(date)
            rightSide.appendChild(deleteButton)
            leftSide.classList.add("deadline_left")
            rightSide.classList.add("deadline_right")
            task.classList.add("deadline_task")
            date.classList.add("deadline_date")
            newElem.classList.add("deadline")
            deleteButton.addEventListener("click", function (){
                delete deadlines[i];
                // localStorage.setItem("deadlines", JSON.stringify(deadlines))
                displayDeadlines()
            })
            container.appendChild(newElem)
        });
    }
})
