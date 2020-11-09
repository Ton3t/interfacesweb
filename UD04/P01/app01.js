function map() {
    var cord = JSON.parse(localStorage.getItem("coordenas"));
    console.log(cord);
    mapboxgl.accessToken = 'pk.eyJ1IjoidG9uM3QiLCJhIjoiY2toMG5lMHB5MDZpbzJ3c2lvYmp3MHMxbCJ9.RchSMZrgFnCwuqSJ1BlwyQ';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [cord.longitud, cord.latitud],
        zoom: 10,
    });
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.FullscreenControl({
        container: document.querySelector('mapa')
    }));
    
    var marker = new mapboxgl.Marker()
        .setLngLat([cord.longitud, cord.latitud])
        .setPopup(new mapboxgl.Popup().setHTML("<h1>Hola!!</h1><p>Según tu geolocalización estás mas o menos por esta zona...<br/>:D</p>"))
        .addTo(map);
}

function onload() {
    boton = document.getElementById("obtener");
    boton.addEventListener("click", obtener);
    btnmapa = document.getElementById("btnmapa");
    btnmapa.addEventListener("click", map);
}

function obtener() {
    var geoconfig = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
    };
    console.log(geoconfig);
    navigator.geolocation.getCurrentPosition(mostrar, errores, geoconfig);
    console.log(navigator.geolocation.getCurrentPosition(mostrar, errores, geoconfig));
}

function mostrar(posicion) {
    var datos = {
        "latitud": posicion.coords.latitude,
        "longitud": posicion.coords.longitude,
        "exactitud": posicion.coords.accuracy
    }

    var objeto = JSON.stringify(datos);
    localStorage.setItem("coordenas", objeto);
    /*
    var datos = "";
    datos += 'Latitud: ' + posicion.coords.latitude + '\n';
    datos += 'Longitud: ' + posicion.coords.longitude + '\n';
    datos += 'Exactitud: ' + posicion.coords.accuracy + 'mts.\n';
    */
    console.log(datos);
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
    var zona = document.getElementById("map");
    zona.innerHTML = map();
}

window.onload = onload();