import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';

import React from 'react';
import Atlas from '../src/components/Atlas/Atlas';
import Info from '../src/components/Atlas/Info';

const startproperties = {
  infoModalOpen: true,
  info: {
    name: "Test",
    lat: 10,
    lng: 20
  },
  toggle: jest.fn(),
}

function testModalRender() {

  const info = shallow(<Info 
    infoModalOpen={startproperties.infoModalOpen}
    info={startproperties.info}
  />);

  expect(info.find("Modal").length).toEqual(1);
  expect(info.find("ModalHeader").length).toEqual(1);
  expect(info.find("ModalBody").length).toEqual(1);
  expect(info.find("ModalFooter").length).toEqual(1);
  expect(info.find("Button").length).toEqual(2);
  expect(info.find("Table").length).toEqual(1);
  expect(info.find("Input").length).toEqual(1);
}

test("Testing render of info modal", testModalRender);


function testNotesSave() {
  const places = [startproperties.info];

  const atlas = shallow(<Atlas/>);
  atlas.setState({placesDistance: places});
  const info = shallow(<Info 
    infoModalOpen={startproperties.infoModalOpen}
    info={startproperties.info}
    toggle={startproperties.toggle}
    setParentState={(obj) => atlas.instance().setParentState(obj)}
    placesDistance={places}
  />);

  expect(info.state().note).toEqual("");
  expect(atlas.state().placesDistance[0].notes).toEqual(undefined);
  
  const testNote = "This is a test note";
  simulateOnChangeEvent(info, {target:{value:testNote}});
  
  expect(info.state().note).toEqual(testNote);
  expect(atlas.state().placesDistance[0].notes).toEqual(undefined);
  
  simulateOnClickEvent(info, 1);
  
  expect(atlas.state().placesDistance[0].notes).toEqual(testNote);
}

test("Test saving notes", testNotesSave);


function testNotesCancel() {
  delete startproperties.info.notes;
  const places = [startproperties.info];

  const atlas = shallow(<Atlas/>);
  atlas.setState({placesDistance: places});
  const info = shallow(<Info 
    infoModalOpen={startproperties.infoModalOpen}
    info={startproperties.info}
    toggle={startproperties.toggle}
    setParentState={(obj) => atlas.instance().setParentState(obj)}
    placesDistance={places}
  />);

  expect(info.state().note).toEqual("");
  expect(atlas.state().placesDistance[0].notes).toEqual(undefined);
  
  const testNote = "This is a test note";
  simulateOnChangeEvent(info, {target:{value:testNote}});
  
  expect(info.state().note).toEqual(testNote);
  expect(atlas.state().placesDistance[0].notes).toEqual(undefined);
  
  simulateOnClickEvent(info, 0);
  
  expect(atlas.state().placesDistance[0].notes).toEqual(undefined);
}

test("Test cancelling notes", testNotesCancel);

function simulateOnClickEvent(reactWrapper, index) {
  reactWrapper.find('Button').at(index).simulate('click');
  reactWrapper.update();
}

function simulateOnChangeEvent(reactWrapper, event) {
  reactWrapper.find('Input').at(0).simulate('change', event);
  reactWrapper.update();
}