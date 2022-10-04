import React, { useState } from "react";
import Header from '../../Components/Header/Header'
import MenuDropDown from '../../Components/MenuDropDown/MenuDropDown'
import Footer from '../../Components/Footer/Footer'
import MainPageRenderManager from "./MainPageRenderManager";

import './MainPage.css'
const MainPage = () => {

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
          }}/>
          <div className="content-container">
            <MainPageRenderManager/>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;