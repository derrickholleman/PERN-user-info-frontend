import React, { useState } from "react";
import dayjs from 'dayjs'
import DeleteButton from "./Buttons/DeleteButton";
import EditButton from "./Buttons/EditButton";
import EditPassword from "./Buttons/EditPassword";

const User = ({ user, allUsers, setUsers }) => {
  const [formattedBirthday] = useState(
    dayjs(user.birthday).format("MMMM DD, YYYY")
  );

  return (
    <div className="m-4 user-profile">
      <h3 className="mb-4 edit-profile">
        Edit Profile
        <EditButton user={user} />
      </h3>
      
      <div className="mb-5">
        <div>
          <b>User:</b> {user.first_name} {user.last_name}
        </div>

        <div>
          <b>Email:</b> {user.email}
        </div>

        <div>
          <b>Birthday:</b> {formattedBirthday}
        </div>

        <div>
          <b>Password:</b> *******
        </div>
      </div>

      <hr />

      <div className="delete-edit-btns">
        <DeleteButton setUsers={setUsers} allUsers={allUsers} user={user} />
        <EditPassword user={user} />
      </div>
    </div>
  );
};

export default User;
