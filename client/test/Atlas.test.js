import './jestConfig/enzyme.config.js';

import React from 'react';
import {shallow} from 'enzyme';

import Atlas from '../src/components/Atlas/Atlas';
import { Polyline } from 'react-leaflet';

const startProperties = {
  createSnackBar: jest.fn()
};

function testInitialAtlasState() {

  const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);

  let actualMarkerPosition = atlas.state().markerPosition;
  let expectedMarkerPosition = null;

  expect(actualMarkerPosition).toEqual(expectedMarkerPosition);
}

test("Testing Atlas's Initial State", testInitialAtlasState);


function testMarkerIsRenderedOnClick() {

  const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);

  let actualMarkerPosition = atlas.state().markerPosition;
  let expectedMarkerPosition = null;

  expect(actualMarkerPosition).toEqual(expectedMarkerPosition);

  let latlng = {name:"Marker Location", lat: 0, lng: 0};
  simulateOnClickEvent(atlas, {latlng: latlng});

  expect(atlas.state().markerPosition).toEqual(expectedMarkerPosition);
  // expect(atlas.find('Marker')).toEqual(1); ??
}

function simulateOnClickEvent(reactWrapper, event) {
  reactWrapper.find('Map').at(0).simulate('click', event);
  reactWrapper.update();
}

test("Testing Atlas's Initial State", testMarkerIsRenderedOnClick);

function testGeolocation() {
  const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);

  const mockGeolocation = {
    getCurrentPosition: jest.fn()
    .mockImplementationOnce((success) => success({
      coords: {latitude:10, longitude:20}
    }))
  };
  global.navigator.geolocation = mockGeolocation;


  atlas.instance().getUserPosition();  

  expect(atlas.state().userPosition).toEqual({lat:10, lng:20});
}

test("Test geolocation sets user state", testGeolocation);

function testPolyline(){
  const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);
  const testPlaces = [
    {name:"one", lat:10, lng:20},
    {name:"two", lat:20, lng:30},
    {name:"three", lat:30, lng:40},
  ];
  atlas.setState({placesDistance: testPlaces});

  expect(atlas.find(Polyline).length).toEqual(3);
}

test("Test render of polylines", testPolyline);


function testChangeInArray() {
  
  const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);
  const testPlaces = [
    {name:"one", lat:10, lng:20},
    {name:"two", lat:20, lng:30},
    {name:"three", lat:30, lng:40},
  ];
  atlas.setState({placesDistance: testPlaces});

  expect(atlas.state().placesDistance).toEqual(testPlaces);

  const newItem = {name:"twoTest", lat:200, lng:300};
  atlas.instance().changeInArray(atlas.state().placesDistance, testPlaces[1], newItem, "placesDistance");

  expect(atlas.state().placesDistance[1]).toEqual(newItem);  
}

test("Test change in array function", testChangeInArray);


async function testReverseGeocoding() {

  const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);
  const instance = atlas.instance();
  const map = {current:{leafletElement:{options:{crs:{scale:(z) => 10}}, getZoom: () => 10}}};
  instance['mapRef'] = map;
  const latlng1 = {lat:39, lng:-105};
  const output1 = await instance.reverseGeocode(latlng1);
  expect(output1).toEqual("Flatland Trail, El Paso County, Colorado, United States of America");
  
  const latlng2 = {lat:28, lng:-38};
  const output2 = await instance.reverseGeocode(latlng2);
  expect(output2).toEqual(null);
}

test("Test geocoding", testReverseGeocoding);