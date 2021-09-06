import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal'

const DeleteButton = ({ setUsers, allUsers, user }) => {

  // REACT BOOTSTRAP MODAL BUTTON FUNCTIONS
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  // DELETE REQUEST
  async function deleteUser(id) {
    try {
      await fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
      });

      setUsers(allUsers.filter((user) => user.user_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div className='m-1'>
    
    <Button variant="danger" onClick={handleShow}>
      Delete Profile
    </Button>

    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete your profile?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={() => deleteUser(user.user_id)}>
          DELETE
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
  );
};

export default DeleteButton;
