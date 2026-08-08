const details = document.getElementById("details");
const playersList = document.getElementById("playersList");

const bracket = document.getElementById("bracket");

const semifinal = document.getElementById("semifinal");
const semiContent = document.getElementById("semiContent");

const final = document.getElementById("final");
const finalContent = document.getElementById("finalContent");


const tournamentName =
    localStorage.getItem("selectedTournament");


let tournaments =
    JSON.parse(localStorage.getItem("tournaments")) || [];


let tournament =
    tournaments.find(
        t => t.name === tournamentName
    );


// ========================================
// Tournament Not Found
// ========================================

if (!tournament) {

    details.innerHTML = `

        <div class="emptyBox">

            <h2>
                🏆 Tournament Not Found
            </h2>

            <p>
                This tournament does not exist.
            </p>

        </div>

    `;

} else {


    // ========================================
    // Prepare Data
    // ========================================

    if (!tournament.players) {

        tournament.players = [];

    }


    if (!tournament.bracket) {

        tournament.bracket = {};

    }


    if (!tournament.bracket.quarterFinal) {

        tournament.bracket.quarterFinal = [];

    }


    if (!tournament.bracket.semiFinal) {

        tournament.bracket.semiFinal = [];

    }


    if (!tournament.bracket.final) {

        tournament.bracket.final = [];

    }


    if (!tournament.champion) {

        tournament.champion = "";

    }


    saveTournaments();


    // ========================================
    // Tournament Information
    // ========================================

    const players =
        tournament.players;


    details.innerHTML = `

        <div class="tournamentHeader">

            <div class="trophy">
                🏆
            </div>

            <h1>
                ${tournament.name}
            </h1>

            <p class="gameName">
                🎮 ${tournament.game}
            </p>


            <div class="stats">

                <div class="stat">

                    <span>👥</span>

                    <strong>
                        ${tournament.limit}
                    </strong>

                    <small>
                        Players Limit
                    </small>

                </div>


                <div class="stat">

                    <span>🧑</span>

                    <strong>
                        ${players.length}
                    </strong>

                    <small>
                        Joined Players
                    </small>

                </div>

            </div>

        </div>

    `;


    // ========================================
    // Players
    // ========================================

    playersList.innerHTML = `

        <div class="playersHeader">

            <h2>
                👥 Players
            </h2>

            <span>
                ${players.length}/${tournament.limit}
            </span>

        </div>


        <div class="playersGrid">

            ${
                players.map(
                    (player, index) => `

                    <div class="playerCard">

                        <div class="playerNumber">
                            ${index + 1}
                        </div>

                        <div class="playerAvatar">
                            👤
                        </div>

                        <div class="playerName">
                            ${player}
                        </div>

                    </div>

                `
                ).join("")
            }

        </div>

    `;


    buildTournament();

}


// ========================================
// Build Tournament
// ========================================

function buildTournament() {

    const players =
        tournament.players;


    if (players.length < 4) {

        bracket.innerHTML = `

            <h2>
                🏆 Tournament Matches
            </h2>

            <p>
                ⏳ Need at least 4 players.
            </p>

        `;

        return;

    }


    if (players.length === 4) {

        buildFourPlayerTournament();

    }


    if (players.length === 8) {

        buildEightPlayerTournament();

    }

}


// ========================================
// 4 PLAYERS
// ========================================

function buildFourPlayerTournament() {

    semifinal.style.display = "block";


    if (
        tournament.bracket.semiFinal.length === 0
    ) {

        tournament.bracket.semiFinal = [

            {
                player1: tournament.players[0],
                player2: tournament.players[1],
                winner: ""
            },

            {
                player1: tournament.players[2],
                player2: tournament.players[3],
                winner: ""
            }

        ];

        saveTournaments();

    }


    semiContent.innerHTML = `

        <div class="matchesGrid">

            ${
                tournament.bracket.semiFinal
                .map(
                    (match, index) => `

                    <div class="matchCard">

                        <h3>
                            ⚔️ Semi Final ${index + 1}
                        </h3>


                        <div class="matchPlayer">
                            ${match.player1}
                        </div>


                        <div class="vs">
                            VS
                        </div>


                        <div class="matchPlayer">
                            ${match.player2}
                        </div>


                        ${
                            match.winner

                            ?

                            `
                            <div class="winnerBox">

                                🏆 Winner:

                                <strong>
                                    ${match.winner}
                                </strong>

                            </div>
                            `

                            :

                            `
                            <div class="winnerButtons">

                                <button
                                    onclick="selectSemiWinner(
                                        ${index},
                                        '${escapePlayer(match.player1)}'
                                    )"
                                >
                                    ${match.player1}
                                    Wins
                                </button>


                                <button
                                    onclick="selectSemiWinner(
                                        ${index},
                                        '${escapePlayer(match.player2)}'
                                    )"
                                >
                                    ${match.player2}
                                    Wins
                                </button>

                            </div>
                            `
                        }

                    </div>

                `
                )
                .join("")
            }

        </div>

    `;


    buildFinal();

}


