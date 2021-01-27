import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../services/user.service';
const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getAllUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        const errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setError(errorMessage);
      });
  }, []);

  if (error) {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{error}</h3>
        </header>
      </div>
    );
  }
  return (
    <section className="profile">
      <div className="container">
        <h1 className="text-center mb-3">Users</h1>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Id:</th>
              <th scope="col">Roles</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user._id}</td>
                  <td>
                    {user.roles.map((role, index) => (
                      <span>
                        {(index ? ', ' : '') + role.name.toUpperCase()}
                      </span>
                    ))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Users;
