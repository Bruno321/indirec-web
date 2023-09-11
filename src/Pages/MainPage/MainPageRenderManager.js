import React from "react";
import { DeportistasScreen } from "../Deportistas";
import { AsistenciasScreen } from "../Asistencias";
import { EquiposScreen } from "../Equipos";
import { EditarEquipo } from "../EditarEquipo";
import QRScanner from "../../Components/QRScanner/QRScanner";
import RegistrarDeportista from "../../Components/RegistrarDeportista/RegistrarDeportista";
import RegistrarEquipo from "../../Components/RegistrarEquipo/RegistrarEquipo";
import { EventosScreen } from "../Eventos";
import { RegistrarEvento } from "../../Components/RegistrarEvento/RegistrarEvento";
import MoreInfoEventos from "../../Components/MoreInfoEventos/MoreInfoEventos";
import { DatosDeLaAsistencia } from "../../Components/DatosDeLaAsistencia/DatosDeLaAsistencia";

const MainPageRenderManager = ({ screen }) => {
  const handleRender = [
    <DeportistasScreen />,
    <AsistenciasScreen />,
    <RegistrarDeportista />,
    <QRScanner />,
    <RegistrarEquipo />,
    <EquiposScreen />,
    <EditarEquipo />,
    <RegistrarEvento />,
    <EventosScreen />,
    <MoreInfoEventos />,
    <DatosDeLaAsistencia />,
  ];

  return <>{handleRender[screen]}</>;
};

export default MainPageRenderManager;
