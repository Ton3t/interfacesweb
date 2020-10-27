var btnAbrir = document.getElementById("idAbrirmodal");
var btnAceptar = document.getElementById("idAceptar");
var btnCancelar = document.getElementById("idCancelar");
var btnSalir = document.getElementById("idCerrarmodal");
var ventanaModal = document.getElementById("idModal");
var arriba = document.getElementById("arriba");
var izquierda = document.getElementById("izquierda");
var derecha = document.getElementById("derecha");
var abajo = document.getElementById("abajo");

function abrirModal() {
    ventanaModal.style.display = "flex";
}

function aceptar() {
    alert("Has aceptado");
    ventanaModal.style.display = "none";
}

function cancelar() {
    alert("Has cancelado");
    ventanaModal.style.display = "none";
}

function salir() {
    alert("Has salido");
    ventanaModal.style.display = "none";
}

function pulsaFuera() {
    ventanaModal.style.display = "none";
}
    

function init() {
    btnAbrir.addEventListener("click", abrirModal);
    btnAceptar.addEventListener("click", aceptar);
    btnCancelar.addEventListener("click", cancelar);
    btnSalir.addEventListener("click", salir);
    arriba.addEventListener("click", pulsaFuera);
    izquierda.addEventListener("click", pulsaFuera);
    derecha.addEventListener("click", pulsaFuera);
    abajo.addEventListener("click", pulsaFuera);
}

window.onload = function() {
    this.init();
}