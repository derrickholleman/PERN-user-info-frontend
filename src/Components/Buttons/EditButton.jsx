import React, {useState, Fragment} from "react";
import { BsPencilSquare } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import moment from 'moment'

const EditButton = ({user}) => {
  const [password] = useState(user.password);
  const [first_name, setFirstName] = useState(user.first_name);
  const [last_name, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday);

  const handleClose = () => {
    // reset fields on close
    setFirstName(user.first_name)
    setLastName(user.last_name);
    setEmail(user.email)
    setBirthday(user.birthday)
    setShow(false);
  };
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  async function saveProfile(id) {
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
  }
  
  return (
    <Fragment>
    <div style={{display: 'inline-block'}}>
      <BsPencilSquare style={{ cursor: "pointer", fontSize: "1.25rem", margin:'.4rem' }} onClick={handleShow}/>
    </div>

    <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label for="first-name" className="form-label">
            First Name
          </label>
          <input
            type="text"
            id="first-name"
            required
            className={`form-control mb-4`}
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label for="last-name" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            id="last-name"
            required
            className={`form-control mb-4`}
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label for="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            className={`form-control mb-4`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label for="birthday" className="form-label">
            Birthday
          </label>
          <input
            type="date"
            id="birthday"
            required
            className={`form-control mb-4`}
            // format date so its accepted as a default value
            value={moment(birthday).format('yyyy-MM-DD')}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => saveProfile(user.user_id)}
          >
            Save Info
          </Button>
        </Modal.Footer>
      </Modal>

      </Fragment>
  );
};

export default EditButton;
