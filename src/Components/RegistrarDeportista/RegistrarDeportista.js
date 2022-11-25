import React, { useState } from 'react';
// Se importa Sweet Alert para las alertas de Javascript
import Swal from 'sweetalert2';
import { aFacultities } from '../../Utils/constants';
import { SAVE_WITH_FILE, process } from '../../Service/Api';
//Cargamos los estilos
import "./RegistrarDeportista.css";
// Se implmentan imagenes
import ImgDocumentFiles from '../../Assets/icons/document-files.png';

const oInitialState = {
    expediente:"",
    nombres:"",
    apellidos:"",
    sexo: "0",
    facultad:"Facultad de Derecho",
    correo:"",
    telefono:"",
    telefonoEmergencia:"",
    numSeguroSocial:"",
    jugadorSeleccionado: 0,
    numJugador:0,
    deporte:"Futbol",
    fotoIdentificacionOficial:null,
    foto:null,
    fotoCardex:null,
};

const RegistrarDeportista = () => {
    const [radioButton,setRadioButton] = useState({
        si: false,
        no: false
    });
    const [kardex, setKardex] = useState(false);
    const [INE, setINE] = useState(false);
    const [photo, setPhoto] = useState(false);
    const [loading, setLoading] = useState(false);

    const [form,setForm] = useState(oInitialState)

    const handleSubmit = async (e) => {
        //Se valida si los campos del formulario estan completos
        e.preventDefault()
        if (validarCampos()) {
            setLoading(true);
            // console.log(form);
            let oSend = new FormData();

            for (const sKey in form) {
                oSend.append(sKey, form[sKey]);
            }

            const response = await process(SAVE_WITH_FILE, 'deportistas', oSend).catch(e => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo salio mal, intenta mas tarde',
                })
                console.log(e);
            });

            if (response?.data?.ok) {
                Swal.fire(
                    'Jugador agregado exitosamente',
                    'Este aparecera en la lista',
                    'success'
                );
            }
            setLoading(false);
        }
    }
    
    const validarCampos = () => {
        let camposCorrectos = true;

        //Validación del correo electrónico
        let correoElectronico = document.getElementById('correoElectronico').value;
        if (!(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(correoElectronico)){
            camposCorrectos = false;
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El correo electrónico no es correcto',
            })
        }

        //Validar que los campos de inputs file no esten vacios
        let kardex = document.getElementById('kardex').value;
        let identificacionOficial = document.getElementById('identificacionFile').value;
        let fotoDeportista = document.getElementById('fotoDeportista').value;

        if(!kardex || !identificacionOficial || !fotoDeportista){
            camposCorrectos = false;
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El kárdex, foto de deporitasta o la identificación ofical faltan por subir',
            })
        }

        return camposCorrectos;
    }

    const handleAnswerFile = (file, text) => {
        return file ? (
            <span className = "custom-text text-INE">¡{text} listo para subirse!</span>
        ) : (
            <span className = "custom-text text-INE">No se ha seleccionado algún archivo.</span>
        );
    };

    return(
        <div>
            <div className='obtenerQr'>

            <h1 className = "titleRegister">Registro para obtención de QR</h1>
            <p>NOTA: Los campos con "*" son obligatorios</p><br></br>

            <div className='formulario' onSubmit={handleSubmit}>
                <form>
                    <div className='form-izquierda'>
                        <div className='form-primero'>
                            <div>
                                <label>Expediente*</label><br/>
                                <input
                                    type="text"
                                    id='expediente'
                                    name='expediente'
                                    className="registrarDeportista-input"
                                    maxLength="6"
                                    onChange={e => setForm({...form,expediente:e.target.value})}
                                    required
                                />
                            </div>
                            <div>
                                <label>No. Seguro Social*</label><br/>
                                <input
                                    type="text"
                                    className="registrarDeportista-input"
                                    onChange={e => setForm({...form,numSeguroSocial:e.target.value})}
                                    required
                                />
                            </div>
                        </div>

                        <div className='form-segundo'>
                            <label>Nombre(s)*</label><br/>
                            <input
                                type="text"
                                className="registrarDeportista-input"
                                onChange={e => setForm({...form,nombres:e.target.value})}
                                required
                            /><p></p>

                            <label>Apellidos* (Apellido Paterno, Apellido Materno)</label><br/>
                            <input
                                type="text"
                                className="registrarDeportista-input"
                                onChange={e => setForm({...form,apellidos:e.target.value})}
                                required
                            /><p></p>

                            <label>Correo electrónico*</label><br/>
                            <input
                                type="e-mail"
                                className="registrarDeportista-input"
                                id='correoElectronico'
                                onChange={e => setForm({...form,correo:e.target.value})}
                                required
                            /><p></p>
                        </div>

                        <div className='form-tercero'>
                            <div>
                                <label>Teléfono celular*</label><br/>
                                <input
                                    type="text"
                                    className="registrarDeportista-input"
                                    onChange={e => setForm({...form,telefono:e.target.value})}
                                    required
                                />
                            </div>

                            <div>
                                <label>Teléfono de emergencia*</label><br/>
                                <input
                                    type="text"
                                    className="registrarDeportista-input"
                                    onChange={e =>setForm({...form,telefonoEmergencia:e.target.value})}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className='form-medio'>
                        <label>Facultad*</label><br/>
                        <select value={form.facultad} onChange={e => setForm({...form,facultad:e.target.value})} className="select">
                            {aFacultities.map(oFc => (
                                <option value={`Facultad de ${oFc}`}>{`Facultad de ${oFc}`}</option>
                            ))}
                            <option>Escuela de Bachilleres</option>
                        </select><p></p>
                        
                        <label>Sexo*</label><br/>
                        <select value={form.sexo} className="select" onChange={e => setForm({...form,sexo:e.target.value})}>
                            <option value={0}>Masculino</option>
                            <option value={1}>Femenino</option>
                        </select><p></p>
                        

                        {/* Apartado de los file inputs */}
                        <label>Kárdex*</label><br/>
                        <input
                            type="file"
                            accept = ".pdf, .png, .jpg, .jpeg"
                            name="kardex" id="kardex"
                            className="registrarDeportista-input inputfile"
                            onChange={e => {
                                console.log(e.target.files[0]);
                                setForm({...form, fotoCardex: e.target.files[0]});
                                setKardex(true);
                            }}
                        /><p></p>

                        <label
                            htmlFor="kardex"
                            className = "label-input-file label-kardex"
                        >
                            <img src = {ImgDocumentFiles} className = "document-icon"/>&nbsp; Subir archivo
                        </label>
                            {handleAnswerFile(kardex, 'Kardex')}
                        <br/>

                        <label>Identificación oficial*</label><br/>
                        <input
                            type="file"
                            accept=".pdf, .png, .jpg, .jpeg"
                            name="identificacionFile"
                            id="identificacionFile"
                            className="registrarDeportista-input inputfile"
                            onChange={e => {
                                console.log(e.target.files[0]);
                                setForm({...form, fotoIdentificacionOficial: e.target.files[0]});
                                setINE(true);
                            }}
                        /><p></p>
                        <label
                            htmlFor="identificacionFile"
                            className = "label-input-file label-INE"
                        >
                            <img src = {ImgDocumentFiles} className = "document-icon"/>&nbsp; Subir archivo
                        </label>
                            {handleAnswerFile(INE, 'INE')}
                        <br/>

                        <label>Foto del deportista*</label><br/>
                        <input
                            type="file"
                            accept = ".pdf, .png, .jpg, .jpeg"
                            name = "fotoDeportista"
                            id = "fotoDeportista"
                            className="registrarDeportista-input inputfile"
                            onChange={(e)=> {
                                console.log(e.target.files[0]);
                                setForm({...form, foto: e.target.files[0]});
                                setPhoto(true);
                            }}
                        /><p></p>
                        <label 
                            htmlFor="fotoDeportista"
                            className = "label-input-file label-foto"
                        >
                            <img src = {ImgDocumentFiles} className = "document-icon"/>&nbsp; Subir archivo
                        </label>
                            {handleAnswerFile(photo, 'Foto')}
                        <br/>
                        {/* ####################### */}

                    </div>

                    <div className='form-derecha'>
                        <label>Deporte*</label><br></br>
                        <select value={form.deporte} className="select" onChange={e => setForm({...form,deporte:e.target.value})}>
                            <option value="Futbol">Futbol</option>
                            <option value="Basquetball">Basquetball</option>
                        </select><p></p>

                        <label>Deportista seleccionado*</label><br></br>
                        <div className='form-options'>
                            <input
                                type="radio"
                                className="registrarDeportista-input"
                                value={0}
                                checked={radioButton.si}
                                onChange={e => {
                                    setRadioButton({
                                        si: true,
                                        no: false
                                    });
                                    setForm({...form,jugadorSeleccionado: 1});
                                }}
                            />
                            <label >Si</label>
                            <input
                                type="radio"
                                className="registrarDeportista-input"
                                value={1}
                                checked={radioButton.no}
                                onChange={e => {
                                    setRadioButton({
                                        si: false,
                                        no: true,
                                    });
                                    setForm({...form,jugadorSeleccionado: 0});
                                }}
                            />
                            <label >No</label><p></p>
                        </div>
                        <label>Número de jugador*</label><br></br>
                        <input
                            type="text"
                            className="registrarDeportista-input"
                            onChange={e => setForm({...form,numJugador:e.target.value})}
                            required
                        /><p></p>

                        {/* <label>Subdivisión de deporte*</label><br></br>
                        <select>
                            <option>xddd</option>
                        </select> */}
                    </div>
                    <input type="submit" className='CustomButton'  value="Guardar información"/>
                </form>
            </div>
            </div>
        </div>
    )
    
}

export default RegistrarDeportista;