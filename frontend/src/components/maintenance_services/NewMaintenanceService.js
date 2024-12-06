import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewMaintenanceService = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    car_id: id,
    description: '',
    date: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:3000/api/v1/maintenance_services`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate(`/cars/${id}`); 
    } catch (err) {
      setError('Error creating maintenance service. Please try again.');
    }
  };

  return (
    <div>
      <h2>Create Maintenance Service for Car {id}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Service</button>
      </form>
    </div>
  );
};

export default NewMaintenanceService;
