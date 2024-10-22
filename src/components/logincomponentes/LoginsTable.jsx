import LoginsRow from "./LoginsRow";

const LoginsTable = ({ logins, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Password</th>
          <th>Rol</th>
        </tr>
      </thead>
      <tbody>
        {logins.map((login) => (
          <LoginsRow key={login.usuarioID} login={login} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
};

export default LoginsTable;