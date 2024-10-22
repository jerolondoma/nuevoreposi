import PlanRow from "./PlanRow"

const PlanTable = ({planes,onEdit,onDelete}) => {
    
    return (

        <table>
            <thead>
                <tr>
                    <th>Nombreplan</th>
                    <th>Duracion</th>
                    <th>Descripcion</th>
                    <th>Precio</th>
                </tr>
            </thead>
            <tbody>
                {planes.map((plane)=>(
                    <PlanRow key={plane.planID} plane={plane} onEdit={onEdit} onDelete={onDelete}/>
                ))}
            </tbody>
        </table>
    );
};
export default PlanTable;