import React, { useCallback, useState } from 'react';
import {
    DataGrid,
    GridColDef,
    GridCellParams,
    GridRowId,
    GridEditRowModelParams,
    GridEditCellPropsParams,
    GridCellValue,
    GridEditRowsModel
} from '@material-ui/data-grid';
import { speechAudiometry } from '../../../../models/entities/SP';
import { makeStyles, Switch } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    dataGrid: {
        direction: 'rtl',
        height: '1000px'
    }
}));
export interface spTableProps {
    rowsSP: any[];
    columnsSP: GridColDef[];
    pageSize: number;
    UpdateSpeechAudiometry?: (sp: speechAudiometry) => void;
}
const validateInputdB = (val: GridCellValue) => {
    let res = false;
    if (val != undefined && val >= 0 && val <= 120) {
        res = true;
    }
    return res;
};

const validateInputDisc = (val: GridCellValue) => {
    let res = false;
    if (val != undefined && val >= 0 && val <= 100) {
        res = true;
    }
    return res;
};
export const SpeechAudiometryTable = ({ rowsSP, columnsSP, pageSize, UpdateSpeechAudiometry }: spTableProps) => {
    const [editRows, setRows] = useState(rowsSP);
    const classes = useStyles();
    const handleEditCellChangeCommitted = useCallback(
        ({ id, field, props }: GridEditCellPropsParams) => {
            const data = props.value;
            const updatedRows = editRows.map((row) => {
                if (row.id === id) {
                    let isValid;
                    switch (field) {
                        case 'MaskRt': {
                            if (id != 2 && id != 6) {
                                const MaskRt = data;
                                isValid = validateInputdB(MaskRt);
                                if (isValid) {
                                    row = { ...row, MaskRt };
                                }
                            }
                            break;
                        }
                        case 'Rt': {
                            const Rt = data;
                            if (id == 2) {
                                isValid = validateInputDisc(Rt);
                            } else {
                                isValid = validateInputdB(Rt);
                            }
                            if (isValid) {
                                row = { ...row, Rt };
                            }
                            break;
                        }
                        case 'Lt': {
                            const Lt = data;
                            if (id == 2) {
                                isValid = validateInputDisc(Lt);
                            } else {
                                isValid = validateInputdB(Lt);
                            }
                            if (isValid) {
                                row = { ...row, Lt };
                            }
                            break;
                        }
                        case 'MaskLt': {
                            if (id != 2 && id != 6) {
                                const MaskLt = data;
                                isValid = validateInputdB(MaskLt);
                                if (isValid) {
                                    row = { ...row, MaskLt };
                                }
                            }
                            break;
                        }
                        case 'SF': {
                            const SF = data;
                            row = { ...row, SF };
                            break;
                        }
                    }
                }
                return row;
            });
            setRows(updatedRows);
        },
        [editRows]
    );
    console.log(editRows);
    return (
        <React.Fragment>
            <DataGrid
                rows={editRows}
                columns={columnsSP}
                pageSize={pageSize}
                className={classes.dataGrid}
                onEditCellChangeCommitted={handleEditCellChangeCommitted}
            />
        </React.Fragment>
    );
};
