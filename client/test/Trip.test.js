import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';

import React from 'react';
import Atlas from '../src/components/Atlas/Atlas';
import Trip from '../src/components/Atlas/Trip';

const startproperties = {
  placesDistanceEmpty: [],
  placesDistance: [
    {name:"firstplace", lat:"10", lng:"20"},
    {name:"secondplace", lat:"20", lng:"30"},
    {name:"thirdplace", lat:"30", lng:"40"},
  ],
  createSnackBar: jest.fn(),
  settings:{units:"Miles"}
}

function testTripRender() {

  const trip = shallow(<Trip placesDistance={startproperties.placesDistanceEmpty} settings={startproperties.settings}/>);

  expect(trip.find("ListGroup").length).toEqual(1);
  expect(trip.find("DragDropContext").length).toEqual(1);
  expect(trip.find("Nav").length).toEqual(1);
  expect(trip.find("NavItem").length).toEqual(6);
  expect(trip.find("NavLink").length).toEqual(6);
  expect(trip.find("Navbar").length).toEqual(1);
  expect(trip.find("NavbarBrand").length).toEqual(1);
  expect(trip.find("NavbarToggler").length).toEqual(1);
  expect(trip.find("Collapse").length).toEqual(1);
}

test("Test initial trip render", testTripRender);



function testTripToggle() {

  const trip = shallow(<Trip placesDistance={startproperties.placesDistanceEmpty} settings={startproperties.settings}/>);

  expect(trip.state().itemInfoModalOpen).toEqual(false);
  
  trip.instance().tripToggle(trip.state().itemInfoModalOpen, 'itemInfoModalOpen');
  
  expect(trip.state().itemInfoModalOpen).toEqual(true);
}

test("Test state toggle function", testTripToggle);


function testTripItemToggle() {

  const trip = shallow(<Trip placesDistance={startproperties.placesDistanceEmpty} settings={startproperties.settings}/>);

  expect(trip.state().itemMenuOpen).toEqual(false);
  expect(trip.state().itemMenuOpenIndex).toEqual(null);
  
  trip.instance().tripItemToggle(3);

  expect(trip.state().itemMenuOpen).toEqual(true);
  expect(trip.state().itemMenuOpenIndex).toEqual(3);
}

test("Test toggling item menu", testTripItemToggle);


function testGetInfo() {

  const trip = shallow(<Trip placesDistance={startproperties.placesDistanceEmpty} settings={startproperties.settings}/>);

  expect(trip.state().itemInfo).toEqual(null);
  expect(trip.state().itemInfoModalOpen).toEqual(false);
  
  const place = {name:"test place", lat:"10", lng:"20"};
  trip.instance().handleGetInfo(place);
  
  expect(trip.state().itemInfo).toEqual(place);
  expect(trip.state().itemInfoModalOpen).toEqual(true);
}

test("Test get info function", testGetInfo);


function testRemoveItem() {

  const atlas = shallow(<Atlas/>);
  atlas.setState({placesDistance: startproperties.placesDistance});
  const trip = shallow(<Trip 
    placesDistance={atlas.state().placesDistance}
    setParentState={(obj) => atlas.instance().setParentState(obj)}
    settings={startproperties.settings}
  />);

  expect(atlas.state().placesDistance.length).toEqual(3);
  
  trip.instance().handleRemoveItem({name:"firstplace", lat:"10", lng:"20"});
  
  expect(atlas.state().placesDistance.length).toEqual(2);
}

test("Test removal of item", testRemoveItem);


function testDragEnd() {

  const atlas = shallow(<Atlas/>);
  atlas.setState({placesDistance: startproperties.placesDistance});
  const trip = shallow(<Trip 
    placesDistance={atlas.state().placesDistance}
    setParentState={(obj) => atlas.instance().setParentState(obj)}
    settings={startproperties.settings}
  />);

  const given = startproperties.placesDistance;
  const expected = [
    {name:"secondplace", lat:"20", lng:"30"},
    {name:"firstplace", lat:"10", lng:"20"},
    {name:"thirdplace", lat:"30", lng:"40"}
  ]

  expect(atlas.state().placesDistance).toEqual(given);

  trip.instance().handleDragEnd({source:{index:1}});
  expect(atlas.state().placesDistance).toEqual(given);
  
  trip.instance().handleDragEnd({source:{index:1},destination:{index:0}});
  expect(atlas.state().placesDistance).toEqual(expected);
}

test("Test drag reorders list", testDragEnd);


function testHandleCalculateTrip() {

  const atlas = shallow(<Atlas/>);
  atlas.setState({placesDistance: startproperties.placesDistance});
  const trip = shallow(<Trip 
    placesDistance={atlas.state().placesDistance}
    setParentState={(obj) => atlas.instance().setParentState(obj)}
    sendRequest={(req) => atlas.instance().sendRequest(req)}
    settings={startproperties.settings}
  />);

  expect(atlas.state().tripDistances).toEqual([]);


  expect(atlas.state().tripDistances).toEqual([]);
}

