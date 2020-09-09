import React, {Component} from 'react';

import {Container, Row, Col, Button, Card, CardBody, CardTitle, CardText, CardImg, CardGroup} from 'reactstrap';

import {CLIENT_TEAM_NAME} from "../../utils/constants";

import collinPicture from "../../static/images/Test-Picture.png";
import austinPicture from "../../static/images/Test-Picture.png";
import jackPicture from "../../static/images/Test-Picture.png";
import triPicture from "../../static/images/Test-Picture.png";

export default class About extends Component {

    render() {
      return (
        <Container id="about">
          <Row>
            <Col>
              <h2>{CLIENT_TEAM_NAME}</h2>
            </Col>
            <Col id="closeAbout" xs='auto' >
              <Button color="primary" onClick={this.props.closePage} xs={1}>
                Close
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <h3>Our Mission</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <h6>Mission statement here</h6>
            </Col>
          </Row>
          <Row>
            <Col>
              <h3>Our Team</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <CardGroup>
                {this.createMemberCard(austinPicture, "Austin Wulfing", "Bio here")}
                {this.createMemberCard(collinPicture, "Collin Wernsman", "Bio here")}
                {this.createMemberCard(jackPicture, "Jack Melvin", "Bio here")}
                {this.createMemberCard(triPicture, "Tri Nguyen", "Bio here")}
              </CardGroup>
            </Col>
          </Row>
        </Container>
      )
    }

    createMemberCard(picture, name, bio) {
      return (
        <Card>
          <CardImg top width="100%" src={picture} alt="Member Picture"/>
          <CardBody>
            <CardTitle tag="h4">{name}</CardTitle>
            <CardText>{bio}</CardText>
          </CardBody>
        </Card>        
      )
    }
}
