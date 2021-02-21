## Summary

A campaign map to look at between sessions

## Usage

Generate a map image:

 * Should be square
 * Pixel size should be a power of 2

Run `./gentiles.py` to generate tiles from the image. The source image should be square
and its side length should be divisible by 256.  So, I took the map of Khorvaire in
"Eberron: Rising from the Last War" and made it square, then resized to 4096x4096, then:

```bash
./gentiles.py input.jpg 1-6 src/images/khorvaire
```

Run `./genlore.py -o src/js/lore.js` to convert the YAML files under `lore` to javascript.
We may have something similar later for fog.

Run `npm install` to install front-end dependencies.

Run `npm run deploy` to send this to an S3 bucket application.

## Fog of War

The basic technique to develop a fog of war with Leaflet is
to create a custom pane which appears above markers, and add to that.

Leaflet/GeoJSON makes a vector approach to the fog of war ideal.  We simply
add GeoJSON polygons with a partially transparent fill layer to the
the custom pane.

If we want to take a raster approach to the fog of war, I guess we can
use very small tiles and check the intersection with the raster, or we
can tile and load the raster image into the custom pane.

We may or not need it - I prototyped the vector approach in `src/js/fogofwar.js`

## Lore

Each category of lore should go into its own L.LayerGroup, which takes an array
of markers.  These Layer groups are then added to an overlays object as described
in the interactive tutorial. So, each bit of lore needs the following properties:

Going beyond the tutorial, the response of `L.geoJSON` is a sub-class of
`L.LayerGroup`, so I can load data from YAML and rewrite it as GeoJSON, either in a
JSON file or in a js file.  In this case, for simplicity, I use a JS file.

There is some work after that to turn the GeoJSON object into the LayerGroup,
and bind the popup.  We might eventually want custom map pins for each type of object,
so I thought it best to preserve flexibility.

## Resources

- Stolen gist for tiling - https://gist.github.com/jeffThompson/a08e5b8146352f3974bfa4100d0317f6
- Tutorial on the leaflet part - https://www.techtrail.net/creating-an-interactive-map-with-leaflet-js/

## Preparing the Map Image

It would be nice to automate preparing the map image, but it requires some judgement.
Here is my best guess at an algorithm.

- Check which is the longest dimension
- If not square:
    - Resize the image (not scale) so it is square
    - Fill in the new space, if any, with a background color/pattern
    - Blur
- Check whether width is a power of 2, if not:
    - Take log2 of width
    - Round off, and raise 2 to that power
    - Resize to the power of 2

## Bounds

By experiment, longitudes run from -180 to 180.
Latitudes run from -90 to 90.

setMaxBounds and fitBounds accept corner1 and corner2.

```javascript
map.setMaxBounds([
    [90, 180],
    [-90, -180]
]);
```