import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data = await response.json();
      setUsers(data);
      setError(null);
    } catch (error) {
      setError('Failed to fetch users. Please try again later.');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const addUser = (newUser) => {
    // Generate a new ID by taking the maximum ID and adding 1
    const maxId = Math.max(...users.map(user => user.id), 0);
    const userWithId = { ...newUser, id: maxId + 1 };
    setUsers([...users, userWithId]);
  };
  
  const searchUsers = (query) => {
    if (!query) return users;
    
    return users.filter(user => 
      user.name.toLowerCase().includes(query.toLowerCase())
    );
  };
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  return (
    <UserContext.Provider value={{ 
      users, 
      loading, 
      error,
      addUser,
      searchUsers,
      refreshUsers: fetchUsers
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
