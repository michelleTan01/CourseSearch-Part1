import React from 'react';
import './App.css';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Sidebar from './Sidebar';
import CourseArea from './CourseArea';
import { ListGroup } from 'react-bootstrap';
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allCourses: {},
      filteredCourses: {},
      cartCourses: {},
      subjects: []
    };
  }
  componentDidMount() {
    fetch('http://mysqlcs639.cs.wisc.edu:53706/api/react/classes').then(
      res => res.json()
    ).then(data => this.setState({ allCourses: data, filteredCourses: data, subjects: this.getSubjects(data) }));
  }

  getSubjects(data) {
    let subjects = [];
    subjects.push("All");

    for (const course of Object.values(data)) {
      if (subjects.indexOf(course.subject) === -1)
        subjects.push(course.subject);
    }

    return subjects;
  }

  setCourses(courses) {
    this.setState({ filteredCourses: courses })
  }

  isInCart(course, section, subsection) {
    //check course
    if (course.number in this.state.cartCourses) {
      //section
      if (section == null || section.number in this.state.cartCourses[course.number].sections) {
        //subsection
        if (subsection == null || subsection.number in this.state.cartCourses[course.number].sections[section.number].subsections) {
          console.log("is in cart!")
          return true;
        }
      }
    }
    return false;
  }

  addCourse(course, section, subsection) {
    console.log(this.state.cartCourses);
    //initialize selected with course data
    var temp = Object.assign({}, this.state.cartCourses);
    let selected = {
      number: course.number,
      name: course.name,
      credits: course.credits,
      subject: course.subject,
      description: course.description,
      requisites: course.requisites,
      keywords: course.keywords,
      sections: {}
    };

    console.log(selected)


    //add a course
    if (section === null) {
      console.log(this.state.cartCourses);
      console.log(course);
      // add all sections
      for (const sec of Object.values(course.sections)) {
        let sect = {
          number: sec.number,
          instructor: sec.instructor,
          location: sec.location,
          time: sec.time,
          subsections: {}
        }
        //add all subsections
        for (const subsec of Object.values(sec.subsections)) {
          sect.subsections[subsec.number] = subsec;
        }
        selected.sections[sec.number] = sect;
      }

      temp[selected.number] = selected;
      this.setState((state, props) => ({
        cartCourses: temp
      }));
      return true;
    }

    //add a section
    else if (subsection === null) {
      //add course if not added previously
      if (!this.isInCart(course, null, null)) {
        let sect = {
          number: section.number,
          instructor: section.instructor,
          location: section.location,
          time: section.time,
          subsections: {}
        }
        //add all subsections
        for (const subsec of Object.values(section.subsections)) {
          sect.subsections[subsec.number] = subsec;
        }
        selected.sections = { [section.number]: sect };
      }
      //course has been added
      else {
        selected.sections = temp[selected.number].sections;
        console.log("course has been added")
        console.log(selected);
        let sect = {
          number: section.number,
          instructor: section.instructor,
          location: section.location,
          time: section.time,
          subsections: {}
        }
        //add all subsections
        for (const subsec of Object.values(section.subsections)) {
          sect.subsections[subsec.number] = subsec;
        }
        selected.sections[section.number] = sect;
      }
      temp[selected.number] = selected;
      this.setState((state, props) => ({
        cartCourses: temp
      }));
      return true;
    }

    //add a subsection
    else {
      let selectedSec = {
        number: section.number,
        instructor: section.instructor,
        location: section.location,
        time: section.time,
        subsections: { [subsection.number]: subsection }
      }
      //add course if not in cart already
      if (!this.isInCart(course, null, null)) {
        console.log("add course")
        selected.sections = { [selectedSec.number]: selectedSec };
        temp[selected.number] = selected;
      }

      //add section if not in cart already
      else if (!this.isInCart(course, section, null)) {
        console.log("new section - add subsec")
        temp[selected.number].sections[selectedSec.number] = selectedSec;
      }
      //add subsection
      else {
        console.log("correct!!!")
        temp[selected.number].sections[section.number].subsections[subsection.number] = subsection;
      }
      this.setState((state, props) => ({
        cartCourses: temp
      }));
      console.log(temp);
      return true;
    }
  }





  removeCourse(course, section, subsection) {
    var temp = Object.assign({}, this.state.cartCourses);

    //delete course
    if (section === null) {
      delete temp[course.number];
    }

    //delete section
    else if (subsection === null) {
      delete temp[course.number].sections[section.number];
      console.log(Object.keys(temp[course.number].sections).length)
      if (Object.keys(temp[course.number].sections).length === 0) {
        delete temp[course.number];
      }
    }

    //delete subsection
    else {
      delete temp[course.number].sections[section.number].subsections[subsection.number];
      if (Object.keys(temp[course.number].sections[section.number].subsections).length === 0) {
        delete temp[course.number].sections[section.number];
        if (Object.keys(temp[course.number].sections).length === 0) {
          delete temp[course.number];
        }
      }
    }
    this.setState({
      cartCourses: temp
    });

  }

  render() {

    return (
      <>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <Tabs defaultActiveKey="search" style={(Object.keys(this.state.cartCourses).length) === 0 ? { position: 'fixed', zIndex: 1, width: '100%', backgroundColor: '#dae8e8' } : { position: 'fixed', zIndex: 1, width: '100%', backgroundColor: '#e3deba' }}>
          
          <Tab eventKey="search" title="Search" style={{ paddingTop: '5vh' }}>
            
            <ListGroup horizontal style={{backgroundColor:'#dae8e8'}}>
              
              <ListGroup.Item style={{ width: '35%', backgroundColor:'#b4cccc'}}>
                
                <ListGroup vertical style={{ margin: '0px' }} >
                  
                  <ListGroup.Item variant="info" style={{ height: "66%",backgroundColor:"#a3bfbf" }}>
                    <Sidebar setCourses={(courses) => this.setCourses(courses)} courses={this.state.allCourses} subjects={this.state.subjects} />
                  </ListGroup.Item>
                  
                  <ListGroup.Item variant="success" style={{ marginBlockStart: "auto",backgroundColor:"#aecfb7" }}>
                    <div>
                      <h5>Cart Quick Access</h5>
                      <p>See details of course(s) in cart at the "Cart" tab on top.</p>
                      <CourseArea data={this.state.cartCourses} allData={this.state.allCourses} addCourse={this.addCourse.bind(this)} removeCourse={this.removeCourse.bind(this)} isInCart={this.isInCart.bind(this)} cartMode={true} quickView={true} />
                    </div>
                  </ListGroup.Item>
                
                </ListGroup>
              
              </ListGroup.Item>

              <ListGroup.Item style={{ width: '63%',backgroundColor:"#b4cccc" }}>
                
                <ListGroup.Item variant="info" style={{backgroundColor:"#a3bfbf" }}>
                  <div>
                    <CourseArea data={this.state.filteredCourses} allData={this.state.allCourses} addCourse={this.addCourse.bind(this)} isInCart={this.isInCart.bind(this)} cartMode={false} quickView={false} />
                  </div>
                </ListGroup.Item>
              
              </ListGroup.Item>
            
            </ListGroup>
          
          </Tab>

          <Tab eventKey="cart" title={(Object.keys(this.state.cartCourses).length) === 0 ?"Cart":"Cart <---"} style={(Object.keys(this.state.cartCourses).length) === 0 ?{paddingTop: '5vh'}:{paddingTop: '10vh', color:'#4b5e59'}}>
            <div style={{ marginLeft: '5vw', marginRight: '5vw'}}>
              <CourseArea data={this.state.cartCourses} allData={this.state.allCourses} addCourse={this.addCourse.bind(this)} removeCourse={this.removeCourse.bind(this)} isInCart={this.isInCart.bind(this)} cartMode={true} quickView={false} />
            </div>
          </Tab>
          
        </Tabs>
      </>
    )
  }
}

export default App;
