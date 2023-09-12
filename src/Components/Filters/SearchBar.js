import React from 'react';
import moment from 'moment';
import trashIcon from '../../Assets/icons/trash.png';
import searchIcon from '../../Assets/icons/search.png';

import './SearchBar.css'

const Row = ({ children }) => 
  <div className='search-bar-row'>
    {children}
  </div>;

const Col = ({ children }) => 
  <div className='search-bar-column'>
    {children}
  </div>;

export const SearchBar = ({
  elements,
  handleReset,
  handleSearch,
  search,
  setSearch,
}) => {
  const aVisibles = elements.filter(({ visible = true }) => visible);
  const nFieldsSize = Math.round(16 / aVisibles.length);

  const getDateForm = ({ name, value }) => {
    setSearch({
      ...search,
      [name]: value,
    });
  };

  const handleDate = ({target: { value:date }}) => {
    if (date) {
      let field = elements.find(oElement => oElement.type === 'date').name;
      setSearch({
        ...search,
        [field]: date,
      });
    }
  };

  return (
    <div layout="vertical">
      <Row>
        {elements
          .filter(({ visible = true }) => visible)
          .map(
            (
              {
                label,
                name,
                placeholder = '',
                sizes = { small: 12, normal: 0 },
                type,
                values,
              },
              nIndex
            ) => (
              <Col
                key={nIndex}
                md={sizes.normal || nFieldsSize}
                sm={sizes.small || 12}
                xs={24}
              >
                <label>
                {label} <br/>
                  {type === 'input' || type === 'input-fixed' ? (
                    <input
                      className='search-input-text'
                      name={name}
                      onChange={({ target }) => getDateForm(target)}
                      placeholder={placeholder}
                      type="text"
                      value={search[name]}
                    />
                  ) : type === 'select' ? (
                    <select
                      className='search-input-select'
                      name={name}
                      onChange={({ target }) => getDateForm(target)}
                      placeholder={placeholder}
                      style={{ width: '100%' }}
                      value={search[name] || 0}
                    >
                      <option disabled selected value={0}> -- Selecciona una opción -- </option>
                      {typeof values === 'function' && values()}
                    </select>
                  ) : type === 'date' ? (
                    <input
                      type="date"	
                      onChange={handleDate}
                      style={{ width: '100%' }}
                      value={search?.date ? moment(search.date) : undefined}
                    />
                  ) : null}
                </label>
              </Col>
            )
          )}
          <Col>
            <>
              <button
                onClick={handleSearch}
                title='Buscar'
                className='search-button'
              >
                <img src={searchIcon} width={32} height={32}/>
              </button>
            </>
          </Col>
          <Col>
            {handleReset && (
              <>
                <button
                  onClick={handleReset}
                  title='Limpiar búsqueda'
                  className='search-reset'
                >
                  <img src={trashIcon} width={32} height={32}/>
                </button>
              </>
            )}
        </Col>
      </Row>
    </div>
  );
};
