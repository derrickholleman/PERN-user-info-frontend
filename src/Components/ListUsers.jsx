import React, { useState, useEffect } from "react";
import User from "./User";

const ListUsers = () => {
  const [users, setUsers] = useState([]);

  function setUsersCallback(data) {
    setUsers(data);
  }

  async function getUsers() {
    const usersResponse = await fetch("http://localhost:5000/users");
    const usersJSON = await usersResponse.json();

    return {
      users: usersJSON,
    };
  }

  useEffect(() => {
    getUsers()
      .then((response) => {
        setUsers(response.users);
      })
      .catch(() => {
        console.error("unable to fetch users, check ya code");
      });
  }, []);

  console.log(users);

  return (
    <div>
      <h1 className="mt-4">User Profiles</h1>
      <div className='users-container'>
        {users.map((user) => (
          <User
            key={user.user_id}
            user={user}
            allUsers={users}
            setUsers={setUsersCallback}
          />
        ))}
      </div>
    </div>
  );
};

export default ListUsers;
