import {DataGrid, GridColDef} from '@material-ui/data-grid';
import React, {useState} from 'react';
import './styles/table.css'
import {Button} from "@material-ui/core";
import SearchBar from "material-ui-search-bar";

export interface TableWithSearchProps {
    rows: any[];
    columns: string[];
    pageSize: number;
}

const patientsHebFields = require('./../../../models/he.json')["patient"];

// export const TableWithSearch = ({rows, columns, pageSize, mapFiledToHeb}: TableWithSearchProps) => {
//     const columnsDef: GridColDef[] = columns.map(column => {
//         if(column == "id")
//             return {field: column, width: 100, headerName: mapFiledToHeb[column], hide:true}
//         return {field: column, width: 100, headerName: mapFiledToHeb[column]}
//     })
//
//
//     return (
//         <DataGrid rows={rows} columns={columnsDef} pageSize={pageSize}/>
//     )
// }
export const PatientTableWithSearch = ({rows, columns, pageSize}: TableWithSearchProps) => {
    const [filteredRaws, setFilterRaws] = useState(rows)

    const requestSearch = (searchValue: string) => {
        const filteredRows = rows.filter((row) => (row.firstName.toLowerCase().includes(searchValue.toLowerCase())
            || row.lastName.toLowerCase().includes(searchValue.toLowerCase()) || row.id.toString().includes(searchValue)));
        setFilterRaws(filteredRows)
    }

    const cancelSearch = () => {
        setFilterRaws(rows)
    };

    return (
        <React.Fragment>
            <SearchBar
                value={""}
                onChange={(searchVal) => requestSearch(searchVal)}
                onCancelSearch={() => cancelSearch()}
                placeholder={"חפש לפי שם פרטי/משפחה/תעודת זהות"}
            />

            <PatientTable rows={filteredRaws} columns={columns} pageSize={pageSize}/>
        </React.Fragment>
    )
}
const PatientTable = ({rows, columns, pageSize}: TableWithSearchProps) => {

    // add show patient's medical file column
    const MEDICAL_FILE = "medicalFile"
    if (!columns.includes(MEDICAL_FILE))
        columns.push(MEDICAL_FILE)

    const BUTTON = () => <Button className={"btn"}>הצג</Button>;
    const HIDDEN_FIELDS = ["id", "createdAt", "updatedAt"]
    const columnsDef: GridColDef[] = columns.map(column => {
        if (HIDDEN_FIELDS.includes(column))
            return {field: column, width: 120, headerName: patientsHebFields[column], hide: true}
        if (column == MEDICAL_FILE)
            return {field: column, width: 120, headerName: patientsHebFields[column], renderCell: BUTTON}
        return {field: column, width: 120, headerName: patientsHebFields[column]}
    })


    return (
        <DataGrid rows={rows} columns={columnsDef} pageSize={pageSize}/>
    )
}