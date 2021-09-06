import React, { useState } from "react";
import moment from "moment";
import DeleteButton from "./Buttons/DeleteButton";
import EditButton from "./Buttons/EditButton";
import EditPassword from "./Buttons/EditPassword";

const User = ({ user, allUsers, setUsers }) => {
  const [formattedBirthday] = useState(
    moment(user.birthday).format("MMMM DD, YYYY")
  );

  return (
    <div className="m-4 user-profile">
      <div className="mb-5">
        <div>
          <b>User:</b> {user.first_name} {user.last_name} <EditButton />
        </div>

        <div>
          <b>Email:</b> {user.email}
          <EditButton />
        </div>

        <div>
          <b>Birthday:</b> {formattedBirthday} <EditButton />
        </div>

        <div>
          <b>Password:</b> *******
        </div>
      </div>

      <hr />

      <div className='delete-edit-btns'>
        <DeleteButton 
        setUsers={setUsers} 
        allUsers={allUsers} 
        user={user} />
        <EditPassword user={user} />
      </div>
    </div>
  );
};

export default User;