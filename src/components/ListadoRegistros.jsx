import React from "react";
import Registro from "./Registro";

const ListadoRegistros = ({ registros, setRegistroEditar, eliminarRegistro}) => {
  return (
    <div className="listado-gastos contenedor2">
      <div className="contador">
        <h2>{registros.length ? "Registros" : "No hay registros"}</h2>
        <h2 className="cantidad-registros">{registros.length}</h2>
      </div>
      {registros.map((registro) => (
        <Registro registro={registro} key={registro.id} setRegistroEditar={setRegistroEditar} eliminarRegistro={eliminarRegistro} />
      ))}
    </div>
  );
};

export default ListadoRegistros;
