import React, {useState, useContext} from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
// Estilos de CSS
import "./DatosDeLaAsistencia.css";

// Iconos

// Fecha de hoy
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1; // El método getMonth() devuelve un número del 0 al 11, por lo que debemos sumar 1 para obtener el mes actual.
const day = today.getDate();

const todayDate = `${year}-${month}-${day}`;
// console.log("La fecha de hoy es: ",formattedDate); // Salida: "2023-3-26"
//Fechas inicializadas

// Inicializar las fechas de inicio y termino en la fecha de hoy
const oInitialState = {
    fechaInicio: todayDate,
    fechaTermino: todayDate
}

export const DatosDeLaAsistencia = ()=>{
    // Manipular fechas dentro del mini form de rangos de fechas:
    const [form, setForm] = useState(oInitialState);

    // Hacer que los inputs tengan por defecto la fecha de hoy
    const [selectedDate, setSelectedDate] = useState(todayDate);
    return(
    <div>
    <section className = "infoAsistencia">
        <h1 className = "margin-between-paragraphs titleDatosAsitencias">DATOS DE LA ASISTENCIA</h1>
        <h2 className="margin-between-paragraphs nombreDeportista">[NOMBRE DE LA ASISTENCIA]</h2>
        <p className="margin-between-paragraphs txtInfo txtDiasEntenados">Días entrenados en el rango de días:</p>
        <p className="margin-between-paragraphs txtInfo txtHorasEntenadas">Total de horas a la rango de días</p>
    </section>
    <section className = "inputsFechasAsistencias">
        <label htmlFor = "RangoDeFechas" className="labelInput">Seleccionar rango de fechas de Asistencia:</label>
        <section className="inputAsistenciasSection">
            <input type = "date" className = "inputDates fechaInicio" defaultValue={selectedDate} onChange ={(e) => setForm({...form, fechaInicio: e.target.value})} required/>
            <input type = "date" className = "inputDates fechaTermino" defaultValue={selectedDate} onChange = {(e) => setForm({...form, fechaTermino: e.target.value})} required/>
        </section>
    </section>
    <section className= "sectionTable">
    
    </section>    
    </div>
    )
}