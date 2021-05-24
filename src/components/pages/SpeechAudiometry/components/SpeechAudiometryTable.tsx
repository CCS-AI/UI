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
import { sp, speechAudiometry } from '../../../../models/entities/SP';
import { makeStyles, Switch } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    dataGrid: {
        direction: 'rtl',
        height: '800px'
    }
}));
export interface spTableProps {
    rowsSP: any[];
    columnsSP: GridColDef[];
    pageSize: number;
    setSpInfo: React.Dispatch<React.SetStateAction<speechAudiometry | undefined>>;
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
export const SpeechAudiometryTable = ({ rowsSP, columnsSP, pageSize, setSpInfo }: spTableProps) => {
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
            const _spInfo: speechAudiometry = {
                SRT_db: {
                    Rt: updatedRows[0].Rt,
                    Lt: updatedRows[0].Lt,
                    MaskLt: updatedRows[0].MaskLt,
                    MaskRt: updatedRows[0].MaskRt,
                    SF: updatedRows[0].SF
                },
                Disc: {
                    Rt: updatedRows[1].Rt,
                    Lt: updatedRows[1].Lt
                },
                dB: {
                    Rt: updatedRows[2].Rt,
                    Lt: updatedRows[2].Lt,
                    MaskLt: updatedRows[2].MaskLt,
                    MaskRt: updatedRows[2].MaskRt,
                    SF: updatedRows[2].SF
                },
                MCL: {
                    Rt: updatedRows[3].Rt,
                    Lt: updatedRows[3].Lt,
                    MaskLt: updatedRows[3].MaskLt,
                    MaskRt: updatedRows[3].MaskRt,
                    SF: updatedRows[3].SF
                },
                UCL: {
                    Rt: updatedRows[4].Rt,
                    Lt: updatedRows[4].Lt,
                    MaskLt: updatedRows[4].MaskLt,
                    MaskRt: updatedRows[4].MaskRt,
                    SF: updatedRows[4].SF
                },
                VDL: {
                    Rt: updatedRows[5].Rt,
                    Lt: updatedRows[5].Lt
                }
            };
            setSpInfo(_spInfo);
        },
        [editRows]
    );
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
