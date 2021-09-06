import React, { useState } from "react";
import moment from "moment";

const NewUserForm = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [birthday, setBirthday] = useState('')
  const [password, setPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState("");

  // for button disabling and warning message
  const isPasswordMatching = () => {
    if (password === passwordMatch) {
      return true;
    } else {
      return false;
    }
  };

  // POST request
  const submitForm = async (e) => {
      try {
        const body = {first_name, last_name, email, birthday, password}
        await fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(body)
        })
      } catch (err) {
          console.error(err.message)
      }
  }

  return (
    <div>
      <form onSubmit={submitForm}>
        {/* first_name and last_name */}
        <div className="input-group">
          <div className="mb-2">
            <label htmlFor="first_name" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="first_name"
              required
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="last_name" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="last_name"
              required
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        {/* password */}
        <div className="input-group">
          <div className="mb-2">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password-check" className="form-label">
              Re-type password
            </label>
            <input
              type="password"
              className="form-control"
              id="password-check"
              required
              value={passwordMatch}
              onChange={(e) => setPasswordMatch(e.target.value)}
            />
            {!isPasswordMatching() && <span className='password-warning'>(Passwords must match)</span>}
          </div>
        </div>

        {/* email */}
        <div className="mb-2">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            required
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* birthday */}
        <div className="mb-3">
          <label htmlFor="birthday" className="form-label">
            Birthday
          </label>
          <input
            type="date"
            className="form-control"
            id="birthday"
            required
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            max={moment().format("YYYY-MM-DD")}
          />
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!isPasswordMatching()}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewUserForm;