// ========================================
// 8 PLAYERS
// ========================================

function buildEightPlayerTournament() {

    semifinal.style.display = "block";


    // ========================================
    // Quarter Final
    // ========================================

    if (
        tournament.bracket.quarterFinal.length === 0
    ) {

        tournament.bracket.quarterFinal = [

            {
                player1: tournament.players[0],
                player2: tournament.players[1],
                winner: ""
            },

            {
                player1: tournament.players[2],
                player2: tournament.players[3],
                winner: ""
            },

            {
                player1: tournament.players[4],
                player2: tournament.players[5],
                winner: ""
            },

            {
                player1: tournament.players[6],
                player2: tournament.players[7],
                winner: ""
            }

        ];

        saveTournaments();

    }


    bracket.innerHTML = `

        <h2>
            🏆 Quarter Final
        </h2>


        <div class="matchesGrid">

            ${
                tournament.bracket.quarterFinal
                .map(
                    (match, index) => `

                    <div class="matchCard">

                        <h3>
                            ⚔️ Quarter Final ${index + 1}
                        </h3>


                        <div class="matchPlayer">
                            ${match.player1}
                        </div>


                        <div class="vs">
                            VS
                        </div>


                        <div class="matchPlayer">
                            ${match.player2}
                        </div>


                        ${
                            match.winner

                            ?

                            `
                            <div class="winnerBox">

                                🏆 Winner:

                                <strong>
                                    ${match.winner}
                                </strong>

                            </div>
                            `

                            :

                            `
                            <div class="winnerButtons">

                                <button
                                    onclick="selectQuarterWinner(
                                        ${index},
                                        '${escapePlayer(match.player1)}'
                                    )"
                                >
                                    ${match.player1}
                                    Wins
                                </button>


                                <button
                                    onclick="selectQuarterWinner(
                                        ${index},
                                        '${escapePlayer(match.player2)}'
                                    )"
                                >
                                    ${match.player2}
                                    Wins
                                </button>

                            </div>
                            `
                        }

                    </div>

                `
                )
                .join("")
            }

        </div>

    `;


    buildEightSemiFinal();

}


// ========================================
// Quarter Winner
// ========================================

function selectQuarterWinner(
    matchIndex,
    winner
) {

    tournament.bracket.quarterFinal[
        matchIndex
    ].winner = winner;


    tournament.bracket.semiFinal = [];

    tournament.bracket.final = [];

    tournament.champion = "";


    saveTournaments();


    buildEightPlayerTournament();

}


// ========================================
// 8 PLAYERS SEMI FINAL
// ========================================

function buildEightSemiFinal() {

    const quarterMatches =
        tournament.bracket.quarterFinal;


    const winners =
        quarterMatches
        .map(
            match => match.winner
        )
        .filter(Boolean);


    if (winners.length < 4) {

        semiContent.innerHTML = `

            <p>
                ⏳ Waiting for all
                Quarter Final winners...
            </p>

        `;


        finalContent.innerHTML = `

            <p>
                ⏳ Waiting for Semi Final...
            </p>

        `;

        return;

    }


    // ========================================
    // Create Semi Final ONLY if needed
    // ========================================

    if (
        tournament.bracket.semiFinal.length !== 2
    ) {

        tournament.bracket.semiFinal = [

            {
                player1: winners[0],
                player2: winners[1],
                winner: ""
            },

            {
                player1: winners[2],
                player2: winners[3],
                winner: ""
            }

        ];

    }


    // ========================================
    // IMPORTANT:
    // Update players but KEEP winners
    // ========================================

    tournament.bracket.semiFinal[0].player1 =
        winners[0];

    tournament.bracket.semiFinal[0].player2 =
        winners[1];


    tournament.bracket.semiFinal[1].player1 =
        winners[2];

    tournament.bracket.semiFinal[1].player2 =
        winners[3];


    saveTournaments();


    // ========================================
    // Display Semi Final
    // ========================================

    semiContent.innerHTML = `

        <div class="matchesGrid">

            ${
                tournament.bracket.semiFinal
                .map(
                    (match, index) => `

                    <div class="matchCard">

                        <h3>
                            ⚔️ Semi Final ${index + 1}
                        </h3>


                        <div class="matchPlayer">

                            ${match.player1}

                        </div>


                        <div class="vs">

                            VS

                        </div>


                        <div class="matchPlayer">

                            ${match.player2}

                        </div>


                        ${
                            match.winner

                            ?

                            `
                            <div class="winnerBox">

                                🏆 Winner:

                                <strong>

                                    ${match.winner}

                                </strong>

                            </div>

                            `

                            :

                            `
                            <div class="winnerButtons">

                                <button
                                    onclick="selectEightSemiWinner(
                                        ${index},
                                        '${escapePlayer(match.player1)}'
                                    )"
                                >

                                    ${match.player1}
                                    Wins

                                </button>


                                <button
                                    onclick="selectEightSemiWinner(
                                        ${index},
                                        '${escapePlayer(match.player2)}'
                                    )"
                                >

                                    ${match.player2}
                                    Wins

                                </button>

                            </div>

                            `
                        }

                    </div>

                `
                )
                .join("")
            }

        </div>

    `;


    buildFinal();

}


