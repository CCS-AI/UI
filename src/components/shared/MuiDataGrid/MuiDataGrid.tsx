import React from 'react';
import { DataGrid, GridOverlay } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core';
import { CreateCSSProperties, CSSProperties, PropsFunc } from '@material-ui/styles';
import styled from 'styled-components';
import Loader from '../SmallComponents/Loader';

type Props = React.ComponentProps<typeof DataGrid> & {
    rootStyles?: CSSProperties | CreateCSSProperties<{}> | PropsFunc<{}, CreateCSSProperties<{}>>;
    height: string;
};

const MuiDataGrid = ({ rootStyles, height, ...rest }: Props) => {
    const defaultDataGridStyle = {
        '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
            outline: 'none'
        },
        '&.MuiDataGrid-root .MuiDataGrid-row': {
            cursor: 'pointer'
        },
        '&.MuiDataGrid-root .MuiDataGrid-viewport': {
            minWidth: '100% !important',
            maxWidth: '100% !important'
        },
        backgroundColor: 'white',
        '&.MuiDataGrid-root': {
            height
        },
        '&.MuiDataGrid-root .MuiDataGrid-columnsContainer': {
            background: '#1a2c3b'
        },
        '&.MuiDataGrid-root .MuiDataGrid-columnHeader': {
            color: 'white'
        },
        '&.MuiDataGrid-root .MuiSvgIcon-fontSizeSmall': {
            color: 'white'
        }
    };

    const dataGridStyles = makeStyles((theme) => {
        return {
            root: {
                ...defaultDataGridStyle,
                ...(rootStyles || {})
            }
        };
    });

    const classes = dataGridStyles();

    return <DataGrid {...rest} className={classes.root} disableSelectionOnClick />;
};
MuiDataGrid.defaultProps = {
    height: '70%'
};
export default MuiDataGrid;
