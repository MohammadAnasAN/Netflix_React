// Modal.js
import React from 'react';
import './modal.css';

const Modal = (props) => {
    if (!props.show) {
        return null;
    }
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Notification</h2>
                <p>{props.message}</p>
                <button onClick={props.onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
