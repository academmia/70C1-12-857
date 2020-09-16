import React, { Component } from 'react';
import { tasks } from './tasks';

class TaskItem extends Component {
    constructor(props) {
        super(props);
        console.log(tasks);
        this.state = {
            task: {
                "id": 101,
                "subject": "Task ONE",
                "description": "This is the description of Task ONE",
                "status": "Working",
              }
        }

        this.closeTaskObj = this.closeTaskObj.bind(this);
        this.closeTaskFn = this.closeTaskFn.bind(this);
    }

    closeTaskObj() {
        console.log('closeTaskObj');
        let rejectedTask =  {
            id: 101,
            subject: "Task ONE",
            description: "This is the description of Task ONE",
            status: "Rejected",
        };
        this.setState( { task: rejectedTask } );
        
        // daca statusul este Rejected atunci ramane Rejected
        // daca statusul nu este Rejected atunci putem sa-l inchidem
        if (this.state.task.status !== 'Rejected') {
            let closedTask =  Object.assign({}, this.state.task);
            console.log(closedTask === this.state.task);
            closedTask.status = 'Closed';
            this.setState( { task: closedTask } );
        }
    }

    closeTaskFn() {
        console.log('closeTaskFn');
        let rejectedTask =  {
            id: 101,
            subject: "Task ONE",
            description: "This is the description of Task ONE",
            status: "Rejected",
        };
        this.setState( (prevState) => { 
            console.log(prevState.task);
            return { task: rejectedTask } 
        });
        
        // daca statusul este Rejected atunci ramane Rejected
        // daca statusul nu este Rejected atunci putem sa-l inchidem
        this.setState( (prevState) => { 
            console.log(prevState.task);
            if (prevState.task.status !== 'Rejected') {
                // let closedTask = Object.assign({}, prevState.task);
                let closedTask = { ...prevState.task };
                console.log(closedTask === prevState.task);
                closedTask.status = 'Closed';
                return { 
                    task: closedTask 
                } 
            }
        });
    }

    render() {
        return (
            <div className="row justify-content-center">
                <div className="card" style={ {width: "20rem"} }>
                    <div className="card-body">
                        <h4 className="card-title">{this.state.task.subject}</h4>
                        <h6 className="card-subtitle mb-2 text-muted">Status: {this.state.task.status}</h6>
                        <p className="card-text">{this.state.task.description}</p>
                        <button onClick={this.closeTaskObj} className="btn btn-sm btn-info">Close task</button>
                        <button onClick={this.closeTaskFn} className="btn btn-sm btn-info ml-3">Close task (fn)</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default TaskItem;