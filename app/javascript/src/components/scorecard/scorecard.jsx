import React, {useEffect, useState} from "react";

import { DataGrid } from '@mui/x-data-grid';

import {styles} from "../../styles/styles";
import {renderCardColumns, renderCardRows, newPlayerRow, formatCard} from "../../utils/data_utils";
import {Grid, TextField, Tooltip} from "@mui/material";
import AppButton from "../button";
import ConfirmBox from "../confirm_box";

const Scorecard = ({scorecard, handleSave, handleDelete}) => {
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [cardName, setCardName] = useState();
    const [updatedRows, setUpdatedRows] = useState([]);
    const [numPlayers, setNumPlayers] = useState(0);
    const [editingName, setEditingName] = useState(false);
    const [isDeleting, setDeleting] = useState(false);

    const updateRows = (rowArr) => {
        setRows([...rowArr]);
        setUpdatedRows([...rowArr]);
    };

    useEffect(() => {
        setEditingName(false);
        setCardName(scorecard.card_name);
        let rowArr = renderCardRows(scorecard);
        updateRows(rowArr);
        setColumns(renderCardColumns(scorecard));
        setNumPlayers(scorecard.players.length);
    }, [scorecard]);

    const handleAddPlayer = (event) => {
        event.preventDefault();
        let newRows = [...updatedRows, newPlayerRow(updatedRows.length * -1)];
        updateRows(newRows);
        setNumPlayers(numPlayers + 1);
    };

    const handleSaveCard = async (event) => {
        event.preventDefault();
        handleSave(formatCard(scorecard.id, cardName, updatedRows));
    };

    const handleDeleteCard = (event) => {
        event.preventDefault();
        handleDelete();
    }

    const handleRowEdited = (params, event, details) => {
        event.preventDefault();

        for(let row of updatedRows) {
            if(row.id === params.id){
                row[params.field] = params.value;
                return;
            }
        }
    }

    return (
        <Grid
            style={{ height: 400, width: '100%'}}
            sx={{
                '& .MuiDataGrid-cell--editable': {
                    bgcolor: '#e6fff2'
                },
                '& .super-app-theme--par': {
                    borderBottom: '1px solid black'
                },
                '& .super-app-theme--header': {
                    bgcolor: '#d1d1e0'
                },
                '& .super-app.birdie': {
                    color: 'red'
                },
                '& .super-app.bogey': {
                    color: 'blue'
                }
            }}
        >
            <ConfirmBox
                isOpen={isDeleting}
                handleClose={() => setDeleting(false)}
                handleAction={handleDeleteCard}
                text={"Are you sure you want to delete this card?"}
            />
            <div style={styles.card_name}>
                <div style={{width: '40%'}}>
                { !editingName ?
                    <Tooltip title={'Click to edit card name'} placement={'top'}>
                        <h1 onClick={() => setEditingName(true)}>{cardName}</h1>
                    </Tooltip>
                    :
                    <Tooltip title={"Press 'Enter' to exit"} placement={'top'}>
                        <TextField
                            fullWidth
                            inputProps={{style: {textAlign: 'center', fontSize: 'x-large'}}}
                            color={'primary'}
                            value={cardName}
                            autoFocus={true}
                            onChange={(e) => setCardName(e.target.value)}
                            onKeyPress={(e) => {
                                e.key === 'Enter' && setEditingName(false);
                            }}
                        />
                    </Tooltip>
                }
                </div>
            </div>
            <DataGrid
                rows={rows}
                columns={columns}
                columnBuffer={0}
                rowBuffer={0}
                isCellEditable={(params) => params.row.type === 'player'}
                autoHeight
                hideFooter
                loading={!rows.length || !columns.length}
                disableColumnFilter
                disableColumnMenu
                showCellRightBorder
                showColumnRightBorder
                onCellEditCommit={handleRowEdited}
                getRowClassName={(params) => `super-app-theme--${params.row.type}`}
            />
            <Grid container>
                <AppButton
                    text={'Add Player'}
                    onClick={handleAddPlayer}
                    disabled={numPlayers >= 4}
                    style={styles.btn}
                />
                <AppButton
                    text={'save'}
                    onClick={handleSaveCard}
                    style={styles.btn}
                />
                <AppButton
                    text={'Delete'}
                    onClick={() => setDeleting(true)}
                    style={styles.btn}
                />
            </Grid>
            <div style={styles.bottomDiv}>
                <h4 style={styles.center}>Tips:</h4>
                <p style={styles.center}>- To edit player names/scores, click on the box and type the score (single or double clicking works)</p>
                <p style={styles.center}>- To remove a player from the card, erase their name and save</p>
            </div>
        </Grid>
    );
}

export default Scorecard;