// ========================================
// 8 PLAYERS SEMI WINNER
// ========================================

function selectEightSemiWinner(
    matchIndex,
    winner
) {

    // حفظ الفائز
    tournament.bracket.semiFinal[
        matchIndex
    ].winner = winner;


    // حفظ
    saveTournaments();


    // إعادة عرض الـ Semi Final
    buildEightSemiFinal();

}


// ========================================
// 4 PLAYERS SEMI WINNER
// ========================================

function selectSemiWinner(
    matchIndex,
    winner
) {

    tournament.bracket.semiFinal[
        matchIndex
    ].winner = winner;


    saveTournaments();


    buildFourPlayerTournament();

}


// ========================================
// FINAL
// ========================================

function buildFinal() {

    const semiMatches =
        tournament.bracket.semiFinal || [];


    const winners =
        semiMatches
        .map(
            match => match.winner
        )
        .filter(Boolean);


    if (winners.length < 2) {

        finalContent.innerHTML = `

            <p>
                ⏳ Waiting for Semi Final Winners...
            </p>

        `;

        return;

    }


    const player1 =
        winners[0];


    const player2 =
        winners[1];


    // ========================================
    // Create Final
    // ========================================

    if (
        tournament.bracket.final.length === 0
    ) {

        tournament.bracket.final = [

            {
                player1: player1,
                player2: player2,
                winner: ""
            }

        ];

    }


    const finalMatch =
        tournament.bracket.final[0];


    // تحديث لاعبي النهائي
    finalMatch.player1 =
        player1;

    finalMatch.player2 =
        player2;


    saveTournaments();


    // ========================================
    // Display Final
    // ========================================

    finalContent.innerHTML = `

        <div class="matchCard finalMatch">

            <h3>
                🏆 FINAL
            </h3>


            <div class="matchPlayer">

                ${finalMatch.player1}

            </div>


            <div class="vs">

                VS

            </div>


            <div class="matchPlayer">

                ${finalMatch.player2}

            </div>


            ${
                finalMatch.winner

                ?

                `
                <div class="championBox">

                    🏆 CHAMPION 🏆

                    <h2>

                        ${finalMatch.winner}

                    </h2>

                    <p>

                        🎉 Congratulations!

                    </p>

                </div>
                `

                :

                `
                <div class="winnerButtons">

                    <button
                        onclick="selectFinalWinner(
                            '${escapePlayer(
                                finalMatch.player1
                            )}'
                        )"
                    >

                        ${finalMatch.player1}
                        Wins

                    </button>


                    <button
                        onclick="selectFinalWinner(
                            '${escapePlayer(
                                finalMatch.player2
                            )}'
                        )"
                    >

                        ${finalMatch.player2}
                        Wins

                    </button>

                </div>
                `
            }

        </div>

    `;

}


// ========================================
// FINAL WINNER
// ========================================

function selectFinalWinner(winner) {

    if (
        !tournament.bracket.final[0]
    ) {

        return;

    }


    tournament.bracket.final[0].winner =
        winner;


    tournament.champion =
        winner;


    saveTournaments();


    buildFinal();

}


// ========================================
// SAVE
// ========================================

function saveTournaments() {

    const index =
        tournaments.findIndex(
            t => t.name === tournament.name
        );


    if (index !== -1) {

        tournaments[index] =
            tournament;

    }


    localStorage.setItem(
        "tournaments",
        JSON.stringify(tournaments)
    );

}


// ========================================
// Escape Player
// ========================================

function escapePlayer(player) {

    return String(player)
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'");

}