window.addEventListener("load", function () {
    let navigatables = document.getElementsByClassName("navigatable")
    let links = document.querySelectorAll("nav a")
    function activeLink(){
        let currentPosition = document.location + window.innerHeight / 3
        let currentElement = navigatables[0]
        for (let i = 0; i < navigatables.length; ++i) {
            if (navigatables[i].offsetTop > currentPosition) {
                if (i !== 0) {
                    currentElement = navigatables[i - 1]
                }
                break
            }
            if (i === navigatables.length - 1) {
                currentElement = navigatables[i]
            }
        }
        for (let i = 0; i < links.length; ++i) {
            links[i].classList.remove("nav_link_active")
            if (links[i].getAttribute("href") === "#" + currentElement.id) {
                links[i].classList.add("nav_link_active")
            }
        }
    }
    window.addEventListener("scroll", activeLink)
    activeLink()
})