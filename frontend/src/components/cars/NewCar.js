import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewCar = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    plate_number: '',
    model: '',
    year: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/api/v1/cars', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/cars'); 
    } catch (err) {
      setError('Error creating car. Please try again.');
    }
  };

  return (
    <div>
      <h2>Create New Car</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Plate Number:</label>
          <input
            type="text"
            name="plate_number"
            value={formData.plate_number}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Model:</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Year:</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            min="1900"
            max={new Date().getFullYear()}
          />
        </div>
        <button type="submit">Create Car</button>
      </form>
    </div>
  );
};

export default NewCar;
