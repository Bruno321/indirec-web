import React from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
//Cargamos los estilos
import "./ObtenerQrScreen.css";

const ObtenerQrScreen = () => {
 
    return(
        <div>
            <Header/>
            <div className='obtenerQr'>

            <h1>Registro para obtención de QR</h1>
            <p>NOTA: Los campos con "*" son obligatorios</p><br></br>

            <div className='formulario'>
                <form>
                    <div className='form-izquierda'>
                        <div className='form-primero'>
                            <div>
                                <label>Expediente*</label><br/>
                                <input type="text" />
                            </div>
                            <div>
                                <label>No. Seguro Social*</label><br/>
                                <input type="text" />
                            </div>
                        </div>

                        <div className='form-segundo'>
                            <label>Nombre(s)*</label><br/>
                            <input type="text" /><p></p>
                            <label>Apellidos* (Apellido Paterno, Apellido Materno)</label><br/>
                            <input type="text"/><p></p>
                            <label>Correo electrónico*</label><br/>
                            <input type="e-mail"/><p></p>
                        </div>

                        <div className='form-tercero'>
                            <div>
                                <label>Teléfono celular*</label><br/>
                                <input type="text"/>
                            </div>

                            <div>
                                <label>Teléfono de emergencia*</label><br/>
                                <input type="text"/>
                            </div>
                        </div>
                    </div>

                    <div className='form-medio'>
                        <label>Facultad*</label><br/>
                        <select>
                            <option>Facultad de Derecho</option>
                            <option>Facultad de Enfermería</option>
                            <option>Facultad de Contaduría y administración</option>
                            <option>Facultad de Filosofía</option>
                            <option>Facultad de Psicología</option>
                            <option>Facultad de Ciencias Naturales</option>
                            <option>Facultad de Ingeniería</option>
                            <option>Facultad de Bellas Artes</option>
                            <option>Facultad de Medicina</option>
                            <option>Facultad de Informática</option>
                            <option>Facultad de Química</option>
                            <option>Facultad de Ciencias Políticas y Sociales</option>
                            <option>Facultad de Lenguas y letras</option>
                            <option>Escuela de Bachilleres</option>
                        </select><p></p>
                        
                        <label>Sexo*</label><br/>
                        <select>
                            <option>Masculino</option>
                            <option>Femenino</option>
                        </select><p></p>
                        
                        <label>Kárdex*</label><br/>
                        <input type="file"/><p></p>
                        
                        <label>Identificación oficial*</label><br/>
                        <input type="file"/><p></p>
                        
                        <label>Foto del deportista*</label><br/>
                        <input type="file"/><p></p>
                    </div>

                    <div className='form-derecha'>
                        <label>Deporte*</label><br></br>
                        <select>
                            <option>Deporte uno aaaa</option>
                        </select><p></p>

                        <label>Deportista seleccionado*</label><br></br>
                        <div className='form-options'>
                            <input type="radio"/>
                            <label>Si</label>
                            <input type="radio"/>
                            <label>No</label><p></p>
                        </div>

                        <label>Número de jugador*</label><br></br>
                        <input type="text"/><p></p>

                        <label>Subdivisión de deporte*</label><br></br>
                        <select>
                            <option>xddd</option>
                        </select>
                    </div>
                </form>
            </div>
            <button className='CustomButton'>Guardar información</button>
            </div>
            <Footer/>
        </div>
    )
    
}

export default ObtenerQrScreen;