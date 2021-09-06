import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const EditPassword = ({ user }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [first_name] = useState(user.first_name);
  const [last_name] = useState(user.last_name);
  const [email] = useState(user.email);
  const [birthday] = useState(user.birthday);

  //  REACT BOOTSTRAP MODAL BUTTON FUNCTIONS //
  const handleClose = () => {
    // reset fields on close
    setOldPassword("");
    setPassword("");
    setShow(false);
  };
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  // -------------------------------------- //

  // password validation //

  // button disabling
  const isOldPasswordValid = () => {
    if (oldPassword === user.password) {
      // if old password in field equals current password
      return "valid";
    } else {
      return "invalid";
    }
  };
  const showWarningMessage = () => {
    // show warning if passwords are the same
    if (oldPassword.length > 0 && oldPassword === password) {
      return true;
    } else {
      return false;
    }
  };
  // for dynamic class name on input field
  const isNewPasswordValid = () => {
    if (
      password.length > 0 &&
      oldPassword !== password
    ) {
      return true;
    } else {
      return false;
    }
  };

  // PUT REQUEST
  const editPassword = async (id) => {
    try {
      const body = { first_name, last_name, password, birthday, email };

      await fetch(`http://localhost:5000/users/${id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="m-1">
      <Button variant="warning" onClick={handleShow}>
        Edit Password
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
        {/* old password */}
          <label for="old-password" className="form-label">
            Please Enter Your Old Password
          </label>
          <input
            type="password"
            id="old-password"
            required
            className={`form-control mb-4 ${isOldPasswordValid()}`}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />

          {/* new password */}
          <label for="new-password" className="form-label">
            Please Enter Your New Password
          </label>
          <input
            type="password"
            id="new-password"
            required
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {showWarningMessage() && (
            <span className="password-warning">
              Passwords can't be the same
            </span>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => editPassword(user.user_id)}
            disabled={!isNewPasswordValid()}
          >
            Save New Password
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditPassword;
