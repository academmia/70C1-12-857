
import React from 'react';

const TaskNew = () => {
    return (
        <div className="card card-inverse">
            <div className="card-block p-3">
                <h3 className="card-title">New Task</h3>
                <p className="card-text">Acest card va contine un editor pentru adaugarea de task-uri noi</p>
                <a className="btn btn-outline-secondary">Salveaza</a>
            </div>
        </div>
    )
}

export default TaskNew;
