import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import './styles/table.css';
import { Button } from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';

export interface TableWithSearchProps {
    rows: any[];
    columns: string[];
    pageSize: number;
    mapFiledToHeb: any;
}

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
export const PatientTableWithSearch = ({ rows, columns, pageSize, mapFiledToHeb }: TableWithSearchProps) => {
    const [filteredRaws, setFilterRaws] = useState(rows);

    const requestSearch = (condition: (row: any) => boolean) => {
        const filteredRawsToSet = rows.filter((row) => condition(row));
        setFilterRaws(filteredRawsToSet);
    };

    const requestSearchName = (searchValue: string) => {
        requestSearch(
            (row) => row.firstName.toLowerCase().includes(searchValue.toLowerCase()) || row.lastName.toLowerCase().includes(searchValue.toLowerCase())
        );
    };

    const requestSearchId = (searchValue: string) => {
        requestSearch((row) => row.address.toString().includes(searchValue));
    };

    const cancelSearch = () => {
        setFilterRaws(rows);
    };

    return (
        <React.Fragment>
            <SearchBar
                value={''}
                onChange={(searchVal) => requestSearchName(searchVal)}
                onCancelSearch={() => cancelSearch()}
                placeholder={'חפש לפי שם פרטי/משפחה'}
            />
            <SearchBar
                value={''}
                onChange={(searchVal) => requestSearchId(searchVal)}
                onCancelSearch={() => cancelSearch()}
                placeholder={'חפש לפי תעודת זהות'}
            />
            <PatientTable rows={filteredRaws} columns={columns} pageSize={pageSize} mapFiledToHeb={mapFiledToHeb} />
        </React.Fragment>
    );
};
const PatientTable = ({ rows, columns, pageSize, mapFiledToHeb }: TableWithSearchProps) => {
    // add show patient's medical file column
    const MEDICAL_FILE = 'medicalFile';
    if (!columns.includes(MEDICAL_FILE)) columns.push(MEDICAL_FILE);

    const BUTTON = () => <Button>Click</Button>;

    const columnsDef: GridColDef[] = columns.map((column) => {
        if (column == 'id') return { field: column, width: 120, headerName: mapFiledToHeb[column], hide: true };
        if (column == MEDICAL_FILE) return { field: column, width: 120, headerName: mapFiledToHeb[column], renderCell: BUTTON };
        return { field: column, width: 120, headerName: mapFiledToHeb[column] };
    });

    return <DataGrid rows={rows} columns={columnsDef} pageSize={pageSize} />;
};
