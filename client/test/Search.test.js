import './jestConfig/enzyme.config.js';

import React from 'react';
import {shallow, mount} from 'enzyme';

import Atlas from '../src/components/Atlas/Atlas';
import Search from '../src/components/Atlas/Search';

const startProperties = {
  searchModalOpen: true,
  sendRequest: jest.fn(async x => {return await x})
};

function testRenderModal() {

  const search = shallow(<Search 
    searchModalOpen={startProperties.searchModalOpen}
    sendRequest={startProperties.sendRequest}
  />);

  expect(search.find('Modal').length).toEqual(1);
  expect(search.find('ModalHeader').length).toEqual(1);
  expect(search.find('ModalFooter').length).toEqual(1);
}

test("Test render of modal", testRenderModal);


function testRenderModalBody() {

  const search = shallow(<Search 
    searchModalOpen={startProperties.searchModalOpen}
    sendRequest={startProperties.sendRequest}
  />);

  expect(search.find('ModalBody').length).toEqual(1);
  expect(search.find('InputGroup').length).toEqual(1);
  expect(search.find('Input').length).toEqual(1);
}

test("Test render of modal body", testRenderModalBody);


function testRenderSearchResults() {

  const search = shallow(<Search 
    searchModalOpen={startProperties.searchModalOpen}
    sendRequest={startProperties.sendRequest}
  />);

  expect(search.find('ListGroup').length).toEqual(1);
  expect(search.find('ListGroupItem').length).toEqual(1);
}

test("Test render of search results", testRenderSearchResults);


function testSanitizeSearchInput() {

  const search = shallow(<Search 
    searchModalOpen={startProperties.searchModalOpen}
    sendRequest={startProperties.sendRequest}
  />);
  const instance = search.instance();

  let match = "~!@#$%^&*()_+-=Test`;:'<>,./?[]{}|\"\\";
  let cleanMatch = instance.sanitizeInput(match);
  let expectedCleanMatch = "_______________Test_________________";
  
  expect(cleanMatch).toEqual(expectedCleanMatch);
}

test("Testing Sanitization of Search Input", testSanitizeSearchInput);


function testUpdateSearchText() {

  const search = shallow(<Search 
    searchModalOpen={startProperties.searchModalOpen}
    sendRequest={startProperties.sendRequest}
  />);

  expect(search.state().searchInput).toEqual('');

  let inputText = 'Fake Input Text';
  simulateOnChangeEvent(search, {target: {value: inputText}});
  expect(search.state().searchInput).toEqual(inputText);
}

function simulateOnChangeEvent(reactWrapper, event) {
  reactWrapper.find('Input').at(0).simulate('change', event);
  reactWrapper.update();
}

test("Testing Update of Search Input", testUpdateSearchText);


function testAddSelectedPlace() {
  const atlas = shallow(<Atlas/>);
  const search = shallow(<Search 
    searchModalOpen={startProperties.searchModalOpen} 
    places={atlas.state().places} 
    placesFound={atlas.state().placesFound} 
    placesSelected={atlas.state().placesSelected}
    setParentState={(obj) => atlas.instance().setParentState(obj)}
    sendRequest={startProperties.sendRequest}
  />);
  let instance = search.instance();

  expect(atlas.state().placesSelected.length).toEqual(0);

  let place = {
    "country": "United States",
    "latitude": "64.132858",
    "name": "Delta Daves Airport",
    "municipality": "Delta Junction",
    "region": "Alaska",
    "longitude": "-145.804494"
  };
  instance.addSelectedPlace(place);

  expect(atlas.state().placesSelected.length).toEqual(1);
}

test("Testing addition of object into 'placesSelected' state", testAddSelectedPlace);


function testHandleSearch() {
  mockFindResponse();
  
  const atlas = shallow(<Atlas/>);
  const search = mount(<Search 
    searchModalOpen={startProperties.searchModalOpen} 
    places={atlas.state().places} 
    placesFound={atlas.state().placesFound} 
    placesSelected={atlas.state().placesSelected}
    setParentState={(obj) => atlas.instance().setParentState(obj)}
    sendRequest={(req) => atlas.instance().sendRequest(req)}
  />);
    
  expect(atlas.state().places.length).toEqual(0);
  expect(atlas.state().placesFound).toEqual(0);

  let input = {target:{value:"daves"}};
  search.instance().handleSearch(input)
  search.update();
  
  let placesAfter = atlas.state().places;
  let placesFoundAfter = atlas.state().placesFound;

  expect(placesAfter.length).toEqual(0);
  expect(placesFoundAfter).toEqual(0);
    
  }
  
  function mockFindResponse() {
    fetch.mockResponse(JSON.stringify({
      // data: {
        "requestType": "find",
        "requestVersion": 2,
        "match": "daves",
        "limit": 25,
        "found": 2,
        "places": [
          {
            "name": "Delta Daves Airport",
            "latitude": "64.132858",
            "longitude": "-145.804494"
          },
          {
            "name": "Pandaveswar Airfield",
            "latitude": "23.641300520900003",
            "longitude": "87.348690033"
          }
        ]
      // }
    }));
  }
  
  test("Testing Search Query Sets 'places' State", testHandleSearch);