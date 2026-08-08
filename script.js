const form = document.getElementById("tournamentForm");
const tournamentList = document.getElementById("tournamentList");


// ========================================
// Load Tournaments
// ========================================

let savedTournaments =
    JSON.parse(localStorage.getItem("tournaments")) || [];


// ========================================
// Display Saved Tournaments
// ========================================

savedTournaments.forEach(tournament => {

    displayTournament(
        tournament.name,
        tournament.game,
        tournament.limit
    );

});


// ========================================
// Display Tournament
// ========================================

function displayTournament(
    tournamentName,
    gameName,
    playersLimit
) {

    if (!tournamentList) return;


    const tournament =
        document.createElement("div");


    tournament.innerHTML = `

        <div class="card">

            <h3 class="tournamentTitle">

                🏆 ${tournamentName}

            </h3>


            <p>

                🎮 Game: ${gameName}

            </p>


            <p>

                👥 Players Limit: ${playersLimit}

            </p>


            <p class="joinedCount">

                👤 Joined Players:
                ${getPlayersCount(tournamentName)}

            </p>


            <button class="joinBtn">

                JOIN Tournament

            </button>


            <button class="editBtn">

                ✏ Edit

            </button>


            <button class="deleteBtn">

                🗑 Delete

            </button>

        </div>

    `;


    tournamentList.appendChild(tournament);


    // ========================================
    // Tournament Details
    // ========================================

    const title =
        tournament.querySelector(
            ".tournamentTitle"
        );


    title.onclick = function() {

        localStorage.setItem(
            "selectedTournament",
            tournamentName
        );


        window.location.href =
            "pages/details.html";

    };


    // ========================================
    // JOIN
    // ========================================

    const joinBtn =
        tournament.querySelector(
            ".joinBtn"
        );


    joinBtn.onclick = function() {

        localStorage.setItem(
            "selectedTournament",
            tournamentName
        );


        window.location.href =
            "pages/join.html";

    };


    // ========================================
    // EDIT
    // ========================================

    const editBtn =
        tournament.querySelector(
            ".editBtn"
        );


    editBtn.onclick = function() {

        editTournament(
            tournamentName
        );

    };


    // ========================================
    // DELETE
    // ========================================

    const deleteBtn =
        tournament.querySelector(
            ".deleteBtn"
        );


    deleteBtn.onclick = function() {

        deleteTournament(
            tournamentName
        );


        tournament.remove();

    };

}


// ========================================
// Create Tournament
// ========================================

if (form) {

    form.addEventListener(
        "submit",
        function(e) {

            e.preventDefault();


            let tournamentName =
                document.getElementById(
                    "tournamentName"
                ).value;


            let gameName =
                document.getElementById(
                    "gameName"
                ).value;


            let playersLimit =
                document.getElementById(
                    "players"
                ).value;


            let tournaments =
                JSON.parse(
                    localStorage.getItem(
                        "tournaments"
                    )
                ) || [];


            let newTournament = {

                name: tournamentName,

                game: gameName,

                limit: Number(playersLimit),

                players: [],

                champion: "",

                bracket: {

                    quarterFinal: [],

                    semiFinal: [],

                    final: []

                }

            };


            tournaments.push(
                newTournament
            );


            localStorage.setItem(
                "tournaments",
                JSON.stringify(
                    tournaments
                )
            );


            displayTournament(
                tournamentName,
                gameName,
                playersLimit
            );


            form.reset();

        }
    );

}


// ========================================
// Get Players Count
// ========================================

function getPlayersCount(name) {

    let tournaments =
        JSON.parse(
            localStorage.getItem(
                "tournaments"
            )
        ) || [];


    let tournament =
        tournaments.find(
            t => t.name === name
        );


    if (tournament) {

        return tournament.players.length;

    }


    return 0;

}


// ========================================
// EDIT TOURNAMENT
// ========================================

function editTournament(oldName) {

    let tournaments =
        JSON.parse(
            localStorage.getItem(
                "tournaments"
            )
        ) || [];


    let tournament =
        tournaments.find(
            t => t.name === oldName
        );


    if (!tournament) {

        alert(
            "Tournament not found!"
        );

        return;

    }


    // ========================================
    // New Tournament Name
    // ========================================

    let newName =
        prompt(
            "Tournament Name:",
            tournament.name
        );


    if (!newName) {

        return;

    }


    newName =
        newName.trim();


    if (!newName) {

        alert(
            "Tournament name cannot be empty."
        );

        return;

    }


    // ========================================
    // Check Duplicate Name
    // ========================================

    let duplicate =
        tournaments.find(
            t =>
                t.name === newName &&
                t.name !== oldName
        );


    if (duplicate) {

        alert(
            "This tournament name already exists."
        );

        return;

    }


    // ========================================
    // New Game
    // ========================================

    let newGame =
        prompt(
            "Game:",
            tournament.game
        );


    if (!newGame) {

        return;

    }


    newGame =
        newGame.trim();


    if (!newGame) {

        alert(
            "Game name cannot be empty."
        );

        return;

    }


    // ========================================
    // New Players Limit
    // ========================================

    let newLimit =
        prompt(
            "Players Limit:",
            tournament.limit
        );


    if (newLimit === null) {

        return;

    }


    newLimit =
        Number(newLimit);


    if (
        !newLimit ||
        newLimit < 4
    ) {

        alert(
            "Players limit must be at least 4."
        );

        return;

    }


    // ========================================
    // Don't Make Limit Smaller
    // ========================================

    if (
        newLimit <
        tournament.players.length
    ) {

        alert(

            "You cannot set the limit below " +
            tournament.players.length +
            " joined players."

        );

        return;

    }


    // ========================================
    // Update Tournament
    // ========================================

    tournament.name =
        newName;


    tournament.game =
        newGame;


    tournament.limit =
        newLimit;


    // ========================================
    // Save
    // ========================================

    localStorage.setItem(
        "tournaments",
        JSON.stringify(
            tournaments
        )
    );


    // ========================================
    // Refresh Page
    // ========================================

    location.reload();

}


// ========================================
// DELETE TOURNAMENT
// ========================================

function deleteTournament(name) {

    let confirmDelete =
        confirm(
            "Are you sure you want to delete this tournament?"
        );


    if (!confirmDelete) {

        return;

    }


    let tournaments =
        JSON.parse(
            localStorage.getItem(
                "tournaments"
            )
        ) || [];


    tournaments =
        tournaments.filter(
            t => t.name !== name
        );


    localStorage.setItem(
        "tournaments",
        JSON.stringify(
            tournaments
        )
    );

}