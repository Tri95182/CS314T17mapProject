import React, {Component} from 'react';
import {Col, Container, Row, Button} from 'reactstrap';
import { sendServerRequest } from "../../utils/restfulAPI";
import _ from 'lodash';

import Search from "./Search";
import Trip from "./Trip";
import LocationsList from "./LocationsList";

import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import Control from 'react-leaflet-control';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import userIcon from '../../static/images/user-marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import LocationIcon from '@material-ui/icons/GpsFixed';
import SearchIcon from '@material-ui/icons/Search';
import ViewListIcon from '@material-ui/icons/ViewList';

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
    this.setParentState = this.setParentState.bind(this);

    this.mapRef = React.createRef();

    this.state = {
      markerPosition: null,
      userPosition: null,
      searchModalOpen: false,
      listModalOpen: false,
      places: [],
      placesFound: 0,
      placesSelected: [],
      placesDistance: [],
      distanceBetween: 0,
      tripDistances: []
    };
  }

  render() {
    return (
        <div>
          <Container>
            <Row>
              <Col sm={12} md={{size: 10, offset: 1}}>
                {this.renderLeafletMap()}
                {this.renderSearchComponent()}
                {this.renderTrip()}
                {this.renderLocationsListComponent()}
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
          {this.renderControlButton(() => this.setState({searchModalOpen: true}), SearchIcon)}
          {this.renderControlButton(() => this.flyToLocation(this.state.userPosition), LocationIcon, !this.state.userPosition)}
          {this.renderControlButton(() => this.setState({listModalOpen: true}), ViewListIcon)}
          {this.getUserPosition()}
          {this.state.placesSelected.map((place) => this.createMarker({lat:Number(place.latitude), lng:Number(place.longitude)}, MARKER_ICON, place.name))}
          {this.getMarker()}
        </Map>
    );
  }

  renderControlButton(onClick, Icon, disabled=false) {
    return (
      <Control position="topleft">
        <Button className="map-control" size="sm" onClick={onClick} disabled={disabled}>
            <Icon fontSize="small"/>
        </Button>
      </Control>      
    );
  }

  renderSearchComponent() {
    return (
      <Search 
        searchModalOpen={this.state.searchModalOpen} 
        places={this.state.places} 
        placesFound={this.state.placesFound} 
        placesSelected={this.state.placesSelected}
        setParentState={this.setParentState}
        createSnackBar={this.props.createSnackBar}
        sendRequest={this.sendRequest}
      />
    );
  }

  renderLocationsListComponent() {
    return (
      <LocationsList
        listModalOpen={this.state.listModalOpen}
        userPosition={this.state.userPosition}
        markerPosition={this.state.markerPosition}
        placesSelected={this.state.placesSelected}
        placesDistance={this.state.placesDistance}
        distanceBetween={this.state.distanceBetween}
        flyToLocation={this.flyToLocation}
        setParentState={this.setParentState}
        createSnackBar={this.props.createSnackBar}
        mapRef={this.mapRef}
        sendRequest={this.sendRequest}
      />
    );
  }

  renderTrip() {
    return (
      <Trip
        placesDistance={this.state.placesDistance}
        tripDistances={this.state.tripDistances}
        setParentState={this.setParentState}
        sendRequest={this.sendRequest}
        createSnackBar={this.props.createSnackBar}
      />
    );
  }

  setParentState(stateObj) {
    this.setState(stateObj);
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
      <Marker key={title} ref={initMarker} position={position} icon={icon}>
        <Popup offset={[0, -18]} className="font-weight-bold">{title}{title ? <br/> : ""}{this.getStringMarkerPosition(position)}</Popup>
      </Marker>
    );
  }

  getStringMarkerPosition(position) {
    return position.lat.toFixed(2) + ', ' + position.lng.toFixed(2);
  }

  async flyToLocation(coords, zoom=15) {
    if(this.mapRef.current) {
      var map = this.mapRef.current.leafletElement;
      
      await map.eachLayer((layer) => {
        let popup = layer.getPopup();
        if(popup && _.isEqual(JSON.stringify(popup.getLatLng()), JSON.stringify(coords))) {
          layer.openPopup()
        }
      })

      await map.flyTo(coords, zoom)
    }
  }

  async sendRequest(request) {
    let res = null;

    await sendServerRequest(request)
    .then(response => {
      if(response) { res = response.data; }
      else {
        this.props.createSnackBar("The Request To The Server Failed. Please Try Again Later.");
      }
    })

    return res;
  }

}
