import React from 'react';

import { Switch, Route, NavLink, Redirect } from 'react-router-dom';
import TaskList from './TaskList';
import TaskNew from './TaskNew';
import TaskEdit from './TaskEdit';

const TaskLayout = ({ match, ...props }) => {
    return (
            <div className="container">
                <div className="row">
                    <h4 className="mt-4 ml-3">Tasks</h4>
                </div>
                <div className="row">
                    <div className="col-md-3 mt-2">
                        <NavLink exact to={`${match.url}`}  activeClassName="active"
                            className="btn btn-block btn-outline-info">All tasks</NavLink>
                        <NavLink exact to={`${match.url}/new`}  activeClassName="active"
                            className="btn btn-block btn-outline-info">New task</NavLink>
                        <hr />
                        <h5>Owner / Asignee:</h5>
                        <button className="btn btn-block btn-outline-info">FOR Me</button>
                        <button className="btn btn-block btn-outline-info">BY Me</button>
                        <hr />
                        <h5>Status:</h5>
                        <button className="btn btn-block btn-outline-info">New</button>
                        <button className="btn btn-block btn-outline-info">Working</button>
                        <button className="btn btn-block btn-outline-info">Closed</button>
                    </div>
                    <div className="col-md-9">
                        <Switch>
                            <Route exact path={`${match.url}`} component={TaskList}/>
                            <Route path={`${match.url}/new`} component={TaskNew}/>
                            <Route path={`${match.url}/edit/:id`} component={TaskEdit}/>
                            <Redirect from={`${match.url}/edit`} to={`${match.url}/new`} />
                        </Switch>
                    </div>
                </div>
            </div>
    )
}

export default TaskLayout;
