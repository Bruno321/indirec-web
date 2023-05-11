import React from "react";
import "./Table.css";

import moment from "moment/moment";
moment.locale('es');

const handleRender = valueToRender => {
    const type = typeof valueToRender;

    if (type === 'string' || type === 'number') {
        return valueToRender;
    }
    return valueToRender;
};

export const Table = ({ dataSource, columns, loading }) => {    

    return loading ? (
    // TODO: Add spinner
    <p></p>
    ) : (
        dataSource?.length ? (
            <div className="container">
                <table id="data">
                    <tbody>
                        <tr className="header">
                            {columns.map(oColumn => (
                                <th className="th">{oColumn.title}</th>
                            ))}
                        </tr>
                        {dataSource.map((oData, index) => (
                            <tr key={index}>
                                {columns.map(({ dataIndex, render }) => render === undefined ? (
                                    <td className="td-font-weight td">{oData[dataIndex]}</td>
                                ) : (
                                    <td className={dataIndex?.includes("Id") ? "container-edits td" : "td-font-weight td"}>
                                        {handleRender(render(oData[dataIndex], oData, index))}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ) : (
            <div><br></br><p>No hay datos a mostrar</p></div>
        )
    );
};
