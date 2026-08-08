// ========================================
// Authentication
// ========================================

const authArea =
    document.getElementById("authArea");


// ========================================
// Check Logged User
// ========================================

const loggedInUser =
    JSON.parse(
        localStorage.getItem("loggedInUser")
    );


// ========================================
// User Logged In
// ========================================

if (loggedInUser) {

    authArea.innerHTML = `

        <span class="userName">

            👤 ${loggedInUser.username}

        </span>


        <button
            id="logoutButton"
            class="logoutBtn"
        >

            🚪 Logout

        </button>

    `;


    // ========================================
    // Logout
    // ========================================

    const logoutButton =
        document.getElementById(
            "logoutButton"
        );


    logoutButton.addEventListener(
        "click",
        function() {

            localStorage.removeItem(
                "loggedInUser"
            );


            window.location.reload();

        }
    );

}


// ========================================
// User Not Logged In
// ========================================

else {

    authArea.innerHTML = `

        <a href="pages/login.html">

            🔐 Login

        </a>

    `;

}