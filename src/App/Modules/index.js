import React from 'react'

function Module(props) {
    return (
        <React.Fragment>
            {props.children}
        </React.Fragment>
    );
}

export default Module;