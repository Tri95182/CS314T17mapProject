import React, {Component} from 'react';
import {Button, Collapse, Row, Col, ListGroup, Nav, Navbar, NavbarBrand, NavbarToggler,
        NavItem, NavLink, InputGroup, InputGroupAddon, Input, } from 'reactstrap';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { isJsonResponseValid } from "../../utils/restfulAPI";
import _ from 'lodash';
import {downloadFile} from "./DownloadFile";
import Info from './Info';
import Import from './Import';

import { LOG, PROTOCOL_VERSION } from "../../utils/constants";
import * as tripSchema from "../../../schemas/ResponseTrip";

import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PublishIcon from '@material-ui/icons/Publish';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import LoopIcon from '@material-ui/icons/Loop';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import SendIcon from '@material-ui/icons/Send';


export default class Trip extends Component {

  constructor(props) {
    super(props);

    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.setParentState = this.setParentState.bind(this);

    this.state = {
      tripTitle: "Trip",
      editingTripTitle: false,
      earthRadius: 6371.0,
      tripMenuOpen: false,
      itemMenuOpen: false,
      itemMenuOpenIndex: null,
      itemInfoModalOpen: false,
      itemInfo: null,
      itemImportModalOpen: false,
    }
  }

  render() {
    return (
      <ListGroup>
        {this.renderMenu(this.state.tripTitle, this.state.tripMenuOpen, 
          () => this.tripToggle(this.state.tripMenuOpen, 'tripMenuOpen'), 
          () => this.renderTripActionBtns()
        )}
        <DragDropContext onDragEnd={this.handleDragEnd}>
          {this.renderTripList()}
        </DragDropContext>
        {this.renderInfoModal()}
        {this.renderImportModal()}
      </ListGroup>
    );
  }

  renderMenu(title, trigger, toggle, renderButtons) {
    const header = title == this.state.tripTitle;
    return (
      <Navbar className="trip-item" dark={header} light={!header} color={header ? "primary" : "white"}>
        <Row className="item-row"><Col>
        <NavbarBrand className="break-word">{this.state.editingTripTitle && header ? 
          this.renderTripTitleInput() : 
          <div onClick={() => header ? this.setState({editingTripTitle:true}) : null}>{title}&nbsp;{header ? <EditIcon fontSize="small"/> : ""}</div>}
          {header ? <div>Total Distance:{this.props.tripDistances ? this.totalTripDistance(this.props.tripDistances) : ""}</div> : ""}
          {header ? <div>Distances:{this.props.tripDistances ? this.props.tripDistances.toString() : ""}</div> : "" }
        </NavbarBrand>
        </Col><Col className="item-col" xs="1">
        <NavbarToggler onClick={() => toggle()}>
          {trigger ? <MenuOpenIcon/> : <MenuIcon/>}
        </NavbarToggler>
        </Col></Row>
        <Collapse isOpen={trigger} navbar>
          {renderButtons()}
        </Collapse>
      </Navbar>
    );
  }

  renderTripTitleInput() {
    return (
      <InputGroup>
        <Input
          value={this.state.tripTitle}
          onChange={(input) => {
            this.setState({tripTitle: input.target.value});
          }}
        />
        <InputGroupAddon addonType="append">
          <Button onClick={() => {
            if(this.state.tripTitle.length == 0) {
              this.setState({tripTitle:"Trip"});
            }
            this.setState({editingTripTitle:false})
          }}>
            <DoneIcon fontSize="small"/>
          </Button>
        </InputGroupAddon>
      </InputGroup>
    );
  }

  tripToggle(state, name) {
    const toggle = !state;
    this.setState({[name]: toggle});
  }

  renderTripActionBtns() {
    return (
      <Nav navbar>
        <Row>
          <Col>
            {this.createTripButton(PlayArrowIcon, "Calculate", () => this.handleCalculateTrip())}
            {this.createTripButton(ArrowForwardIcon, "Next", () => this.handleNextLocation())}
          </Col>
          <Col>
            {this.createTripButton(GetAppIcon, "Save", () => this.handleSaveTrip())}
            {this.createTripButton(PublishIcon, "Load", () => this.handleLoadTrip())}
          </Col>
          <Col>
            {this.createTripButton(DeleteIcon, "Clear", () => this.handleClearTrip())}
            {this.createTripButton(LoopIcon, "Reverse", () => this.handleReverseTrip())}
          </Col>
        </Row>
      </Nav>
    );
  }

  createTripButton(Icon, text, onClick) {
    return (
      <NavItem onClick={onClick}>
        <NavLink>
          <Row xs="2">
            <Col xs="auto"><Icon/></Col>
            <Col xs="auto">{text}</Col>
          </Row>
        </NavLink>
      </NavItem>
    );
  }

  renderTripList() {
    return (
      <Droppable droppableId="droppable">
        {(provided) => (
          <div 
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {this.props.placesDistance.map((place, index) => this.renderTripItem(place, index))}
            {provided.placeholder}
          </div>   
        )}
      </Droppable>
    );
  }

