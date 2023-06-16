import React from "react";
import "./Table.css";

import moment from "moment/moment";
import ButtonsPages from "../ButtonsPages/ButtonsPages";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
moment.locale('es');
import { useDidMountEffect } from "../../Utils/DidMountEffect";

const handleRender = valueToRender => {
    const type = typeof valueToRender;

    if (type === 'string' || type === 'number') {
        return valueToRender;
    }
    return valueToRender;
};

export const Table = ({ dataSource, columns, loading, change, pagina, setPagina }) => {    

    useDidMountEffect(() => {
        change(dataSource.queries, pagina * 10, 10);
    }, [pagina]);

    return loading ? (
        <LoadingSpinner/>
    ) : (
        dataSource.data?.length ? (
            <div className="container">
                <table id="data">
                    <tbody>
                        <tr className="header">
                            {columns.map(oColumn => (
                                <th className="th">{oColumn.title}</th>
                            ))}
                        </tr>
                        {dataSource.data.map((oData, index) => (
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
                <ButtonsPages
                    numberPage={pagina}
                    setPagina={setPagina}
                    total={dataSource.total}
                />
                
            </div>
        ) : (
            <div><br></br><p>No hay datos a mostrar</p></div>
        )
    );
};
