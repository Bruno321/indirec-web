import React from "react";
import Header from '../../Components/Header/Header'
import MenuDropDown from '../../Components/MenuDropDown/MenuDropDown'
import Footer from '../../Components/Footer/Footer'


const MainPage = () => {

  return (
    <>
      <Header/>
      <div className="mainPage-container">
        <MenuDropDown/>
      </div>
      <Footer/>
    </>
  );
};

export default MainPage;