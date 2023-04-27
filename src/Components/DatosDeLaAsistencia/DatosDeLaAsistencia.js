import React, { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useFetchData } from "../../Hooks/Fetch.hook";
import { NavigationContext } from "../../Context/NavigationContext";
import { process, FIND } from "../../Service/Api";

// Estilos de CSS
import "./DatosDeLaAsistencia.css";

// Iconos

// Fecha de hoy
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1; // El método getMonth() devuelve un número del 0 al 11, por lo que debemos sumar 1 para obtener el mes actual.
const day = today.getDate();

const todayDate = `${year}-${month}-${day}`;
//Fechas inicializadas

// Inicializar las fechas de inicio y termino en la fecha de hoy
const oInitialState = {
  fechaInicio: todayDate,
  fechaTermino: todayDate,
};

export const DatosDeLaAsistencia = () => {
  // Manipular fechas dentro del mini form de rangos de fechas:
  const [form, setForm] = useState(oInitialState);
  const { itemId, setScreen } = useContext(NavigationContext);
  const [deportista, setDeportista] = useState({});
  const [asistencias, loading] = useFetchData(`asistencias/${itemId}`);
  let deportistaId = asistencias.deportista_id;

  useEffect(() => {
    if (deportistaId) {
      process(
        FIND,
        "deportistas",
        {},
        { queries: `id=${deportistaId}`, skip: 0 }
      )
        .then((response) => {
          const deportistaData = response.data.data[0];
          // console.log(deportistaData.nombres + " " + deportistaData.apellidos);
          setDeportista(deportistaData);
          // Aquí puedes hacer algo con la información que recibiste en response
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [deportistaId]);

  // Hacer que los inputs tengan por defecto la fecha de hoy
  const [selectedDate, setSelectedDate] = useState(todayDate);

  return (
    <div>
      <section className="infoAsistencia">
        <h1 className="margin-between-paragraphs titleDatosAsitencias">
          DATOS DE LA ASISTENCIA
        </h1>
        <h2 className="margin-between-paragraphs nombreDeportista">
          {`${deportista.nombres} ` + `${deportista.apellidos}`}
        </h2>
        <p className="margin-between-paragraphs txtInfo txtDiasEntenados">
          Días entrenados en el rango de días:
        </p>
        <p className="margin-between-paragraphs txtInfo txtHorasEntenadas">
          Total de horas:
        </p>
      </section>
      <section className="inputsFechasAsistencias">
        <label htmlFor="RangoDeFechas" className="labelInput">
          Seleccionar rango de fechas de Asistencia:
        </label>
        <section className="inputAsistenciasSection">
          <input
            type="date"
            className="inputDates fechaInicio"
            defaultValue={selectedDate}
            onChange={(e) => setForm({ ...form, fechaInicio: e.target.value })}
            required
          />
          <input
            type="date"
            className="inputDates fechaTermino"
            defaultValue={selectedDate}
            onChange={(e) => setForm({ ...form, fechaTermino: e.target.value })}
            required
          />
        </section>
      </section>
      <section className="sectionTable"></section>
      <button className="button-aceptar" onClick={()=>setScreen(1)}>Aceptar</button>
    </div>
  );
};