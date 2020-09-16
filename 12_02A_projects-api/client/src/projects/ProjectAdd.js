
import React, { Component } from 'react';
import DisplayErrors from './DisplayErrors';

class ProjectAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            project:{
                name: '',
                code: '',
                description: ''
            },
            formErrors: { name: '', code: ''},
            formValid: false,
            projectValid: {
                name: false,
                code: false,
            }
        }

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.validateField = this.validateField.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleFormInputChange = this.handleFormInputChange.bind(this);
    }

    onFormSubmit(e) {
        e.preventDefault();
        const elements = e.target.elements;
        console.log(elements.name.value);
        this.setState(() => ({
            project:{
                name: elements.name.value,
                code: elements.code.value,
                description: elements.description.value
            }
            }),
            () => { 
                console.log('Project saved', this.state);
                this.props.handleProjectSave(this.state.project);
            }
        );
    }

    
    handleFormInputChange(e) {
        const value = e.target.value;
        const name = e.target.name;

        this.setState((prevState) => ({
                project: {
                    ...this.state.project,
                    [name]: value
                }
            }),
            () => { 
                this.validateField(name, value);
            }
        );
    }
    
    validateField(fieldName, value) {
        console.log('validateField', fieldName, value);
        let fieldValidationErrors = this.state.formErrors;
        let nameValid = this.state.projectValid.name;
        let codeValid = this.state.projectValid.code;

        switch(fieldName) {
            case 'name':
                nameValid = value.length >= 5;
                fieldValidationErrors.name = nameValid ? '' : ' is too short';
                break;
            case 'code':
                codeValid = value.length >= 2;
                fieldValidationErrors.code = codeValid ? '' : ' is too short';
                break;
            default:
                break;
        }
        this.setState({ 
                formErrors: fieldValidationErrors,
                projectValid: {
                    code: codeValid,
                    name: nameValid
                }
            
          }, this.validateForm);

    }

    validateForm() {
        console.log('validateForm');
        this.setState({
            formValid: this.state.projectValid.code && 
                this.state.projectValid.name 
        });
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'is-invalid');
     }

    render() {
        return (
            <div className="col-8 pt-2">
                <form onSubmit={this.onFormSubmit}>
                    <DisplayErrors formErrors={this.state.formErrors} />

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input value={this.state.project.name}
                            onChange={this.handleFormInputChange}
                            className={`form-control ${this.errorClass(this.state.formErrors.name)}`}
                            name="name" type="text" id="name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="code">Code</label>
                        <input value={this.state.project.code} 
                            onChange={this.handleFormInputChange} 
                            className={`form-control ${this.errorClass(this.state.formErrors.code)}`}
                            name="code" type="text" id="code" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input value={this.state.project.description} 
                            onChange={this.handleFormInputChange} 
                            name="description" type="text" className="form-control" id="description" />
                    </div>
                    <button
                        disabled={!this.state.formValid} 
                        className="btn btn-success">Save</button>
                </form>
            </div>
        )
    }
}

export default ProjectAdd; 
