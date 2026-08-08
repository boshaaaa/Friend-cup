// ========================================
// Load Tournaments
// ========================================

const container =
    document.getElementById("tournamentsContainer");


// ========================================
// Get Tournaments From LocalStorage
// ========================================

let tournaments =
    JSON.parse(
        localStorage.getItem("tournaments")
    ) || [];


// ========================================
// Display Tournaments
// ========================================

function displayTournaments() {

    container.innerHTML = "";


    // ========================================
    // No Tournaments
    // ========================================

    if (tournaments.length === 0) {

        container.innerHTML = `

            <div class="emptyBox">

                <h2>
                    🏆 No Tournaments Yet
                </h2>

                <p>
                    Create the first tournament!
                </p>

            </div>

        `;

        return;
    }


    // ========================================
    // Create Tournament Cards
    // ========================================

    tournaments.forEach(
        tournament => {

            const players =
                tournament.players || [];


            const card =
                document.createElement("div");


            card.className =
                "tournamentCard";


            card.innerHTML = `

                <div class="cardIcon">

                    🏆

                </div>


                <h2>

                    ${tournament.name}

                </h2>


                <p class="game">

                    🎮 ${tournament.game}

                </p>


                <div class="playersInfo">

                    👥

                    <strong>
                        ${players.length}
                    </strong>

                    /

                    ${tournament.limit}

                    Players

                </div>


                <div class="cardButtons">


                    <button
                        class="viewTournament"
                    >

                        View Tournament

                    </button>


                    <button
                        class="joinTournament"
                    >

                        Join Tournament

                    </button>


                </div>

            `;


            // ========================================
            // Add Card To Page
            // ========================================

            container.appendChild(card);


            // ========================================
            // View Tournament
            // ========================================

            const viewButton =
                card.querySelector(
                    ".viewTournament"
                );


            viewButton.onclick =
                function() {

                    localStorage.setItem(
                        "selectedTournament",
                        tournament.name
                    );


                    window.location.href =
                        "details.html";

                };


            // ========================================
            // Join Tournament
            // ========================================

            const joinButton =
                card.querySelector(
                    ".joinTournament"
                );


            joinButton.onclick =
                function() {

                    localStorage.setItem(
                        "selectedTournament",
                        tournament.name
                    );


                    window.location.href =
                        "join.html";

                };

        }
    );

}


// ========================================
// Start
// ========================================

displayTournaments();