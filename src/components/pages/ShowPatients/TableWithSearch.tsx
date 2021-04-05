import React, {useState} from 'react';
import {DataGrid, GridColDef} from '@material-ui/data-grid';
import './styles/table.css';
import {Button} from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';

export interface TableWithSearchProps {
    rows: any[];
    columns: string[];
    pageSize: number;
}

const patientsHebFields = require('./../../../models/he.json')['patient'];

export const PatientTableWithSearch = ({rows, columns, pageSize}: TableWithSearchProps) => {
    const [filteredRaws, setFilterRaws] = useState(rows);

    const requestSearch = (searchValue: string) => {
        const filteredRows = rows.filter(
            (row) => {
                // Should be this code, but in dev the personalId may be null
                /* row.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
                row.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
                row.personalId.includes(searchValue) */
                
                const idMatch = row.personalId? row.personalId.includes(searchValue): false;
                return row.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
                row.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
                idMatch;

            }
        );
        setFilterRaws(filteredRows);
    };

    const cancelSearch = () => {
        setFilterRaws(rows);
    };

    return (
        <React.Fragment>
            <SearchBar
                value={''}
                onChange={(searchVal) => requestSearch(searchVal)}
                onCancelSearch={() => cancelSearch()}
                placeholder={'חפש לפי שם פרטי/משפחה/תעודת זהות'}
            />

            <PatientTable rows={filteredRaws} columns={columns} pageSize={pageSize}/>
        </React.Fragment>
    );
};
const PatientTable = ({rows, columns, pageSize}: TableWithSearchProps) => {
    // add show patient's medical file column
    const MEDICAL_FILE = 'medicalFile';
    if (!columns.includes(MEDICAL_FILE)) columns.push(MEDICAL_FILE);

    const BUTTON = () => <Button className={'btn'}>הצג</Button>;
    const HIDDEN_FIELDS = ['id', 'createdAt', 'updatedAt'];
    const columnsDef: GridColDef[] = columns.map((column) => {
        const basicProp = {field: column, width: 120, headerName: patientsHebFields[column]};
        if (HIDDEN_FIELDS.includes(column)) return {...basicProp, hide: true};
        else if (column == MEDICAL_FILE) return {...basicProp, renderCell: BUTTON};
        return basicProp;
    });

    return <DataGrid rows={rows} columns={columnsDef} pageSize={pageSize}/>;
};
