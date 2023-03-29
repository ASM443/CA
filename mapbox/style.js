
var styleJSON = {
    "version": 8,
    "name": "qgis2web export",
    "pitch": 0,
    "light": {
        "intensity": 0.2
    },
    "sources": {
        "Hybrid_0": {
            "type": "raster",
            "tiles": ["https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"],
            "tileSize": 256
        },
        "highlight_1": {
            "type": "geojson",
            "data": json_highlight_1
        }
                    },
    "sprite": "",
    "glyphs": "https://glfonts.lukasmartinelli.ch/fonts/{fontstack}/{range}.pbf",
    "layers": [
        {
            "id": "background",
            "type": "background",
            "layout": {},
            "paint": {
                "background-color": "#ffffff"
            }
        },
        {
            "id": "lyr_Hybrid_0_0",
            "type": "raster",
            "source": "Hybrid_0"
        },
        {
            "id": "lyr_highlight_1_0",
            "type": "fill",
            "source": "highlight_1",
            "layout": {},
            "paint": {'fill-opacity': 0.3, 'fill-color': '#2ac22c'}
        }
],
}