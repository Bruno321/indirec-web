import React from 'react';
import { aFacultities } from '../../Utils/constants';

export const aSearchElements = [
  {
    label: 'Expediente/Nombre',
    name: 'expediente,nombres,apellidos',
    type: 'input',
    or: true,
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
  'expediente,nombres,apellidos': '',
  facultad: null,
};
