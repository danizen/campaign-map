// fog of war is a geoJSON structure, likely polygons
var example_fogOfWar = {
    type: 'FeaturesCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [23.241346, -36.738281],
            [23.402765, -8.613281],
            [37.71859, -25.3125],
            [23.241346, -36.738281],
          ]]
        },
      }
    ]
};

function addFogOfWar(map, fogOfWar) {
    // Create a fog of war pane
    map.createPane('fog');
    map.getPane('fog').style.zIndex = 650;
    map.getPane('fog').style.pointerEvents = 'none';

    // add geoJSON to the fog pane, use a style
    // where the fog polygons are grayed out and borderless
    L.geoJSON(fogOfWar, {
        pane: 'fog',
        style: function(feature) {
            return {
                fillColor: '#000000',
                fillOpacity: 0.6,
                opacity: 0,
            };
        },
    }).addTo(map);
}
