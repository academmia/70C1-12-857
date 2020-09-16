import React, { Component } from 'react';
import ProjectList from './projects/ProjectList';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Navbar from './layout/Navbar';
import Home from './Home/Home';
import Dashboard from './dashboard/Dashboard';
import Profile from './profile/Profile';
import TaskLayout from './tasks/TaskLayout';
import Four04 from './core/Four04';
import Login from './authentication/Login';

class App extends Component {
	title = 'Simple Project Manager';

	profile = {
		name: 'James Hansen',
		bio: 'Great great cat'
	};

	render() {
		return (
			<main className="container pt-3">
				<Navbar title={this.title} />
				<Switch>
					<Route path="/home" component={Home} />
					<Route path="/projects" component={ProjectList} />
					<Redirect from="/tasks/list" to="/tasks" />
					<Route path="/dashboard" exact component={Dashboard} />
					<Route
						path="/profile"
						exact
						render={() => <Profile profile={this.profile} />}
					/>
					<Route path="/tasks" component={TaskLayout} />
					<Route path="/login" component={Login} />
					<Route component={Four04} />
				</Switch>
			</main>
		);
	}
}

export default App;
