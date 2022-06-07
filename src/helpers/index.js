import { v4 as uuidv4 } from "uuid";

export const generarId = () => {
  const id = uuidv4();
  return id;
};

export const formatearFecha = (fecha) => {
  const fechaNueva = new Date(fecha);
  const opciones = { year: "numeric", month: "long", day: "2-digit" };
  return fechaNueva.toLocaleDateString('es-Es', opciones)
};
