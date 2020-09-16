
import React, {Component} from 'react';

class ProjectsSearch extends Component {
   
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e) => {
        console.log('Search by: ', e.target.value);
        this.props.onFilterChange(e.target.value);
    }

    // utilizam hook-ul care ne spune cand componenta este gata
    componentDidMount() {
        this.searchField.focus();
    }

    render() {
        return (
            <fieldset>
                <legend>Search project:</legend>
                <input 
                    ref={(input) => { this.searchField = input }}
                    onChange={this.handleChange}  
                    style={ {border: "1px solid orange"} } />
            </fieldset>
        ); 
    }

}


export default ProjectsSearch;