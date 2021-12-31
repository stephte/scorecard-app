import clsx from "clsx";

function formatHoleBoxes(holes) {
    let rv = {};
    let i = 1;
    for(let num of holes){
        rv[i.toString()] = num || null;
        ++i;
    }

    return rv;
}

export function newPlayerRow(id) {
    return {
        ...formatHoleBoxes(Array(18).fill(null)),//[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]),
        name: 'New Player',
        id,
        type: 'player'
    };
}

function formatHolesArr(row) {
    let rv = [];
    let i = 1;
    while(i <= 18) {
        rv.push(row[i] || 0);
        ++i;
    }
    return rv;
}

export function formatCard(id, card_name, rows) {
    let rv = {
        id,
        card_name,
        players_attributes: []
    };
    for(let row of rows) {
        if(row.type === 'player') {
            rv.players_attributes.push({
                id: row.id > 0 ? row.id : null,
                name: row.name,
                _destroy: !row.name,
                scores: formatHolesArr(row)
            });
        }
    }
    console.log(rv);

    return rv;
}

export function renderCardRows(scorecard) {
    let id = 0;
    let players = scorecard.players.map((player) => {
        id = player.id;
        let scores = formatHoleBoxes(player.scores);
        return {
            ...scores,
            name: player.name,
            id,
            type: 'player'
        };
    });
    ++id;

    // name, 1-9, out, 10-18, in, total
    let tees = scorecard.course.tees.sort((a,b) => a.order_number - b.order_number).map((tee) => {
        ++id;
        let yardages = formatHoleBoxes(tee.yardages);
        return {
            ...yardages,
            type: 'tee',
            name: tee.name,
            id
        };
    });

    ++id;
    let pars = formatHoleBoxes(scorecard.course.par);
    let parObj = {
        ...pars,
        name: 'Par',
        id,
        type: 'par'
    };

    return tees.concat([parObj]).concat(players);
}

function getScore(row, start, end){
    let score = 0;
    let i = start;
    while(i <= end) {
        let num = row[i.toString()];
        score += (num ? +num : 0);
        ++i;
    }

    return score;
}

function getFrontScore(params) {
    return getScore(params.row, 1, 9)
}
function getBackScore(params) {
    return getScore(params.row, 10, 18)
}
function getTotalScore(params) {
    return getScore(params.row, 1, 18)
}
function setScoreBox(params){
    return { ...params.row };
}

export function renderCardColumns(scorecard) {
    let columns = [];
    columns.push({
        field: 'name',
        headerName: scorecard.course.name,
        width: 130,
        sortable: false,
        editable: true,
        align: 'center',
        headerAlign: 'center',
        headerClassName: 'super-app-theme--header'
    })
    let i = 1;
    while(i <= 9) {
        columns.push({
            field: i,
            headerName: i,
            width: 40,
            sortable: false,
            editable: true,
            par: scorecard.course.par[i-1],
            headerClassName: 'super-app-theme--header',
            align: 'center',
            headerAlign: 'center',
            cellClassName: (params) =>
                clsx('super-app', {
                    birdie: params.row.type === 'player' && params.value < params.colDef.par,
                    bogey: params.row.type === 'player' && params.value > params.colDef.par
                })
        });
        ++i;
    }
    columns.push({
        field: 'out',
        headerName: 'Out',
        width: 60,
        valueGetter: getFrontScore,
        valueSetter: setScoreBox,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        headerClassName: 'super-app-theme--header'
    });
    while(i <= 18) {
        columns.push({
            field: i,
            headerName: i,
            width: 40,
            sortable: false,
            editable: true,
            par: scorecard.course.par[i-1],
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'super-app-theme--header',
            cellClassName: (params) =>
                clsx('super-app', {
                    birdie: params.row.type === 'player' && params.value < params.colDef.par,
                    bogey: params.row.type === 'player' && params.value > params.colDef.par
                })
        });
        ++i;
    }
    columns.push({
        field: 'in',
        headerName: 'In',
        width: 60,
        valueGetter: getBackScore,
        valueSetter: setScoreBox,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        headerClassName: 'super-app-theme--header'
    });
    columns.push({
        field: 'total',
        headerName: 'Total',
        width: 80,
        valueGetter: getTotalScore,
        valueSetter: setScoreBox,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        headerClassName: 'super-app-theme--header'
    });

    return columns;
}