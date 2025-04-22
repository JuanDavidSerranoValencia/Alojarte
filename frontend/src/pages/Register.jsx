import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('/api/usuarios/registro', {
        nombre,
        correo: email,
        contrasena: password,
        rol: 'cliente'
      });
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div>
      <h1>Registro</h1>
      <input type='text' value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder='Nombre' />
      <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Correo' />
      <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Contraseña' />
      <button onClick={handleRegister}>Registrarse</button>
    </div>
  );
}

export default Register;