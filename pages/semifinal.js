const semifinal = document.getElementById("semifinal");

if (semifinal) {

    const winners =
        JSON.parse(localStorage.getItem("winners")) || [];


    const semiContent =
        document.getElementById("semiContent");


    if (winners.length < 2) {

        semiContent.innerHTML = `
            <p>⏳ Waiting for Match Winners...</p>
        `;

    } else {

        const player1 = winners[0];
        const player2 = winners[1];


        semiContent.innerHTML = `

            <div class="match">

                <h3>
                    ${player1} VS ${player2}
                </h3>

                <button id="playSemi">
                    Play Semi Final
                </button>

                <p id="semiWinner"></p>

            </div>

        `;


        const playSemi =
            document.getElementById("playSemi");


        playSemi.onclick = function () {

            const winner = prompt(
                "Choose Winner:\n" +
                player1 +
                " or " +
                player2
            );


            if (
                winner === player1 ||
                winner === player2
            ) {

                document.getElementById(
                    "semiWinner"
                ).textContent =
                    "Winner: " +
                    winner +
                    " 🏆";


                playSemi.disabled = true;


                localStorage.setItem(
                    "semiWinners",
                    JSON.stringify([winner])
                );


            } else {

                alert("Choose correct player.");

            }

        };

    }

}