import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUsers } from '../../context/UserContext';
import NewUserForm from '../NewUserForm/NewUserForm';

const Dashboard = () => {
  const { users, loading, error, searchUsers } = useUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewUserForm, setShowNewUserForm] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = searchTerm ? searchUsers(searchTerm) : users;

  const toggleNewUserForm = () => {
    setShowNewUserForm(!showNewUserForm);
  };

  if (loading) {
    return (
      <div className="loader">
        <div className="loader-spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <div>
          <h1 className="dashboard__title">User Dashboard</h1>
          <p>Manage your users in one place</p>
        </div>
        <div className="search-form">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search users by name..."
              className="search-input"
              value={searchTerm}
              onChange={handleSearch}
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>
      </div>

      {showNewUserForm ? (
        <div className="glass-card">
          <NewUserForm onClose={toggleNewUserForm} />
        </div>
      ) : (
        <button className="btn btn-primary" onClick={toggleNewUserForm}>
          Create New User
        </button>
      )}

      {filteredUsers.length === 0 ? (
        <div className="glass-card" style={{ marginTop: '20px', textAlign: 'center' }}>
          <p>No users found. Try adjusting your search.</p>
        </div>
      ) : (
        <div className="flex-container" style={{ marginTop: '20px' }}>
          {filteredUsers.map((user) => (
            <div className="glass-card user-card flex-item" key={user.id}>
              <div className="user-card__header">
                <h2 className="user-card__name">{user.name}</h2>
                <p className="user-card__username">@{user.username}</p>
              </div>
              <div>
                <div className="user-card__info">
                  <span className="user-card__info-icon">✉️</span>
                  {user.email}
                </div>
                <div className="user-card__info">
                  <span className="user-card__info-icon">📱</span>
                  {user.phone}
                </div>
                <div className="user-card__info">
                  <span className="user-card__info-icon">🏢</span>
                  {user.company.name}
                </div>
              </div>
              <div className="user-card__footer">
                <Link to={`/users/${user.id}`} className="btn btn-secondary">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
