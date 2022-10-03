import React, { useState,useContext } from 'react';
import { QrReader } from 'react-qr-reader';
import Swal from 'sweetalert2';
import {NavigationContext} from '../../Context/NavigationContext'
import './QRScanner.css'
import axios from 'axios';



const QRScanner = () => {
  const [allowRecord, setAllowRecord] = useState(true);
  const {setScreen} = useContext(NavigationContext)
  const token = localStorage.getItem('token')
  const failedQRScan = () => {
    Swal.fire({
      title: '<h1 class="modal-status-fail">Escaneo fallido, algo ha ocurrido</h1>',
      html:
        '<div class="modal-fill"></div>'+
        '<h1 class="modal-text">Por favor vuelva a pasar el codigo QR</h1>'
        ,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Aceptar!',
      
    }).then((result)=>{
      setAllowRecord(true)
      console.log(allowRecord)
    })
  }

   
    return (
        <div className='qr-container'>
            <h2>Por favor, escanea el QR</h2>
            {allowRecord  ?  
            <QrReader
            onResult={(result, error) => {
            if (!!result) {
                setAllowRecord(false)
                try {

                    let parsed = JSON.parse(result?.text)
                    // El codigo QR tiene datos correctos
                    if(parsed.id && parsed.nombreC && parsed.fecha){
                      //Aqui va el post
                      console.log(parsed)
                      axios({
                        method: "POST",
                        url: "http://localhost:3000/api/deportistas/asistencias",
                        data: {
                          id: parsed.id,
                          fecha: parsed.fecha
                        },
                        headers: {"Access-Control-Allow-Origin":null ,'Authorization': `Bearer ${token}`},
                        mode: 'cors',
                    })
                    .then((response)=>{
                      console.log(response.data)
                      Swal.fire({
                        title: '<h1 class="modal-status">Escaneo exitoso</h1>',
                        html:
                          '<h1 class="modal-title">Bienvenido</h1>' +
                          `<h1 class="modal-deportista">${response.data.deportista.nombres} ${response.data.deportista.apellidos}</h1>` + 
                          `<img src="http://localhost:3000/api/${response.data.deportista.foto}" class="qr-image"/>`+ //aqui va lo del usuario
                          `<h1 class="modal-text">${response.data.message}</h1>`
                          ,
                        focusConfirm: false,
                        confirmButtonText:
                          '<i class="fa fa-thumbs-up"></i> Aceptar!',
                        
                      }).then((result)=>{
                        setAllowRecord(true)
                        console.log(allowRecord)
                      })
                    })
                    .catch((e)=>{
                      console.log(e)
                      failedQRScan()
                    })
                    } else {
                      failedQRScan()
                    }
                } catch(e){
                  failedQRScan()
                }
               
            }

            if (!!error) {
                // console.info(error);
            }
            }}
            className="qr"
        /> 
            : 
            <div className='qr-hidden'></div>
            }
            {/* <p>{data}</p> */}
            <div className='qr-button' onClick={()=>setScreen(2)}>No tengo QR</div>
        </div>
    )
} 

export default QRScanner