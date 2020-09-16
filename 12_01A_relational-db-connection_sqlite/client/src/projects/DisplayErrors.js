import React from 'react';

const DisplayErrors = ({ formErrors }) => (
    <div className='formErrors'>
        {Object.keys(formErrors).map((fieldName, i) => {
            if(formErrors[fieldName].length > 0){
            return (
                <em><code key={i}>{fieldName} {formErrors[fieldName]}<br/></code></em>
            )        
            } else {
                return '';
            }
        })}
    </div>
)

export default DisplayErrors
