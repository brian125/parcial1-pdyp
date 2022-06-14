import { useState, useEffect } from "react";
import Mensaje from "./Mensaje";
import CerrarBtn from "../../img/cerrar.svg";

const Modal = ({
  setModal,
  animarModal,
  setAnimarModal,
  guardarRegistro,
  registroEditar,
  setRegistroEditar,
  disponible
}) => {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [fecha, setFecha] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (Object.keys(registroEditar).length > 0) {
      setNombre(registroEditar.nombre)
      setCantidad(registroEditar.cantidad)
      setCategoria(registroEditar.categoria)
      setId(registroEditar.id)
      setFecha(registroEditar.fecha)
    }
  }, [])
  

  const ocultarModal = () => {
    setAnimarModal(false);
    setRegistroEditar({});
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([nombre, cantidad, categoria].includes("")) {
      setMensaje("Todos los campos son obligatorios");
      setTimeout(() => {
        setMensaje("");
      }, 3000);
      return;
    }
    if (cantidad < 0) {
      setMensaje("La cantidad no puede ser menor a 0");
      setTimeout(() => {
        setMensaje("");
      }, 3000);
      return;
    }
    if (disponible < cantidad && categoria == 'egreso') {
      setMensaje("No cuenta con saldo suficiente.");
      setTimeout(() => {
        setMensaje("");
      }, 3000);
      return;
    }
    guardarRegistro({ nombre, cantidad, categoria, id, fecha });
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarBtn} alt="cerrar modal" onClick={ocultarModal} />
      </div>
      <form
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
      >
        <legend>{registroEditar.nombre ? 'Editar Registro' : 'Nuevo Registro'}</legend>

        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        <div className="campo">
          <label htmlFor="nombre">Nombre registro</label>
          <input
            type="text"
            placeholder="Añade un nuevo registro"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            type="number"
            placeholder="Añade la cantidad del registro"
            id="cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">-- Seleccione --</option>
            {disponible > 0 ? <option value="egreso">Egreso</option> : registroEditar.categoria = ''}
            <option value="ingreso">Ingreso</option>
          </select>
        </div>
        <input type="submit" value={registroEditar.nombre ? 'Guardar Cambios' : 'Añadir Registro'} />
      </form>
    </div>
  );
};

export default Modal;
