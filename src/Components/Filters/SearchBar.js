import React from 'react';
import moment from 'moment';
import trashIcon from '../../Assets/icons/trash.png';
import searchIcon from '../../Assets/icons/search.png';

const Row = ({ children, style = {} }) => 
  <div style={{
    ...style,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  }}>
    {children}
  </div>;

const Col = ({ children, style = {} }) => 
  <div style={{
    ...style,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  }}>
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
      <Row
        style={{ flexDirection: 'row-reverse', justifyContent: 'start' }}
      >
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
                      name={name}
                      onChange={({ target }) => getDateForm(target)}
                      placeholder={placeholder}
                      type="text"
                      value={search[name]}
                    />
                  ) : type === 'select' ? (
                    <select
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
              <br/>
              <button
                onClick={handleSearch}
                style={{ backgroundColor: '#FFF', borderStyle: 'none', boxShadow: 'none' }}
              >
                <img src={searchIcon} width={32} height={32}/>
              </button>
            </>
          </Col>
          <Col>
            {handleReset && (
              <>
                <br/>
                <button
                  onClick={handleReset}
                  style={{
                    backgroundColor: '#FFF',
                    borderStyle: 'none',
                    boxShadow: 'none',
                    color: '#F05249',
                    marginLeft: 10,
                  }}
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
