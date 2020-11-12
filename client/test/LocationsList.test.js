import './jestConfig/enzyme.config.js';
import {shallow, mount} from 'enzyme';

import React from 'react';
import Atlas from '../src/components/Atlas/Atlas';
import LocationsList from '../src/components/Atlas/LocationsList';

const startProperties = {
  placesSelectedEmpty: [],
  placesSelected: [{name:"place1", lat:"10", lng:"20"}],
  placesSelectedMultiple: [
    {name:"firstplace", lat:"10", lng:"20"},
    {name:"secondplace", lat:"20", lng:"30"},
    {name:"thirdplace", lat:"30", lng:"40"},
  ],
  placesDistance: [],
  userPosition: {lat: 40, lng: -100},
  markerPosition: {lat: 0, lng: 0},
  listModalOpen: true
}

function testRenderLocationsList() {

  const loclist = mount(<LocationsList 
    placesSelected={startProperties.placesSelectedEmpty} 
    listModalOpen={startProperties.listModalOpen}
  />);

  expect(loclist.find("ListGroup").length).toEqual(1);
  expect(loclist.find("ListGroupItem").length).toEqual(2);
}

test("Test the render of locations list", testRenderLocationsList);


function testRenderLocationItems() {

  const loclist = mount(<LocationsList
    userPosition={startProperties.userPosition}
    markerPosition={startProperties.markerPosition}
    placesSelected={startProperties.placesSelected}
    placesDistance={startProperties.placesDistance}
    listModalOpen={startProperties.listModalOpen}
  />);

  expect(loclist.find("ListGroup").length).toEqual(1);
  expect(loclist.find("ListGroupItem").length).toEqual(5);
}

test("Test the render of location items", testRenderLocationItems);


function testRenderLocationItemBtns() {

  const loclist = mount(<LocationsList
    placesSelected={startProperties.placesSelected}
    placesDistance={startProperties.placesDistance}
    listModalOpen={startProperties.listModalOpen}
  />);

  expect(loclist.find("ListGroup").length).toEqual(1);
  expect(loclist.find("ButtonGroup").length).toEqual(1);
  expect(loclist.find("Button").length).toEqual(4);
}

test("Testing the render of location item buttons", testRenderLocationItemBtns);


function testHandleLocationRemove() {

  const atlas = shallow(<Atlas/>);
  const loclist = shallow(<LocationsList
    userPosition={startProperties.userPosition}
    markerPosition={startProperties.markerPosition}
    placesSelected={startProperties.placesSelectedEmpty}
    placesDistance={startProperties.placesDistance}
    setParentState={(obj) => atlas.instance().setParentState(obj)}
    listModalOpen={this.listModalOpen}
  />);

  let coord = {name: "Marker Location", lat: 0, lng: 0};
  simulateOnClickEvent(atlas, {latlng: coord});
  expect(atlas.state().markerPosition).toEqual(null);
  
  loclist.instance().handleLocationRemove("Marker Location");
  expect(atlas.state().markerPosition).toEqual(null);
}

function simulateOnClickEvent(reactWrapper, event) {
  reactWrapper.find('Map').at(0).simulate('click', event);
  reactWrapper.update();
}

test("Test removing location", testHandleLocationRemove);


function testHandleLocationSelect() {

  const atlas = mount(<Atlas/>);
  const loclist = shallow(<LocationsList
    userPosition={startProperties.userPosition}
    markerPosition={startProperties.markerPosition}
    placesSelected={startProperties.placesSelectedMultiple}
    placesDistance={atlas.state().placesDistance}
    setParentState={(obj) => atlas.instance().setParentState(obj)}
    listModalOpen={startProperties.listModalOpen}
  />);

  expect(atlas.state().placesDistance.length).toEqual(0);


  let places = startProperties.placesSelectedMultiple;
  callHandleLocationSelect(atlas, loclist, places[0], 1);
  callHandleLocationSelect(atlas, loclist, places[1], 2);
  callHandleLocationSelect(atlas, loclist, places[2], 3);
  callHandleLocationSelect(atlas, loclist, places[1], 2);
}

function callHandleLocationSelect(wrapperParent, wrapperChild, place, expected) {
  wrapperChild.instance().handleLocationSelect(place.name, place.lat, place.lng);
  expect(wrapperParent.state().placesDistance.length).toEqual(expected);
  wrapperChild.setProps({placesDistance: wrapperParent.state().placesDistance});
}

test("Test selecting location", testHandleLocationSelect);