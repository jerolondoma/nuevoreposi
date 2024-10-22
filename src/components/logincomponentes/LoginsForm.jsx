import React, { useState, useEffect } from 'react';

const LoginsForm = ({ onSubmit, initialLogin }) => {
  const [nombreusuario, setNombreUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('');

  useEffect(() => {
    if (initialLogin) {
      setNombreUsuario(initialLogin.nombreusuario || '');
      setPassword(initialLogin.password || '');
      setRol(initialLogin.rol || '');
    } else {
      setNombreUsuario('');
      setPassword('');
      setRol('');
    }
  }, [initialLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = { nombreusuario, password, rol };
    onSubmit(loginData);
    setNombreUsuario('');
    setPassword('');
    setRol('');
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="login-input-group">
        <label htmlFor="nombreusuario">Nombre de Usuario</label>
        <input
          type="text"
          id="nombreusuario"
          value={nombreusuario}
          onChange={(e) => setNombreUsuario(e.target.value)}
          placeholder="Ingresa el nombre de usuario"
          className="login-input"
          required
        />
      </div>

      <div className="login-input-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingresa la contraseña"
          className="login-input"
          required
        />
      </div>

      <div className="login-input-group">
        <label htmlFor="rol">Rol</label>
        <select
          id="rol"
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          className="login-input"
          required
        >
          <option value="">Selecciona un rol</option>
          <option value="administrador">Administrador</option>
          <option value="profesor">Profesor</option>
          <option value="gerente">Gerente</option>
          <option value="jefe">Jefe</option>
        </select>
      </div>

      <button type="submit" className="login-button">
        Guardar
      </button>
    </form>
  );
};

export default LoginsForm;
