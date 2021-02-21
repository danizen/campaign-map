## Summary

A campaign map to look at between sessions

## Usage

Generate a map image:

 * Should be square
 * Pixel size should be a power of 2

Run `./gentiles.py` to generate tiles from the image.  The command has usage, and I stole it and made it work with Python 3.

Run `npm install` to install front-end dependencies.

Run `npm run build` to build application.

## Fog of War

The basic technique to develop a fog of war with Leaflet is
to create a custom pane which appears above markers, but below
popups.

GeoJSON makes a vector approach to the fog of war ideal.  We simply
add GeoJSON polygons with a partially transparent fill layer to the
the custom pane.

If we want to take a raster approach to the fog of war, I guess we can
use very small tiles and check the intersection with the raster, or we
can tile and load the raster image into the custom pane.

## Lore

Each category of lore should go into its own L.LayerGroup, which takes an array
of markers.  These Layer groups are then added to an overlays object as described
in the interactive tutorial. So, each bit of lore needs the following properties:

* lat
* lng
* markup (for popup)
* category

These can be kept in a super simple sqlite3 database, or maybe a YAML file, or
as properties of GeoJSON.

## Resources

- Stolen gist for tiling - https://gist.github.com/jeffThompson/a08e5b8146352f3974bfa4100d0317f6
- Tutorial on the leaflet part - https://www.techtrail.net/creating-an-interactive-map-with-leaflet-js/
