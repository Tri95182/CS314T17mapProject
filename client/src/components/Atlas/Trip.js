import React, {Component} from 'react';
import {Button, Collapse, Row, Col, ListGroup, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Modal, ModalBody, ModalHeader, ModalFooter, InputGroup, InputGroupAddon, Input} from 'reactstrap';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { isJsonResponseValid } from "../../utils/restfulAPI";
import _ from 'lodash';
import {downloadFile} from "./DownloadFile";


import { LOG } from "../../utils/constants";
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

export default class Trip extends Component {

  constructor(props) {
    super(props);

    this.handleDragEnd = this.handleDragEnd.bind(this);

    this.state = {
      tripTitle: "Trip",
      editingTripTitle: false,
      earthRadius: 6371.0,
      tripMenuOpen: false,
      itemMenuOpen: false,
      itemMenuOpenIndex: null,
      itemInfoModalOpen: false,
      itemInfo: null,
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
      </ListGroup>
    );
  }

  renderMenu(title, trigger, toggle, renderButtons) {
    const header = title == this.state.tripTitle;
    return (
        <Navbar className="trip-item" dark={header} light={!header} color={header ? "primary" : "white"}>
          <NavbarBrand >{this.state.editingTripTitle && header ? 
            this.renderTripTitleInput() : 
            <div onClick={() => header ? this.setState({editingTripTitle:true}) : null}>{title}&nbsp;{header ? <EditIcon fontSize="small"/> : ""}</div>}
            {header ? <div>Total Distance:{this.props.tripDistances ? this.totalTripDistance(this.props.tripDistances) : ""}</div> : ""}
            {header ? <div>Distances:{this.props.tripDistances ? this.props.tripDistances.toString() : ""}</div> : "" }
          </NavbarBrand>
          <NavbarToggler onClick={() => toggle()}>
            {trigger ? <MenuOpenIcon/> : <MenuIcon/>}
          </NavbarToggler>
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
        {this.createTripButton(PlayArrowIcon, "Calculate", () => this.handleCalculateTrip())}
        {this.createTripButton(GetAppIcon, "Save", () => this.handleSaveTrip())}
        {this.createTripButton(DeleteIcon, "Clear", () => this.handleClearTrip())}
        {this.createTripButton(PublishIcon, "Load", () => this.handleLoadTrip())}
      </Nav>
    );
  }

  createTripButton(Icon, text, onClick) {
    return (
      <NavItem onClick={onClick}>
        <NavLink>
          <Row xs="2">
            <Col xs="auto"><Icon/></Col>
            <Col>{text}</Col>
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
              place.name, 
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
      <Modal isOpen={this.state.itemInfoModalOpen} 
        toggle={() => this.tripToggle(this.state.itemInfoModalOpen, 'itemInfoModalOpen')}
      >
        <ModalHeader toggle={() => this.tripToggle(this.state.itemInfoModalOpen, 'itemInfoModalOpen')}>Info</ModalHeader>
        <ModalBody>
          {this.state.itemInfo ? Object.keys(this.state.itemInfo).map((key) =>
            <Row key={key}>
              <Col>{key}</Col>
              <Col>{this.state.itemInfo[key]}</Col>
            </Row>
          ) : ""}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.tripToggle(this.state.itemInfoModalOpen, 'itemInfoModalOpen')}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  tripItemToggle(index) {
    const toggle = !this.state.itemMenuOpen;
    this.setState({itemMenuOpen: toggle, itemMenuOpenIndex: index});
  }

  renderTripItemBtns(place) {
    return (
      <Nav navbar>
        {this.createTripButton(InfoIcon, "Info", () => this.handleGetInfo(place))}
        {this.createTripButton(DeleteIcon, "Remove", () => this.handleRemoveItem(place))}
      </Nav>
    );
  }

  handleGetInfo(place) {
    this.setState({itemInfo: place, itemInfoModalOpen: true})
  }

  handleRemoveItem(place) {
    let index = this.props.placesDistance.findIndex(entry => _.isEqual(entry, place));
    if(index != -1) {
      let temp = _.cloneDeep(this.props.placesDistance);
      temp.splice(index, 1);
      this.props.setParentState({placesDistance: temp});
      this.resetItemIndex();
    }
  }

  handleDragEnd(result) {
    if(!result.destination) {
      return;
    }
    const newList = this.reorderItems(this.props.placesDistance, result.source.index, result.destination.index);
    this.props.setParentState({placesDistance: newList});
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
      let tripRequest = this.createTripJson();

      this.props.sendRequest(tripRequest)
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
    return {requestType: "trip", requestVersion: 3,
      places: placesLatLngString,
      options: {title: this.state.tripTitle, earthRadius: this.state.earthRadius.toString()}
    };
  }

  processTripResponse(tripResponse) {
    if(!isJsonResponseValid(tripResponse, tripSchema)) {
      let message = "Trip Response Not Valid. Check The Server.";
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
    // placeholder for loading trip
  }

  handleClearTrip() {
    this.props.setParentState({placesDistance: []});
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