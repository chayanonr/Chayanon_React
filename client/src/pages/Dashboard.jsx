import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/api/user/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setUser(null);
      }
    };

    fetchUserDetails();
  }, []);

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(
        'http://localhost:5000/api/user/update',
        { name: newName },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(response.data.user);
      setEditMode(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        await axios.delete('http://localhost:5000/api/user/delete', {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Account deleted successfully!');
        localStorage.removeItem('token');
        window.location.href = '/'; // Redirect to home
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Failed to delete account.');
      }
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>

      {!editMode ? (
        <div>
          <button onClick={() => setEditMode(true)}>Update Profile</button>
          <button onClick={handleDelete}>Delete Account</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Enter new name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
