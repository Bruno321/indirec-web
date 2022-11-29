import React from 'react';
import { aFacultities } from '../../../../indirec-mobile/Utils/Constants';
import './Filters.css';

// ! Change this later
const aSports = ['Todos', 'Futbol', 'Basquetball'];
const aStatus = ['Todos', 'Activo', 'Inactivo'];

export const Filters = () => {
  return (
    <div className='filters-container'>
      <div style={{ width: '100%' }}>
        <p>Facultad</p>
        <select className="input inputSelect filter-select" id="facultad">
          <option>Todas</option>
          {aFacultities.map(oFc => (
            <option
              value={`Facultad de ${oFc}`}
            >{`Facultad de ${oFc}`}</option>
          ))}
          <option>Escuela de Bachilleres</option>
        </select>
      </div>

      <div className='filter-row'>
        <p>Deporte</p>
        <select className="input inputSelect filter-select" id="facultad">
          {aSports.map(oSport => (
            <option value={oSport}>{oSport}</option>
          ))}
        </select>
      </div>

      <div className='filter-row'>
        <p>Estatus</p>
        <select className="input inputSelect filter-select" id="facultad">
          {aStatus.map(s => (
            <option
              value={s}
            >{s}</option>
          ))}
        </select>
      </div>

      <div className='filter-row' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <button className='FilterButton' style={{ backgroundColor: '#5FDA80',}}>Aplicar</button>
        <button className='FilterButton' style={{ backgroundColor: '#C7402B',}}>Limpiar</button>
      </div>
    </div>
  );
};
