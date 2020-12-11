import React, {Component} from 'react';
import {Col, Container, Row, Button} from 'reactstrap';
import { sendServerRequest } from "../../utils/restfulAPI";
import _ from 'lodash';

import Search from "./Search";
import Trip from "./Trip";
import LocationsList from "./LocationsList";
import Info from "./Info";
import Settings from "./Settings"

import {Map, Marker, Popup, TileLayer, Polyline} from 'react-leaflet';
import Control from 'react-leaflet-control';
import 'leaflet-control-geocoder';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import userIcon from '../../static/images/user-marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import LocationIcon from '@material-ui/icons/GpsFixed';
import SearchIcon from '@material-ui/icons/Search';
import ListIcon from '@material-ui/icons/List';
import SettingsIcon from '@material-ui/icons/Settings';

import 'leaflet/dist/leaflet.css';

const MAP_BOUNDS = [[-90, -180], [90, 180]];
const MAP_CENTER_DEFAULT = [40.5734, -105.0865];
const MARKER_ICON = L.icon({ iconUrl: markerIcon, shadowUrl: iconShadow, iconAnchor: [12, 40] });
const USER_ICON = L.icon({ iconUrl: userIcon, shadowUrl: iconShadow, iconAnchor: [12, 40] });
const MAP_LAYER_ATTRIBUTION = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";
const MAP_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const MAP_MIN_ZOOM = 1;
const MAP_MAX_ZOOM = 19;
const UNICODE_INFO_SYMBOL = "\u24D8";

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
      tripDistances: [],
      infoModalOpen: false,
      info: null,
      settingsModalOpen: false,
      tripTitle: "Trip",
      settings: {
        earthRadius: 6371.0,
        units: 'Kilometers',
        optTrip: false,
        showMarkers: true,
        showLines: true,
        calcTrip: true
      }
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
                {this.renderInfo()}
                {this.renderSettings()}
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
          {this.renderControlButton(() => this.setState({searchModalOpen: true}), SearchIcon, "topleft")}
          {this.renderControlButton(() => this.flyToLocation(this.state.userPosition), LocationIcon, "topleft", !this.state.userPosition)}
          {this.renderControlButton(() => this.setState({listModalOpen: true}), ListIcon, "topleft")}
          {this.renderControlButton(() => this.setState({settingsModalOpen: true}), SettingsIcon, "topright")}
          {this.state.settings.showMarkers ? <div>
            {this.getUserPosition()}
            {this.state.placesSelected.map((place) => {
              let placeLatLng = _.cloneDeep(place);
              placeLatLng.lat = parseFloat(place.latitude);
              delete placeLatLng.latitude;
              placeLatLng.lng = parseFloat(place.longitude);
              delete placeLatLng.longitude
              return this.createMarker(placeLatLng, MARKER_ICON, place.name);
            })}
            {this.getMarker()}
          </div> : ""}
          {this.state.settings.showLines ? this.renderTripPolylines() : ""}
        </Map>
    );
  }

  renderControlButton(onClick, Icon, position, disabled=false) {
    return (
        <Control position={position}>
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
            filters={(this.props.serverSettings &&
                this.props.serverSettings.serverConfig &&
                this.props.serverSettings.serverConfig.filters
              ) ? this.props.serverSettings.serverConfig.filters : {}
            }
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
            earthRadius={this.state.settings.earthRadius}
            tripTitle={this.state.tripTitle}
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
            optTrip={this.state.settings.optTrip}
            units={this.state.settings.units}
            calcTrip ={this.state.settings.calcTrip}
            earthRadius={this.state.settings.earthRadius}
            tripTitle={this.state.tripTitle}
            settings={this.state.settings}
        />
    );
  }
  renderInfo() {
    return (
        <Info
            infoModalOpen={this.state.infoModalOpen}
            info={this.state.info}
            toggle={() => {const temp = !this.state.infoModalOpen; this.setState({infoModalOpen: temp});}}
            setParentState={this.setParentState}
            placesDistance={this.state.placesDistance}
        />
    );
  }

  renderSettings() {
    return (
      <Settings
        settingsModalOpen={this.state.settingsModalOpen}
        settings={this.state.settings}
        toggle={() => {const temp = !this.state.settingsModalOpen; this.setState({settingsModalOpen: temp});}}
        setParentState={this.setParentState}
      />
    );
  }

  setParentState(stateObj) {
    this.setState(stateObj);
  }

  async setMarker(mapClickInfo) {
    let mapLatLng = {name:"Marker Location", lat:mapClickInfo.latlng.lat, lng:mapClickInfo.latlng.lng};
    const geocodeInfo = await this.reverseGeocode(mapClickInfo.latlng);
    if(geocodeInfo) mapLatLng = {...mapLatLng, ...geocodeInfo};
    if(this.state.markerPosition) {
      let tempMarker = this.state.markerPosition;
      this.changeInArray(this.state.placesSelected, tempMarker, mapLatLng, "placesSelected");
      this.changeInArray(this.state.placesDistance, tempMarker, mapLatLng, "placesDistance");
    }
    this.setState({markerPosition: mapLatLng});
  }

  changeInArray(array, item, newItem, name) {
    const index = array.findIndex((entry) => {
      if(entry.notes) {
        item.notes = entry.notes;
      }
      return entry.name==item.name && entry.lat==item.lat && entry.lng==item.lng;
    });
    if(index != -1) {
      let tempArray = array;
      tempArray[index] = newItem;
      this.setState({[name]: tempArray});
    }
  }

  getUserPosition() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        let userInfo = null;
        if(!this.state.userPosition) {
          const geocodeInfo = await this.reverseGeocode({lat:position.coords.latitude, lng:position.coords.longitude});
          userInfo = {...geocodeInfo}
        } else {
          userInfo = {...this.state.userPosition};
        }
        userInfo = {...userInfo, name: 'Current Location', lat: position.coords.latitude, lng: position.coords.longitude};
        this.setState({userPosition: userInfo});
      })

      if(this.state.userPosition) {
        return this.createMarker(this.state.userPosition, USER_ICON, 'Current Location');
      }
    }
  }

  getMarker() {
    if (this.state.markerPosition) {
      return this.createMarker(this.state.markerPosition, MARKER_ICON, this.state.markerPosition.name);
    }
  }

  createMarker(position, icon, title="") {
    return (
        <Marker key={title} position={{lat:position.lat, lng:position.lng}} icon={icon}>
          <Popup offset={[0, -18]} className="font-weight-bold"><a onClick={() => this.setInfo(position)}>
            {UNICODE_INFO_SYMBOL}&nbsp;{title}{title ? <br/> : ""}{this.getStringMarkerPosition(position)}
          </a></Popup>
        </Marker>
    );
  }

  setInfo(place) {
    this.setState({info: place, infoModalOpen: true})
  }


  getStringMarkerPosition(position) {
    return position.lat.toFixed(2) + ', ' + position.lng.toFixed(2);
  }

  async flyToLocation(coords, zoom=15) {
    if(this.mapRef.current) {
      let map = this.mapRef.current.leafletElement;
      await map.eachLayer((layer) => {
        let popup = layer.getPopup();
        if(popup && _.isEqual(JSON.stringify(popup.getLatLng()), JSON.stringify({lat:coords.lat,lng:coords.lng}))) {
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

  renderTripPolylines() {
    return (
        <div>
          {this.state.placesDistance.map((place, index) => {
            let nextLatLng;
            let color = 'blue'
            if(index != this.state.placesDistance.length-1) {
              nextLatLng = this.state.placesDistance[index+1]
              if (index == 0) {
                color = 'red';
              }
            } else {
              nextLatLng = this.state.placesDistance[0];
            }
            return this.renderPolyline([nextLatLng.lat, nextLatLng.lng], [place.lat, place.lng], color);
          })}
        </div>
    );
  }

  renderPolyline(from, to, color) {
    return(
        <Polyline positions={[from, to]} color={color}/>
    );
  }

  reverseGeocode(latlng) {
    if(this.mapRef.current) {
      const map = this.mapRef.current.leafletElement;
      const geocoder = L.Control.Geocoder.nominatim();
      return new Promise(resolve => {
        geocoder.reverse(latlng, map.options.crs.scale(map.getZoom()), results => {
          var r = results[0];
          if (r) {
            resolve({name: r.name, ...r.properties.address});
          } else {
            resolve(null);
          }
        })
      })
    }
  }
}
