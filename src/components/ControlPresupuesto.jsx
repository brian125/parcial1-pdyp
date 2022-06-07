import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({ registros, presupuesto }) => {
  const [disponible, setDisponible] = useState(presupuesto);
  const [porcentaje, setPorcentaje] = useState(100);
  let actual = presupuesto;

  useEffect(() => {
    registros.map((registro) => {
      if (registro.categoria === "ingreso") {
        actual = actual + registro.cantidad;
      }
      if (registro.categoria === "egreso") {
        actual = actual - registro.cantidad;
      }
      let nuevoPorcentaje = ((actual / presupuesto) *100).toFixed(2);
      // if (nuevoPorcentaje < 0) {
      //   console.log(nuevoPorcentaje);
      //   nuevoPorcentaje = nuevoPorcentaje - nuevoPorcentaje
      // }
      setTimeout(() => {
        setPorcentaje(nuevoPorcentaje);
      }, 1000);
    });
    setDisponible(actual);
  }, [registros]);

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <div className="contenedor-principal">
      <div className="grafica">
        <CircularProgressbar
          styles={buildStyles({
            pathColor: "#1877F2",
            trailColor: "#F5F5F5",
            textColor: "#1877F2"
          })}
          value={porcentaje}
          text={`${porcentaje}%`}
        />
      </div>

      <div className="show-info">
        <p className="info-cash">
          <span className="info-tile">Saldo inicial: </span>{" "}
          {formatearCantidad(presupuesto)}
        </p>
        <p className="info-cash">
          <span className="info-tile">Saldo final: </span>{" "}
          {formatearCantidad(disponible)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
