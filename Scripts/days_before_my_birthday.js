window.addEventListener("load", function () {
    let today = new Date()
    let myBirthday = new Date(2002, 1, 25)
    let difference = 0
    while (today.getDate() !== myBirthday.getDate() || today.getMonth() !== myBirthday.getMonth()) {
        today.setDate(today.getDate() + 1)
        difference++
    }
    document.getElementById("days_before_my_birthday").innerText = "До моего дня рождения "
        + difference.toString() + " дней"
})