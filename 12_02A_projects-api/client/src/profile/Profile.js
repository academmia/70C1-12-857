import React from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

const Profile = (props) => {
    // informatii venite de la container
    let query = {
        owner_id: 10,
        asignee_id: 10
    }
    let searchString = queryString.stringify(query);

    return (
        <div className="card text-center">
            <div className="card-header">
                Profile
            </div>
            <div className="card-body">
                <h4 className="card-title">Name: {props.profile.name} </h4>
                <p className="card-text">About me: {props.profile.bio} </p>
                <a className="btn btn-primary text-white">Dashboard</a>
                <a className="btn btn-primary text-white ml-2">All Projects</a>
            </div>
            <div className="card-footer text-muted">
                <Link to={{
                    pathname: '/tasks',
                    search: searchString
                  }}> <em> Working on 7 tasks </em> </Link>    
            </div>
        </div>
    )
}

export default Profile;