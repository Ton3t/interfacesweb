var menu = document.getElementById("sidebar");
var overlay = document.getElementById("overlay");


/* Añadir la clase active a los elementos con id sidebar y overlay */
function activarSideBar() {
    menu.classList.add("active");
    overlay.classList.add("active");
}

/* Quitar la clase active a los elementos con id sidebar y overlay */
function desactivarSideBar() {
    menu.classList.remove("active");
    overlay.classList.remove("active");
}
