import React from "react";
import Header from '../../Components/Header/Header'
import MenuDropDown from '../../Components/MenuDropDown/MenuDropDown'
import Footer from '../../Components/Footer/Footer'
import MainPageRenderManager from "./MainPageRenderManager";

import './MainPage.css'
const MainPage = () => {

  return (
    <>
      <div className="mainPage-container">
        <MenuDropDown/>
        <div className="mainPage-body">
          <Header/>
          <div className="content-container">
            <MainPageRenderManager/>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;