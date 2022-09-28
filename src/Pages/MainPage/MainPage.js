import React from "react";
import Header from '../../Components/Header/Header'
import MenuDropDown from '../../Components/MenuDropDown/MenuDropDown'
import Footer from '../../Components/Footer/Footer'
import MainPageRenderManager from "./MainPageRenderManager";

import './MainPage.css'
const MainPage = () => {

  return (
    <>
      <Header/>
      <div className="mainPage-container">
        <div className="mainPage-body">
          <MenuDropDown/>
          <div className="content-container">
            <MainPageRenderManager/>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default MainPage;