import React from "react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { formatearFecha } from "../helpers";

import IconoIngreso from "../../img/icono_ahorro.svg";
import IconoEgreso from "../../img/icono_gastos.svg";

const diccionarioIconos = {
  ingreso: IconoIngreso,
  egreso: IconoEgreso,
};

const Registro = ({ registro, setRegistroEditar, eliminarRegistro, disponible }) => {
  const { categoria, nombre, cantidad, id, fecha } = registro;

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setRegistroEditar(registro)}>
        Editar
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={() => eliminarRegistro(id)} destructive={true}>
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img src={diccionarioIconos[categoria]} alt="icono categoria" />
            <div className="descripcion-gasto">
              <p className={`${categoria}`}>{categoria}</p>
              <p className="nombre-gasto">{nombre}</p>
              <p className="fecha-gasto">
                Agregado el: {""}
                <span>{formatearFecha(fecha)}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">${cantidad}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default Registro;
