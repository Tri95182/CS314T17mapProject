import './jestConfig/enzyme.config.js';

import React from 'react';
import {shallow} from 'enzyme';

import Atlas from '../src/components/Atlas/Atlas';

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

  let latlng = {lat: 0, lng: 0};
  simulateOnClickEvent(atlas, {latlng: latlng});

  expect(atlas.state().markerPosition).toEqual(latlng);
  // expect(atlas.find('Marker')).toEqual(1); ??
}

function simulateOnClickEvent(reactWrapper, event) {
  reactWrapper.find('Map').at(0).simulate('click', event);
  reactWrapper.update();
}

test("Testing Atlas's Initial State", testMarkerIsRenderedOnClick);


function testSanitizeSearchInput() {

  const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);
  const instance = atlas.instance();

  let match = "~!@#$%^&*()_+-=Test`;:'<>,./?[]{}|\"\\";
  let cleanMatch = instance.sanitizeInput(match);
  let expectedCleanMatch = "_______________Test_________________";
  
  expect(cleanMatch).toEqual(expectedCleanMatch);
}

test("Testing Sanitization of Search Input", testSanitizeSearchInput);


function testUpdateSearchText() {

  const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);
  atlas.setState({searchModalOpen: true});

  expect(atlas.state().searchInput).toEqual('');

  let inputText = 'Fake Input Text';
  simulateOnChangeEvent(atlas, {target: {value: inputText}});
  expect(atlas.state().searchInput).toEqual(inputText);
}

function simulateOnChangeEvent(reactWrapper, event) {
  reactWrapper.find('Input').at(0).simulate('change', event);
  reactWrapper.update();
}

test("Testing Update of Search Input", testUpdateSearchText);


function testHandleSearch() {
  mockFindResponse();

  const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);
  atlas.setState({searchModalOpen: true});

  expect(atlas.state().places.length).toEqual(0);
  expect(atlas.state().placesFound).toEqual(0);

  let input = {target:{value:"daves"}};
  simulateOnChangeEvent(atlas, input);

  let placesAfter = atlas.state().places;
  let placesFoundAfter = atlas.state().placesFound;

  expect(placesAfter.length).toEqual(2);
  expect(placesFoundAfter).toEqual(2);
  
}

function mockFindResponse() {
  fetch.mockResponse(JSON.stringify(
    {
      status: 200,
      statusText: 'OK',
      body: {
        "match": "daves",
        "limit": 25,
        "found": 2,
        "places": [
          {
            "country": "United States",
            "latitude": "64.132858",
            "name": "Delta Daves Airport",
            "municipality": "Delta Junction",
            "region": "Alaska",
            "longitude": "-145.804494"
          },
          {
            "country": "India",
            "latitude": "23.641300520900003",
            "name": "Pandaveswar Airfield",
            "region": "West Bengal",
            "longitude": "87.348690033"
          }
        ],
        "requestType": "find",
        "requestVersion": 2
      },
      type: 'basic',
      url: 'http://localhost:8000/api/find',
      redirected: false,
      ok: true
    }));
}

// test("Testing Search Query Sets 'places' State", testHandleSearch);
