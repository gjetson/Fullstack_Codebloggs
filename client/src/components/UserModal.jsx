import '../css/userModal.css'

import React from 'react'
import { useState } from 'react'


function UserModal(props) {
    const [post, setPost] = useState("");
    const [isOpen, setIsOpen] = useState(true);
  
    const handleClose = () => {
      setIsOpen(false);
      props.onClose();
    };
  
    if (!isOpen) {
      return null;
    }
  
    return (
      <div className="custom-confirm">
        <h1 className="modal-header">
          User Card
          <button className="close-button" onClick={handleClose}>
            X
          </button>
        </h1>
      </div>
    );
  }
  

export default UserModal