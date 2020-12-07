import React, {Component} from 'react';
import {Collapse, Button, ButtonGroup, InputGroup, Input, InputGroupAddon, InputGroupText, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Modal, ModalBody, ModalFooter, ModalHeader, Spinner, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Badge} from 'reactstrap';
import { isJsonResponseValid } from "../../utils/restfulAPI";
import _ from 'lodash';

import { LOG, PROTOCOL_VERSION } from "../../utils/constants";
import * as findSchema from "../../../schemas/ResponseFind";

import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import ClearIcon from '@material-ui/icons/Clear';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';

const PLACES_LIMIT = 25;

export default class Search extends Component {

  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);

    this.state = {
      searchInput: '',
      isLoading: false,
      filterOpen: false,
      typeFilterOpen: false,
      selectedTypeFilters: [], 
      selectedWhereFilters: [], 
      whereFilterOpen: false,
    };
  }

  componentDidMount() {
    this.handleSearch({target:{value:""}}, false);
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
            <InputGroupText><SearchIcon fontSize="small"/></InputGroupText>
          </InputGroupAddon>
          <Input
            type='search'
            placeholder='Search by name'
            onChange={this.handleSearch}
            value={this.state.searchInput}
          />
          <InputGroupAddon addonType='append'>
            <Button onClick={() => this.filterToggle(this.state.filterOpen, "filterOpen")}><FilterListIcon fontSize="small"/></Button>
          </InputGroupAddon>
        </InputGroup>
        {this.renderSearchFilter()}
        {this.renderSearchResults()}
      </ModalBody>
    );
  }

  filterToggle(state, name) {
    const toggle = !state;
    this.setState({[name]: toggle});
  }

  renderSearchFilter() {
    return (
      <Collapse isOpen={this.state.filterOpen}>
        <ButtonGroup className="filter-btn">
          {this.renderFilterDropDown("Type", this.props.filters.type ? this.props.filters.type : [], this.state.typeFilterOpen, 
          () => this.filterToggle(this.state.typeFilterOpen, "typeFilterOpen"))}
          {this.renderFilterDropDown("Where", this.props.filters.where ? this.props.filters.where : [], this.state.whereFilterOpen, 
          () => this.filterToggle(this.state.whereFilterOpen, "whereFilterOpen"))}
          <Button onClick={async () => {
            await this.handleSearch({target:{value:""}}, false);
          }}>Feeling Lucky<NotListedLocationIcon fontSize="small"/></Button>
          <Button onClick={async () => {
            await this.handleFilterClear();
            await this.handleSearch({target:{value:this.state.searchInput}});
          }}>Clear<ClearIcon fontSize="small"/></Button>
        </ButtonGroup>
      </Collapse>
    );
  }

  renderFilterDropDown(name, options, isOpen, toggle) {
    return (
      <ButtonDropdown className="filter-btn" isOpen={isOpen} toggle={toggle}>
        <DropdownToggle caret>{name}</DropdownToggle>
        <DropdownMenu className="filter-item">
          {options.map((item) => 
            <DropdownItem toggle={false} active={this.isFilterSelected(name, item)} 
            onClick={async () => {
              await this.handleFilterSelect(name, item);
              await this.handleSearch({target:{value: this.state.searchInput}});
            }}>{item}</DropdownItem>
          )}
        </DropdownMenu>
      </ButtonDropdown>
    );
  }

  isFilterSelected(name, item) {
    if(name == "Type") {
      return this.state.selectedTypeFilters.includes(item);
    } else if(name == "Where") {
      return this.state.selectedWhereFilters.includes(item);
    }
  }

  handleFilterSelect(name, item) {
    if(name == "Type") {
      this.toggleFilterSelect(this.state.selectedTypeFilters, item, "selectedTypeFilters");
    } else if(name == "Where") {
      this.toggleFilterSelect(this.state.selectedWhereFilters, item, "selectedWhereFilters");
    }
  }

  toggleFilterSelect(state, item, stateName) {
    if(!state.includes(item)) {
      const temp = [...state, item];
      this.setState({[stateName]: temp});
    } else {
      let index = state.findIndex((i) => _.isEqual(i, item))
      let newFilter = state;
      newFilter.splice(index, 1);
      this.setState({[stateName]: newFilter});
    }
  }

  handleFilterClear() {
    this.setState({selectedTypeFilters: [], selectedWhereFilters: []});
  }

  renderSearchResults() {
    return (
      <ListGroup key="searchres">
        <ListGroupItem key="head" active>
          <Row>Results: {this.props.placesFound}</Row>
          {this.renderFilterBadges()}
        </ListGroupItem>
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

  renderFilterBadges() {
    return (
      <Row>
        {this.state.selectedTypeFilters.map((type) => 
          <Badge>{type}</Badge>
        )}
        {this.state.selectedWhereFilters.map((where) => 
          <Badge>{where}</Badge>
        )}
      </Row>
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

  handleSearch(input, defaultLimit=true) {
    this.setState({searchInput: input.target.value, isLoading: true})

    let cleanInput = this.sanitizeInput(input.target.value);

    let findRequest = {requestType: "find", requestVersion: PROTOCOL_VERSION, narrow: {}};
    if(cleanInput != "") {
      findRequest.match = cleanInput
      if(defaultLimit) findRequest.limit = PLACES_LIMIT;
    };
    if(this.state.selectedTypeFilters.length > 0) {
      findRequest.narrow.type = this.state.selectedTypeFilters;
    }
    if(this.state.selectedWhereFilters.length > 0) {
      findRequest.narrow.where = this.state.selectedWhereFilters;
    }

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