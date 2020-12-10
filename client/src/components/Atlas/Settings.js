import React, {Component} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table, CustomInput} from 'reactstrap';
import _ from 'lodash';

export default class Settings extends Component {

	constructor(props) {
		super(props);

		this.state = {
			settings: null,
			units: ["Kilometers", "Miles", "Meters", "Feet", "Yards"]
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
							<tr key="units">
								<td>Units</td>
								<td><CustomInput id="units" color="primary" type="select" value={this.state.settings.units} onChange={(e) => {
									let newSettings = _.cloneDeep(this.state.settings);
									newSettings.units = e.target.value;
									this.setState({settings: newSettings});					
								}}>
									{this.state.units.map((unit) => <option>{unit}</option>)}
								</CustomInput></td>
							</tr>
							{this.renderSwitchSetting("Optimize Trip", this.state.settings.optTrip, "optTrip")}
							{this.renderSwitchSetting("Show Markers", this.state.settings.showMarkers, "showMarkers")}
							{this.renderSwitchSetting("Show Lines", this.state.settings.showLines, "showLines")}
							{this.renderSwitchSetting("AutoRecalculate Trip", this.state.settings.calcTrip, "calcTrip")}
						</tbody>
					</Table>
				: <p>No settings to display</p>}
			</ModalBody>
		);
	}

	renderSwitchSetting(name, state, stateName) {
		return (
			<tr key={name}>
				<td>{name}</td>
				<td><CustomInput id={stateName} color="primary" type="switch" checked={state} onChange={() => {
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
					this.setState({settings: null});
				}}>Cancel</Button>
        <Button color="primary" 
          onClick={() => {
						this.props.toggle();
            this.props.setParentState({settings: this.state.settings});
          }}
          disabled={_.isEqual(this.props.settings, this.state.settings)}
        >Save</Button>
			</ModalFooter>
		);
	}

}