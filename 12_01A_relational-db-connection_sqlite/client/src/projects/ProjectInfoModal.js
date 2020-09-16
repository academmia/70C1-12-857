import React from 'react';
import Modal from 'react-modal';

const ProjectInfoModal = (props) => (
    <Modal style={{"content": { 
                        "top": "100px",
                        "left": "200px",
                        "right": "200px",
                        "bottom": "140px"}}}
        isOpen={props.projectInfoOpen} 
        onRequestClose={props.closeProjectInfoModal} >
        <div className="card" style={{height: "100%"}}>
            <div className="card-body">
                <h4 className="card-title">{props.project && props.project.name}</h4>
                <h6 className="card-subtitle mb-2 text-muted">{props.project && props.project.code}</h6>
                <p className="card-text">{props.project && props.project.description}</p>
            </div>
            <div className="card-footer">
                <button onClick={props.closeProjectInfoModal}
                    className="btn btn-info btn-sm"> Close </button>
            </div>
        </div>
    </Modal>
);
 

Modal.setAppElement('#root');

export default ProjectInfoModal;
