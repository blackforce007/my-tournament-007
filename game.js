let data;

async function loadData() {
  let res = await fetch("tournament.json");
  data = await res.json();

  // Tournament bracket দেখাও
  $('#tournament').bracket({ init: data });

  // Leaderboard দেখাও
  updateLeaderboard();
}

function updateLeaderboard() {
  let html = "<h2>Leaderboard</h2><ol>";
  for (let player in data.scores) {
    html += `<li>${player} - ${data.scores[player]} pts</li>`;
  }
  html += "</ol>";
  document.getElementById("leaderboard").innerHTML = html;
}

// Example: গেম শেষে কল করো
function gameOver(winner, loser) {
  data.scores[winner] += 1;

  // প্রথম ম্যাচের ফলাফল Example হিসেবে বসানো
  if (winner === "Player 1") {
    data.results[0][0] = [1,0];
  } else {
    data.results[0][0] = [0,1];
  }

  // ব্র্যাকেট ও leaderboard রিফ্রেশ
  $('#tournament').bracket({ init: data });
  updateLeaderboard();
}

// প্রথম লোড
loadData();
