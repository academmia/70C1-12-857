import React from 'react';

const withProjectTaskListEmpty = (ProjectTaskList) => {
    let enhanced = (props) => {
        let noTasksMessage = props.noTasksMessage ?
            props.noTasksMessage :
            'No tasks for this project!';
      return (
        <div>  
            { 
                !props.tasks.length ? 
                <div className="pt-2"> 
                    <div className="alert alert-secondary" role="alert">
                        HOC: {noTasksMessage} 
                    </div>
                </div> :
                <ProjectTaskList { ...props } />
            }
        </div>
      )}

    enhanced.defaultProps = ProjectTaskList.defaultProps;
    return enhanced;
  }

  export default withProjectTaskListEmpty