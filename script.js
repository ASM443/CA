// Declare variables for recording and storing coordinates
let recordId;
let coordsList = [];

// Function to highlight a polygon on the map with the given coordinates
function highlightMap(pltCoords) {
    console.log("highlighting: ", pltCoords)
    document.getElementById("demo").innerHTML = pltCoords;

    // Add a data source containing GeoJSON data.
    map.addSource('MapUpdate', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [
                    pltCoords
                ]
            }
        }
    });

    // Add a new layer to visualize the polygon.
    map.addLayer({
        'id': 'MapUpdate',
        'type': 'fill',
        'source': 'MapUpdate',
        'layout': {},
        'paint': {
            'fill-color': '#0080ff', // blue color fill
            'fill-opacity': 0.5
        }
    });
}

// Function to start recording the user's position
function recordPos() {
    document.getElementById("recbtn").classList.toggle("hide");
    document.getElementById("stopbtn").classList.toggle("unhide");
    document.getElementById("stopbtn").classList.remove("hide");
    recordId = navigator.geolocation.watchPosition(recordPosSuccess);
}

// Function to handle the successful retrieval of the user's position
function recordPosSuccess(pos) {
    const crd = pos.coords;
    const elem = document.getElementById("demo");
    const currentPos = [crd.longitude, crd.latitude];

    // Check for duplicate locations and add to the coordsList if not a duplicate
    if (coordsList.some((arr) => JSON.stringify(arr) === JSON.stringify(currentPos))) {
        console.log("Duplicate location");
    } else {
        console.log("Currnet coordList", coordsList);
        coordsList.push(currentPos);
        elem.innerHTML = elem.innerHTML + currentPos;
    }
}

// Function to stop recording the user's position
function stopRecording() {
    navigator.geolocation.clearWatch(recordId);
    document.getElementById("stopbtn").classList.remove("unhide");
    document.getElementById("stopbtn").classList.toggle("hide");
    findMaxMin();
}

// Function to determine the maximum and minimum latitude and longitude values
function findMaxMin() {
    let lats = [];
    let longs = [];
    let maxLat = 0;
    let maxLong = 0;
    console.log("Output");
    console.log("Final coordList", coordsList);

    // Iterate through the coordsList and populate the lats and longs arrays
    for (let i = 0; i < coordsList.length; i++) {
        const subarray = coordsList[i];
        const firstValue = subarray[0];
        const secondValue = subarray[1];
        console.log("Index: ", i, "coordlist: ", coordsList[i], "sub0: ", subarray[0], "sub1: ", subarray[1]);
        longs.push(firstValue);
        lats.push(secondValue);
    }

    console.log("Longs: ", longs);
    console.log("Lats: ", lats);
    console.log("Max Longitude: ", Math.max(...longs));
    console.log("Min Longitude: ", Math.min(...longs));
    console.log("Max Latitude: ", Math.max(...lats));
    console.log("Min Latitude: ", Math.min(...lats));

    // Handle cases where the range between longitudes and latitudes is too small
    if ((Math.max(...longs)) - (Math.min(...longs)) < 0.00005)
        maxLong = 0.00005 + (Math.max(...longs))
        console.log("Range between Longs is too small adding 5 feet");
    }
    else {
        maxLong = (Math.max(...longs));
    }

    if ((Math.max(...lats)) - (Math.min(...lats)) < 0.00005) {
        maxLat = 0.00005 + (Math.max(...lats))
        console.log("Range between Lats is too small adding 5 feet");
    }
    else {
        maxLat = (Math.max(...lats))
    }

    //console.log("Highlighting ", maxLong, maxLat, Math.min(longs), Math.min(lats));
    map.flyTo({center: [maxLong , maxLat], zoom: 19});
    const topLeft = [Math.min(...longs), maxLat];
    const topRight = [maxLong, maxLat];
    const bottomRight = [maxLong, Math.min(...lats)];
    const bottomLeft = [Math.min(...longs), Math.min(...lats)];

    // Create a coordinates array with the four corner points and close the polygon by repeating the first point
    const rectangleCoords = [topLeft, topRight, bottomRight, bottomLeft, topLeft];

    // Call highlightMap() with the rectangle coordinates
    highlightMap(rectangleCoords);
    
    //highlightMap([[maxLong, maxLat], [Math.min(...longs), Math.min(...lats)], [maxLong, Math.min(...lats)], [Math.min(...longs), maxLat],[maxLong, maxLat]]);
}

function updateCenter(pos) {
    const crd = pos.coords;
    map.flyTo({center: [crd.longitude , crd.latitude], zoom: 19}); 
    console.log("Center: ", crd.longitude , crd.latitude);
}

async function mainEvent() {
    if (/Android|iPhone/i.test(navigator.userAgent)) {
        console.log("Running on mobile");
    }
    else {
        console.log("Not running on mobile");
        document.getElementById("map").classList.toggle("hide");
        document.getElementById("recbtn").classList.toggle("hide");
        document.getElementById("demo").innerHTML = "This site is meant to be used on mobile devices"
        //Add not running on mobile message
    }

    
    navigator.geolocation.getCurrentPosition(updateCenter);
    console.log("Starting recordID: " , recordId);

}

document.addEventListener('DOMContentLoaded', async () => mainEvent());
