

function map() {
    mapboxgl.accessToken = 'pk.eyJ1IjoidG9uM3QiLCJhIjoiY2toMG5lMHB5MDZpbzJ3c2lvYmp3MHMxbCJ9.RchSMZrgFnCwuqSJ1BlwyQ';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11'
    });
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.FullscreenControl({
        container: document.querySelector('mapa')
    }));
    
    
    var size = 100;
    
    //var localizacion = obtener();

    // implementation of CustomLayerInterface to draw a pulsing dot icon on the map
    // see https://docs.mapbox.com/mapbox-gl-js/api/#customlayerinterface for more info
    var pulsingDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        // get rendering context for the map canvas when layer is added to the map
        onAdd: function () {
            var canvas = document.createElement('canvas');
            canvas.width = this.width;
            canvas.height = this.height;
            this.context = canvas.getContext('2d');
        },

        // called once before every frame where the icon will be used
        render: function () {
            var duration = 1000;
            var t = (performance.now() % duration) / duration;

            var radius = (size / 2) * 0.3;
            var outerRadius = (size / 2) * 0.7 * t + radius;
            var context = this.context;

            // draw outer circle
            context.clearRect(0, 0, this.width, this.height);
            context.beginPath();
            context.arc(
                this.width / 2,
                this.height / 2,
                outerRadius,
                0,
                Math.PI * 2
            );
            context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
            context.fill();

            // draw inner circle
            context.beginPath();
            context.arc(
                this.width / 2,
                this.height / 2,
                radius,
                0,
                Math.PI * 2
            );
            context.fillStyle = 'rgba(255, 100, 100, 1)';
            context.strokeStyle = 'white';
            context.lineWidth = 2 + 4 * (1 - t);
            context.fill();
            context.stroke();

            // update this image's data with data from the canvas
            this.data = context.getImageData(
                0,
                0,
                this.width,
                this.height
            ).data;

            // continuously repaint the map, resulting in the smooth animation of the dot
            map.triggerRepaint();

            // return `true` to let the map know that the image was updated
            return true;
        }
    };

    map.on('load', function () {
        map.addImage('pulsing-dot', pulsingDot, {
            pixelRatio: 2
        });

        map.addSource('points', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': [{
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': []
                    }
                }]
            }
        });
        map.addLayer({
            'id': 'points',
            'type': 'symbol',
            'source': 'points',
            'layout': {
                'icon-image': 'pulsing-dot'
            }
        });
    });
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
    var zona = document.getElementById("map");
    zona.innerHTML = map();
}

window.onload = onload();