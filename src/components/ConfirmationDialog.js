import React from "react";

const ConfirmationDialog = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div style={{ position: "fixed", top: "0", left: "0", width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "5px", textAlign: "center" }}>
                <p>{message}</p>
                <button onClick={onConfirm} style={{ marginRight: "10px" }}>Confirm</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default ConfirmationDialog;
