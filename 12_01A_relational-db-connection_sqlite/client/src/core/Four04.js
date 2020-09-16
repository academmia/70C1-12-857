import React from 'react';
import './four04.css';
import { linkList } from './four04.css.js';

const Four04 = (props) => {
    return (
        <div className="nb-error">
            <div className="error-code">404</div>
            <h3 className="font-bold">We couldn't find the page..</h3>

            <div className="error-desc">
                Sorry, but the page you are looking for was either not found or does not exist.

                <ul className="list-inline text-center text-sm" style={linkList}>
                    <li className="list-inline-item"><a>Home</a></li>
                    <li className="list-inline-item"><a>Projects</a></li>
                    <li className="list-inline-item"><a>Tasks</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Four04;
