import React, { useState, useContext, useEffect } from "react";
import { Table } from "../../Components/Table/Table";
import { useFetchData } from "../../Hooks/Fetch.hook";
import { SearchBar } from "../../Components/Filters/SearchBar";
import { oInitState, aSearchElements } from "./constants";
import { generateQueries } from "../../Utils/functions";
import moment from "moment";

// Icons
import iconInfo from "../../Assets/icons/more-info.png";

// Contexto
import { NavigationContext } from "../../Context/NavigationContext.js";

// Estilos
import "./index.css";

export const AsistenciasScreen = () => {
  const [asistencias, loading, change] = useFetchData("asistencias");
  const [pagina, setPagina] = useState(0);
  const [search, setSearch] = useState(oInitState);

  const { setItemId, setScreen } = useContext(NavigationContext);

  const columns = [
    {
      title: "Nombre(s)",
      dataIndex: "",
      render: (_, row) => `${row?.deportista?.nombres}`,
    },
    {
      title: "Apellido(s)",
      dataIndex: "",
      render: (_, row) => `${row?.deportista?.apellidos}`,
    },
    {
      title: "Fecha",
      dataIndex: "fecha",
      render: date => date ? moment(date).format("DD/MM/YYYY") : "Sin registrar",
    },
    {
      title: "Hora de Entrada",
      dataIndex: "horaEntrada",
      render: hE => hE ? moment(hE).format("HH:mm") : "Sin registrar",
    },
    {
      title: "Hora de Salida",
      dataIndex: "horaSalida",
      render: hS => hS ? moment(hS).format("HH:mm") : "Sin registrar",
    },
    {
      title: "Acciones",
      dataIndex: "id",
      render: (_, row) => {
        return (
          <>
            <img
              title="Ver más..."
              src={iconInfo}
              className="icons moreinfo"
              onClick={() => {
                setItemId(row);
                setScreen(10);
              }}
            />
          </>
        );
      },
    },
  ];

  const _handleReset = () => {
    setPagina(0);
    setSearch(oInitState);
    change();
  };

  const _handleSearch = () => change(generateQueries(search, aSearchElements));


  return (
    <>
      <h3>Asistencias</h3>
      <SearchBar
        elements={aSearchElements}
        handleReset={_handleReset}
        handleSearch={_handleSearch}
        {...{ search, setSearch }}
      />
      <Table
        columns={columns}
        dataSource={asistencias}
        loading={loading}
        change={change}
        pagina={pagina}
        setPagina={setPagina}
      />
    </>
  );
};
