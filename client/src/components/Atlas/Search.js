import React, {Component} from 'react';
import {Button, InputGroup, Input, InputGroupAddon, InputGroupText, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Modal, ModalBody, ModalFooter, ModalHeader, Spinner} from 'reactstrap';
import { isJsonResponseValid } from "../../utils/restfulAPI";
import _ from 'lodash';

import { LOG } from "../../utils/constants";
import * as findSchema from "../../../schemas/ResponseFind";

import SearchIcon from '@material-ui/icons/Search';

const PLACES_LIMIT = 25;

export default class Search extends Component {

  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);

    this.state = {
      searchInput: '',
      isLoading: false
    };
  }

  componentDidMount() {
    this.handleSearch({target:{value:""}});
  }

  render() {
    return (
      <div>
          {this.renderSearchModal()}
      </div>
    );
  }

  renderSearchModal() {
    const toggle = () => {
      let isOpen = !this.props.searchModalOpen;
      this.props.setParentState({searchModalOpen: isOpen});
    };
    return (
      <Modal isOpen={this.props.searchModalOpen} toggle={toggle} scrollable={true}>
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
      <ListGroup key="searchres">
        <ListGroupItem key="head" active>Results: {this.props.placesFound}</ListGroupItem>
        {!this.state.isLoading ? this.props.places && this.props.places.map((place) => 
          <ListGroupItem 
            key={place.name+place.latitude+place.longitude} 
            tag="button" 
            onClick={() => this.addSelectedPlace(place)}
            color={this.props.placesSelected.filter(val => _.isEqual(val, place)).length != 0 ? "primary":"white"}
          >
            <ListGroupItemHeading>{place.name}</ListGroupItemHeading>
            <ListGroupItemText>Lat: {Number(place.latitude).toFixed(2)} Lng: {Number(place.longitude).toFixed(2)}</ListGroupItemText>
          </ListGroupItem>
        ) : <ListGroupItem tag="button"><Spinner color="primary"/></ListGroupItem>}
      </ListGroup>
    );
  }

  addSelectedPlace(place) {
    if(!this.props.placesSelected.includes(place)) {
      this.props.setParentState({placesSelected: [...this.props.placesSelected, place]});
    } else {
      let index = this.props.placesSelected.findIndex((item) => _.isEqual(item, place))
      let newSelected = this.props.placesSelected;
      newSelected.splice(index, 1);
      this.props.setParentState({placesSelected: newSelected});
    }
  }

  handleSearch(input) {
    this.setState({searchInput: input.target.value, isLoading: true})

    let cleanInput = this.sanitizeInput(input.target.value);

    let findRequest = {requestType: "find", requestVersion: 2, limit: PLACES_LIMIT};
    if(cleanInput != "") findRequest.match = cleanInput;

    this.props.sendRequest(findRequest)
    .then(response => this.processFindResponse(response));
  }

  sanitizeInput(input) {
    return input.replace(/[^A-Za-z0-9]/g, "_");
  }

  processFindResponse(findResponse) {
    this.setState({isLoading: false});

    if(!isJsonResponseValid(findResponse, findSchema)) {
      let message = "Find Response Not Valid. Check The Server.";
      LOG.error(message);
      this.props.setParentState({places: [], found: 0});
      this.props.createSnackBar(message);
    } else {
      this.props.setParentState({places: findResponse.places, placesFound: findResponse.found});
    }
  }
    
}