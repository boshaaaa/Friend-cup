// ========================================
// Login Elements
// ========================================

const loginUsername =
    document.getElementById("loginUsername");

const loginPassword =
    document.getElementById("loginPassword");

const loginButton =
    document.getElementById("loginButton");

const loginMessage =
    document.getElementById("loginMessage");


// ========================================
// Login
// ========================================

loginButton.addEventListener(
    "click",
    function() {

        const username =
            loginUsername.value.trim();

        const password =
            loginPassword.value;


        // ========================================
        // Empty Fields
        // ========================================

        if (!username || !password) {

            loginMessage.textContent =
                "❌ Please enter username and password.";

            return;

        }


        // ========================================
        // Get Registered Users
        // ========================================

        const users =
            JSON.parse(
                localStorage.getItem("users")
            ) || [];


        // ========================================
        // Find User
        // ========================================

        const user =
            users.find(
                u =>
                    u.username.toLowerCase() ===
                        username.toLowerCase()
                    &&
                    u.password === password
            );


        // ========================================
        // User Not Found
        // ========================================

        if (!user) {

            loginMessage.textContent =
                "❌ Wrong username or password.";

            return;

        }


        // ========================================
        // Save Logged User
        // ========================================

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(user)
        );


        // ========================================
        // Success
        // ========================================

        loginMessage.textContent =
            "✅ Login successful!";


        // ========================================
        // Go Home
        // ========================================

        setTimeout(
            function() {

                window.location.href =
                    "../index.html";

            },
            700
        );

    }
);