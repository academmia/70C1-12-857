import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
	state = {
		email: '',
		password: ''
	};

	_onChangeEmail = e => {
		this.setState({
			email: e.target.value
		});
	};

	_onChangePassword = e => {
		this.setState({
			password: e.target.value
		});
	};

	_onSubmit = e => {
		e.preventDefault();
		const formData = {
			email: this.state.email,
			password: this.state.password
		};
		axios
			.post('http://localhost:3001/api/login', formData)
			.then(res => console.log(res.data))
			.catch( err => console.log(err) );

		this.setState({
			emai: '',
			password: ''
		});
	};

	render() {
		return (
			<div className="col-8 pt-2">
				<form onSubmit={this._onSubmit}>
					<div className="form-group">
						<label>Enter Email:</label>
						<input
							type="email"
							value={this.state.email}
							onChange={this._onChangeEmail}
							className="form-control"
						/>
					</div>
					<div className="form-group">
						<label>Enter Password:</label>
						<input
							type="password"
							value={this.state.password}
							onChange={this._onChangePassword}
							className="form-control"
						/>
					</div>
					<br />
					<button type="submit" className="btn btn-success">
						Submit
					</button>
				</form>
			</div>
		);
	}
}

export default Login;
