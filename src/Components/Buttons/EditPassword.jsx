import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const EditPassword = ({ user }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState("");
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
    setPasswordMatch("")
    setShow(false);
  };
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  // -------------------------------------- //

  // password validation //

  // button disabling logic
  const isNewPasswordValid = () => {
    if (password.length > 0 && oldPassword !== password && password === passwordMatch) {
      return true;
    } else {
      return false;
    }
  };
  // for dynamic class name on input field
  const isOldPasswordValid = () => {
    if (oldPassword === user.password) {
      // if old password in field equals current password
      return "valid";
    } else {
      return "invalid";
    }
  };
  const showWarningMessage = () => {
    // show warning if passwords are the same and old password field has characters in it
    if (oldPassword === password && oldPassword.length > 0) {
      return true;
    } else {
      return false;
    }
  };
  // 'passwords must match' warning logic
  const isPasswordMatching = () => {
    if (password !== passwordMatch && passwordMatch.length > 0) {
      return true;
    } else {
      return false
    }
     
  };
  // dynamic class for "please enter new password" label
  const isWarningShowing = () => {
    // if warning is showing, margin of 0
    if (oldPassword === password && oldPassword.length > 0) {
      return ''
    } else {
      return 'form-label'
    }
  }

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

          <hr />

          {/* new password */}
          <label for="new-password" className={`${isWarningShowing()}`}>
            Please Enter Your New Password
          </label>
          {showWarningMessage() && (
            <div className="password-warning mb-1">
              New password can't be the same as old password
            </div>
          )}
          <input
            type="password"
            id="new-password"
            required
            className="form-control mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* retype new password */}
          <label for="password-match" className="form-label">
            Re-type new password
          </label>
          <input
            type="password"
            id="password-match"
            required
            className="form-control"
            value={passwordMatch}
            onChange={(e) => setPasswordMatch(e.target.value)}
          />
          {isPasswordMatching() && <span className='password-warning'>(Passwords must match)</span>}
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
