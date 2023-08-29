import React, { useState } from 'react';
// Se importa Sweet Alert para las alertas de Javascript
import Swal from 'sweetalert2';
import { aFacultities } from '../../Utils/constants';
import { SAVE_WITH_FILE, process } from '../../Service/Api';
//Cargamos los estilos
import "./RegistrarDeportista.css";
// Se implmentan imagenes
import ImgDocumentDeactivate from '../../Assets/icons/document-files-gray.png';
import ImgDocumentActive from '../../Assets/icons/document-files-white.png';
import ModalQR from '../Modals/ModalQR/ModalQR';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';


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
    numJugador: null,
    deporte:"Futbol",
    fotoIdentificacionOficial:null,
    foto:null,
    fotoCardex:null,
};

const RegistrarDeportista = () => {
    const [showNumJugador,setShowNumJugador] = useState(0);
    const [radioButton,setRadioButton] = useState({
        si: false,
        no: false
    });
    const [kardex, setKardex] = useState(false);
    const [INE, setINE] = useState(false);
    const [photo, setPhoto] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deportistaData,setDeportistaData] = useState({
        nombre:"",
        apellidos:"",
        id:""
    })

    const [form,setForm] = useState(oInitialState);
    const [mostrarModalQr, setMostrarModalQr] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        //Se valida si los campos del formulario estan completos
        e.preventDefault();
        setIsLoading(true);
        if (validarCampos()) {
            setLoading(true);
            let oSend = new FormData();

            if (!showNumJugador && form.numJugador === null) {
                delete form.numJugador;
            }

            for (const sKey in form) {
                oSend.append(sKey, form[sKey]);
            }

            const response = await process(SAVE_WITH_FILE, 'deportistas', oSend).catch(e => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${e.response.data.message}`,
                })
            });

            if (response?.status === 201) {
                const { nombres, apellidos, id } = response.data;
                setDeportistaData({
                    nombres,
                    apellidos,
                    id,
                })
                Swal.fire(
                    'Jugador agregado exitosamente',
                    'Este aparecera en la lista',
                    'success'
                ).then(result => {
                    if(result.isConfirmed){
                        setMostrarModalQr(true);
                    }
                })
            }
            setIsLoading(false);
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

    const renderImageKardex = () =>{
        return kardex ? (
            <img src = {ImgDocumentActive} className = "document-icon"/>
        ):(
            <img src = {ImgDocumentDeactivate} className = "document-icon"/>

        );
    }
    const renderImageINE = () =>{
        return INE ? (
            <img src = {ImgDocumentActive} className = "document-icon"/>
        ):(
            <img src = {ImgDocumentDeactivate} className = "document-icon"/>

        );
    }
    const renderImagePhoto = () =>{
        return photo ? (
            <img src = {ImgDocumentActive} className = "document-icon"/>
        ):(
            <img src = {ImgDocumentDeactivate} className = "document-icon"/>

        );
    }


    return(
        <>
            <h3 className = "titleRegister">Registrar deportista</h3>
            <br/>
            <div className='obtenerQr'>
                <div className='formulario' onSubmit={handleSubmit}>
                    <form>
                        <div className='form-izquierda'>
                            <div className='form-primero'>
                                <div>
                                    <label htmlFor='expediente'>Expediente:</label><br/>
                                    <input
                                        type="text"
                                        id='expediente'
                                        name='expediente'
                                        className="registrarDeportista-input"
                                        maxLength="6"
                                        placeholder='123456'
                                        onChange={e => setForm({...form,expediente:e.target.value})}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor='noSeguroSocial'>No. Seguro Social:</label><br/>
                                    <input
                                        type="text"
                                        id='noSeguroSocial'
                                        className="registrarDeportista-input"
                                        placeholder='12345678900'
                                        onChange={e => setForm({...form,numSeguroSocial:e.target.value})}
                                        required
                                    />
                                </div>
                            </div>

                            <div className='form-segundo'>
                                <label htmlFor='nombre'>Nombre(s):</label><br/>
                                <input
                                    type="text"
                                    id='nombre'
                                    className="registrarDeportista-input"
                                    placeholder='Nombre(s)'
                                    onChange={e => setForm({...form,nombres:e.target.value})}
                                    required
                                /><p></p>

                                <label htmlFor='apellidos'>Apellidos: (Apellido Paterno, Apellido Materno)</label><br/>
                                <input
                                    type="text"
                                    id='apellidos'
                                    className="registrarDeportista-input"
                                    placeholder='Apellido paterno Apellido materno'
                                    onChange={e => setForm({...form,apellidos:e.target.value})}
                                    required
                                /><p></p>

                                <label htmlFor='correoElectronico'>Correo electrónico:</label><br/>
                                <input
                                    type="e-mail"
                                    className="registrarDeportista-input"
                                    id='correoElectronico'
                                    placeholder='correo@ejemplo.com'
                                    onChange={e => setForm({...form,correo:e.target.value})}
                                    required
                                /><p></p>
                            </div>

                            <div className='form-tercero'>
                                <div>
                                    <label htmlFor='telCelular' id='telefonoCelular'>Teléfono celular:</label><br/>
                                    <input
                                        type="text"
                                        className="registrarDeportista-input"
                                        id='telCelular'
                                        name='telCelular'
                                        onChange={e => setForm({...form,telefono:e.target.value})}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor='telefonoEmergencia'>Teléfono de emergencia:</label><br/>
                                    <input
                                        type="text"
                                        className="registrarDeportista-input"
                                        id='telefonoEmergencia'
                                        onChange={e =>setForm({...form,telefonoEmergencia:e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='form-medio'>
                            <label htmlFor='facultad'>Facultad:</label><br/>
                            <select id='facultad' value={form.facultad} onChange={e => setForm({...form,facultad:e.target.value})} className="select">
                                {aFacultities.map(oFc => (
                                    <option value={`Facultad de ${oFc}`}>{`Facultad de ${oFc}`}</option>
                                ))}
                                <option>Escuela de Bachilleres</option>
                            </select><p></p>
                            
                            <label htmlFor='sexo'>Sexo:</label><br/>
                            <select id='sexo' value={form.sexo} className="select" onChange={e => setForm({...form,sexo:e.target.value})}>
                                <option value={0}>Masculino</option>
                                <option value={1}>Femenino</option>
                            </select><p></p>
                            

                            {/* Apartado de los file inputs */}
                            <label htmlFor='kardex'>Kárdex:</label><br/>
                            <input
                                type="file"
                                accept = ".pdf, .png, .jpg, .jpeg"
                                name="kardex" id="kardex"
                                className="registrarDeportista-input inputfile"
                                onChange={e => {
                                    setForm({...form, fotoCardex: e.target.files[0]});
                                    setKardex(true);
                                }}
                            /><p></p>

                            <label
                                htmlFor="kardex"
                                className = "label-input-file label-kardex inputfile"
                                style={{backgroundColor: kardex ? "#01C109": "#fff",
                                color: kardex ? "#fff" : "#939191"
                                }}
                            >
                                {renderImageKardex()}&nbsp; Subir archivo
                            </label>
                                {handleAnswerFile(kardex, 'Kardex')}
                            <br/>

                            <label htmlFor='identificacionFile'>Identificación oficial:</label><br/>
                            <input
                                type="file"
                                accept=".pdf, .png, .jpg, .jpeg"
                                name="identificacionFile"
                                id="identificacionFile"
                                className="registrarDeportista-input inputfile"
                                onChange={e => {
                                    setForm({...form, fotoIdentificacionOficial: e.target.files[0]});
                                    setINE(true);
                                }}
                            /><p></p>
                            <label
                                htmlFor="identificacionFile"
                                className = "label-input-file label-INE inputfile"
                                style={{backgroundColor: INE ? "#01C109": "#fff",
                                color: INE ? "#fff" : "#939191"
                                }}
                            >
                                {renderImageINE()}&nbsp; Subir archivo
                            </label>
                                {handleAnswerFile(INE, 'INE')}
                            <br/>

                            <label htmlFor='fotoDeportista'>Foto del deportista:</label><br/>
                            <input
                                type="file"
                                accept = ".pdf, .png, .jpg, .jpeg"
                                name = "fotoDeportista"
                                id = "fotoDeportista"
                                className="registrarDeportista-input inputfile"
                                onChange={(e)=> {
                                    setForm({...form, foto: e.target.files[0]});
                                    setPhoto(true);
                                }}
                            /><p></p>
                            <label 
                                htmlFor="fotoDeportista"
                                className = "label-input-file label-foto inputfile"
                                style={{backgroundColor: photo ? "#01C109": "#fff",
                                color: photo ? "#fff" : "#939191"
                            }}
                            >
                                {renderImagePhoto()}&nbsp; Subir archivo
                            </label>
                                {handleAnswerFile(photo, 'Foto')}
                            <br/>
                        </div>

                        <div className='form-derecha'>
                            <label htmlFor='deporte'>Deporte:</label><br></br>
                            <select id='deporte' value={form.deporte} className="select" onChange={e => setForm({...form,deporte:e.target.value})}>
                                <option value="Futbol">Futbol</option>
                                <option value="Basquetball">Basquetball</option>
                            </select><p></p>

                            <label htmlFor='deportistaSeleccionadoSi'>Deportista seleccionado:</label><br></br>
                            <div className='form-options'>
                                <input
                                    type="radio"
                                    className="registrarDeportista-input radioBtnSelector"
                                    value={0}
                                    checked={radioButton.si}
                                    id='deportistaSeleccionadoSi'
                                    onChange={e => {
                                        setRadioButton({
                                            si: true,
                                            no: false
                                        });
                                        setForm({...form,jugadorSeleccionado: 1});
                                        setShowNumJugador(1);
                                    }}
                                />
                                <label htmlFor='deportistaSeleccionadoSi'>Si</label>
                                <input
                                    type="radio"
                                    className="registrarDeportista-input radioBtnSelector"
                                    value={1}
                                    checked={radioButton.no}
                                    id='deportistaSeleccionadoNo'
                                    onChange={e => {
                                        setRadioButton({
                                            si: false,
                                            no: true,
                                        });
                                        setForm({...form,jugadorSeleccionado: 0});
                                        setShowNumJugador(0);

                                    }}
                                />
                                <label htmlFor='deportistaSeleccionadoNo'>No</label><p></p>
                            </div>
                            <label htmlFor='numeroJugador'
                                style={{display: showNumJugador === 1 ? "inline" : "none" }}
                                >Número de jugador:</label><br></br>
                            <input
                                type="text"
                                id='numeroJugador'
                                className="registrarDeportista-input"
                                style={{display: showNumJugador === 1 ? "inline" : "none" }}
                                placeholder='00'
                                onChange={e => setForm({...form,numJugador:e.target.value})}
                            /><p></p>
                        </div>
                        <input type="submit" className='CustomButton'  value="Guardar información"/>
                    </form>
                </div>
                {
                    isLoading
                    ? 
                        <div style={{position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, .5)'}}>
                            <LoadingSpinner/>
                        </div>
                    :
                        ''
                }
            </div>
            
            {
                mostrarModalQr ?  <ModalQR datos={deportistaData} setMostrarModalQr={setMostrarModalQr}/> : ''
            }
        </>
    )
    
}

export default RegistrarDeportista;