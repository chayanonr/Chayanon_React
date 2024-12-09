import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to load users. Ensure you are logged in as an admin.');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(users.filter((user) => user._id !== id));
        toast.success('User deleted successfully!');
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Failed to delete user.');
      }
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(
        `http://localhost:5000/api/admin/edit/${editUser._id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === editUser._id ? response.data.user : user
        )
      );
      setEditUser(null);
      toast.success('User updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user.');
    }
  };

  const handleCancel = () => {
    setEditUser(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
      </div>
    );
  }

  return (
    <div className="p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <h2 className="text-xl mb-4">All Users</h2>
      {users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Role</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="py-2 px-4">{user._id}</td>
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.role}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-blue-500 hover:underline mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">No users found.</p>
      )}
      {editUser && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Edit User</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="block mb-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="block mb-2 p-2 border border-gray-300 rounded"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="block mb-2 p-2 border border-gray-300 rounded"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
