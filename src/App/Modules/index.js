import React from 'react'

function Module(props) {
    return (
        <React.Fragment>
            <main>
                {props.children}
            </main>
        </React.Fragment>
    );
}

export default Module;