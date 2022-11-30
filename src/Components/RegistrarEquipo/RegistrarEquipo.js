import React, { useState } from "react";
import { aFacultities, aCampus } from '../../Utils/constants';
import TableJugadoresEquipo from "../TableListaJugadoresEquipo/TableJugadoresEquipo";
import './RegistrarEquipo.css';
import PencilAlt from "../../Assets/icons/pencilAlt.png";
import ListaJugadores from "../ListaJugadores/ListaJugadores";
import Swal from 'sweetalert2';
import { SAVE, process } from "../../Service/Api";

const oInitialState = {
    nombre: "",
    facultad: "Facultad de Derecho",
    campus: "Centro Universitario",
    deporte: "Futbol",
    categoria: "0",
    nombreEntrenador: "",
    apellidoEntrenador: "",
    nombreAsistente: "",
    apellidoAsistente: "",
}

const RegistrarEquipo = () => {

    const [mostrarListaJugadoresEquipo, setMostrarListaJugadoresEquipo] = useState(false);
    const [listaJugadores, setListaJugadores] = useState([]);

    const [form, setForm] = useState(oInitialState);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const idJugadores = listaJugadores.map(jugador => jugador.deportistaId);
        console.log(idJugadores);

        setForm(form.jugadores = idJugadores)
        console.log(form)

        if(listaJugadores.length != 0){
            
            const response = await process(SAVE, 'equipos', form).catch(e => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo salio mal, intenta mas tarde',
                })
                console.log(e);
            });

            if (response?.data?.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'El registro fue exitoso',
                    confirmButtonText: 'Aceptar'
                })
            }
        }else{
            // alert('Faltan agregar jugadores al equipo');
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Faltan agregar jugadores al equipo',
                confirmButtonText: 'Aceptar'
            })
        }
    }

    return(
        <div className="container">
            <h3>Registro de Equipo</h3>
            <div className="registroEquipo">
                <form className="form-registroEquipo" id="registrarEquipoForm" onSubmit={(e)=>handleSubmit(e)}>
                    <div className="containerTop-registro">
                        <div className="containers-input-registroEquipo">
                            <label htmlFor="nombreEquipo">Nombre del equipo:</label>
                            <input type='text' id='nombreEquipo' className="inputs-registro" 
                                name="nombreEquipo" placeholder="Nombre del equipo" required
                                onChange={e => setForm({...form,nombre:e.target.value})}
                            />
                        </div>
                        <div className="containers-input-registroEquipo">
                            <label htmlFor="facultad">Facultad:</label>
                            <select id="facultad" className="inputs-registro" value={form.facultad} onChange={e => setForm({...form,facultad:e.target.value})}>
                                {aFacultities.map(oFc => (
                                    <option value={`Facultad de ${oFc}`}>{`Facultad de ${oFc}`}</option>
                                ))}
                                <option>Escuela de Bachilleres</option>
                            </select>
                        </div>
                        <div className="containers-input-registroEquipo">
                            <label htmlFor="deporte">Deporte:</label>
                            <select id="deporte" className="inputs-registro" value={form.deporte} onChange={e => setForm({...form,deporte:e.target.value})}>
                                <option value="Futbol">Futbol</option>
                                <option value="Basquetball">Basquetball</option>
                            </select>
                        </div>
                        <div className="containers-input-registroEquipo">
                            <label htmlFor="campus">Campus:</label>
                            <select id="campus" className="inputs-registro" onChange={e => setForm({...form,campus:e.target.value})}>
                                {aCampus.map(c => (
                                    <option value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                        <div className="containers-input-registroEquipo">
                            <label>Categoria:</label>
                            <div className="radioButtons-registroEquipo">
                                <input type="radio" id="Varonil" name="categoria" value="Varonil" checked onChange={e => setForm({...form,categoria:0})}/>
                                <label htmlFor="Varonil">Varonil</label>
                                <input type="radio" id="Femenil" name="categoria" value="Femenil" onChange={e => setForm({...form,categoria:1})}/>
                                <label htmlFor="Femenil">Femenil</label>
                            </div>
                        </div>
                    </div>
                    <div className="containerButtom-registro">
                        <div className="container-datosEntrenador">
                            <p>Datos del entrenador:</p>
                            <div className="containers-input-registroEquipo">
                                <label htmlFor="nombreEntrenador">Nombre(s):</label>
                                <input type="text" id="nombreEntrenador" 
                                    className="inputs-registro" name="nombreEntrenador" 
                                    placeholder="Nombre del entrenador" required
                                    onChange={e => setForm({...form,nombreEntrenador:e.target.value})}
                                />
                            </div>
                            <div className="containers-input-registroEquipo">
                                <label htmlFor="apellidosEntrenador">Apellidos:</label>
                                <input type="text" id="apellidosEntrenador" className="inputs-registro" 
                                    name="apellidosEntrenador" placeholder="Apellidos del entrendador" required
                                    onChange={e => setForm({...form,apellidoEntrenador:e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="container-datosAsistente">
                            <p>Datos del asistente:</p>
                            <div className="containers-input-registroEquipo">
                                <label htmlFor="nombreAsistente">Nombre(s):</label>     
                                <input type="text" id="nombreAsistente" className="inputs-registro" 
                                    name="nombreAsistente" placeholder="Nombre del asistente" required
                                    onChange={e => setForm({...form,nombreAsistente:e.target.value})}
                                />
                            </div>
                            <div className="containers-input-registroEquipo">
                                <label htmlFor="apellidosAsistente">Apellidos:</label>
                                <input type="text" id="apellidosAsistente" className="inputs-registro" 
                                    name="apellidosAsistente" placeholder="Apellidos del asistente" required
                                    onChange={e => setForm({...form,apellidoAsistente:e.target.value})}
                                />
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
                <button type="submit" form="registrarEquipoForm" className="button-registroEquipo">Registrar Equipo</button>
            </div>
            <ListaJugadores trigger={mostrarListaJugadoresEquipo} setTrigger={setMostrarListaJugadoresEquipo} jugadores={listaJugadores} setJugadores={setListaJugadores}></ListaJugadores>
        </div>
    )
}

export default RegistrarEquipo;