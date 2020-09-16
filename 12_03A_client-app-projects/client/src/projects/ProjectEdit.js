
import React, { Component } from 'react';

class ProjectEdit extends Component {

    constructor() {
        super();
        console.log(this.props);
        this.state = {
            project: {
                id: '',
                name: '',
                code: '',
                description: ''
            }
        }

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.handleFormInputChange = this.handleFormInputChange.bind(this);
    }

    componentDidMount() {
        this.setState({project: {
            id: this.props.project.id || '',
            name: this.props.project.name || '',
            code: this.props.project.code || '',
            description: this.props.project.description || ''
        }})
    }

    onFormSubmit(e) {
        e.preventDefault();
        const elements = e.target.elements;
        console.log(elements.name.value);
        this.setState((prevState) => ({
                project: {
                    id: prevState.project.id,
                    name: elements.name.value,
                    code: elements.code.value,
                    description: elements.description.value
                }
            }),
            () => { 
                console.log('Project edited', this.state);
                this.props.handleProjectEdit(this.state.project);
            }
        );
    }

    handleFormInputChange(e) {
        console.log('handleFormInputChange', e.target.name, e.target.value)
        const value = e.target.value;
        const name = e.target.name;

        this.setState((prevState) => ({
                project: {
                    ...this.state.project,
                    [name]: value
                }
            })
        );
    }

    render() {
        return (
            <div className="col-8 pt-2">
                <form onSubmit={this.onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input value={this.state.project.name}
                            onChange={this.handleFormInputChange}
                            name="name" type="text" className="form-control" id="name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="code">Code</label>
                        <input value={this.state.project.code} 
                            onChange={this.handleFormInputChange}
                            name="code" type="text" className="form-control" id="code" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input value={this.state.project.description} 
                            onChange={this.handleFormInputChange}
                            name="description" type="text" className="form-control" id="description" />
                    </div>
                    <button className="btn btn-success">Save</button>
                </form>
            </div>
        )
    }
}

export default ProjectEdit; 
