import React from "react";
import Registro from "./Registro";

const ListadoRegistros = ({
  registros,
  setRegistroEditar,
  eliminarRegistro,
  filtroCategoria,
  registrosFiltradosCategoria,
  filtroNombre,
  registrosFiltradosNombre,
  disponible
}) => {
  return (
    <div className="listado-gastos contenedor2">
      {(filtroNombre.length > 0 && filtroCategoria.length === 0) && (
        <>
          <div className="contador">
            <h2>
              {registrosFiltradosNombre.length
                ? "Registros"
                : "No hay registros en esta categoría"}
            </h2>
            <h2 className="cantidad-registros">
              {registrosFiltradosNombre.length}
            </h2>
          </div>
          {registrosFiltradosNombre.map((registro) => (
            <Registro
              registro={registro}
              key={registro.id}
              setRegistroEditar={setRegistroEditar}
              eliminarRegistro={eliminarRegistro}
              disponible={disponible}
            />
          ))}
        </>
      )}

      {(filtroCategoria.length > 0 && filtroNombre.length === 0) && (
        <>
          <div className="contador">
            <h2>
              {registrosFiltradosCategoria.length
                ? "Registros"
                : "No hay registros en esta categoría"}
            </h2>
            <h2 className="cantidad-registros">
              {registrosFiltradosCategoria.length}
            </h2>
          </div>
          {registrosFiltradosCategoria.map((registro) => (
            <Registro
              registro={registro}
              key={registro.id}
              setRegistroEditar={setRegistroEditar}
              eliminarRegistro={eliminarRegistro}
              disponible={disponible}
            />
          ))}
        </>
      )} 

      {(filtroCategoria.length === 0 && filtroNombre.length === 0) && (
        <>
          <div className="contador">
            <h2>{registros.length ? "Registros" : "No hay registros"}</h2>
            <h2 className="cantidad-registros">{registros.length}</h2>
          </div>
          {registros.map((registro) => (
            <Registro
              registro={registro}
              key={registro.id}
              setRegistroEditar={setRegistroEditar}
              eliminarRegistro={eliminarRegistro}
              disponible={disponible}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ListadoRegistros;
