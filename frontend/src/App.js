import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]); // State to store users
  const [newUser, setNewUser] = useState({ username: '', email: '' }); // State for new user form
  const baseURL = process.env.REACT_APP_API_URL; // Backend URL

  // Fetch existing users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${baseURL}/users`);
        const data = await response.json();
        setUsers(data); // Set the fetched data to the state
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, []); // Empty dependency array ensures this runs once on mount

  // Handle form input change for creating a new user
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle form submission (POST request)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Send a POST request to create a new user
    try {
      const response = await fetch(`${baseURL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        // If the request was successful, fetch the updated user list
        const newUserData = await response.json();
        setUsers((prevUsers) => [...prevUsers, newUserData.user]); // Add the new user to the list
        setNewUser({ username: '', email: '' }); // Reset the form
      } else {
        console.error('Failed to create user');
      }
    } catch (err) {
      console.error('Error creating user:', err);
    }
  };

  return (
    <div className="App">
      <h1>Welcome to My App</h1>

      {/* Form to create a new user */}
      <div className="form-container">
        <h2>Create a New User</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={newUser.username}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit">Add User</button>
        </form>
      </div>

      {/* Display existing users */}
      <div className="user-list">
        <h2>Existing Users</h2>
        {users.length > 0 ? (
          users.map((user) => (
            <div className="user-card" key={user._id}>
              <h3>{user.username}</h3>
              <p>{user.email}</p>
            </div>
          ))
        ) : (
          <p>Loading users...</p>
        )}
      </div>
    </div>
  );
}

export default App;
