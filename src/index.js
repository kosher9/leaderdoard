import './style.css';

const submit = document.getElementById('submit');

const BASE_URL =
  'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

const GAME_ID = 'tGWxFm1MB0fo61SZBYFF';

async function getScores() {
  const response = await fetch(`${BASE_URL}games/${GAME_ID}/scores/`);
  const data = await response.json();
  return data;
}

async function addScore(newScore) {
  const response = await fetch(`${BASE_URL}/${GAME_ID}/scores/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newScore),
  });
  const data = await response.json();
  return data;
}

const createScore = () => {
  const newScore = {
    user: document.getElementById('name').value,
    score: document.getElementById('score').value,
  };
  addScore(newScore).then((data) => {
    console.log(data);
  });
};

const feedTable = () => {
  const users = [];
  getScores().then((games) => {
    Object.entries(games.result).forEach(([, value]) => {
      users.push(JSON.stringify(value));
    });
  });
};

submit.addEventListener('click', () => {
  createScore();
});
