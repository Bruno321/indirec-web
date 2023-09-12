export const generateQueries = (values, config, prefix) => {
  const aQueries = [];
  let nOrCounter = 0;

  config.forEach(({ name, or, type }) => {
    const aFields = name.split(',');

    aFields.forEach((sField) => {
      const oValue = values[name];

      if (type === 'range-date') {
        const { date_ini, date_end } = values;
        if (date_ini && date_end) {
          aQueries.push(
            `${name}[$gte]=${date_ini.set('hour', 0).set('minute', 0).set('second', 0)}&${name}[$lte]=${date_end.set('hour', 23).set('minute', 59).set('second', 59)}`
          );
        }
      }

      if ((oValue === 0 || (oValue && oValue !== '')) && type !== 'range-date') {
        if (or) {
          aQueries.push(`$or[${nOrCounter}][${sField}][$iLike]=%${oValue}%`);
          nOrCounter++;
        } else {
          if (type === 'input') {
            const sFieldName = prefix ? `${prefix}[${sField}]` : sField;
            aQueries.push(`${sFieldName}[$iLike]=%${oValue}%`);
          } else if (type === 'date') {
            const sFieldName = prefix ? `${prefix}[date]` : 'date';
            if (sField.indexOf('_ini') > -1) {
              aQueries.push(
                `${sFieldName}[$gte]=${values[sField].set('hour', 0).set('minute', 0).set('second', 0).subtract(1, 'days')}`
              );
            } else if (sField.indexOf('_end') > -1) {
              aQueries.push(
                `${sFieldName}[$lte]=${oValue.set('hour', 23).set('minute', 59).set('second', 59)}`
              );
            } else {

              aQueries.push(
                `${sField}[$gte]=${oValue.set('hour', 0).set('minute', 0).set('second', 0).subtract(1, 'days')}&${sField}[$lte]=${oValue.set('hour', 23).set('minute', 59).set('second', 59)}`
              );
            }
          } else {
            const sFieldName = prefix ? `${prefix}[${sField}]` : sField;
            aQueries.push(`${sFieldName}=${oValue}`);
          }
        }
      }
    });
  });

  return aQueries.join('&');
};