import React, { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

const Profile = () => {
  const { user } = useContext(AuthContext);
  // const currentUser = getCurrentUser();
  const currentUser = user;
  console.log(user);
  return (
    <section className="profile">
      <div className="container">
        <h1 className="text-center mb-3">Profile </h1>
        <table className="table">
          <tbody>
            <tr>
              <th scope="row">Username:</th>
              <td>{currentUser.username}</td>
            </tr>
            <tr>
              <th scope="row">Token:</th>
              <td>
                {currentUser.accessToken.substring(0, 15)}
                {currentUser.accessToken.substr(
                  currentUser.accessToken.length - 15
                )}
              </td>
            </tr>
            <tr>
              <th scope="row">Id:</th>
              <td>{currentUser.id}</td>
            </tr>
            <tr>
              <th scope="row">Email:</th>
              <td>{currentUser.email}</td>
            </tr>
            <tr>
              <th scope="row">Authorities:</th>
              <td>{currentUser.roles}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Profile;
