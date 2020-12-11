import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';

import React from 'react';
import Atlas from '../src/components/Atlas/Atlas';
import Settings from '../src/components/Atlas/Settings';

const startproperties = {
  settingsModalOpen: true,
  settings: {
    earthRadius: 6371.0,
    units: 'Kilometers',
    optTrip: false,
    showMarkers: true,
    showLines: true,
    calcTrip: true
  },
  toggle: jest.fn(),
}

function testModalRender() {

  const settings = shallow(<Settings
    settingsModalOpen={startproperties.settingsModalOpen}
    settings={startproperties.settings}
    toggle={startproperties.toggle}
  />);
  settings.instance().setInitialSettings();

  expect(settings.find("Modal").length).toEqual(1);
  expect(settings.find("ModalHeader").length).toEqual(1);
  expect(settings.find("ModalBody").length).toEqual(1);
  expect(settings.find("Table").length).toEqual(1);
  expect(settings.find("CustomInput").length).toEqual(5);
  expect(settings.find("ModalFooter").length).toEqual(1);
  expect(settings.find("Button").length).toEqual(2);
}

test("Test the render of settings modal", testModalRender);


function testSettingsChangeCancel() {

  const atlas = shallow(<Atlas/>);
  const settings = shallow(<Settings
    settingsModalOpen={startproperties.settingsModalOpen}
    settings={startproperties.settings}
    toggle={startproperties.toggle}
    setParentState={(obj) => atlas.instance().setParentState(obj)}
  />);
  settings.instance().setInitialSettings();

  expect(atlas.state().settings).toEqual(startproperties.settings);
  expect(settings.state().settings).toEqual(startproperties.settings);
  
  const newSettings = {earthRadius:6371.0, units:"Miles",optTrip:true,showMarkers:false,showLines:false,calcTrip:true};
  simulateOnChangeEvent(settings, 0, {target:{value:newSettings.units}});
  simulateOnChangeEvent(settings, 1, newSettings.optTrip);
  simulateOnChangeEvent(settings, 2, newSettings.showMarkers);
  simulateOnChangeEvent(settings, 3, newSettings.showLines);
  expect(settings.state().settings).toEqual(newSettings);
  simulateOnClickEvent(settings, 0);

  expect(settings.state().settings).toEqual(null);
  expect(atlas.state().settings).toEqual(startproperties.settings);
}

test("Test changing settings and then canceling", testSettingsChangeCancel);


function testSettingsChangeSave() {

  const atlas = shallow(<Atlas/>);
  const settings = shallow(<Settings
    settingsModalOpen={startproperties.settingsModalOpen}
    settings={startproperties.settings}
    toggle={startproperties.toggle}
    setParentState={(obj) => atlas.instance().setParentState(obj)}
  />);
  settings.instance().setInitialSettings();

  expect(atlas.state().settings).toEqual(startproperties.settings);
  expect(settings.state().settings).toEqual(startproperties.settings);

  const newSettings = {earthRadius:6371.0, units:"Miles",optTrip:true,showMarkers:false,showLines:false,calcTrip:true};
  simulateOnChangeEvent(settings, 0, {target:{value:newSettings.units}});
  simulateOnChangeEvent(settings, 1, newSettings.optTrip);
  simulateOnChangeEvent(settings, 2, newSettings.showMarkers);
  simulateOnChangeEvent(settings, 3, newSettings.showLines);
  expect(settings.state().settings).toEqual(newSettings);
  simulateOnClickEvent(settings, 1);

  expect(settings.state().settings).toEqual(newSettings);
  expect(atlas.state().settings).toEqual(newSettings);
}

test("Test changing settings and then saving", testSettingsChangeSave);

function simulateOnClickEvent(reactWrapper, index) {
  reactWrapper.find('Button').at(index).simulate('click');
  reactWrapper.update();
}

function simulateOnChangeEvent(reactWrapper, index, event) {
  reactWrapper.find('CustomInput').at(index).simulate('change', event);
  reactWrapper.update();
}