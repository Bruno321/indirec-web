import React, { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useFetchData } from "../../Hooks/Fetch.hook";
import { NavigationContext } from "../../Context/NavigationContext";
import { process, FIND } from "../../Service/Api";
import { Table } from "../Table/Table";

// Estilos de CSS
import "./DatosDeLaAsistencia.css";
import moment from "moment";

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
  // console.log("fecha de inicio y de salida", form);
  const { itemId, setScreen } = useContext(NavigationContext);
  const [asistencias, loading] = useFetchData(`asistencias/${itemId}`);

  // Información de las asistencias / deportistas
  const [deportista, setDeportista] = useState({});
  const [asistenciaData, setAsistenciaData] = useState([]);

  // useState para sacar las rolas totales
  const [horasTotales, setHorasTotales] = useState({});

  let deportistaId = asistencias.deportista_id;
  // console.log(asistencias);

  // Sacar los datos de la tabla de Deportista
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
          // console.log("Información del deportista actual: ", deportistaData);
          setDeportista(deportistaData);
          // Aquí puedes hacer algo con la información que recibiste en response
        })
        .catch((e) => {
          console.log(e);
        });
      // LISTA DE LAS ASISTENCIAS DEL DEPORTISTA
      process(
        FIND,
        "asistencias",
        {},
        { queries: `deportista_id=${deportistaId}`, skip: 0 }
      )
        .then((response) => {
          const asistenciaDataDelDeportista = response.data.data;
          // console.log(
          //   "Información de la Asistencia del Deportista Actual: ",
          //   asistenciaDataDelDeportista
          // );
          setAsistenciaData(asistenciaDataDelDeportista);
        })
        .catch((e) => {
          console.warn(e);
        });

      // LISTA DE LAS ASISTENCIAS DEL DEPORTISTA ENTRE LOS RANGOS DE FECHAS
      // Aún no se implementa ese sistema en el API
    }
  }, [deportistaId]);

  // Sacando las horas inicio con mapeo
  useEffect(() => {
    const horasIniciales = asistenciaData.map(
      (asistencia) => asistencia.horaEntrada
    );
    const horasFinales = asistenciaData.map(
      (asistencia) => asistencia.horaSalida
    );
    // console.log("Arreglo de Horas Iniciales: ", horasIniciales);
    // console.log("Arreglo de Horas Salidas: ", horasFinales);
    const calcularDiferenciaHoras = (fechaInicio, fechaFin) => {
      const inicio = moment(fechaInicio);
      const fin = moment(fechaFin);
      const diffDuration = moment.duration(fin.diff(inicio));
      const diffHours = Math.floor(diffDuration.asHours());
      const diffMinutes = diffDuration.minutes();
      const diffSeconds = diffDuration.seconds();
      return `${diffHours} horas, ${diffMinutes} minutos, ${diffSeconds} segundos`;
    };

    const horasTrabajadas = horasIniciales.map((horaInicio, index) => {
      const horaFin = horasFinales[index];
      const horasTrabajadasDia = calcularDiferenciaHoras(horaInicio, horaFin);
      return horasTrabajadasDia;
    });

    const horasTotalesTrabajadas = horasTrabajadas.reduce((total, horas) => {
      const diffHours = Number(horas.split(" ")[0]);
      const diffMinutes = Number(horas.split(" ")[2]);
      const diffSeconds = Number(horas.split(" ")[4]);
      total.add(
        moment.duration({
          hours: diffHours,
          minutes: diffMinutes,
          seconds: diffSeconds,
        })
      );
      return total;
    }, moment.duration(0));
    const diffHours = Math.floor(horasTotalesTrabajadas.asHours());
    const diffMinutes = horasTotalesTrabajadas.minutes();
    const diffSeconds = horasTotalesTrabajadas.seconds();
    const horasTotales = `${diffHours} horas, ${diffMinutes} minutos`;

    setHorasTotales(horasTotales);
  }, [asistenciaData]);

  // Hacer que los inputs tengan por defecto la fecha de hoy
  const [selectedDate, setSelectedDate] = useState(todayDate);

  const columns = [
    {
      title: "Fecha",
      dataIndex: "fecha",
    },
    {
      title: "Hora de Entrada",
      dataIndex: "horaEntrada",
      render: (hE) => (hE ? moment(hE).format("HH:mm:ss a") : "Sin registrar"),
    },
    {
      title: "Hora de Salida",
      dataIndex: "horaSalida",
      render: (hS) => (hS ? moment(hS).format("HH:mm:ss a") : "Sin registrar"),
    },
    {
      title: "Horas totales",
      dataIndex: "horasTotales",
      render: (text, record) => {
        const duracion = moment.duration(
          moment(record.horaSalida, "HH:mm").diff(
            moment(record.horaEntrada, "HH:mm")
          )
        );
        return (
          duracion.hours() + " hora(s) ," + duracion.minutes() + " minuto(s)"
        );
      },
    },
  ];
  return (
    <>
      <h3 className="margin-between-paragraphs titleDatosAsitencias">
        Datos de la Asistencia
      </h3>
      <section className="infoAsistencia">
        <h2 className="margin-between-paragraphs nombreDeportista">
          {`${deportista.nombres} ` + `${deportista.apellidos}`}
        </h2>
        <p className="margin-between-paragraphs txtInfo txtDiasEntenados">
          Días entrenados: {asistenciaData.length}
        </p>
        <p className="margin-between-paragraphs txtInfo txtHorasEntenadas">
          Tiempo total de entrenamiento: {`${horasTotales}`}
        </p>
      </section>
      {/* <section className="inputsFechasAsistencias">
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
      </section> */}
      <section className="sectionTable"></section>
      <Table
        columns={columns}
        dataSource={asistenciaData}
        // loading={setAsistenciaData}
      />
      <button className="button-aceptar" onClick={() => setScreen(1)}>
        Aceptar
      </button>
    </>
  );
};
