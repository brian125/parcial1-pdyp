import { useState, useEffect } from "react";

const Filtros = ({filtroCategoria, setFiltroCategoria}) => {
  return (
    <div className="filtros sombra contenedor3">
      <form>
        <div className="campo">
          <label>Filtrar Registros</label>
          <input placeholder="Buscador"/>
          <select value={filtroCategoria} onChange={e => setFiltroCategoria(e.target.value)}>
            <option value="">-- Seleccione --</option>
            <option value="egreso">Egreso</option>
            <option value="ingreso">Ingreso</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default Filtros;
