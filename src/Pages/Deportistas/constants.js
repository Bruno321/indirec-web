import React from 'react';
import { aFacultities } from '../../Utils/constants';

export const aSearchElements = [
  {
    label: 'Expediente',
    name: 'expediente',
    type: 'input',
  },
  {
    label: 'Nombre(s)',
    name: 'nombres',
    type: 'input',
  },
  {
    label: 'Apellido(s)',
    name: 'apellidos',
    type: 'input',
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
  expediente: '',
  nombres: '',
  apellidos: '',
  facultad: '',
};
