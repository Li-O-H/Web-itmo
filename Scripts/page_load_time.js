(function () {
    window.onload = function page_load_time() {
        let page_load_time = (window.performance.timing.loadEventStart -
            window.performance.timing.navigationStart) / 1000;
        document.getElementById("page_load_time").innerText = "Время загрузки страницы: " +
            page_load_time.toString() + " секунд"
    }
})()
