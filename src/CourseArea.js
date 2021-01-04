import React from 'react';
import './App.css';
import Course from './Course';

class CourseArea extends React.Component {


  getCourses() {
    let courses = [];
    for (const course of Object.values(this.props.data)) {
      console.log("cartMode(CourseArea): " + this.props.cartMode);
      courses.push(
        <Course key={course.number} data={course} addCourse={this.props.addCourse} removeCourse={this.props.removeCourse} cartMode={this.props.cartMode} isInCart={this.props.isInCart} quickView = {this.props.quickView}/>
      )
    }
    return courses;
  }


  render() {
    return (
        <div>
          {this.getCourses()}
        </div>


    )
  }
}

export default CourseArea;
