import React, { useCallback, useContext, useEffect, useState } from "react";
import { useFetchData } from "../../Hooks/Fetch.hook";
import { NavigationContext } from "../../Context/NavigationContext";
import { process, SAVE } from "../../Service/Api";
import { Table } from "../Table/Table";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import moment from "moment";

import "./DatosDeLaAsistencia.css";

export const DatosDeLaAsistencia = () => {
  const { itemId, setScreen } = useContext(NavigationContext);
  const [asistencia, loading] = useFetchData(`asistencias/${itemId.id}`);
  const [asistencias, aLoading, change] = useFetchData(
    "asistencias",
    `deportista_id=${itemId.deportista_id}`
  );
  // ? UseState para el rango de fechas
  // ? El rango de fechas es null por defecto (el endpoint devuelve el total de tiempo entrenado de forma semanal si no se le pasa un rango de fechas inicialmente)
  const [dateParams, setDateParams] = useState({
    fechaInicio: null,
    fechaFin: null,
  });
  const [pagina, setPagina] = useState(0);

  const [tiempoEntrenado, setTiempoEntrenado] = useState(null);

  const getTiempoEntrenado = useCallback(async () => {
    let oSend = { deportistaId: itemId.deportista_id };

    if (dateParams.fechaInicio && dateParams.fechaFin) {
      oSend.fechaInicio = dateParams.fechaInicio;
      oSend.fechaFin = dateParams.fechaFin;
    }

    const response = await process(SAVE, "tiempo-entrenamiento", oSend);
    if (response?.status === 201) {
      setTiempoEntrenado(response.data.total_trained);
    }
  }, [itemId, dateParams]);

  useEffect(() => {
    getTiempoEntrenado();
  }, [getTiempoEntrenado]);

  const columns = [
    {
      title: "Fecha",
      dataIndex: "fecha",
      render: (date) =>
        date ? moment(date).format("DD/MM/YYYY") : "Sin registrar",
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
      dataIndex: "id",
      render: (_, record) => {
        if (!!record.horaEntrada && !!record.horaSalida) {
          const duracion = moment.duration(
            moment(record.horaSalida, "HH:mm").diff(
              moment(record.horaEntrada, "HH:mm")
            )
          );
          return (
            duracion.hours() + " hora(s) ," + duracion.minutes() + " minuto(s)"
          );
        }

        return "Asistencia incompleta";
      },
    },
  ];

  return loading ? (
    <LoadingSpinner />
  ) : (
    <>
      <h3 className="margin-between-paragraphs titleDatosAsitencias">
        Datos de la Asistencia
      </h3>
      <section className="infoAsistencia">
        <h2 className="margin-between-paragraphs nombreDeportista">
          {`${asistencia.deportista?.nombres} ` +
            `${asistencia.deportista?.apellidos}`}
        </h2>
        <p className="margin-between-paragraphs txtInfo txtDiasEntenados">
          Sesiones de entrenamiento totales: {asistencias.total}
        </p>
        <p className="margin-between-paragraphs txtInfo txtHorasEntenadas">
          Tiempo total de entrenamiento:{" "}
          {`${
            tiempoEntrenado ||
            `No hay entrenamientos registrados para ${
              dateParams.fechaInicio && dateParams.fechaFin
                ? `el rango de fechas seleccionado`
                : "esta semana"
            }`
          }`}
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
            onChange={(e) =>
              setDateParams({
                ...dateParams,
                fechaInicio: e.target.value,
              })
            }
            required
          />
          <label>Fin:</label>
          <input
            type="date"
            className="input-range-date input-final"
            onChange={(e) =>
              setDateParams({
                ...dateParams,
                fechaFin: e.target.value,
              })
            }
            required
          />
        </section>
      </section>
      <Table
        columns={columns}
        dataSource={asistencias}
        loading={aLoading}
        change={change}
        pagina={pagina}
        setPagina={setPagina}
      />
      <br />
      <button className="button-aceptar" onClick={() => setScreen(1)}>
        Aceptar
      </button>
    </>
  );
};