  renderTripItem(place, index) {
    return (
      <Draggable key={place.name} draggableId={place.name+place.lat+place.lng} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {this.renderMenu(
              place.name + " - Distance to next: " + this.props.tripDistances[index] + " "+ this.props.units,
              this.state.itemMenuOpen && this.state.itemMenuOpenIndex == index, 
              () => this.tripItemToggle(index), 
              () => this.renderTripItemBtns(place)
            )}
          </div>
        )}
      </Draggable>
    );
  }

  renderInfoModal() {
    return (
      <Info
        infoModalOpen={this.state.itemInfoModalOpen}
        info={this.state.itemInfo}
        toggle={() => this.tripToggle(this.state.itemInfoModalOpen, 'itemInfoModalOpen')}
        setParentState={this.props.setParentState}
        placesDistance={this.props.placesDistance}
      />
    );
  }

  tripItemToggle(index) {
    let toggle = !this.state.itemMenuOpen;
    if(this.state.itemMenuOpenIndex != index && this.state.itemMenuOpen) {
      toggle = this.state.itemMenuOpen;
    }
    this.setState({itemMenuOpen: toggle, itemMenuOpenIndex: index});
  }

  renderTripItemBtns(place) {
    return (

      <Nav navbar>
        {this.createTripButton(InfoIcon, "Info", () => this.handleGetInfo(place))}
        {this.createTripButton(SendIcon, "Set as Start", () => this.handleNewStartLocation(place))}
        {this.createTripButton(DeleteIcon, "Remove", () => this.handleRemoveItem(place))}
      </Nav>
    );
  }

  handleGetInfo(place) {
    this.setState({itemInfo: place, itemInfoModalOpen: true})
  }

  handleNewStartLocation(place){
    const index = this.getPlacesDistanceIndex(place);
    for(let i = 0; i < index; i++) {
      this.handleNextLocation();
    }
    this.setState({itemMenuOpen:false})
  }

  handleRemoveItem(place) {
    const index = this.getPlacesDistanceIndex(place);
    if(index != -1) {
      let temp = _.cloneDeep(this.props.placesDistance);
      temp.splice(index, 1);
      this.props.setParentState({placesDistance: temp});
      this.resetItemIndex();
    }
  }

  getPlacesDistanceIndex(place) {
    return this.props.placesDistance.findIndex(entry => _.isEqual(entry, place));
  }

  handleDragEnd(result) {
    if(result.destination) {
      const newList = this.reorderItems(this.props.placesDistance, result.source.index, result.destination.index);
      this.props.setParentState({placesDistance: newList});
    }
  }

  reorderItems(list, srcIndex, destIndex) {
    const newList = Array.from(list);
    const [moved] = newList.splice(srcIndex, 1);
    newList.splice(destIndex, 0, moved);
    this.resetItemIndex();
    return newList;
  }

  handleCalculateTrip() {
    if(this.props.placesDistance.length > 0) {
      this.props.sendRequest(this.createTripJson())
      .then(response => this.processTripResponse(response));
    }
  }

  createTripJson(){
    let placesLatLngString = _.cloneDeep(this.props.placesDistance);
    placesLatLngString.map((place) => {
      place.latitude = place.lat.toString();
      delete place.lat;
      place.longitude = place.lng.toString();
      delete place.lng;

      return place;
    });
    return {requestType: "trip", requestVersion: PROTOCOL_VERSION,
      places: placesLatLngString,
      options: {
        title: this.state.tripTitle, 
        earthRadius: this.state.earthRadius.toString(),
        response: this.props.optTrip ? "1.0" : "0.0",
        units: this.props.units ? this.props.units.toLowerCase() : "kilometers"
      }
    };
  }

  processTripResponse(tripResponse) {
    if(!isJsonResponseValid(tripResponse, tripSchema)) {
      const message = "Trip Response Not Valid. Check The Server.";
      LOG.error(message);
      this.props.setParentState({tripDistances: []});
      this.props.createSnackBar(message);
    } else {
      this.props.setParentState({tripDistances: tripResponse.distances});
    }
  }

  handleSaveTrip() {
    downloadFile(JSON.stringify(this.createTripJson()),'file.json','application/json');
  }

  handleLoadTrip() {
    this.setState({itemImportModalOpen: true})
  }

  handleReverseTrip() {
    this.handleNextLocation();
    const revPlaces = this.props.placesDistance.reverse();
    this.props.setParentState({placesDistance: revPlaces});
  }
  
  handleNextLocation() {
    let nextPlaces = this.props.placesDistance;
    nextPlaces.push(nextPlaces.shift());
    this.props.setParentState({placesDistance: nextPlaces});
  }

  setParentState(object) {
    this.setState(object)
  }

  renderImportModal() {
    return (
      <Import
        importModalOpen={this.state.itemImportModalOpen}
        toggle={() => this.tripToggle(this.state.itemImportModalOpen, 'itemImportModalOpen')}
        setParentState={this.setParentState}
        setGrandparentState={this.props.setParentState}
      />
    );
  }

  handleClearTrip() {
    this.props.setParentState({placesDistance: [], tripDistances: []});
    this.resetItemIndex();
  }

  resetItemIndex() {
    this.setState({itemMenuOpenIndex: null});
  }

   totalTripDistance(distanceArray) {
     var total = 0;
     for(var index = 0; index < distanceArray.length; index++) {
       total += distanceArray[index];
     }
    return total;
  }
}