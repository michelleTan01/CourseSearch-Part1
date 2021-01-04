import React from 'react';
import { Card } from 'react-bootstrap';
import './App.css';
import Section from './Section'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'

class Course extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.cartMode) {
      this.state = {
        button: "Remove from Cart"
      };
    } else {
      this.state = {
        button: "Add to Cart"

      };
    }
  }

  buttonClicked = () => {
    let course = this.props.data;
    if (!this.props.cartMode) {
      this.props.addCourse(course, null, null);
    } else if (this.props.cartMode) {
      this.props.removeCourse(course, null, null);
    }
  }


  //display______________________________
  joinArray(arr, sep) {
    return arr.join(sep);
  }

  getReq(req) {
    if (req.length === 0) {
      return "None";
    }
    var result = "";
    for (var row = 0; row < req.length; row++) {
      if (req[row].length === 1) {
        result += req[row].join(" OR ");
      } else {
        result += "(";
        result += req[row].join(" OR ");
        result += ")";
      }
      result += (req.length - row) === 1 ? "" : " AND ";
    }
    return result;
  }


  getSections() {
    let sections = [];
    for (const section of Object.values(this.props.data.sections)) {
      sections.push(
        <li key={section.number}><Section key={section.number} data={section} course={this.props.data} addCourse={this.props.addCourse} removeCourse={this.props.removeCourse} isInCart={this.props.isInCart} cartMode={this.props.cartMode} quickView={this.props.quickView} /></li>
      )
    }

    return sections;
  }



  render() {
    let data = this.props.data;
    if (this.props.quickView) {
      return (
        <Accordion defaultActiveKey="1" >
          <Card>
            <Card.Header style={{backgroundColor:"#bddec6" }}>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                <h6 style={{ display: 'inline-block' }}>{data.number}: {data.name}&nbsp;</h6>

              </Accordion.Toggle>
              <Button variant={(this.props.cartMode ? "danger" : "success")} size="sm" onClick={this.buttonClicked}>{this.state.button}</Button>
            </Card.Header>
            <Accordion.Collapse eventKey="0">

              <Card.Body>
                <p style={{ fontSize: '15px' }}>Sections: </p>
                <ul>
                  {this.getSections()}
                </ul>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      );
    } else {
      return (
        <div>
          <Accordion defaultActiveKey="1">
            <Card>
              <Card.Header style={this.props.cartMode ? { backgroundColor: '#b4cccc' } : { backgroundColor: '#cce3e2' }}>
                <Accordion.Toggle as={Button} variant="link" eventKey="0" >
                  <h5 style={{ display: 'inline-block' }}>{data.number}: {data.name}</h5>
                </Accordion.Toggle>
                <p style={{ display: 'inline-block', fontWeight: "bold" }}>&nbsp;| ({data.credits} Credits)&nbsp;</p>
                <Button variant={(this.props.cartMode ? "danger" : "success")} onClick={this.buttonClicked}>{this.state.button}</Button>
              </Card.Header>

              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <p style={{ fontSize: '18px' }}>Subject: {data.subject}</p>
                  <p>{data.description}</p>
                  <p style={{ display: 'inline-block', fontWeight: "bold" }}>Requisites: &nbsp;</p>
                  <p style={{ display: 'inline-block' }}>{this.getReq(data.requisites)}</p>
                  <br />
                  <u style={{ display: 'inline-block' }}>Keywords: </u>
                  <p style={{ display: 'inline-block' }}>&nbsp;{this.joinArray(data.keywords, ', ')}</p>
                  <p style={{ fontSize: '20px' }}>Sections: </p>
                  <ul>
                    {this.getSections()}
                  </ul>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      )
    }
  }
}

export default Course;
