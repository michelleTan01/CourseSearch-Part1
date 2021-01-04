import React from 'react'
import './App.css'
import Subsection from './Subsection.js'
import Button from 'react-bootstrap/Button'

class Section extends React.Component {

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
		let course = this.props.course;
		let section = this.props.data;
		if(!this.props.cartMode){
			console.log("section is not in cart")
			this.props.addCourse(course, section, null);
		} else if(this.props.cartMode) {
			this.props.removeCourse(course, section, null);
		}
	}

	getTime(t) {
		let result = [];
		var temp = "";
		for (var i in t) {
			temp = i + ": " + t[i];
			result.push(<li key={temp}>{temp}</li>);
		}
		return result;
	}

	getSubsections() {
		let subsections = [];
		for (const subsection of Object.values(this.props.data.subsections)) {
			subsections.push(
				<li key={subsection.number}><Subsection key={subsection.number} data={subsection} section={this.props.data} course={this.props.course} addCourse={this.props.addCourse} removeCourse={this.props.removeCourse} isInCart={this.props.isInCart} cartMode={this.props.cartMode} quickView = {this.props.quickView}/></li>
			)
		}
		if (subsections.length === 0) {
			return "None";
		}
		return subsections;
	}

	render() {
		let sec = this.props.data;
		if(this.props.quickView){
			return(
				<div>
				<p style={{ fontSize: '15px', display: 'inline-block' }}>{sec.number}&nbsp;</p>
				<Button variant={(this.props.cartMode?"danger":"success")} size="sm" onClick={this.buttonClicked}>{this.state.button}</Button>
				<p style={{ fontSize: '15px' }}>Subsections: </p>
				<ul>
					{this.getSubsections()}
				</ul>
				<br></br>
			</div>
			);
		}
		return (
			<div>
				<p style={{ fontSize: '15px', display: 'inline-block' }}>{sec.number}&nbsp;</p>
				<Button variant={(this.props.cartMode?"danger":"success")} size="sm" onClick={this.buttonClicked}>{this.state.button}</Button>
				<ul>
					<li>Instructor: {sec.instructor}</li>
					<li>Location: {sec.location}</li>
					<li>Meeting Times:
						<ul>{this.getTime(sec.time)}</ul>
					</li>
				</ul>
				<p style={{ fontSize: '15px' }}>Subsections: </p>
				<ul>
					{this.getSubsections()}
				</ul>
				<br></br>
			</div>
		)
	}
}

export default Section;