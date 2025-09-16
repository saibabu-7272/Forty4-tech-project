import React, { useState } from 'react';
import { useUsers } from '../../context/UserContext';

const initialFormState = {
  name: '',
  username: '',
  email: '',
  phone: '',
  website: '',
  company: {
    name: '',
    catchPhrase: '',
    bs: ''
  },
  address: {
    street: '',
    suite: '',
    city: '',
    zipcode: '',
    geo: {
      lat: '',
      lng: ''
    }
  }
};

const NewUserForm = ({ onClose }) => {
  const [formData, setFormData] = useState(initialFormState);
  const { addUser } = useUsers();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(formData);
    setFormData(initialFormState);
    onClose();
  };

  return (
    <div className="new-user-form">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>Create New User</h2>
        <button className="btn" onClick={onClose}>Close</button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Website</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Company Name</label>
          <input
            type="text"
            name="company.name"
            value={formData.company.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Catch Phrase</label>
          <input
            type="text"
            name="company.catchPhrase"
            value={formData.company.catchPhrase}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewUserForm;
