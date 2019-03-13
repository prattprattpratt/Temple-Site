window.onload = () => {
    const names = document.querySelectorAll(".temple-name");
    const namesList = document.getElementsByClassName("temple-names-list")[0];
    names.forEach(name => { 
        name.addEventListener("mouseover", () => {
            namesList.classList.add("hovered-list");
            name.classList.add("hovered-name");
        });

        name.addEventListener("mouseout", () => {
            namesList.classList.remove("hovered-list");
            name.classList.remove("hovered-name");
        });

        name.addEventListener("click", ev => {
            name.classList.add("open");
            namesList.classList.add("open");
        });
    });
}