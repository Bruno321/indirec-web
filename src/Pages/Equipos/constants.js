import React from 'react';
import { aFacultities } from '../../Utils/constants';

export const aSearchElements = (aSports) => [
  {
    label: 'Nombre del Equipo',
    name: 'nombre',
    type: 'input',
  },
  {
    label: 'Deporte',
    name: 'deporte_id',
    type: 'select',
    values: () => aSports.map(oSport => (
      <option value={oSport.id}>{oSport.nombre}</option>
    )),
  },
  {
    label: 'Categoria',
    name: 'categoria',
    type: 'select',
    values: () => (
      <>
        <option value={0}>Varonil</option>
        <option value={1}>Femenil</option>
      </>
    )
  },
  {
    label: 'Facultad',
    name: 'facultad',
    type: 'select',
    values: () => aFacultities.map(sF => (
      <option value={`Facultad de ${sF}`}>Facultad de {sF}</option>
    )),
  },
];

export const oInitState = {
  nombre: '',
  deporte_id: null,
  categoria: null,
  facultad: null,
};
