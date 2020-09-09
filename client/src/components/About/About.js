import React, {Component} from 'react';

import {Container, Row, Col, Button, Card, CardBody, CardTitle, CardText, CardImg, CardGroup} from 'reactstrap';

import {CLIENT_TEAM_NAME} from "../../utils/constants";

import collinPicture from "../../static/images/Collin-Picture.png";
import austinPicture from "../../static/images/Wulfing_Picture.png";
import jackPicture from "../../static/images/profile pic.jpg";
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
              <h6>We push for the Imaginary</h6>
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
                {this.createMemberCard(austinPicture, "Austin Wulfing", "Applied Computing Technology major trying his best. Hoping to learn a lot and get comfortable working as a team this semester. I enjoy playing games and listening to music when I'm not outside with friends.")}
                {this.createMemberCard(collinPicture, "Collin Wernsman", "I was born and grew up right here in Fort Collins, Colorado. I am currently a senior studying Computer Science with a minor in math at Colorado State University. In my free time, I enjoy hiking, snowboarding, and playing games. Last semester, I had an IT internship at Woodward Inc where I developed and maintained internal web applications. Unfortunately due to COVID I no longer have that internship, but I am excited to learn new skills throughout my last year at CSU and finally enter the workforce. ")}
                {this.createMemberCard(jackPicture, "Jack Melvin", "I'm A Senior at CSU, getting a major in COmputer Science and a minor in Math. I work at Idea2Product, the 3D printing lab on campus (yes we're open). The dog in the picture is my sister's West Highland Terrier named Xena. I Enjoy making things, whether it be 3D printing a planter for my succulents, or making long boards and spray painting space on th bottom. This seems like a well worth taking class and I'm excited to see the website grow.")}
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
