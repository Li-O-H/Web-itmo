window.addEventListener("load", async function loadComments() {
    const container = document.getElementById('comments');
    let comments = []
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/comments')
        comments = await response.json();
    } catch (e) {
        const message = document.createElement("p")
        message.innerHTML = "Ошибка - не удалось загрузить комментарии"
        container.appendChild(message)
        return
    } finally {
        document.getElementsByClassName("preloader")[0].style.display="none"
    }

    function getRandomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    comments = comments.filter(function (item, index, array) {
        return (item.id % getRandomInRange(90, 200) === 0);
    });
    comments.forEach(function (comment, i, comments) {
        const newElem = document.createElement("article");
        const authorEmail = document.createElement("a")
        authorEmail.href = "mailto: " + comment.email
        authorEmail.innerHTML = comment.email
        const author = document.createElement("p")
        author.innerHTML = comment.name + ", " + authorEmail.outerHTML
        const body = document.createElement("p")
        body.innerHTML = comment.body
        newElem.appendChild(author)
        newElem.appendChild(body)
        container.appendChild(newElem)
    });
})