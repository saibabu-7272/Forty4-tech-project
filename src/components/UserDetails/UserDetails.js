import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUsers } from '../../context/UserContext';

const UserDetails = () => {
  const { userId } = useParams();
  const { users, loading } = useUsers();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!loading && users.length > 0) {
      const foundUser = users.find(u => u.id === parseInt(userId));
      setUser(foundUser);
    }
  }, [userId, users, loading]);

  if (loading) {
    return (
      <div className="loader">
        <div className="loader-spinner"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="glass-card error-message">
        <h2>User Not Found</h2>
        <p>The user you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="btn btn-primary">Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="user-details flex-container">
      <div className="user-details__header">
        <h1 className="user-details__name">{user.name}</h1>
        <p>@{user.username}</p>
        <Link to="/" className="btn">Back to Dashboard</Link>
      </div>

      <div className="glass-card flex-item">
        <h2>Contact Information</h2>
        <div className="user-card__info">
          <span className="user-card__info-icon">✉️</span>
          {user.email}
        </div>
        <div className="user-card__info">
          <span className="user-card__info-icon">📱</span>
          {user.phone}
        </div>
        <div className="user-card__info">
          <span className="user-card__info-icon">🌐</span>
          <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">
            {user.website}
          </a>
        </div>
      </div>

      <div className="glass-card flex-item">
        <h2>Company Details</h2>
        <div className="user-card__info">
          <span className="user-card__info-icon">🏢</span>
          <strong>{user.company.name}</strong>
        </div>
        <div className="user-card__info">
          <span className="user-card__info-icon">💼</span>
          {user.company.catchPhrase}
        </div>
        <div className="user-card__info">
          <span className="user-card__info-icon">🔄</span>
          {user.company.bs}
        </div>
      </div>

      <div className="glass-card flex-item">
        <h2>Address</h2>
        <div className="user-card__info">
          <span className="user-card__info-icon">📍</span>
          {user.address.street}, {user.address.suite}
        </div>
        <div className="user-card__info">
          <span className="user-card__info-icon">🏙️</span>
          {user.address.city}, {user.address.zipcode}
        </div>
        <div className="map-container">
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <p>Map Location</p>
            <p>Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}</p>
            <p style={{ fontSize: '12px', opacity: '0.7', marginTop: '10px' }}>
              (Map integration would be implemented here with actual map API)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
