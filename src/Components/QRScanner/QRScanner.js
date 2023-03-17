import React, { useState,useContext } from 'react';
import { QrReader } from 'react-qr-reader';
import {NavigationContext} from '../../Context/NavigationContext'
import { SAVE, process } from '../../Service/Api';
import Swal from 'sweetalert2';
import './QRScanner.css'
import axios from 'axios';

const QRScanner = () => {
  const [allowRecord, setAllowRecord] = useState(true);
  const {setScreen} = useContext(NavigationContext);

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
    })
  }

    return (
        <div className='qr-container'>
            <h2 className = "title-escanearQR">Por favor, escanea el QR</h2>
            <div className='container-ScannQr'>
              {allowRecord ?
                <QrReader
                  onResult={ async result => {
                    
                    if (!!result) {
                      setAllowRecord(false);

                      let parsed = JSON.parse(result?.text)

                      if(parsed.id && parsed.fecha){
                        const response = await process(SAVE, 'asistencias',{id: parsed.id, fecha: parsed.fecha});

                        if(response.status === 201) {
                          debugger;
                          Swal.fire({
                            title: '<h1 class="modal-status">Escaneo exitoso</h1>',
                            html:
                              '<h1 class="modal-title">Bienvenido</h1>' +
                              `<h1 class="modal-deportista">${response.data.deportista.nombres} ${response.data.deportista.apellidos}</h1>` + 
                              `<img src="http://localhost:3030/${response.data.deportista.foto}" class="qr-image"/>`+ //aqui va lo del usuario
                              `<h1 class="modal-text">Se registró la ${response.data.horaSalida ? "salida" : "entrada"} exitosamente</h1>`
                              ,
                            focusConfirm: false,
                            confirmButtonText:
                              '<i class="fa fa-thumbs-up"></i> Aceptar!',
                          })
                        } else {
                          failedQRScan();
                        }
                      }
                }}}
                style={{ width: '100%'}}
              /> 
              : 
              <div className='qr-hidden'></div>
              }
            </div>
            <div className='qr-button' onClick={() => setScreen(2)}>No tengo QR</div>
        </div>
    )
} 

export default QRScanner