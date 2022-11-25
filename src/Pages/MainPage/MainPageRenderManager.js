import React,{ useContext,useEffect,useState } from "react";
import { NavigationContext } from "../../Context/NavigationContext";
import { DeportistasScreen } from '../Deportistas';
import { AsistenciasScreen } from '../Asistencias';
import { EquiposScreen } from '../Equipos';
import QRScanner from '../../Components/QRScanner/QRScanner'
import RegistrarDeportista from "../../Components/RegistrarDeportista/RegistrarDeportista";
import RegistrarEquipo from "../../Components/RegistrarEquipo/RegistrarEquipo";

const MainPageRenderManager = () => {
  const { screen } = useContext(NavigationContext)

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