import React, {useState} from "react";
import TableJugadoresEquipo from "../TableListaJugadoresEquipo/TableJugadoresEquipo";
import './RegistrarEquipo.css';
import PencilAlt from "../../Assets/icons/pencilAlt.png";
import ListaJugadores from "../ListaJugadores/ListaJugadores";

const RegistrarEquipo = () => {

    const [mostrarListaJugadoresEquipo, setMostrarListaJugadoresEquipo] = useState(false);
    const [listaJugadores, setListaJugadores] = useState([]);

    return(
        <div className="container">
            <h3>Registro de Equipo</h3>
            <div className="registroEquipo">
                <form className="form-registroEquipo">
                    <div className="containerTop-registro">
                        <div className="containers-input-registroEquipo">
                            <label htmlFor="nombreEquipo">Nombre del equipo:</label>
                            <input type='text' id='nombreEquipo' className="inputs-registro" name="nombreEquipo" placeholder="Nombre del equipo" required/>
                        </div>
                        <div className="containers-input-registroEquipo">
                            <label htmlFor="facultad">Facultad:</label>
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
                            <label htmlFor="deporte">Deporte:</label>
                            <select id="deporte" className="inputs-registro">
                                <option value="Futbol">Futbol</option>
                                <option value="Basquetball">Basquetball</option>
                            </select>
                        </div>
                        <div className="containers-input-registroEquipo">
                            <label htmlFor="campus">Campus:</label>
                            <select id="campus" className="inputs-registro">
                                <option value="Futbol">Juriquilla</option>
                                <option value="Basquetball">Centro Historico</option>
                            </select>
                        </div>
                        <div className="containers-input-registroEquipo">
                            <label>Categoria:</label>
                            <div className="radioButtons-registroEquipo">
                                <input type="radio" id="Femenil" name="categoria" value="Femenil"/>
                                <label htmlFor="Femenil">Femenil</label>
                                <input type="radio" id="Varonil" name="categoria" value="Varonil"/>
                                <label htmlFor="Varonil">Varonil</label>
                            </div>
                        </div>
                    </div>
                    <div className="containerButtom-registro">
                        <div className="container-datosEntrenador">
                            <p>Datos del entrenador:</p>
                            <div className="containers-input-registroEquipo">
                                <label htmlFor="nombreEntrenador">Nombre(s):</label>
                                <input type="text" id="nombreEntrenador" className="inputs-registro" name="nombreEntrenador" placeholder="Nombre del entrenador"/>
                            </div>
                            <div className="containers-input-registroEquipo">
                                <label htmlFor="apellidosEntrenador">Apellidos:</label>
                                <input type="text" id="apellidosEntrenador" className="inputs-registro" name="apellidosEntrenador" placeholder="Apellidos del entrendador"/>
                            </div>
                        </div>
                        <div className="container-datosAsistente">
                            <p>Datos del asistente:</p>
                            <div className="containers-input-registroEquipo">
                                <label htmlFor="nombreAsistente">Nombre(s):</label>     
                                <input type="text" id="nombreAsistente" className="inputs-registro" name="nombreAsistente" placeholder="Nombre del asistente"/>
                            </div>
                            <div className="containers-input-registroEquipo">
                                <label htmlFor="apellidosAsistente">Apellidos:</label>
                                <input type="text" id="apellidosAsistente" className="inputs-registro" name="apellidosAsistente" placeholder="Apellidos del asistente"/>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="container-table-listaJugadores">
                    <p>Lista de jugadores:</p>
                    <div className="containerTableJugadoresEquipo">
                        <TableJugadoresEquipo listaJugadores={listaJugadores}/>
                    </div>
                    <div className="btnEditarEquipo" onClick={() => setMostrarListaJugadoresEquipo(true)}>
                        <img src={PencilAlt}/>
                        Editar Equipo
                    </div>
                </div>
            </div>  
            <div className="containerButton-registroEquipo">
                <button className="button-registroEquipo">Registrar Equipo</button>
            </div>
            {
                // console.log(listaJugadores)
            }
            <ListaJugadores trigger={mostrarListaJugadoresEquipo} setTrigger={setMostrarListaJugadoresEquipo} jugadores={listaJugadores} setJugadores={setListaJugadores}></ListaJugadores>
        </div>
    )
}

export default RegistrarEquipo;