test("Test calculating trip", testHandleCalculateTrip);


function testProcessResponse() {

  const atlas = shallow(<Atlas/>);
  atlas.setState({placesDistance: startproperties.placesDistance});
  const trip = shallow(<Trip 
    placesDistance={atlas.state().placesDistance}
    setParentState={(obj) => atlas.instance().setParentState(obj)}
    settings={startproperties.settings}
  />);

  expect(atlas.state().tripDistances).toEqual([]);

  trip.instance().processTripResponse(mockTripResponseObj());

  expect(atlas.state().tripDistances).toEqual([10, 20, 30]);
}

test("Test process of trip response", testProcessResponse);


function testProcessResponseFail() {

  const atlas = shallow(<Atlas/>);
  atlas.setState({placesDistance: startproperties.placesDistance});
  const trip = shallow(<Trip 
    placesDistance={atlas.state().placesDistance}
    setParentState={(obj) => atlas.instance().setParentState(obj)}
    createSnackBar={jest.fn()}
    settings={startproperties.settings}
  />);

  expect(atlas.state().tripDistances).toEqual([]);
  
  const mockResponse = mockTripResponseObj();
  mockResponse["requestType"] = "search"
  trip.instance().processTripResponse(mockResponse);

  expect(atlas.state().tripDistances).toEqual([]);
}

test("Test process trip response fail", testProcessResponseFail);

function mockTripResponseObj() {
  return {
    "requestType" : "trip",
    "requestVersion" : 3,
    "options" : { 
      "title":"Test Trip", 
      "earthRadius":"6371.0"
    },
    "places" : [
      {"name":"firstplace", "latitude":"10", "longitude":"20"},
      {"name":"secondplace", "latitude":"20", "longitude":"30"},
      {"name":"thirdplace", "latitude":"30", "longitude":"40"},
    ],
    "distances" : [10, 20, 30]
  }
}


function testHandleSaveTrip() {
  // placeholder for save trip test
  global.URL.createObjectURL = jest.fn();
  const trip = shallow(<Trip placesDistance={startproperties.placesDistance} earthRadius={6371.0} settings={startproperties.settings}/>);

  trip.instance().handleSaveTrip();
}

test("Test saving trip", testHandleSaveTrip);


function testHandleLoadTrip() {
  // placeholder for load trip test

  const trip = shallow(<Trip placesDistance={startproperties.placesDistance} earthRadius={6371.0} settings={startproperties.settings}/>);

  trip.instance().handleLoadTrip();
}

test("Test loading trip", testHandleLoadTrip);


function testClearTrip() {

  const atlas = shallow(<Atlas/>);
  atlas.setState({placesDistance: startproperties.placesDistance});
  const trip = shallow(<Trip 
    placesDistance={atlas.state().placesDistance}
    setParentState={(obj) => atlas.instance().setParentState(obj)}
    settings={startproperties.settings}
  />);

  expect(atlas.state().placesDistance).toEqual(startproperties.placesDistance);

  trip.instance().handleClearTrip();

  expect(atlas.state().placesDistance).toEqual([]);
}

test("Test clearing trip", testClearTrip);


function testResetItemIndex() {

  const trip = shallow(<Trip placesDistance={startproperties.placesDistance} settings={startproperties.settings}/>);
  trip.setState({itemMenuOpenIndex: 0});

  expect(trip.state().itemMenuOpenIndex).toEqual(0);

  trip.instance().resetItemIndex();

  expect(trip.state().itemMenuOpenIndex).toEqual(null);
}

test("Test reset of item index", testResetItemIndex);


function testTitleInputRender() {

  const trip = shallow(<Trip placesDistance={startproperties.placesDistanceEmpty} settings={startproperties.settings}/>);
  trip.setState({editingTripTitle: true});

  expect(trip.find("InputGroup").length).toEqual(1);
  expect(trip.find("Input").length).toEqual(1);
  expect(trip.find("InputGroupAddon").length).toEqual(1);
  expect(trip.find("Button").length).toEqual(1);
}

test("Test render of trip title change input", testTitleInputRender);
  

function testTitleInputChange() {

  const atlas = shallow(<Atlas/>);
  const trip = shallow(<Trip placesDistance={startproperties.placesDistanceEmpty}
                             setParentState={(obj)=>atlas.instance().setParentState(obj)}
                             tripTitle={"trip"} settings={startproperties.settings}/>);

  expect(atlas.state().tripTitle).toEqual("Trip");

  simulateOnClickEvent(trip, 'div');
  simulateOnChangeEvent(trip, {target:{value:"Test Trip Name"}});
  simulateOnClickEvent(trip, 'Button');

  expect(atlas.state().tripTitle).toEqual("Test Trip Name");
}

function simulateOnClickEvent(reactWrapper, component) {
  reactWrapper.find(component).at(0).simulate('click');
  reactWrapper.update();
}

function simulateOnChangeEvent(reactWrapper, event) {
  reactWrapper.find('Input').at(0).simulate('change', event);
  reactWrapper.update();
}

test("Test title is changed", testTitleInputChange);
