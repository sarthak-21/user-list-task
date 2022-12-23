
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [users, setUser] = useState([]);
  const [activeUser, setActiveUser] = useState([]);

  // API link of images is not working so I harcoded the image link for now.

  const getData = () => {
      const response = axios.get(
      `https://602e7c2c4410730017c50b9d.mockapi.io/users`
      ).then((response) => {
        setUser(response.data);
        setActiveUser(response.data[0])
      }).catch(error => {
        console.log(error)
      })
  };

  const handleClick = (event, key) => {
    setActiveUser(users[key]);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h2>Users List</h2>
        {users.length > 0 && (
          <div>
            {users.map((item, key) => (
              <div key={key} onClick={event => handleClick(event, key)} className="user-list-item">
                <img className="user-image" src='https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/16.jpg' alt="user-image" />
                <span className="user-name">{item.profile.firstName} {item.profile.lastName}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="container">
        <h2>User Details</h2>
        {activeUser.length != 0 && (
            <div className='user-card'>
              <img className="profile-image" src='https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/16.jpg' alt="profile-image" />
              <span className="username">@{activeUser.profile.username}</span>
              <textarea className="bio-input-field" type="text" value={activeUser.Bio} disabled />
              <form>
                  <label className="input-label">First Name</label>
                  <input className="input-field" type="text" value={activeUser.profile.firstName} disabled />
                  <label className="input-label">Last Name</label>
                  <input className="input-field" type="text" value={activeUser.profile.lastName} disabled />
                  <label className="input-label">Email</label>
                  <input className="input-field" type="text" value={activeUser.profile.email} disabled />
              </form>
            </div>
        )}
      </div>
    </div>
  );
}

export default App;
