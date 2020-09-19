import React, {Component} from 'react';
import {Col, Container, Row, Button} from 'reactstrap';

import {Map, Marker, Popup, TileLayer} from 'react-leaflet';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import userIcon from '../../static/images/user-marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import 'leaflet/dist/leaflet.css';

const MAP_BOUNDS = [[-90, -180], [90, 180]];
const MAP_CENTER_DEFAULT = [40.5734, -105.0865];
const MARKER_ICON = L.icon({ iconUrl: markerIcon, shadowUrl: iconShadow, iconAnchor: [12, 40] });
const USER_ICON = L.icon({ iconUrl: userIcon, shadowUrl: iconShadow, iconAnchor: [12, 40] });
const MAP_LAYER_ATTRIBUTION = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";
const MAP_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const MAP_MIN_ZOOM = 1;
const MAP_MAX_ZOOM = 19;

export default class Atlas extends Component {

  constructor(props) {
    super(props);

    this.setMarker = this.setMarker.bind(this);
    this.handleReturnCurrentLocation = this.handleReturnCurrentLocation.bind(this);

    this.mapRef = React.createRef();

    this.state = {
      markerPosition: null,
      userPosition: null,
    };
  }

  render() {
    return (
        <div>
          <Container>
            <Row>
              <Col sm={12} md={{size: 10, offset: 1}}>
                {this.renderLeafletMap()}
                <Button 
                  onClick={this.handleReturnCurrentLocation} 
                  disabled={!this.state.userPosition}>
                    Return to Current Location
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
    );
  }

  renderLeafletMap() {
    return (
        <Map
            className={'mapStyle'}
            ref={this.mapRef}
            boxZoom={false}
            useFlyTo={true}
            zoom={15}
            minZoom={MAP_MIN_ZOOM}
            maxZoom={MAP_MAX_ZOOM}
            maxBounds={MAP_BOUNDS}
            center={this.state.userPosition || MAP_CENTER_DEFAULT}
            onClick={this.setMarker}
        >
          <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION}/>
          {this.getUserPosition()}
          {this.getMarker()}
        </Map>
    );
  }

  setMarker(mapClickInfo) {
    this.setState({markerPosition: mapClickInfo.latlng});
  }

  getUserPosition() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({userPosition: {lat: position.coords.latitude, lng: position.coords.longitude}});
      })

      if(this.state.userPosition) {
        return this.createMarker(this.state.userPosition, USER_ICON, 'Current Location');
      }
    }
  }

  getMarker() {
    if (this.state.markerPosition) {
      return this.createMarker(this.state.markerPosition, MARKER_ICON);
    }
  }

  createMarker(position, icon, title="") {
    const initMarker = ref => {
      if (ref) {
        ref.leafletElement.openPopup();
      }
    };

    return (
      <Marker ref={initMarker} position={position} icon={icon}>
        <Popup offset={[0, -18]} className="font-weight-bold">{title}{title ? <br/> : ""}{this.getStringMarkerPosition(position)}</Popup>
      </Marker>
  );
  }

  getStringMarkerPosition(position) {
    return position.lat.toFixed(2) + ', ' + position.lng.toFixed(2);
  }

  handleReturnCurrentLocation() {
    if(this.mapRef.current && this.state.userPosition) {
      var map = this.mapRef.current.leafletElement;
      map.flyTo(this.state.userPosition, 15)
    }
  }
}
