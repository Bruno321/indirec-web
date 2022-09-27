import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import Swal from 'sweetalert2';
import './QRScanner.css'

const QRScanner = () => {
    const [allowRecord, setAllowRecord] = useState(true);

    return (
        <div className='qr-container'>
            <h1>Bienvenido!</h1>
            <h2>Por favor, escanea el QR</h2>
            {allowRecord  ?  
            <QrReader
            onResult={(result, error) => {
            if (!!result) {
                setAllowRecord(false)
                let parsed = JSON.parse(result?.text)
                
                // Buena query
                Swal.fire({
                    title: '<h1 class="modal-status">Escaneo exitoso</h1>',
                    html:
                      '<h1 class="modal-title">Bienvenido</h1>' +
                      `<h1 class="modal-deportista">${parsed.nombreC}</h1>` + 
                      `<img src="https://i.imgur.com/67Yfq3r.jpg" class="qr-image"/>`+ //aqui va lo del usuario
                      '<h1 class="modal-text">La hora de entrada ha sido registrada con exito</h1>'
                      ,
                    focusConfirm: false,
                    confirmButtonText:
                      '<i class="fa fa-thumbs-up"></i> Great!',
                    
                  }).then((result)=>{
                    setAllowRecord(true)
                    console.log(allowRecord)
                  })
                  // Mala query
                //   Swal.fire({
                //     title: '<h1 class="modal-status-fail">Escaneo fallido, algo ha ocurrido</h1>',
                //     html:
                //       '<h1 class="modal-title">Bienvenido</h1>' +
                //       '<div class="modal-fill"></div>'+
                //       '<h1 class="modal-text">Por favor vuelva a pasar el codigo QR</h1>'
                //       ,
                //     focusConfirm: false,
                //     confirmButtonText:
                //       '<i class="fa fa-thumbs-up"></i> Great!',
                    
                //   }).then((result)=>{
                //     setAllowRecord(true)
                //     console.log(allowRecord)
                //   })
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
            <div className='qr-button'>No tengo QR</div>
        </div>
    )
} 

export default QRScanner