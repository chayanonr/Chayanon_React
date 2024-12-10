import React, { useEffect, useState } from 'react';
import axios from '../axiosInstance';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState('');
  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('https://chayanonrod.onrender.com/api/user/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        if (response.data.photo) {
          setPhotoPreview(response.data.photo); // Load existing photo if available
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setUser(null);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(
        'https://chayanonrod.onrender.com/api/user/update',
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
        await axios.delete('https://chayanonrod.onrender.com/api/user/delete', {
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

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file)); // Show preview
  };

  const handlePhotoUpload = async () => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('photo', photo);

    try {
      const response = await axios.post('https://chayanonrod.onrender.com/api/user/upload-photo', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data.message);
      setPhotoPreview(response.data.filePath); // Update preview with uploaded photo
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Failed to upload photo.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-red-600">User not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}</h1>
      <p className="text-lg mb-2">
        <span className="font-semibold">Email:</span> {user.email}
      </p>
      <p className="text-lg mb-6">
        <span className="font-semibold">Role:</span> {user.role}
      </p>

      {/* Display Profile Photo */}
      <div className="mb-6">
        {photoPreview ? (
          <img
            src={photoPreview.startsWith('http') ? photoPreview : `https://chayanonrod.onrender.com${photoPreview}`}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <p className="text-gray-500">No profile photo uploaded.</p>
        )}
      </div>

      {/* Photo Upload */}
      <div className="mb-6">
        <input type="file" accept="image/*" onChange={handlePhotoChange} className="mb-4" />
        <button
          onClick={handlePhotoUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Upload Photo
        </button>
      </div>

      {!editMode ? (
        <div className="space-x-4">
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Update Profile
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Delete Account
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter new name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
          />
          <div className="space-x-4">
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
