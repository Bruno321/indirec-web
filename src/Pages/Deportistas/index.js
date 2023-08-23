import React, { useState, useRef } from "react";
import { Table } from "../../Components/Table/Table";
import { useFetchData } from "../../Hooks/Fetch.hook";
import iconDelete from "../../Assets/icons/delete.png";
import Swal from "sweetalert2/dist/sweetalert2.js";
import qr from "../../Assets/icons/qr.png";
import iconInfo from "../../Assets/icons/more-info.png";
import ModalQR from "../../Components/Modals/ModalQR/ModalQR";
import MoreInfo from "../../Components/MoreInfo/MoreInfo";
import { SearchBar } from '../../Components/Filters/SearchBar';
import { oInitState, aSearchElements } from './constants';
import { generateQueries } from '../../Utils/functions';

export const DeportistasScreen = () => {
  //State para mostrar MAS INFORMACION de un deportista
  const [buttonMoreInfo, setButtonMoreInfo] = useState(false);
  const [search, setSearch] = useState(oInitState);
  const [selected, setSelected] = useState(null);
  const [pagina, setPagina] = useState(0);
  const [showQR, setShowQR] = useState(false);

  const [deportistas, loading, change] = useFetchData("deportistas");

  const columns = [
    {
      title: "Expediente",
      dataIndex: "expediente",
    },
    {
      title: "Nombre(s)",
      dataIndex: "nombres",
    },
    {
      title: "Apellido(s)",
      dataIndex: "apellidos",
    },
    {
      title: "Facultad",
      dataIndex: "facultad",
    },
    {
      title: "Correo",
      dataIndex: "correo",
    },
    {
      title: "Teléfono",
      dataIndex: "telefono",
    },
    {
      title: "Tel. Emergencia",
      dataIndex: "telefonoEmergencia",
    },
    {
      title: "Acciones",
      dataIndex: "id",
      render: (sId, row) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <img
            title="Mostrar QR"
            src={qr}
            className="icons moreinfo"
            onClick={() => {
              const [apellidoP, apellidoM] = row.apellidos.split(" ");
              setSelected({
                nombre: row.nombres,
                apellidoP,
                apellidoM,
                idPropio: sId,
              });
              setShowQR(true);
            }}
          />
          <img
            title="Ver más"
            src={iconInfo}
            className="icons moreinfo"
            onClick={() => {
              setButtonMoreInfo(true);
              setSelected(row);
            }}
          />
          <img
            title="Eliminar"
            src={iconDelete}
            className="icons delete"
            onClick={() => {
              setSelected(row);
              Swal.fire({
                title: "ELIMINAR",
                text: "¿Eliminar a " + row.nombres + " " + row.apellidos + "?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "Cancelar",
                confirmButtonText: "Confirmar",
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                    title: "ATENCION",
                    text:
                      "¿Estas seguro de eliminar a " +
                      row.nombres +
                      " " +
                      row.apellidos +
                      "?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    cancelButtonText: "Cancelar",
                    confirmButtonText: "Confirmar",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire(
                        "Eliminado satisfactoriamente",
                        "El deportista " +
                          row.nombres +
                          " " +
                          row.apellidos +
                          " ha sido eliminado.",
                        "success"
                      );
                    }
                  });
                }
              });
            }}
          />
        </div>
      ),
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
      <h3>Deportistas</h3>
      <>
        <SearchBar
          elements={aSearchElements}
          handleReset={_handleReset}
          handleSearch={_handleSearch}
          {...{ search, setSearch }}
        />
        <Table
          columns={columns}
          dataSource={deportistas}
          loading={loading}
          change={change}
          pagina={pagina}
          setPagina={setPagina}
        />
        <MoreInfo
          trigger={buttonMoreInfo}
          setTrigger={setButtonMoreInfo}
          datos={selected}
        />
      </>
      {showQR ? (
        <ModalQR datos={selected} setMostrarModalQr={setShowQR} setSelected={setSelected}/>
      ) : null}
    </>
  );
};
