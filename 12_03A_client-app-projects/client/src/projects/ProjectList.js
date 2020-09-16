import React, { Component } from 'react';
import ProjectItem from './ProjectItem';
import ProjectsFilter from './ProjectsFilter';
import ProjectsSearch from './ProjectsSearch';
import ProjectInfoModal from './ProjectInfoModal';
import ProjectAdd from './ProjectAdd';
import ProjectEdit from './ProjectEdit';
import db from '../apiserver/db';
import { project as projectSettings } from '../settings.json';

class ProjectList extends Component {

    constructor(){
        super();
        this.state = {
            currentProject: null,
            projects: db.projects,      // nu e good practice ca aici sa interogam serverul !
            allProjects: db.projects,
            allTasks: db.tasks,
            projectSettings: projectSettings,
            projectToShow: null,
            projectInfoOpen: false, 
            projectAddOpen: false,
            projectEditOpen: false,
            projectToEdit: null,
            searchText: '',
        }
        this.setCurrentProject = this.setCurrentProject.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
        this.openProjectInfoModal = this.openProjectInfoModal.bind(this);
        this.closeProjectInfoModal = this.closeProjectInfoModal.bind(this);

        this.handleProjectAdd = this.handleProjectAdd.bind(this);
        this.handleProjectSave = this.handleProjectSave.bind(this);
        this.handleProjectEdit = this.handleProjectEdit.bind(this);
        this.editProject = this.editProject.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
    }

    setCurrentProject(project) {
        let currentProjectTasks = this.state.allTasks
            .filter( task => task.project_id === project.id);
        console.log('Filtered tasks: ', currentProjectTasks);
        project.tasks = currentProjectTasks;
        this.setState( {currentProject: project} );
    }

    onFilterChange(searchText) {
        // console.log(this.state);
        let filteredProjects = this.state.allProjects.filter( project => {
            return  project.name.toLowerCase().includes(searchText.toLowerCase()) ||
                    project.description.toLowerCase().includes(searchText.toLowerCase());
        });
        this.setState( () => ({ 
            searchText: searchText,
            projects: filteredProjects }))
    }

    openProjectInfoModal(project) {
        this.projectToShow = project;
        this.setState(() => ({
            projectToShow: project,
            projectInfoOpen: true
        }));
    }

    closeProjectInfoModal() {
        this.setState(() => ({
            projectToShow: null,
            projectInfoOpen: false
        }));
    }

    componentDidMount() {
        this.filterField && this.filterField.focus();
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate');
        console.log(this.props, this.state);
        console.log(nextProps, nextState);

        // if ( 
        //     this.state.searchText !== nextState.searchText ||
        //     this.state.currentProject !== nextState.currentProject ||
        //     this.state.projectSettings !== nextState.projectSettings ||
        //     this.state.projectToShow !== nextState.projectToShow ||
        //     this.state.projectInfoOpen !== nextState.projectInfoOpen ||
        //     this.state.projectAddOpen !== nextState.projectAddOpen 
        // )
        return true;
        // return false;
    }

    handleProjectAdd() {
        this.setState(() => ({ projectAddOpen: true }));
    }
    
    handleProjectSave(project) {
        console.log('ProjectList has received a new project: ', project);
        this.setState(() => ({ projectAddOpen: false }));
        if (project) {
            if (typeof project.id === 'undefined')
                project.id = this.state.allProjects.length + 1000;
            this.setState((prevState) => ({
                projects: prevState.projects.concat(project),
                allProjects: prevState.allProjects.concat(project)
            }))
        }   
    }

    editProject(project) {
        this.setState(() => ({
            projectToEdit: project,
            projectEditOpen: true
        }));
    }

    handleProjectEdit(project) {
        let calcProjects = (projects, project) => {
            
            const index = projects.findIndex( (el) => el.id === project.id );
            let newProjects = projects.filter( (el) => el.id !== project.id);
            newProjects.splice(index, 0, project)

            return newProjects;
        }

        console.log('ProjectList::edit: ', project);
        this.setState(() => ({ projectEditOpen: false }));
        if (project && project.id) {

            let newProjects = calcProjects(this.state.projects, project);
            let newAllProjects = calcProjects(this.state.allProjects, project);

            this.setState(() => ({
                projects: newProjects,
                allProjects: newAllProjects
            }))
        }

    }

    deleteProject(project) {
        this.setState((prevState) => ({
            projects: prevState.projects.filter( (el) => el.id !== project.id),
            allProjects: prevState.projects.filter( (el) => el.id !== project.id)
        }));
    }

    // onFilterChange = 'notfn';
    // <ProjectsSearch onFilterChange={this.onFilterChange} />

    render() {
        return (
            <div>
                <div className="row justify-content-center"> 
                    <div className="col-8 pt-2">
                        <h6 className="float-right"> Current project:  {this.state.currentProject && this.state.currentProject.name} </h6>
                    </div>
                </div>
                <div className="row justify-content-center"> 
                    <div className="col-4 pt-2">
                    {   true ?
                        <ProjectsSearch onFilterChange={this.onFilterChange} /> :
                        <ProjectsFilter
                            filterRef={(input) => { this.filterField = input }}
                            onFilterChange={this.onFilterChange} />
                    }
                    </div>
                    <div className="col-4 pt-2">
                        <button 
                            onClick={this.handleProjectAdd}
                            className="btn btn-success btn-sm float-right"> Add project </button>
                    </div>
                </div>
                <div className="row justify-content-center">
                    {   this.state.projectAddOpen && 
                        <ProjectAdd handleProjectSave={this.handleProjectSave} /> } 
                    {   this.state.projectEditOpen && 
                        <ProjectEdit 
                            project={this.state.projectToEdit}
                            handleProjectEdit={this.handleProjectEdit} /> } 
                    {
                        this.state.projects.map(project => {
                            return (
                                <ProjectItem key={project.id} 
                                    {...this.state.projectSettings}
                                    currentProject={this.state.currentProject} 
                                    project={project} setCurrentProject={this.setCurrentProject}
                                    editProject={this.editProject}
                                    deleteProject={this.deleteProject}
                                    openProjectInfoModal={this.openProjectInfoModal} />
                            )
                        })
                    }
                </div>

                <ProjectInfoModal 
                    projectInfoOpen={this.state.projectInfoOpen}
                    project={this.state.projectToShow}
                    closeProjectInfoModal={this.closeProjectInfoModal} />

            </div>
        );
    }
}

export default ProjectList;
