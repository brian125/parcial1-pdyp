import { useState, useEffect } from "react";
import Header from "./components/Header";
import Filtros from "./components/Filtros";
import iconoNuevoPresupuesto from "../img/nuevo-gasto.svg";
import Modal from "./components/Modal";
import ListadoRegistros from "./components/ListadoRegistros";

import { generarId } from "./helpers";

function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto") ?? 0)
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [registros, setRegistros] = useState(
    localStorage.getItem('registros')
      ? JSON.parse(localStorage.getItem('registros'))
      : []
  );

  const [registroEditar, setRegistroEditar] = useState({});

  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [registrosFiltradosCategoria, setRegistrosFiltradosCategoria] = useState([]);

  useEffect(() => {
    if (Object.keys(registroEditar).length > 0) {
      setModal(true);
      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [registroEditar]);

  useEffect(() => {
    if (filtroCategoria){
      const registrosFiltrados = registros.filter( registro => registro.categoria === filtroCategoria )
      setRegistrosFiltradosCategoria(registrosFiltrados)
    }
  }, [filtroCategoria])

  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0);
  }, [presupuesto]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0;
    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("registros", JSON.stringify(registros) ?? []);
  }, [registros]);

  const handleNuevoPresupuesto = () => {
    setModal(true);
    setRegistroEditar({});
    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  const guardarRegistro = (registro) => {
    if (registro.id) {
      const registrosActualizados = registros.map((registroState) =>
        registroState.id === registro.id ? registro : registroState
      );
      setRegistros(registrosActualizados);
      setRegistroEditar({});
    } else {
      registro.id = generarId();
      registro.fecha = Date.now();
      setRegistros([...registros, registro]);
    }

    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const eliminarRegistro = (id) => {
    const registrosActualizados = registros.filter(
      (registro) => registro.id !== id
    );
    setRegistros(registrosActualizados);
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        registros={registros}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {isValidPresupuesto && (
        <>
          <main>
            <Filtros filtro={filtroCategoria} setFiltroCategoria={setFiltroCategoria}/>
            <ListadoRegistros
              registros={registros}
              setRegistroEditar={setRegistroEditar}
              eliminarRegistro={eliminarRegistro}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={iconoNuevoPresupuesto}
              alt="icono nuevo gasto"
              onClick={handleNuevoPresupuesto}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarRegistro={guardarRegistro}
          registroEditar={registroEditar}
          setRegistroEditar={setRegistroEditar}
        />
      )}
    </div>
  );
}

export default App;
