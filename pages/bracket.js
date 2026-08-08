const bracket = document.getElementById("bracket");

const tournamentName =
    localStorage.getItem("selectedTournament");

const tournaments =
    JSON.parse(localStorage.getItem("tournaments")) || [];

const tournament =
    tournaments.find(t => t.name === tournamentName);


if (bracket && tournament) {

    const players = tournament.players || [];

    bracket.innerHTML = `
        <h2>🏆 Tournament Matches</h2>

        <div id="matchesContainer"></div>
    `;


    const matchesContainer =
        document.getElementById("matchesContainer");


    if (players.length < 2) {

        matchesContainer.innerHTML = `

            <div class="emptyBox">

                <h3>👥 Not Enough Players</h3>

                <p>
                    Players need to join the tournament first.
                </p>

            </div>

        `;

    } else {


        /*
        إنشاء المباريات
        كل لاعبين ضد بعض
        */


        for (
            let i = 0;
            i < players.length - 1;
            i += 2
        ) {


            const player1 = players[i];

            const player2 = players[i + 1];


            const match =
                document.createElement("div");


            match.className = "match";


            match.innerHTML = `

                <h3>

                    ${player1}

                    <span> VS </span>

                    ${player2}

                </h3>


                <button class="playMatchBtn">

                    Play Match

                </button>


                <p class="winner"></p>

            `;


            matchesContainer.appendChild(match);


            const button =
                match.querySelector(".playMatchBtn");


            const winnerText =
                match.querySelector(".winner");



            button.addEventListener(
                "click",
                function () {


                    const winner = prompt(

                        "Choose Winner:\n\n" +

                        player1 +

                        " or " +

                        player2

                    );



                    if (
                        winner === player1 ||
                        winner === player2
                    ) {


                        winnerText.textContent =

                            "Winner: " +

                            winner +

                            " 🏆";


                        button.disabled = true;


                        saveWinner(winner);


                    } else {


                        alert(
                            "Choose one of the two players."
                        );

                    }

                }
            );

        }

    }

}





function saveWinner(winner) {


    let winners =

        JSON.parse(
            localStorage.getItem("winners")
        ) || [];



    /*
    منع تكرار نفس الفائز
    */

    if (!winners.includes(winner)) {

        winners.push(winner);

    }



    localStorage.setItem(
        "winners",
        JSON.stringify(winners)
    );

}