import React, {Component} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table, CustomInput, Input} from 'reactstrap';
import _ from 'lodash';
import CalcTrip from "./CalcTrip";
export default class Settings extends Component {

	constructor(props) {
		super(props);

		this.state = {
			settings: null,
			validEarthRadius: true,
			units: ["Kilometers", "Miles", "Meters", "Feet", "Yards", "Custom"],
			earthRadi: [6371,3958.8,6371000,20902000,6975240.59,0]
		}
	}

	setInitialSettings() {
    this.setState({settings: this.props.settings ? this.props.settings : null});
  }

	render() {
		return (
			<Modal
				isOpen={this.props.settingsModalOpen}
        onOpened={() => this.setInitialSettings()}
				toggle={() => this.props.toggle()}
				scrollable={true}
			>
        <ModalHeader toggle={() => this.props.toggle()}>Settings</ModalHeader>
				{this.renderSettingsBody()}
				{this.renderSettingsFooter()}
			</Modal>
		);
	}

	renderSettingsBody() {
		return (
			<ModalBody>
				{this.state.settings ? 
					<Table borderless>
						<tbody>
							{this.renderUnitsInput()}
							{this.renderEarthRadiusInput()}
							{this.renderSwitchSetting("Optimize Trip", this.state.settings.optTrip, "optTrip", true)}
							{this.renderSwitchSetting("Show Markers", this.state.settings.showMarkers, "showMarkers")}
							{this.renderSwitchSetting("Show Lines", this.state.settings.showLines, "showLines")}
							{this.renderSwitchSetting("AutoRecalculate Trip", this.state.settings.calcTrip, "calcTrip")}
						</tbody>
					</Table>
				: <p>No settings to display</p>}
			</ModalBody>
		);
	}

	renderEarthRadiusInput() {
		return (
			<tr key="earthRadius">
				<td>Earth Radius</td>
				<td><Input 
					disabled={this.state.settings.units != "Custom"}
					value={this.state.settings.earthRadius} 
					color="primary"
					valid={this.state.validEarthRadius}
					invalid={!this.state.validEarthRadius}

					onChange={(e) => {
						let isValid = true;
						if(isNaN(e.target.value)) isValid = false;
						let newSettings = _.cloneDeep(this.state.settings);
						newSettings.earthRadius = e.target.value;
						this.setState({settings: newSettings, validEarthRadius: isValid});
					}}
				/></td>
			</tr>
		);
	}

	renderUnitsInput() {
		return (
			<tr key="units">
				<td>Units</td>
				<td><CustomInput id="units" color="primary" type="select" value={this.state.settings.units} onChange={(e) => {
					let newSettings = _.cloneDeep(this.state.settings);
					newSettings.units = e.target.value;
					var index = 0;
					while(index<this.state.units.length){
						if(e.target.value == this.state.units[index]){
							newSettings.earthRadius = this.state.earthRadi[index];
						}
						index++;
					}
					this.setState({settings: newSettings});
				}}>
					{this.state.units.map((unit) => <option key={unit}>{unit}</option>)}
				</CustomInput></td>
			</tr>
		);
	}

	renderSwitchSetting(name, state, stateName, disabled=false) {
		return (
			<tr key={name}>
				<td>{name}</td>
				<td><CustomInput id={stateName} color="primary" type="switch" checked={state} disabled={disabled} onChange={() => {
					let newSettings = _.cloneDeep(this.state.settings);
					newSettings[stateName] = !state;
					this.setState({settings: newSettings});
				}}/></td>
			</tr>
		);
	}

	renderSettingsFooter() {
		return (
			<ModalFooter>
				<Button color="primary" onClick={() => {
							this.props.toggle();
							this.setState({settings: null, validEarthRadius: true});
						}}>Cancel</Button>
				<Button color="primary" 
				onClick={() => {
					this.props.toggle();
					this.props.setParentState({settings: this.state.settings});
				}}
				disabled={_.isEqual(this.props.settings, this.state.settings) || !this.state.validEarthRadius}
				>Save</Button>
			</ModalFooter>
		);
	}

}