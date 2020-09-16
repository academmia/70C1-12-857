import React from 'react';

const Dashboard = (props) => {
    return (
        <div className="jumbotron">
            <h1 className="display-3">Dashboard</h1>
            <p className="lead">Simple Project Manager</p>
            <hr className="my-4" />
            <p>Overview your projects data</p>
            <p className="lead">
                <a className="btn btn-primary btn-sm">My open tasks</a>
            </p>
        </div>
    )
}

export default Dashboard; 