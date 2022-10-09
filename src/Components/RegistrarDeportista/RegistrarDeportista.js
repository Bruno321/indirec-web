import React from 'react';
import Header from '../Header/Header';
//Cargamos los estilos
import "./RegistrarDeportista.css";
// Se importa el useState y el useRef
import { useState} from 'react';
// Se importa axios para subir la información a la BD
import axios from 'axios';
// Se importa Sweet Alert para las alertas de Javascript
import Swal from 'sweetalert2';
// Se implmentan imagenes
import ImgDocumentFiles from '../../Assets/icons/document-files.png';
const RegistrarDeportista = () => {
    const [radioButton,setRadioButton] = useState("0")
 
    const [form,setForm] = useState({
        expediente:"",
        nombres:"",
        apellidos:"",
        sexo: "0",
        facultad:"Facultad de Derecho",
        jugadorSeleccionado:radioButton,
        numSeguroSocial:"",
        numJugador:"",
        correo:"",
        telefono:"",
        telefonoEmergencia:"",
        deporte:"Futbol",
        fotoCardex:"",
        fotoIdentificacionOficial:"",
        foto:""
    })

    const token = localStorage.getItem('token')

    const handleSubmit = (e) => {
        console.log(form)
        e.preventDefault()
        let bodyFormData = new FormData();
        bodyFormData.append('expediente', form.expediente);
        bodyFormData.append('nombres', form.nombres);
        bodyFormData.append('apellidos', form.apellidos);
        bodyFormData.append('sexo', parseInt(form.sexo));
        bodyFormData.append('facultad', form.facultad);
        bodyFormData.append('jugadorSeleccionado', form.jugadorSeleccionado);
        bodyFormData.append('numSeguroSocial', form.numSeguroSocial);
        bodyFormData.append('numJugador', form.numJugador);
        bodyFormData.append('correo', form.correo);
        bodyFormData.append('telefono', form.telefono);
        bodyFormData.append('telefonoEmergencia', form.telefonoEmergencia);
        bodyFormData.append('deporte', form.deporte);
        bodyFormData.append('fotoCardex', form.fotoCardex);
        bodyFormData.append('fotoIdentificacionOficial', form.fotoIdentificacionOficial);
        bodyFormData.append('foto', form.foto);
        
        axios({
            method: "POST",
            url: "http://localhost:3000/api/deportistas",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data","Access-Control-Allow-Origin":null ,'Authorization': `Bearer ${token}`},
            mode: 'cors',
        })
        .then((response)=>{
            Swal.fire(
                'Jugador agregado exitosamente',
                'Este aparecera en la lista',
                'success'
              )
        })
        .catch((e)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salio mal, intenta mas tarde',
              })
            console.log(e)
        })
    }
    const [kardex, setKardex] = useState(0);
    const [INE, setINE] = useState(0);
    const [photo, setPhoto] = useState(0);
    const handleAnswerKardex = () => {
        if(kardex === 0){
            return(
                <span className = "custom-text text-INE">No se ha seleccionado algún archivo.</span>
            );
        }
        if(kardex === 1){
            return(
            <span className = "custom-text text-INE">¡Kardex listo para subirse!</span>
            );
        }
    }
    const handleAnswerINE = () => {
        if(INE === 0){
            return(
                <span className = "custom-text text-INE">No se ha seleccionado algún archivo.</span>
            );
        }
        if(INE === 1){
            return(
            <span className = "custom-text text-INE">ID lista para subirse!</span>
            );
        }
    }
    const handleAnswerPhoto = () => {
        if(photo === 0){
            return(
                <span className = "custom-text text-INE">No se ha seleccionado algún archivo.</span>
            );
        }
        if(photo === 1){
            return(
            <span className = "custom-text text-INE">¡Foto lista para subirse!</span>
            );
        }
    }
    return(
        <div>
            <div className='obtenerQr'>

            <h1 className = "titleRegister">Registro para obtención de QR</h1>
            <p>NOTA: Los campos con "*" son obligatorios</p><br></br>

            <div className='formulario' onSubmit={(e)=>handleSubmit(e)}>
                <form>
                    <div className='form-izquierda'>
                        <div className='form-primero'>
                            <div>
                                <label>Expediente*</label><br/>
                                <input type="text" className="registrarDeportista-input" onChange={(e)=>setForm({...form,expediente:e.target.value})}/>
                            </div>
                            <div>
                                <label>No. Seguro Social*</label><br/>
                                <input type="text"  className="registrarDeportista-input" onChange={(e)=>setForm({...form,numSeguroSocial:e.target.value})}/>
                            </div>
                        </div>

                        <div className='form-segundo'>
                            <label>Nombre(s)*</label><br/>
                            <input type="text"  className="registrarDeportista-input" onChange={(e)=>setForm({...form,nombres:e.target.value})}/><p></p>
                            <label>Apellidos* (Apellido Paterno, Apellido Materno)</label><br/>
                            <input type="text" className="registrarDeportista-input" onChange={(e)=>setForm({...form,apellidos:e.target.value})}/><p></p>
                            <label>Correo electrónico*</label><br/>
                            <input type="e-mail" className="registrarDeportista-input" onChange={(e)=>setForm({...form,correo:e.target.value})}/><p></p>
                        </div>

                        <div className='form-tercero'>
                            <div>
                                <label>Teléfono celular*</label><br/>
                                <input type="text" className="registrarDeportista-input" onChange={(e)=>setForm({...form,telefono:e.target.value})}/>
                            </div>

                            <div>
                                <label>Teléfono de emergencia*</label><br/>
                                <input type="text" className="registrarDeportista-input" onChange={(e)=>setForm({...form,telefonoEmergencia:e.target.value})}/>
                            </div>
                        </div>
                    </div>

                    <div className='form-medio'>
                        <label>Facultad*</label><br/>
                        <select value={form.facultad} onChange={(e)=>setForm({...form,facultad:e.target.value})}>
                            <option value="Facultad de Derecho">Facultad de Derecho</option>
                            <option value="Facultad de Enfermería">Facultad de Enfermería</option>
                            <option value="Facultad de Contaduría y administración">Facultad de Contaduría y administración</option>
                            <option value="Facultad de Filosofía">Facultad de Filosofía</option>
                            <option value="Facultad de Psicología">Facultad de Psicología</option>
                            <option value="Facultad de Ciencias Naturales">Facultad de Ciencias Naturales</option>
                            <option value="Facultad de Ingeniería">Facultad de Ingeniería</option>
                            <option value="Facultad de Bellas Artes">Facultad de Bellas Artes</option>
                            <option value="Facultad de Medicina">Facultad de Medicina</option>
                            <option value="Facultad de Informática">Facultad de Informática</option>
                            <option value="Facultad de Química">Facultad de Química</option>
                            <option value="Facultad de Ciencias Políticas y Sociales">Facultad de Ciencias Políticas y Sociales</option>
                            <option value="Facultad de Lenguas y letras">Facultad de Lenguas y letras</option>
                            <option>Escuela de Bachilleres</option>
                        </select><p></p>
                        
                        <label>Sexo*</label><br/>
                        <select value={form.sexo} onChange={(e)=>setForm({...form,sexo:e.target.value})}>
                            <option value="0">Masculino</option>
                            <option value="1">Femenino</option>
                        </select><p></p>
                        
                        <label>Kárdex*</label><br/>
                        <input type="file" accept = ".pdf, .jpg" name = "file" id = "file" className="registrarDeportista-input inputfile" onChange={(e)=>setForm({...form,fotoCardex:e.target.files[0]})}/><p></p>
                        <label htmlFor="file" className = "label-input-file label-kardex" onClick={()=>setKardex(1)}><img src = {ImgDocumentFiles} className = "document-icon"/>&nbsp; Subir archivo</label>
                            {handleAnswerKardex()}
                        <br/>
                            {/* Cosas que puedo hacer: un useState de True y False, donde True diga en el span que el archivo se subió y si no, que no. */}
                        <label>Identificación oficial*</label><br/>
                        <input type="file" accept = ".pdf, .jpg" name = "file" id = "file" className="registrarDeportista-input inputfile" onChange={(e)=>{
                            setForm({...form,fotoIdentificacionOficial:e.target.files[0]});
                             }}/><p></p>
                        <label htmlFor="file" className = "label-input-file label-INE" onClick={()=>setINE(1)}><img src = {ImgDocumentFiles} className = "document-icon"/>&nbsp; Subir archivo</label>
                            {handleAnswerINE()}
                        <br/>
                        
                        <label>Foto del deportista*</label><br/>
                        <input type="file" accept = ".pdf, .jpg" name = "file" id = "file" className="registrarDeportista-input inputfile" onChange={(e)=>setForm({...form,foto:e.target.files[0]})}/><p></p>
                        <label htmlFor="file" className = "label-input-file label-foto" onClick={()=>setPhoto(1)}><img src = {ImgDocumentFiles} className = "document-icon"/>&nbsp; Subir archivo</label>
                        {handleAnswerPhoto()}
                        <br/>
                    </div>

                    <div className='form-derecha'>
                        <label>Deporte*</label><br></br>
                        <select value={form.deporte} onChange={(e)=>setForm({...form,deporte:e.target.value})}>
                            <option value="Futbol">Futbol</option>
                            <option value="Basquetball">Basquetball</option>
                        </select><p></p>

                        <label>Deportista seleccionado*</label><br></br>
                        <div className='form-options'>
                            <input type="radio" className="registrarDeportista-input" value="0" checked={radioButton==="0"?"checked":""} onChange={(e) => {setRadioButton("0");setForm({...form,jugadorSeleccionado:e.target.value})}}/>
                            <label >Si</label>
                            <input type="radio" className="registrarDeportista-input" value="1" checked={radioButton==="1"?"checked":""} onChange={(e) => {setRadioButton("1");setForm({...form,jugadorSeleccionado:e.target.value})}}/>
                            <label >No</label><p></p>
                        </div>
                        <label>Número de jugador*</label><br></br>
                        <input type="text" className="registrarDeportista-input" onChange={(e)=>setForm({...form,numJugador:e.target.value})}/><p></p>

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