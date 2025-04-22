import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/usuarios/login', {
        correo: email,
        contrasena: password,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Correo' />
      <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Contraseña' />
      <button onClick={handleLogin}>Ingresar</button>
    </div>
  );
}

export default Login;