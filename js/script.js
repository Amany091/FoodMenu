
const iconBar = document.querySelector(".iconBar"),
    resBar = document.querySelector(".resBar");


const toggleBar = () => {
    resBar.classList.toggle("show")
}
iconBar.addEventListener('click', toggleBar)

