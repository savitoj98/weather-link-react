import React from 'react';

const backdropStyle = {
    width: "100%",
    height: "100%",
    position: "fixed",
    zIndex: "105",
    left: "0",
    top: "0",
    backgroundColor: "rgba(0,0,0,0.5)"
}

const backdrop = (props) => (
    props.show ? <div style={backdropStyle} onClick={props.clicked} ></div> : null
);

export default backdrop;