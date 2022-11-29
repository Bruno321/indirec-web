import React from 'react';
import './Sort.css';

const aOptions = ['Predeterminado', 'Nombre [Z-A]','Fecha Agregado [Nuevos-antiguos]','Fecha Agregado [Antiguos-nuevos]'];

export const Sort = () => {
  return (
    <div className='sort-container'>

      {aOptions.map(opt => (
        <div className='sort-row'>
          <label htmlFor={opt}>{opt}</label>
          <input id={opt} type="radio" name="sort" value={opt} />
        </div>
      ))}
      

      <div className='sort-row' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <button className='sortButton' style={{ backgroundColor: '#5FDA80',}}>Aplicar</button>
        <button className='sortButton' style={{ backgroundColor: '#C7402B',}}>Limpiar</button>
      </div>
    </div>
  );
};
