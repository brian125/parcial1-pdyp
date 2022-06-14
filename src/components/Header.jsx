import React from "react";
import ControlPresupuesto from "./ControlPresupuesto";
import NuevoPresupuesto from "./NuevoPresupuesto";

const Header = ({
  registros,
  presupuesto,
  setPresupuesto,
  isValidPresupuesto,
  setIsValidPresupuesto,
  disponible,
  setDisponible,
}) => {
  return (
    <>
      <header className="header">
        <img className="icon" src="../img/icon.png" alt="Logo" />
        <h1 className="title"> PLANIFICADOR DE GASTOS </h1>
        {isValidPresupuesto ? (
          <ControlPresupuesto
            registros={registros}
            presupuesto={presupuesto}
            disponible={disponible}
            setDisponible={setDisponible}
          />
        ) : (
          <NuevoPresupuesto
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
          />
        )}
      </header>
    </>
  );
};

export default Header;
