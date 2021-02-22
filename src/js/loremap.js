// Creating the Map
var map = L.map('map').setView([0, 0], 2);
L.tileLayer('images/khorvaire/{z}/{x}/{y}.png', {
    continuousWorld: false,
    noWrap: true,
    tileSize: 256,
    minZoom: 2,
    maxZoom: 6,
}).addTo(map);
map.setMaxBounds([
    [90, 180],
    [-90, -180]
]);

// Coordinate Finder
const params = new URLSearchParams(window.location.search);
if (params.has('admin')) {
    var marker = L.marker([0, 0], {
        draggable: true,
    }).addTo(map);
    marker.bindPopup('LatLng Marker').openPopup();
    marker.on('dragend', function (e) {
        var latlng = marker.getLatLng();
        var lat = latlng.lat.toFixed(4);
        var lng = latlng.lng.toFixed(4);
        marker.getPopup().setContent(`[${lng}, ${lat}]`).openOn(map);
    });
}

// Converts lore into popup text
function lorePopup(layer) {
    if (layer.feature.properties.description) {
        return layer.feature.properties.description
    }
    return layer.feature.properties.name;
}

// Overlays based on lore
var mlTowns = L.geoJSON(geoTowns).bindPopup(lorePopup);
var mlCities = L.geoJSON(geoCities).bindPopup(lorePopup);
var mlCapitals = L.geoJSON(geoCapitals).bindPopup(lorePopup);
var mlSites = L.geoJSON(geoSites).bindPopup(lorePopup);
var mlRuins = L.geoJSON(geoRuins).bindPopup(lorePopup);
var mlForts = L.geoJSON(geoForts).bindPopup(lorePopup);
var overlays = {
    'Capitals': mlCapitals,
    'Cities': mlCities,
    'Forts': mlForts,
    'Ruins': mlRuins,
    'Sites': mlSites,
    'Towns': mlTowns,
}
var overlayOptions = {
    collapsed: false,
    position: 'topright',
}
L.control.layers(null, overlays, overlayOptions).addTo(map);