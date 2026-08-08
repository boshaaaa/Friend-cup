// ========================================
// Elements
// ========================================

const playerInput =
    document.getElementById("playerName");

const joinButton =
    document.getElementById("joinButton");

const joinMessage =
    document.getElementById("joinMessage");

const tournamentNameElement =
    document.getElementById("tournamentName");


// ========================================
// Selected Tournament
// ========================================

const selectedTournament =
    localStorage.getItem(
        "selectedTournament"
    );


// ========================================
// Load Tournaments
// ========================================

let tournaments =
    JSON.parse(
        localStorage.getItem("tournaments")
    ) || [];


// ========================================
// Find Tournament
// ========================================

let tournament =
    tournaments.find(
        t =>
            t.name ===
            selectedTournament
    );


// ========================================
// Tournament Not Found
// ========================================

if (!tournament) {

    tournamentNameElement.textContent =
        "Tournament Not Found";


    joinButton.disabled = true;


    joinMessage.textContent =
        "This tournament does not exist.";

}


// ========================================
// Show Tournament
// ========================================

else {

    tournamentNameElement.textContent =
        tournament.name;

}


// ========================================
// JOIN
// ========================================

if (joinButton) {

    joinButton.addEventListener(
        "click",
        function() {

            if (!tournament) {

                return;

            }


            // Get Player Name

            const playerName =
                playerInput.value.trim();


            // Empty Name

            if (!playerName) {

                joinMessage.textContent =
                    "Please enter your name.";

                return;

            }


            // ========================================
            // Check Full Tournament
            // ========================================

            if (
                tournament.players.length >=
                tournament.limit
            ) {

                joinMessage.textContent =
                    "❌ Tournament is full.";

                return;

            }


            // ========================================
            // Check Duplicate Player
            // ========================================

            const alreadyJoined =
                tournament.players.some(
                    player =>
                        player.toLowerCase() ===
                        playerName.toLowerCase()
                );


            if (alreadyJoined) {

                joinMessage.textContent =
                    "❌ This player already joined.";

                return;

            }


            // ========================================
            // Add Player
            // ========================================

            tournament.players.push(
                playerName
            );


            // ========================================
            // Save
            // ========================================

            const index =
                tournaments.findIndex(
                    t =>
                        t.name ===
                        tournament.name
                );


            if (index !== -1) {

                tournaments[index] =
                    tournament;

            }


            localStorage.setItem(
                "tournaments",
                JSON.stringify(
                    tournaments
                )
            );


            // ========================================
            // Success
            // ========================================

            joinMessage.textContent =
                "✅ Successfully joined!";


            playerInput.value = "";


            // ========================================
            // Go To Tournament
            // ========================================

            setTimeout(
                function() {

                    window.location.href =
                        "details.html";

                },
                700
            );

        }
    );

}