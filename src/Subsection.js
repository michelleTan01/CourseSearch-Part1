import React from 'react'
import './App.css'

import Button from 'react-bootstrap/Button'

class Subsection extends React.Component {
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
		let section = this.props.section;
		let sub = this.props.data;
		if (!this.props.cartMode) {
			this.props.addCourse(course, section, sub);
		} else if (this.props.cartMode) {
			this.props.removeCourse(course, section, sub);
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


	render() {
		let subsec = this.props.data;
		if (this.props.quickView) {
			return (
				<div>
					<p style={{ fontSize: '15px', display: 'inline-block' }}>{subsec.number}&nbsp;</p>
					<Button variant={(this.props.cartMode ? "danger" : "success")} size="sm" onClick={this.buttonClicked}>{this.state.button}</Button>
				</div>
			);
		}
		return (
			<div>
				<p style={{ display: 'inline-block' }}>&nbsp;{subsec.number}</p>
				<Button variant={(this.props.cartMode ? "danger" : "success")} size="sm" onClick={this.buttonClicked}>{this.state.button}</Button>
				<ul>
					<li>{subsec.location}</li>
					<li>Meeting Times:
						<ul>{this.getTime(subsec.time)}</ul>
					</li>
				</ul>
			</div>
		)
	}
}

export default Subsection;