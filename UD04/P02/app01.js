var x = true;


function map() {
    if (x) {
        x = false;
        var cord = JSON.parse(localStorage.getItem("coordenas"));
        console.log(cord);
        mapboxgl.accessToken = 'pk.eyJ1IjoidG9uM3QiLCJhIjoiY2toMG5lMHB5MDZpbzJ3c2lvYmp3MHMxbCJ9.RchSMZrgFnCwuqSJ1BlwyQ';
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [cord.longitud, cord.latitud],
            zoom: 14,
        });

        var marker = new mapboxgl.Marker()
            .setLngLat([cord.longitud, cord.latitud])
            .setPopup(new mapboxgl.Popup().setHTML("<h1>Hola!!</h1><p>Según tu geolocalización estás mas o menos por esta zona...<br/>:D</p>"))
            .addTo(map);

        map.on('load', function () {
            // Add an image to use as a custom marker
            map.loadImage(
                'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
                function (error, image) {
                    if (error) throw error;
                    map.addImage('custom-marker', image);
                    // Add a GeoJSON source with 3 points.
                    map.addSource('points', {
                        'type': 'geojson',
                        'data': {
                            'type': 'FeatureCollection',
                            'features': [{
                                    'type': 'Feature',
                                    'properties': {},
                                    'geometry': {
                                        'type': 'Point',
                                        'coordinates': [
                                            -0.12614771562891747, 38.538396511398616
                                        ]
                                    }
                                },
                                {
                                    'type': 'Feature',
                                    'properties': {},
                                    'geometry': {
                                        'type': 'Point',
                                        'coordinates': [
                                            -0.1310188883446699, 38.53449030313783
                                        ]
                                    }
                                },
                                {
                                    'type': 'Feature',
                                    'properties': {},
                                    'geometry': {
                                        'type': 'Point',
                                        'coordinates': [
                                            -0.10590305450227788, 38.541065814982176
                                        ]
                                    }
                                }
                            ]
                        }
                    });

                    // Add a symbol layer
                    map.addLayer({
                        'id': 'Puntos',
                        'type': 'symbol',
                        'source': 'points',
                        'layout': {
                            'icon-image': 'custom-marker'
                        }
                    });
                }
            );

            // Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
            map.on('click', 'Puntos', function (e) {
                map.flyTo({
                    center: e.features[0].geometry.coordinates
                });
            });

            // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
            map.on('mouseenter', 'Puntos', function () {
                map.getCanvas().style.cursor = 'pointer';
            });

            // Change it back to a pointer when it leaves.
            map.on('mouseleave', 'Puntos', function () {
                map.getCanvas().style.cursor = '';
            });
        });

        map.on('load', function () {
            map.addSource('maine', {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Polygon',
                        'coordinates': [
                            [
                                [-0.1377582550048828, 38.53645083248653],
                                [-0.1384878158569336, 38.53729004998249],
                                [-0.14077278955474615, 38.540400894347194],
                                [-0.13923829761537165, 38.54176617176576],
                                [-0.13923829761537165, 38.54176617176576],
                                [-0.13709776063004941, 38.54298585629612],
                                [-0.13435640882541122, 38.54397056282187],
                                [-0.13059031898562612, 38.543993169980965],
                                [-0.12090741025042595, 38.54454990875993],
                                [-0.11414274492342891, 38.54369690545654],
                                [-0.10785014838307294, 38.54223970307921],
                                [-0.10211545131779465, 38.540446801651605],
                                [-0.09899597513776559, 38.53902164490967],
                                [-0.09823017091614927, 38.538241919861335],
                                [-0.09926681115254077, 38.53719363847006],
                                [-0.09895017629736547, 38.53427602804947],
                                [-0.10728621353277568, 38.53230120148154],
                                [-0.10991223034979347, 38.533618030054946],
                                [-0.11258116251104955, 38.534229869407724],
                                [-0.119335233193405, 38.534983559913556],
                                [-0.12251914948552045, 38.53531004808111],
                                [-0.12570306577761592, 38.53523370233146],
                                [-0.12757397366123246, 38.5350780361453],
                                [-0.12987403498721184, 38.53488880000562],
                                [-0.13147008354251088, 38.53336894393952],
                                [-0.13285973619510116, 38.53482760963381],
                                [-0.13442105022462458, 38.53591698610828],
                                [-0.13592138080379845, 38.53627992012845],
                                [-0.13682260303280236, 38.536313489096024],
                                [-0.13733758716366173, 38.53634705804795]
                            ]
                        ]
                    }
                }
            });
            map.addLayer({
                'id': 'Zona',
                'type': 'fill',
                'source': 'maine',
                'layout': {},
                'paint': {
                    'fill-color': '#088',
                    'fill-opacity': 0.2
                }
            });
        });


        // enumerate ids of the layers
        var toggleableLayerIds = ['Puntos', 'Zona'];

        // set up the corresponding toggle button for each layer
        for (var i = 0; i < toggleableLayerIds.length; i++) {
            var id = toggleableLayerIds[i];

            var link = document.createElement('a');
            link.href = '#';
            link.className = 'active';
            link.textContent = id;

            link.onclick = function (e) {
                var clickedLayer = this.textContent;
                e.preventDefault();
                e.stopPropagation();

                var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

                // toggle layer visibility by changing the layout object's visibility property
                if (visibility === 'visible') {
                    map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                    this.className = '';
                } else {
                    this.className = 'active';
                    map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
                }
            };

            var layers = document.getElementById('menu');
            layers.appendChild(link);
        }

        /*
        map.on('load', function () {
            map.addSource('national-park', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [{
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Polygon',
                                'coordinates': [
                                    [
                                        [-0.1377582550048828, 38.53645083248653],
                                        [-0.1384878158569336, 38.53729004998249],
                                        [-0.14077278955474615, 38.540400894347194],
                                        [-0.13923829761537165, 38.54176617176576],
                                        [-0.13923829761537165, 38.54176617176576],
                                        [-0.13709776063004941, 38.54298585629612],
                                        [-0.13435640882541122, 38.54397056282187],
                                        [-0.13059031898562612, 38.543993169980965],
                                        [-0.12090741025042595, 38.54454990875993],
                                        [-0.11414274492342891, 38.54369690545654],
                                        [-0.10785014838307294, 38.54223970307921],
                                        [-0.10211545131779465, 38.540446801651605],
                                        [-0.09899597513776559, 38.53902164490967],
                                        [-0.09823017091614927, 38.538241919861335],
                                        [-0.09926681115254077, 38.53719363847006],
                                        [-0.09895017629736547, 38.53427602804947],
                                        [-0.10728621353277568, 38.53230120148154],
                                        [-0.10991223034979347, 38.533618030054946],
                                        [-0.11258116251104955, 38.534229869407724],
                                        [-0.119335233193405, 38.534983559913556],
                                        [-0.12251914948552045, 38.53531004808111],
                                        [-0.12570306577761592, 38.53523370233146],
                                        [-0.12757397366123246, 38.5350780361453],
                                        [-0.12987403498721184, 38.53488880000562],
                                        [-0.13147008354251088, 38.53336894393952],
                                        [-0.13285973619510116, 38.53482760963381],
                                        [-0.13442105022462458, 38.53591698610828],
                                        [-0.13592138080379845, 38.53627992012845],
                                        [-0.13682260303280236, 38.536313489096024],
                                        [-0.13733758716366173, 38.53634705804795]
                                    ]
                                ]
                            }
                        },
                        {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [-0.12614771562891747, 38.538396511398616]
                            },
                        },
                        {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [-0.1310188883446699, 38.53449030313783]
                            }
                        },
                        {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [-0.10590305450227788, 38.541065814982176]
                            }
                        }
                    ]
                }
            });

            map.addLayer({
                'id': 'park-boundary',
                'type': 'fill',
                'source': 'national-park',
                'paint': {
                    'fill-color': '#888888',
                    'fill-opacity': 0.4
                },
                'filter': ['==', '$type', 'Polygon']
            });

            map.addLayer({
                'id': 'park-volcanoes',
                'type': 'circle',
                'source': 'national-park',
                'paint': {
                    'circle-radius': 5,
                    'circle-color': '#B42222'
                },
                'filter': ['==', '$type', 'Point']
            });
        });
        */
    
    }

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