import React, { Component } from 'react';
import BackdropComponent from '../BackdropComponent/BackdropComponent';

const modalStyle = {
    position: "fixed",
    zIndex: "500",
    backgroundColor: "white",
    width: "85%",
    height: "auto",
    border: "1px solid #ccc",
    boxShadow: "1px 1px 1px black",
    padding:"16px",
    left: "7.5%",
    right: "7.5%",
    top: "5%",
    bottom: "5%",
    overflowY:"auto",
    boxSizing: "border-box",
    transition: "all 0.3s ease-out",
}



class Modal extends Component {

    render() {
        return (
            <div style={{ display: this.props.show ? 'block' : 'none'}}>
                <BackdropComponent show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    style={{
                        ...modalStyle,
                        opacity: this.props.show ? '1' : '0',
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)'
                    }} >
                    {this.props.children}
                </div>
            </div>
        );
    }
}
export default Modal;