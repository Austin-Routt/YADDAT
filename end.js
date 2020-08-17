const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const alignment = document.getElementById('alignment');
const finalmoralScore = document.getElementById('finalmoralScore');
const finalethicScore = document.getElementById('finalethicScore');
const mostRecentMoralScore = localStorage.getItem('mostRecentMoralScore');
const mostRecentEthicScore = localStorage.getItem('mostRecentEthicScore');
const questions = localStorage.getItem('questions');

// JSON to CSV Converter
function ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

var answers = ConvertToCSV(questions);


const ethicprogressBarfull = document.getElementById("finalethicScoreBarfull");
const moralprogressBarfull = document.getElementById("finalmoralScoreBarfull");


const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;
const MAX_MORAL_SCORE = 160;
const MIN_MORAL_SCORE = 32;
const MAX_ETHIC_SCORE = 190;
const MIN_ETHIC_SCORE = 38;

function normalize(val, max, min) {
    return (val - min) / (max - min);
}

const moralScoreNorm = normalize(parseFloat(mostRecentMoralScore), MAX_MORAL_SCORE, MIN_MORAL_SCORE) * 100;
const ethicScoreNorm = normalize(parseFloat(mostRecentEthicScore), MAX_ETHIC_SCORE, MIN_ETHIC_SCORE) * 100;


ethicprogressBarfull.style.width = `${ethicScoreNorm}%`;
moralprogressBarfull.style.width = `${moralScoreNorm}%`;



function makeArr(startValue, stopValue, cardinality) {
    var arr = [];
    var step = (stopValue - startValue) / (cardinality - 1);
    for (var i = 0; i < cardinality; i++) {
        arr.push(startValue + (step * i));
    }
    return arr;
}
const q = makeArr(0, 100, 4);


if (ethicScoreNorm >= q[0] && ethicScoreNorm < q[1]) {
    //chaotic
    if (moralScoreNorm >= q[0] && moralScoreNorm < q[1]) {
        //chaotic evil
        alignment.innerText = "Chaotic Evil";
    } else if (moralScoreNorm >= q[1] && moralScoreNorm < q[2]) {
        //chaotic neutral
        alignment.innerText = "Chaotic Neutral";
    } else if (moralScoreNorm >= q[2] && moralScoreNorm <= q[3]) {
        //chaotic good
        alignment.innerText = "Chaotic Good";
    }

} else if (ethicScoreNorm >= q[1] && ethicScoreNorm < q[2]) {
    //neutral
    if (moralScoreNorm >= q[0] && moralScoreNorm < q[1]) {
        //neutral evil
        alignment.innerText = "Neutral Evil";
    } else if (moralScoreNorm >= q[1] && moralScoreNorm < q[2]) {
        //True neutral
        alignment.innerText = "True Neutral";
    } else if (moralScoreNorm >= q[2] && moralScoreNorm <= q[3]) {
        //neutral good
        alignment.innerText = "Neutral Good";
    }

} else if (ethicScoreNorm >= q[2] && ethicScoreNorm <= q[3]) {
    //lawful
    if (moralScoreNorm >= q[0] && moralScoreNorm < q[1]) {
        //lawful evil
        alignment.innerText = "Lawful Evil";
    } else if (moralScoreNorm >= q[1] && moralScoreNorm < q[2]) {
        //lawful neutral
        alignment.innerText = "Lawful Neutral";
    } else if (moralScoreNorm >= q[2] && moralScoreNorm <= q[3]) {
        //lawful good
        alignment.innerText = "Lawful Good";
    }

}


finalmoralScore.innerText = mostRecentMoralScore;
finalethicScore.innerText = mostRecentEthicScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        moralscore: mostRecentMoralScore,
        ethicscore: mostRecentEthicScore,
        alignment: alignment.innerText,
        score: parseInt(mostRecentMoralScore) + parseInt(mostRecentEthicScore),
        name: username.value
    };

    highScores.push(score);
    highScores.sort((a, b) => {
        return b.score - a.score;
    })
    highScores.splice(MAX_HIGH_SCORES);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign("/");


    //dowload data
    let csvContent = "data:text/csv;charset=utf-8," 
        + answers;

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_alignment_data.csv");
    document.body.appendChild(link); // Required for FF

    link.click();


};