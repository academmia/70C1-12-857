import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Div from '../hoc/Div';
import withProjectTaskListEmpty from '../hoc/withProjectTaskListEmpty';
import ProjectTaskListIterator from './ProjectTaskListIterator';

import ReactConfirmAlert from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ProjectTaskListCond = withProjectTaskListEmpty(ProjectTaskListIterator);

class ProjectItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayTaskList: false,
            showConfirmDelete: false
        }
        this.onSetCurrent = this.onSetCurrent.bind(this);
        this.hideTaskList = this.hideTaskList.bind(this);
        this.onMoreInfo = this.onMoreInfo.bind(this);
        this.onEditProject = this.onEditProject.bind(this);
        this.onDeleteProject = this.onDeleteProject.bind(this);
        this.onStartDeleteProject = this.onStartDeleteProject.bind(this);
        this.onCancelDeleteProject = this.onCancelDeleteProject.bind(this);
    }

    onSetCurrent(e) {
        console.log(this.props);
        this.props.setCurrentProject(this.props.project);
        this.setState( () => ({ displayTaskList: true }) );
    }

    hideTaskList() {
        this.setState( () => ({ displayTaskList: false }) ); 
    }

    onMoreInfo() {
        this.props.openProjectInfoModal(this.props.project);
    }
    onEditProject() {
        console.log('onEditProject: ', this.props.project);
        this.props.editProject(this.props.project);
    }
    onDeleteProject() {
        this.props.deleteProject(this.props.project);
    }
    
    onStartDeleteProject() {
        this.setState(()=>({ showConfirmDelete: true }))
    }
    onCancelDeleteProject() {
        this.setState(()=>({ showConfirmDelete: false }))
    }

    render(){
        return (
            <div className="col-8 pt-2">
                <div className="card card-inverse card-outline-default text-white"
                        style={ {backgroundColor: "#555", borderColor: "#555"} }>
                    <h4 className="card-header">
                        {this.props.project.name}
                        <span className="float-right badge badge-default">
                            {this.props.project.code}
                            <button onClick={this.onStartDeleteProject}
                                type="button" className="btn btn-danger btn-sm ml-2">
                                Delete</button>   
                            <button onClick={this.onEditProject}
                                type="button" className="btn btn-warning btn-sm ml-2">
                                Edit</button>   
                            <Link to={`/tasks/?project_id=${this.props.project.id || ''}`} 
                                className="btn btn-info btn-sm ml-2">
                                Tasks</Link>   
                            <button onClick={this.onMoreInfo}
                                type="button" className="btn btn-secondary btn-sm ml-2">
                                More info</button>   
                            <button onClick={this.onSetCurrent}
                                type="button" className="btn btn-secondary btn-sm ml-2">
                                Set current</button>    
                        </span>
                    </h4>
                    <div className="card-text pt-2 pb-2 pl-4 pr-4">{this.props.project.description}</div>
                </div>
                {   this.state.displayTaskList &&
                    (this.props.currentProject && this.props.project.id === this.props.currentProject.id) &&
                    
                    ( 
                        <Div>
                            {   
                                this.props.showHideButton &&
                                <button onClick={this.hideTaskList} className="btn btn-info btn-sm ml-3 mt-1"> Hide </button>
                            }
                            <ProjectTaskListCond 
                                {...this.props}
                                tasks={ this.props.currentProject.tasks } />
                        </Div>
                    )
                }

                {
                    
                    this.state.showConfirmDelete &&
                    <ReactConfirmAlert
                        title="Confirm delete"
                        message="Delete selected project?"
                        confirmLabel="Delete"
                        cancelLabel="Cancel"
                        onConfirm={this.onDeleteProject}
                        onCancel={this.onCancelDeleteProject}
                    />
                }

            </div>
        );
    }
}

ProjectItem.defaultProps = { 
    showHideButton: true
}


ProjectItem.propTypes = { 
    showHideButton: PropTypes.bool,
    project: PropTypes.shape({ id: PropTypes.number, description: PropTypes.string}),
    currentProject: PropTypes.shape({ id: PropTypes.number}),
    openProjectInfoModal: PropTypes.func
}


export default ProjectItem;