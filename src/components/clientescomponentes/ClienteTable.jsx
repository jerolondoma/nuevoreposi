import ClienteRow from "./ClienteRow";

const ClienteTable =({clientes,onEdit,onDelete}) =>{

    return (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>FechaR</th>
              <th>FechaV</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <ClienteRow key={cliente.clienteID} cliente={cliente} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </tbody>
        </table>
      );
};

export default ClienteTable;