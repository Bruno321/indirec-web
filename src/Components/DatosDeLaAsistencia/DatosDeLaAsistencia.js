import React, { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useFetchData } from "../../Hooks/Fetch.hook";
import { NavigationContext } from "../../Context/NavigationContext";
import { process, FIND } from "../../Service/Api";
import { Table } from "../Table/Table";
import moment from "moment";

import "./DatosDeLaAsistencia.css";

export const DatosDeLaAsistencia = () => {
  const { itemId, setScreen } = useContext(NavigationContext);
  const [asistencias, loading] = useFetchData(`asistencias/${itemId}`);

  // Información de las asistencias / deportistas
  const [deportista, setDeportista] = useState({});
  const [asistenciaData, setAsistenciaData] = useState([]);

  // useState para sacar las rolas totales
  const [horasTotales, setHorasTotales] = useState({});

  //UseState para el rango de fechas
  // Hacer que los inputs tengan por defecto la fecha de hoy
  const [fechaInicio, setFechaInicio] = useState();
  const [fechaTermino, setFechaTermino] = useState();

  let deportistaId = asistencias.deportista_id;

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
          setDeportista(deportistaData);
        })
        .catch((e) => {
          console.log(e);
        });
      // ASISTENCIAS POR RANGO
      //Agregar && fecha Fin ------------------------------------------
      if(fechaInicio){
        process(
          FIND,
          "asistencias",
          {},
          { queries: `deportista_id=${deportistaId}&fecha=${fechaInicio}`, skip: 0 }
          // { queries: `deportista_id=${deportistaId}&fechaInicio=${fechaInicio}&fechaFin=${fechaTermino}`, skip: 0 }
        )
          .then((response) => {
            const asistenciaDataDelDeportista = response.data.data;
            setAsistenciaData(asistenciaDataDelDeportista);
          })
          .catch((e) => {
            console.warn(e);
          });
      }else{
        // TODAS LAS ASISTENCIAS
        process(
          FIND,
          "asistencias",
          {},
          { queries: `deportista_id=${deportistaId}`, skip: 0 }
        )
          .then((response) => {
            const asistenciaDataDelDeportista = response.data.data;
            setAsistenciaData(asistenciaDataDelDeportista);
          })
          .catch((e) => {
            console.warn(e);
          });
      }
    }
  }, [deportistaId, fechaInicio]);

  // Obetemos las diferencias con moment
  useEffect(() => {
    const horasTotalesTrabajadas = asistenciaData.reduce((total, record) => {
      const duracion = moment.duration(
        moment(record.horaSalida, "HH:mm").diff(moment(record.horaEntrada, "HH:mm"))
      );
      total.add(duracion);
      return total;
    }, moment.duration(0));
    
    const horasTotales = `${horasTotalesTrabajadas.hours()} horas, ${horasTotalesTrabajadas.minutes()} minutos`;

    setHorasTotales(horasTotales);
  }, [asistenciaData]);

  const columns = [
    {
      title: "Fecha",
      dataIndex: "fecha",
      render: (fE) => (fE ? moment(fE).format("DD/MM/YYYY") : "Sin registrar"),
    },
    {
      title: "Hora de Entrada",
      dataIndex: "horaEntrada",
      render: (hE) => (hE ? moment(hE).format("HH:mm") : "Sin registrar"),
    },
    {
      title: "Hora de Salida",
      dataIndex: "horaSalida",
      render: (hS) => (hS ? moment(hS).format("HH:mm") : "Sin registrar"),
    },
    {
      title: "Tiempo total",
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
          Sesiones de entrenamiento totales: {asistenciaData.length}
        </p>
        <p className="margin-between-paragraphs txtInfo txtHorasEntenadas">
          Tiempo total de entrenamiento: {`${horasTotales}`}
        </p>
      </section>
      <section className="inputsFechasAsistencias">
        <label htmlFor="RangoDeFechas" className="labelInput">
          Selecciona un rango de fechas de asistencia:
        </label>
        <section className="inputAsistenciasSection">
          <label>Inicio:</label>
          <input
            type="date"
            className="input-range-date input-inicio"
            onChange={(e) => {setFechaInicio(e.target.value)}}
            required
          />
          <label>Fin:</label>
          <input
            type="date"
            className="input-range-date input-final"
            onChange={(e) => {setFechaTermino(e.target.value)}}
            required
          />
        </section> 
      </section>
      <Table
        columns={columns}
        dataSource={asistenciaData}
      />
      <br/><button className="button-aceptar" onClick={() => setScreen(1)}>
        Aceptar
      </button>
    </>
  );
};
