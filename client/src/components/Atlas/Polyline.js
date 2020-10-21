import React, {Component} from 'react';
export default class Polyline extends Component {
    renderPolyline(lat1,lng1,lat2,lng2) {
        var latlngs = [
            [45.51, -122.68],
            [37.77, -122.43],
            [34.04, -118.2]
        ];
        var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);
        // zoom the map to the polyline
        map.fitBounds(polyline.getBounds());
    }
}