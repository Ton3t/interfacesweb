// Detectamos el scroll en la página
window.onscroll = function (e) {
  /* 
    Obtenemos todos los elementos que tengan la clase animate__animated y sean hijos de la clase scroll-animations
    Busca información sobre la función querySelectorAll
  */

  var elements = document.querySelectorAll(".scroll-animations > .animate__animated"); // TO DO

  // Recorremos la lista de elementos
  for (var i = 0; i < elements.length; i++) {
    // Comprobamos si están en el viewport
    if (isInViewport(elements[i]) === true) {
      // En caso afirmativo agregamos la clase de animación fadeInLeft
      elements[i].classList.add("animate__fadeInLeft");
    }
  }
}

// Función para detectar si un elemento está siendo visualizado (se encuentra dentro del viewport)
function isInViewport(element) {
  var rect = element.getBoundingClientRect();
  var html = document.documentElement;
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || html.clientHeight) &&
    rect.right <= (window.innerWidth || html.clientWidth)
  );
}

// Función para realizar animacion del formulario si hay errores
function animarForm() {
  // Obtenemos los elementos input y text area del formulario
  // Si nombre está vacio
  // Agregamos las clases form-error, animate__animated y animate__shakeX al input
  // Al acabar la animación, quitamos las clases animate__animated y animate__shakeX al input
  // Si el nombre no está vacío
  // Quitamos la clase form-error al input
  var nombre = document.getElementById("nombre");
  var correo = document.getElementById("correo");
  var txtarea = document.getElementById("mensaje");
  if (nombre.value == "" || nombre.value == null) {

    nombre.classList.add("form-error", "animate__animated", "animate__shakeX");
    nombre.addEventListener('animationend', () => {
      nombre.classList.remove("animate__animated", "animate__shakeX");
    });
  }
  else {
    nombre.classList.remove("form-error");
  }

  // Repetir proceso anterior para el correo
  if(correo.value == "" || correo.value == null) {
    correo.classList.add("form-error", "animate__animated", "animate__shakeX");
    correo.addEventListener('animationend', () => {
      correo.classList.remove("animate__animated", "animate__shakeX");
    });
  } else {
    correo.classList.remove("form-error");
  }

  // Repetir proceso anterior para el mensaje
  if(txtarea.value == "" || txtarea.value == null) {
    txtarea.classList.add("form-error", "animate__animated", "animate__shakeX");
    txtarea.addEventListener('animationend', () => {
      txtarea.classList.remove("animate__animated", "animate__shakeX");
    });
  } else {
    txtarea.classList.remove("form-error");
  }
}

//Función para animar el botón
function animarBtn(el) {
  // Añadimos las clases animate__animated y animate__hinge al elemento recibido por parametro
  el.classList.add("animate__animated","animate__hinge");
  // Al acabar la animacion, quitamos las clases animate__animated y animate__hinge al elemento recibido por parámetro
  el.addEventListener('animationend', () => {
    el.classList.remove("animate__animated","animate__hinge");
  });
}