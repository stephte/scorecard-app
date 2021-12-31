import React, {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Error from "./pages/error_page";
import CardPage from "./pages/card_page";
import Navbar from "./components/navbar/navbar";
import {styles} from "./styles/styles";
import {getCardList, getCourseList} from "./utils/api_service";

const AppRouter = () => {
    const [errMsg, setErrMsg] = useState('');
    const [cardList, setCardList] = useState([]);
    const [courseList, setCourseList] = useState([]);

    // in bigger App would use state manager for handling cardList + refreshing, but this works for now
    const refreshCardList = () => {
        getCardList()
            .then((res) => {
                if(res.success)
                    setCardList(res.data);
                else
                    setErrMsg(res.msg);
            })
            .catch((err) => setErrMsg(err.message));
    }

    useEffect(async () => {
        refreshCardList();

        getCourseList()
            .then((res) => {
                if(res.success)
                    setCourseList(res.data);
                else
                    setErrMsg(res.msg);
            })
            .catch((err) => setErrMsg(err.message));
    }, [])

    return (
        <BrowserRouter>
            <Navbar setErrMsg={setErrMsg} cardList={cardList} courseList={courseList} refreshCardList={refreshCardList}/>
            <p style={styles.error}>{errMsg || <span>&nbsp;</span>}</p>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/scorecard/:id" element={<CardPage setErrMsg={setErrMsg} refreshCardList={refreshCardList}/>}/>

                <Route path="*" element={<Error/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;