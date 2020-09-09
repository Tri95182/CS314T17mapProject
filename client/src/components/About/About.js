import React, {Component} from 'react';

import {Container, Row, Col, Button, Card, CardBody, CardTitle, CardText, CardImg, CardGroup} from 'reactstrap';

import {CLIENT_TEAM_NAME} from "../../utils/constants";

import collinPicture from "../../static/images/Collin-Picture.png";
import austinPicture from "../../static/images/Test-Picture.png";
import jackPicture from "../../static/images/Test-Picture.png";
import triPicture from "../../static/images/TriNguyen.png";

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
                {this.createMemberCard(collinPicture, "Collin Wernsman", "I was born and grew up right here in Fort Collins, Colorado. I am currently a senior studying Computer Science with a minor in math at Colorado State University. In my free time, I enjoy hiking, snowboarding, and playing games. Last semester, I had an IT internship at Woodward Inc where I developed and maintained internal web applications. Unfortunately due to COVID I no longer have that internship, but I am excited to learn new skills throughout my last year at CSU and finally enter the workforce. ")}
                {this.createMemberCard(jackPicture, "Jack Melvin", "Bio here")}
                {this.createMemberCard(triPicture, "Tri Nguyen", "I’m a Junior at CSU, getting my major in Computer Science." +
                    "I want to work hard and get good results. I like video games and mechanical keyboards. The keyboard I’m using right now is a Preonic, with purple Zealios switches. ")}
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
