function getCountries() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://restcountries.eu/rest/v2/all");
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            var select = document.getElementById("idPaises");
            var datos = JSON.parse(this.responseText);
            console.log(datos.length);
            for(let i = 0; i < datos.length; i++) {
                var option = document.createElement("option");
                option.text = datos[i].name; 
                option.value = datos[i].alpha2Code;
                select.appendChild(option);
            }
        }
        else {
            console.log(`Ha ocurrido un error: ${xhttp.status}`);
        }
    };
    xhttp.send();
}

function muestraModal() {
    var modal = document.getElementById("modal");
    modal.style.visibility = "visible";
}

function ocultaModal() {
    var modal = document.getElementById("modal");
    modal.style.visibility = "hidden";
}

function ocultaSelect() {
    var select = document.getElementById("idPaises");
    select.style.visibility = "hidden";
}

function muestraSelect() {
    var select = document.getElementById("idPaises");
    select.style.visibility = "visible";
}

window.onload = function() {
    setTimeout(() => {
        this.muestraSelect();
    }, 3000);
    //this.muestraModal();
    setTimeout(() => {
        this.ocultaModal();
    }, 3000);
    setTimeout(() => {
        this.getCountries();
    }, 3000);
    
}