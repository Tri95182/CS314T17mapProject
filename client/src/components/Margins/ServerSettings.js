import React, { Component } from "react";
import { Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";

import { sendServerRequest, isJsonResponseValid } from "../../utils/restfulAPI";
import { PROTOCOL_VERSION } from "../../utils/constants";

import * as configSchema from "../../../schemas/ResponseConfig";

export default class ServerSettings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            inputText: this.props.serverSettings.serverPort,
            validServer: null,
            config: {}
        };

        this.saveInputText = this.state.inputText;
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.isOpen} toggle={() => this.props.toggleOpen()}>
                    <ModalHeader toggle={() => this.props.toggleOpen()}>Server Connection</ModalHeader>
                    {this.renderSettings()}
                    {this.renderActions()}
                </Modal>
            </div>
        );
    }

    renderSettings() {
        return (
            <ModalBody>
                {this.renderRow("Name:", this.getServerInfo("serverName"))}
                {this.renderRow("URL:", this.renderInputField())}
                {this.renderRow("Version:", this.getServerInfo("requestVersion"))}
                {this.renderRow("Type:", this.getServerInfo("requestType"))}
                {this.renderRow("Supported Requests: ", this.getServerInfo("supportedRequests") ? this.getServerInfo("supportedRequests").toString(): "")}
            </ModalBody>
        );
    }

    renderInputField() {
        let valid = this.state.validServer === null ? false : this.state.validServer;
        let notValid = this.state.validServer === null ? false : !this.state.validServer;
        return(
            <Input onChange={(e) => this.updateInput(e.target.value)}
                   value={this.state.inputText}
                   placeholder={this.props.serverPort}
                   valid={valid}
                   invalid={notValid}
            />
        );
    }

    renderActions() {
        return (
            <ModalFooter>
                <Button color="primary" onClick={() => this.resetServerSettingsState()}>Cancel</Button>
                <Button color="primary" onClick={() =>
                {
                    this.props.processServerConfigSuccess(this.state.config, this.state.inputText);
                    this.resetServerSettingsState(this.state.inputText);
                }}
                        disabled={!this.state.validServer}
                >
                    Save
                </Button>
            </ModalFooter>
        );
    }

    renderRow(title, value) {
        return (
            <Row className="m-2">
                <Col xs={3}>
                    {title}
                </Col>
                <Col xs={9}>
                    {value}
                </Col>
            </Row>
        )
    }

    getServerInfo(property) {
        let serverInfo = this.props.serverSettings.serverConfig && this.state.validServer === null ?
                                   this.props.serverSettings.serverConfig[property] : "";
        if (this.state.config && Object.keys(this.state.config).length > 0) {
            serverInfo = this.state.config[property];
        }
    
        return serverInfo;
    }

    updateInput(value) {
        this.setState({inputText: value}, () => {
            if (this.shouldAttemptConfigRequest(value)) {
                sendServerRequest({requestType: "config", requestVersion: PROTOCOL_VERSION}, value)
                    .then(config => {
                        if (config) { this.processConfigResponse(config.data) }
                        else { this.setState({validServer: true, config: config}); }
                    });
            } else {
                this.setState({validServer: false, config: {}});
            }
        });
    }

    shouldAttemptConfigRequest(resource) {
        const urlRegex = /https?:\/\/.+/;
        return resource.match(urlRegex) !== null && resource.length > 15;
    }

    processConfigResponse(config) {
        if(!isJsonResponseValid(config, configSchema)) {
            this.setState({validServer: false, config: false});
        } else {
            this.setState({validServer: true, config: config});
        }
    }

    resetServerSettingsState(inputText=this.saveInputText) {
        this.props.toggleOpen();
        this.setState({
            inputText: inputText,
            validServer: null,
            config: false
        });
    }
}
