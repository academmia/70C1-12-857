
import React from 'react';
import PropTypes from 'prop-types';

const ProjectsFilter = (props) => {
   
    let handleChange = (e) => {
        console.log('Filtered by: ', e.target.value);
        props.onFilterChange(e.target.value);
    }

    return (
        <fieldset>
            <legend>Search project:</legend>
            <input
                ref={props.filterRef} 
                onChange={handleChange}
                style={ {border: "1px solid violet"} }  />
        </fieldset>
    );

}

ProjectsFilter.propTypes = { 
    onFilterChange: PropTypes.func
}


export default ProjectsFilter;

