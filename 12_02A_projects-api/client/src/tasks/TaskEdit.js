
import React, { Component } from 'react';
import db from '../apiserver/db';

class TaskEdit extends Component {
    constructor(props) {
        console.log(props);
        super(props);
        this.state = {
            id: this.props.match.params.id,
            task: null
        }
    }

    componentDidMount() {
        this.setState((prevState) => ({
            task: db.tasks.filter(task => task.id.toString() === this.state.id)[0]
        }))
    }

    render() {
        return (
            <div className="card card-inverse">
                <div className="card-block p-3">
                    <h3 className="card-title">{this.state.task && this.state.task.subject}</h3>
                    <h6 className="card-subtitle mb-2 text-muted">ID: {this.state.id}</h6>
                    <p className="card-text">{this.state.task && this.state.task.description}</p>
                    <a className="btn btn-outline-secondary">Salveaza</a>
                </div> 
            </div>
        )
    }
}


// const TaskEditFn = ({ match }) => {
//     return (
//         <div className="card card-inverse">
//             <div className="card-block p-3">
//                 <h3 className="card-title">Edit Task</h3>
//                 <h6 class="card-subtitle mb-2 text-muted">ID: {match.params.id}</h6>
//                 <p className="card-text">Acest card va contine un editor pentru editarea de task-uri noi</p>
//                 <a className="btn btn-outline-secondary">Salveaza</a>
//             </div>
//         </div>
//     )
// }

export default TaskEdit;
