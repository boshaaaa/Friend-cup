const finalSection =
    document.getElementById("final");


if (finalSection) {

    const finalContent =
        document.getElementById("finalContent");


    const semiWinners =
        JSON.parse(
            localStorage.getItem("semiWinners")
        ) || [];


    if (semiWinners.length === 0) {

        finalContent.innerHTML = `
            <p>
                ⏳ Waiting for Semi Final Winner...
            </p>
        `;

    } else {

        const player1 = semiWinners[0];


        const winners =
            JSON.parse(
                localStorage.getItem("winners")
            ) || [];


        const player2 =
            winners.find(
                player => player !== player1
            );


        if (!player2) {

            finalContent.innerHTML = `
                <p>
                    ⏳ Waiting for Second Finalist...
                </p>
            `;

        } else {

            finalContent.innerHTML = `

                <div class="match">

                    <h3>
                        ${player1} VS ${player2}
                    </h3>

                    <button id="finalBtn">
                        Play Final
                    </button>

                    <p id="champion"></p>

                </div>

            `;


            const finalBtn =
                document.getElementById("finalBtn");


            finalBtn.onclick = function () {

                const winner = prompt(
                    "Choose Champion:\n" +
                    player1 +
                    " or " +
                    player2
                );


                if (
                    winner === player1 ||
                    winner === player2
                ) {

                    localStorage.setItem(
                        "champion",
                        winner
                    );


                    document.getElementById(
                        "champion"
                    ).textContent =
                        "🏆 Champion: " +
                        winner;


                    finalBtn.disabled = true;


                } else {

                    alert(
                        "Choose correct player."
                    );

                }

            };

        }

    }

}