import React, { useState } from "react";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { styles } from "../styles/styles";
import { getNewCard } from "../utils/api_service";
import AppButton from "./button";

const LoadCard = ({setErrMsg, navigate, cardList, courseList, refreshCardList}) => {
    const [cardId, setCardId] = useState('');
    const [courseId, setCourseId] = useState('');

    const handleSelect = (e) => {
        e.preventDefault();
        let name = e.target.name;
        let value = e.target.value;
        if(!value) return;

        if(name === "card_select")
            setCardId(value);
        else if(name === "course_select")
            setCourseId(value);
    }

    const handleBtnPress = async (e) => {
        e.preventDefault();
        let value = +e.target.value;
        if(!value) return;
        setErrMsg('');

        let id = null
        if(value === 1) {
            id = cardId;
        } else if(value === 2) {
            let newCard = await getNewCard(courseId);
            if(newCard.success){
                id = newCard.data.id
            } else {
                setErrMsg(newCard.msg)
            }
        }
        if(id) {
            navigate(`/scorecard/${id}`)
            refreshCardList();
        }
    }

    return (
        <Grid container>
            <Grid item xs={6}>
                <Grid container>
                    <Grid item xs={8}>
                        <FormControl fullWidth color={'secondary'}>
                            <InputLabel id={"select-card-label"}>Select Card to Load</InputLabel>
                            <Select
                                labelId={"select-card-label"}
                                id={"select-card"}
                                value={cardId}
                                name={"card_select"}
                                variant={"standard"}
                                onChange={handleSelect}
                            >
                                {
                                    cardList.map((card) => {
                                        return <MenuItem key={card.id} value={card.id}>{card.card_name}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <AppButton
                            style={styles.btn}
                            value={1}
                            onClick={handleBtnPress}
                            text={'Load'}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <Grid container>
                    <Grid item xs={8}>
                        <FormControl fullWidth color={'secondary'}>
                            <InputLabel id={"select-course-label"}>New Card (Select Course)</InputLabel>
                            <Select
                                labelId={"select-course-label"}
                                id={"select-course"}
                                value={courseId}
                                name={"course_select"}
                                variant={"standard"}
                                onChange={handleSelect}
                            >
                                {
                                    courseList.map((course) => {
                                        return <MenuItem key={course.id} value={course.id}>{course.name}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <AppButton
                            style={styles.btn}
                            value={2}
                            onClick={handleBtnPress}
                            text={'New Card'}
                        />

                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default LoadCard;