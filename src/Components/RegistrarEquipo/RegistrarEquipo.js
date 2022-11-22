import React from "react";
import './RegistrarEquipo.css';

const RegistrarEquipo = () => {
    return(
        <div className="container">
            <h3>Registro de Equipo</h3>
            <div className="registroEquipo">
                <form className="form-registroEquipo">
                    <div className="containerTop-registro">
                        <div className="containers-input-registroEquipo">
                            <label for="nombreEquipo">Nombre del equipo:</label>
                            <input type='text' id='nombreEquipo' className="inputs-registro" name="nombreEquipo" placeholder="Nombre del equipo"/>
                        </div>
                        <div className="containers-input-registroEquipo">
                            <label for="facultad">Facultad:</label>
                            <select id="facultad" className="inputs-registro">
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
                            </select>
                        </div>
                        <div className="containers-input-registroEquipo">
                            <label for="deporte">Deporte:</label>
                            <select id="deporte" className="inputs-registro">
                                <option value="Futbol">Futbol</option>
                                <option value="Basquetball">Basquetball</option>
                            </select>
                        </div>
                        <div className="containers-input-registroEquipo">
                            <label for="campus">Campus:</label>
                            <select id="campus" className="inputs-registro">
                                <option value="Futbol">Juriquilla</option>
                                <option value="Basquetball">Centro Historico</option>
                            </select>
                        </div>
                        <div className="containers-input-registroEquipo">
                            <label>Categoria:</label>
                            <div className="radioButtons-registroEquipo">
                                <input type="radio" id="Femenil" name="categoria" value="Femenil"/>
                                <label for="Femenil">Femenil</label>
                                <input type="radio" id="Varonil" name="categoria" value="Varonil"/>
                                <label for="Varonil">Varonil</label>
                            </div>
                        </div>
                    </div>
                    <div className="containerButtom-registro">
                        <div className="container-datosEntrenador">
                            <p>Datos del entrenador:</p>
                            <div className="containers-input-registroEquipo">
                                <label for="nombreEntrenador">Nombre(s):</label>
                                <input type="text" id="nombreEntrenador" className="inputs-registro" name="nombreEntrenador" placeholder="Nombre del entrenador"/>
                            </div>
                            <div className="containers-input-registroEquipo">
                                <label for="apellidosEntrenador">Apellidos:</label>
                                <input type="text" id="apellidosEntrenador" className="inputs-registro" name="apellidosEntrenador" placeholder="Apellidos del entrendador"/>
                            </div>
                        </div>
                        <div className="container-datosAsistente">
                            <p>Datos del asistente:</p>
                            <div className="containers-input-registroEquipo">
                                <label for="nombreAsistente">Nombre(s):</label>
                                <input type="text" id="nombreAsistente" className="inputs-registro" name="nombreAsistente" placeholder="Nombre del asistente"/>
                            </div>
                            <div className="containers-input-registroEquipo">
                                <label for="apellidosAsistente">Apellidos:</label>
                                <input type="text" id="apellidosAsistente" className="inputs-registro" name="apellidosAsistente" placeholder="Apellidos del asistente"/>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="container-table-listaJugadores">
                    <p>Lista de jugadores:</p>
                </div>
            </div>  
            <div className="containerButton-registroEquipo">
                <button className="button-registroEquipo">Registrar Equipo</button>
            </div>
        </div>
    )
}

export default RegistrarEquipo;