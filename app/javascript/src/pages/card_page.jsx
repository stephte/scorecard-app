import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {deleteCard, getCard, saveCard} from "../utils/api_service";
import { Grid } from "@mui/material";

import Scorecard from "../components/scorecard/scorecard";
import { styles } from "../styles/styles";

const CardPage = ({setErrMsg, refreshCardList}) => {
    const params = useParams();
    const navigate = useNavigate();
    const [scorecard, setScorecard] = useState(null);
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(async () => {
        let cardId = params.id;
        getCard(cardId).then((res => {
            if(res.success)
                setScorecard(res.data);
            else
                setErrMsg(res.msg);
            }))
            .catch((err) => setErrMsg(err.message))
    }, [params.id])

    const handleSave = async (card) => {
        saveCard(card)
            .then((res) => {
                setErrMsg(res.success ? '' : res.msg);
                if(res.success) {
                    setScorecard(res.data);
                    setSuccessMsg("Save Successful");
                    setTimeout(setSuccessMsg, 5000, '');
                }
                refreshCardList();
            })
            .catch((err) => {
                setErrMsg(err.message)
            });
    }

    const handleDelete = async () => {
        deleteCard(scorecard.id)
            .then((res) => {
                setErrMsg(res.success ? '' : res.msg);
                if(res.success){
                    navigate('/');
                }
                refreshCardList();
            })
            .catch((err) => setErrMsg(err.message));
    }

    return (
        <React.Fragment>
            <p style={styles.success}>{successMsg || <span>&nbsp;</span>}</p>
                <Grid container justifyContent={"center"}>
                    <Grid item xs={11}>
                        <Scorecard scorecard={scorecard} handleSave={handleSave} handleDelete={handleDelete}/>
                    </Grid>
                </Grid>
        </React.Fragment>
    )
}

export default CardPage;