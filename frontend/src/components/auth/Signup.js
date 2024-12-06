import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar que las contraseñas coincidan
    if (password !== passwordConfirmation) {
      setError("Passwords don't match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/signup', {
        user: { email, password, password_confirmation: passwordConfirmation },
      });

      // Guardar el token en el localStorage
      localStorage.setItem('token', response.data.token);

      // Pasar el token al componente principal
      setToken(response.data.token);

      setError('');
    } catch (err) {
      setError('Error creating account. Please try again.');
    }
  };

  return (
    <div className="signup-form">
      <h2>Signup</h2>

      {/* Mostrar mensaje de error */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <input
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
