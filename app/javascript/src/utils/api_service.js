import Axios from "axios";

const API_PATH = 'http://localhost:4000/api/v1'
const CARD_PATH = `${API_PATH}/scorecards`
const COURSE_PATH = `${API_PATH}/courses`

export async function getCardList() {
    let rv = null;
    try {
        await Axios.get(`${CARD_PATH}`)
            .then((res) => {
                rv = { success: true, data: res.data };
            })
            .catch(err => {
                rv = {success: false, msg: err.message};
            })
    } catch (err) {
        rv = {success: false, msg: err.message};
    }

    return rv;
}

export async function getCard(id) {
    let rv = null;
    try {
        await Axios.get(`${CARD_PATH}/${id}`)
            .then(res => {
                rv = { success: true, data: res.data};
            })
            .catch(err => {
                rv = {success: false, msg: err.message};
            })
    } catch (err) {
        rv = {success: false, msg: err.message};
    }

    return rv;
}

export async function getNewCard(course_id, card_name=null) {
    let rv = null;
    try {
        await Axios.post(`${CARD_PATH}`, {course_id, card_name})
            .then(res => {
                rv = { success: true, data: res.data};
            })
            .catch(err => {
                rv = {success: false, msg: err.message};
            })
    } catch (err) {
        rv = {success: false, msg: err.message};
    }

    return rv;
}

export async function saveCard(scorecard) {
    let rv = null;
    try {
        await Axios.patch(`${CARD_PATH}/${scorecard.id}`, scorecard)
            .then(res => {
                rv = { success: true, data: res.data};
            })
            .catch(err => {
                rv = {success: false, msg: err.message};
            })
    } catch (err) {
        rv = {success: false, msg: err.message};
    }

    return rv;
}

export async function deleteCard(id) {
    let rv = null;
    try {
        await Axios.delete(`${CARD_PATH}/${id}`)
            .then(res => {
                rv = { success: true, data: null};
            })
            .catch(err => {
                rv = {success: false, msg: err.message};
            })
    } catch (err) {
        rv = {success: false, msg: err.message};
    }

    return rv;
}

export async function getCourseList() {
    let rv = null;
    try {
        await Axios.get(`${COURSE_PATH}`)
            .then(res => {
                rv = { success: true, data: res.data};
            })
            .catch(err => {
                rv = {success: false, msg: err.message};
            })
    } catch (err) {
        rv = {success: false, msg: err.message};
    }

    return rv;
}

