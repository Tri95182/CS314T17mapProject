import './jestConfig/enzyme.config.js';
import {shallow, mount} from 'enzyme';

import React from 'react';
import Atlas from '../src/components/Atlas/Atlas';
import Distance from '../src/components/Atlas/Distance';

const startProperties = {
  placesDistance: [
    {"lat":  "40.6", "lng": "-105.1"},
    {"lat":  "-33.9", "lng": "151.2"}
  ],
  distanceBetween: 0,
  createSnackBar: jest.fn()
}

function testRenderDistance() {

  const distance = mount(<Distance/>);

  expect(distance.find('ListGroupItem').length).toEqual(1);
}

test("Test render of distance button", testRenderDistance);

function testProcessResponseSuccess() {

  const atlas = shallow(<Atlas/>);
  const distance = mount(<Distance
    placesDistance={startProperties.placesDistance}
    distanceBetween={startProperties.distanceBetween}
    setParentState={(obj => atlas.instance().setParentState(obj))}
  />);

  expect(atlas.state().distanceBetween).toEqual(0);

  const mockResponse = mockDistanceResponseObj();
  distance.instance().processDistanceResponse(mockResponse);

  expect(atlas.state().distanceBetween).toEqual(12345);
}

test("Test that 'distanceBetween' state is set on success", testProcessResponseSuccess);


function testProcessResponseFail() {
  
  const atlas = shallow(<Atlas/>);
  const distance = shallow(<Distance
    placesDistance={startProperties.placesDistance}
    distanceBetween={startProperties.distanceBetween}
    setParentState={(obj) => atlas.instance().setParentState(obj)}
    createSnackBar={startProperties.createSnackBar}
  />);
    
  expect(atlas.state().distanceBetween).toEqual(0);
  
  const mockResponse = mockDistanceResponseObj();
  mockResponse["requestType"] = "config";
  distance.instance().processDistanceResponse(mockResponse);

  expect(atlas.state().distanceBetween).toEqual(0);
}

function mockDistanceResponseObj() {
  return {
    "requestType" : "distance",
    "requestVersion" : 2,
    "place1" : {"latitude":  "40.6", "longitude": "-105.1"},
    "place2" : {"latitude":  "-33.9", "longitude": "151.2"},
    "earthRadius" : 6371.0,
    "distance" : 12345
  }
}

test("Test that 'distanceBetween' state set to zero on fail", testProcessResponseFail);


function testHandleDistance() {
  fetch.mockResponse(JSON.stringify({"data":mockDistanceResponseObj()}));

  const atlas = shallow(<Atlas/>);
  const distance = mount(<Distance
    placesDistance={startProperties.placesDistance}
    distanceBetween={startProperties.distanceBetween}
    setParentState={(obj) => atlas.instance().setParentState(obj)}
    createSnackBar={startProperties.createSnackBar}
  />);

  expect(atlas.state().distanceBetween).toEqual(0);
  
  simulateOnClickEvent(distance);
  
  expect(atlas.state().distanceBetween).toEqual(0);
}

function simulateOnClickEvent(reactWrapper) {
  reactWrapper.find('ListGroupItem').at(0).simulate('click');
  reactWrapper.update();
}

test("Test on click event for distance button", testHandleDistance);