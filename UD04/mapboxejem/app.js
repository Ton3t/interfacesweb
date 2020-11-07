
function mapa(latitud, longitud) {
    mapboxgl.accessToken = 'pk.eyJ1IjoidG9uM3QiLCJhIjoiY2toMG5lMHB5MDZpbzJ3c2lvYmp3MHMxbCJ9.RchSMZrgFnCwuqSJ1BlwyQ';
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [longitud, latitud], // starting position [lng, lat]
    zoom: 9 // starting zoom
    });
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.FullscreenControl({
        container: document.querySelector('mapa')
    }));
}

function obtener() {
    var geoconfig = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
    };
    console.log(geoconfig);

    navigator.geolocation.getCurrentPosition(mostrar, errores, geoconfig);
}

function mostrar(posicion) {
    var datos = "";
    datos += 'Latitud: ' + posicion.coords.latitude + '\n';
    datos += 'Longitud: ' + posicion.coords.longitude + '\n';
    datos += 'Exactitud: ' + posicion.coords.accuracy + 'mts.\n';
    console.log(datos);
}

function mostrarLatitud(posicion) {
    var datos =  posicion.coords.latitude;
    var lat = parseFloat(datos);
    console.log(lat);
    return lat;
}

function errores(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred.";
            break;
    }
}



function anyadeMapa() {
    var lol = obtener();

    var zona = document.getElementById("map");
    zona.innerHTML = map(lol.longitud, lol.latitud);
}


window.onload = anyadeMapa();
window.onload = mostrarLatitud();