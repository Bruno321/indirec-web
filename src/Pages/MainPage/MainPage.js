import React, { useState, useContext } from "react";
import { NavigationContext } from "../../Context/NavigationContext";
import Header from '../../Components/Header/Header'
import MenuDropDown from '../../Components/MenuDropDown/MenuDropDown'
import MainPageRenderManager from "./MainPageRenderManager";
import './MainPage.css'

const MainPage = () => {
  const { screen } = useContext(NavigationContext);
  const [isMenuDropDownVisible, setIsMenuDropDownVisible] = useState(true);

  return (
    <>
      <div className="mainPage-container">
        {
          isMenuDropDownVisible
          ?
            <MenuDropDown/>
          :
            ''
        }

        <div className="mainPage-body">
          <Header onClick={(estado) => {
            setIsMenuDropDownVisible(estado);
          }} screen={screen}/>
          <div className="content-container">
            <MainPageRenderManager screen={screen}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;