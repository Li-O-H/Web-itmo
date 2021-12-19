window.addEventListener("load", async function loadComments() {
    const container = document.getElementById('comments');
    let comments = []
    function getRandomInRange(min, max) {
        return Math.floor(Math.random() * (max - min )) + min;
    }
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/comments')
        comments = await response.json();
        comments = comments.filter(function (item, index, array) {
            return (item.id % getRandomInRange(90, 200) === 0);
        });

        for(let i=0; i<comments.length; ++i){
            let response2 = await fetch('https://jsonplaceholder.typicode.com/photos/'+comments[i].id)
            let photo = await response2.json();
            comments[i].photo=photo.url
        }
    } catch (e) {
        const message = document.createElement("p")
        message.innerHTML = "Ошибка - не удалось загрузить комментарии"
        message.classList.add("error_message")
        container.appendChild(message)
        return
    } finally {
        document.getElementsByClassName("preloader")[0].style.display="none"
    }
    comments.forEach(function (comment, i, comments) {
        const newComment = document.createElement("article");
        const author = document.createElement("div")
        const authorName = document.createElement("p")
        authorName.innerHTML = comment.name
        const authorEmail = document.createElement("a")
        authorEmail.href = "mailto: " + comment.email
        authorEmail.innerHTML = comment.email
        const body = document.createElement("p")
        body.innerHTML = comment.body
        const img=document.createElement("img")
        img.src=comment.photo
        author.classList.add("comment_author")
        authorName.classList.add("comment_author_name")
        authorEmail.classList.add("comment_author_email")
        img.classList.add("comment_author_photo")
        newComment.classList.add("comment")
        author.appendChild(img)
        author.appendChild(authorName)
        author.appendChild(authorEmail)
        newComment.appendChild(author)
        newComment.appendChild(body)
        container.appendChild(newComment)
    });
})