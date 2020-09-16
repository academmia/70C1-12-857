import React from 'react';
import PropTypes from 'prop-types';


const ProjectTaskList = (props) => {
    let noTasksMessage = props.noTasksMessage ?
                    props.noTasksMessage :
                    'No tasks for this project!';
    return (
        
        <div className="pt-2">
            {
                !props.tasks.length ?   
                <div className="alert alert-secondary" role="alert">
                    {noTasksMessage}
                </div>
                :
                props.tasks.map(task => {
                    return (
                        <div key={task.id} className="card">
                            <div className="card-text pt-2 pb-2 pl-4 pr-4">
                                <em><strong>{task.subject}</strong>: {task.description} </em>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

ProjectTaskList.defaultProps = { 
    noTasksMessage: "NO TASKS!"
}

ProjectTaskList.propTypes = { 
    noTasksMessage: PropTypes.string,
    task: PropTypes.shape({ id: PropTypes.number, subject:PropTypes.string}),
}


export default ProjectTaskList

