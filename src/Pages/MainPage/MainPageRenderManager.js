import React from "react";
import { DeportistasScreen } from '../Deportistas';
import { AsistenciasScreen } from '../Asistencias';
import { EquiposScreen } from '../Equipos';
import QRScanner from '../../Components/QRScanner/QRScanner'
import RegistrarDeportista from "../../Components/RegistrarDeportista/RegistrarDeportista";
import RegistrarEquipo from "../../Components/RegistrarEquipo/RegistrarEquipo";

const MainPageRenderManager = ({ screen }) => {

  const handleRender = [
    <DeportistasScreen/>,
    <AsistenciasScreen/>,
    <RegistrarDeportista />,
    <QRScanner />,
    <RegistrarEquipo />,
    <EquiposScreen />
  ];

    return (
      <>
        {handleRender[screen]}
      </>
    )
}

export default MainPageRenderManager