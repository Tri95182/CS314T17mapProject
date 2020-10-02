import React, {Component} from 'react';
import {Col, Container, Row, Button, InputGroup, Input, InputGroupAddon, InputGroupText, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import { isJsonResponseValid, sendServerRequest } from "../../utils/restfulAPI";
import * as findSchema from "../../../schemas/ResponseFind";
import * as distanceSchema from "../../../schemas/ResponseDistance";

import {Map, Marker, Popup, TileLayer, ZoomControl} from 'react-leaflet';
import Control from 'react-leaflet-control';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import userIcon from '../../static/images/user-marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import LocationIcon from '@material-ui/icons/GpsFixed';
import SearchIcon from '@material-ui/icons/Search';

import 'leaflet/dist/leaflet.css';

const MAP_BOUNDS = [[-90, -180], [90, 180]];
const MAP_CENTER_DEFAULT = [40.5734, -105.0865];
const MARKER_ICON = L.icon({ iconUrl: markerIcon, shadowUrl: iconShadow, iconAnchor: [12, 40] });
const USER_ICON = L.icon({ iconUrl: userIcon, shadowUrl: iconShadow, iconAnchor: [12, 40] });
const MAP_LAYER_ATTRIBUTION = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";
const MAP_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const MAP_MIN_ZOOM = 1;
const MAP_MAX_ZOOM = 19;
const PLACES_LIMIT = 25;

export default class Atlas extends Component {

  constructor(props) {
    super(props);

    this.setMarker = this.setMarker.bind(this);
    this.handleReturnCurrentLocation = this.handleReturnCurrentLocation.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleDistance = this.handleDistance.bind(this);

    this.mapRef = React.createRef();

    this.state = {
      markerPosition: null,
      userPosition: null,
      searchModalOpen: false,
      searchInput: '',
      places: [],
      placesFound: 0,
      placesSelected: [],
      placesDistance: [],
      distanceBetween: 0
    };
  }

  componentDidMount() {
    this.handleSearch({target:{value:""}});
  }

  render() {
    return (
        <div>
          <Container>
            <Row>
              <Col sm={12} md={{size: 10, offset: 1}}>
                {this.renderLeafletMap()}
                {this.renderSearchModal()}
                {this.renderLocationsList()}

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
            zoomControl={false}
            minZoom={MAP_MIN_ZOOM}
            maxZoom={MAP_MAX_ZOOM}
            maxBounds={MAP_BOUNDS}
            center={this.state.userPosition || MAP_CENTER_DEFAULT}
            onClick={this.setMarker}
        >
          <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION}/>
          {this.renderSearchButton()}
          <ZoomControl position={'topleft'}/>
          {this.renderReturnLocationButton()}
          {this.getUserPosition()}
          {this.state.placesSelected.map((place) => this.createMarker({lat:Number(place.latitude), lng:Number(place.longitude)}, MARKER_ICON, place.name))}
          {this.getMarker()}
        </Map>
    );
  }

  renderReturnLocationButton() {
    return (
      <Control position={'topleft'}>
        <Button 
          className={'map-control'}
          size="sm"
          onClick={this.handleReturnCurrentLocation}
          disabled={!this.state.userPosition}>
            <LocationIcon fontSize="small"/>
        </Button>
      </Control>
    );
  }

  renderSearchButton() {
    return (
      <Control position={'topleft'}>
        <Button 
          className={'map-control'}
          size="sm"
          onClick={() => this.setState({searchModalOpen: true})}
        >
          <SearchIcon fontSize="small"/>
        </Button>
      </Control>
    )
  }

  renderSearchModal() {
    const toggle = () => {
      let isOpen = !this.state.searchModalOpen;
      this.setState({searchModalOpen: isOpen});
    };
    return (
      <Modal isOpen={this.state.searchModalOpen} toggle={toggle} scrollable={true}>
        <ModalHeader toggle={toggle}>Search</ModalHeader>
        {this.renderSearchModalBody()}
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    );
  }

  renderSearchModalBody() {
    return (
      <ModalBody>
        <InputGroup id="SearchBar">
          <InputGroupAddon addonType='prepend'>
            <InputGroupText>
              <SearchIcon/>
            </InputGroupText>
          </InputGroupAddon>
          <Input
            type='search'
            placeholder='Search by name'
            onChange={this.handleSearch}
            value={this.state.searchInput}
          />
        </InputGroup>
        {this.renderSearchResults()}
      </ModalBody>
    );
  }

  renderSearchResults() {
    return (
      <ListGroup>
        <ListGroupItem active>Results: {this.state.placesFound}</ListGroupItem>
        {this.state.places.map((place) => 
          <ListGroupItem tag="button" onClick={() => this.addSelectedPlace(place)}>
            <ListGroupItemHeading>{place.name}</ListGroupItemHeading>
            <ListGroupItemText>Lat: {Number(place.latitude).toFixed(2)} Lng: {Number(place.longitude).toFixed(2)}</ListGroupItemText>
          </ListGroupItem>
        )}
      </ListGroup>
    );
  }

  renderLocationsList() {
    return (
      <ListGroup>
        <ListGroupItem active>Select Locations </ListGroupItem>
        <ListGroupItem tag="button" onClick={this.handleDistance}>Distance:{this.state.distanceBetween} Miles</ListGroupItem>
        {this.state.userPosition != null ?
          this.renderLocationItem("Current Location", this.state.userPosition.lat.toFixed(2), this.state.userPosition.lng.toFixed(2)) : ""
        }
        {this.state.markerPosition != null ?
          this.renderLocationItem("Marker Location", this.state.markerPosition.lat.toFixed(2), this.state.markerPosition.lng.toFixed(2)) : ""
        }
        {this.state.placesSelected.map((place) =>
          this.renderLocationItem(place.name, Number(place.latitude).toFixed(2), Number(place.longitude).toFixed(2))
        )}
      </ListGroup>
    );
  }

  renderLocationItem(name, lat, lng) {
    return (
      <ListGroupItem 
        tag="button" 
        color={this.state.placesDistance.filter(val => val.name == name).length != 0 ? "primary":"white"}
        onClick={() => this.handleDistanceSelect(name, lat, lng)} 
      >
        <ListGroupItemHeading>{name}</ListGroupItemHeading>
        <ListGroupItemText>Lat: {lat} Lng: {lng}</ListGroupItemText>
      </ListGroupItem>
    );
  }

  handleDistanceSelect(name, lat, lng) {
    let newSelect = {name, lat, lng};
    if(this.state.placesDistance.filter(val => val.name == name).length == 0) {
      
      if(this.state.placesDistance.length >= 2) {
        let temp = this.state.placesDistance.splice(0,1);
        this.setState({placesDistance: temp});
      }

      this.setState({placesDistance: [...this.state.placesDistance, newSelect]});
    } else {
      let temp = this.state.placesDistance.filter(val => val.name != name);
      this.setState({placesDistance: temp});
    }
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

  addSelectedPlace(place) {
    if(!this.state.placesSelected.includes(place)) {
      this.setState({placesSelected: [...this.state.placesSelected, place]});
    }
  }

  handleSearch(input) {
    this.setState({searchInput: input.target.value});
    let cleanInput = this.sanitizeInput(input.target.value);

    let findRequest = {requestType: "find", requestVersion: 2, limit: PLACES_LIMIT};
    if(cleanInput != "") findRequest.match = cleanInput;

		sendServerRequest(findRequest)
    .then(find => {
      if (find) { this.processFindResponse(find.data); }
      else { this.props.createSnackBar("The Request To The Server Failed. Pl+ease Try Again Later."); }
    });

  }
  handleDistance(){
    if(this.state.placesDistance.length == 2){
    let distanceRequest = {requestType: "distance", requestVersion: 2,
      place1: {latitude: this.state.placesDistance[0].lat, longitude: this.state.placesDistance[0].lng},
      place2: {latitude: this.state.placesDistance[1].lat, longitude: this.state.placesDistance[1].lng},
      earthRadius: 6371.0}
    sendServerRequest(distanceRequest)
        .then(distance => {
          if (distance) { this.processDistanceResponse(distance.data); }
          else { this.props.createSnackBar("The Request To The Server Failed. Please Try Again Later."); }
        });
    }

  }

  processDistanceResponse(DistanceResponse) {
    if(!isJsonResponseValid(DistanceResponse, distanceSchema)) {
      this.processServerDistanceError("Distance Response Not Valid. Check The Server.");
    } else {
      this.processServerDistanceSuccess(DistanceResponse);
    }
  }
  processServerDistanceSuccess(Distance) {
    this.setState({distanceBetween: Distance.distance});
  }

  sanitizeInput(input) {
    return input.replace(/[^A-Za-z0-9]/g, "_");
  }

  processFindResponse(findResponse) {
		if(!isJsonResponseValid(findResponse, findSchema)) {
			this.processServerFindError("Find Response Not Valid. Check The Server.");
		} else {
			this.processServerFindSuccess(findResponse);
		}
  }

  processServerFindSuccess(find) {
		this.setState({places: find.places, placesFound: find.found});
	}

	processServerFindError(message) {
		LOG.error(message);
		this.setState({places: [], found: 0});
		this.props.createSnackBar(message);
	}
  processServerDistanceError(message) {
    LOG.error(message);
    this.setState({distanceBetween: 0});
    this.props.createSnackBar(message);
  }
}
