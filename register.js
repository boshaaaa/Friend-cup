// ========================================
// Register Elements
// ========================================

const registerUsername =
    document.getElementById("registerUsername");

const registerPassword =
    document.getElementById("registerPassword");

const registerConfirmPassword =
    document.getElementById("registerConfirmPassword");

const registerButton =
    document.getElementById("registerButton");

const registerMessage =
    document.getElementById("registerMessage");


// ========================================
// Register
// ========================================

registerButton.addEventListener(
    "click",
    function() {

        const username =
            registerUsername.value.trim();

        const password =
            registerPassword.value;

        const confirmPassword =
            registerConfirmPassword.value;


        // ========================================
        // Empty Fields
        // ========================================

        if (
            !username ||
            !password ||
            !confirmPassword
        ) {

            registerMessage.textContent =
                "❌ Please fill in all fields.";

            return;

        }


        // ========================================
        // Username Length
        // ========================================

        if (username.length < 3) {

            registerMessage.textContent =
                "❌ Username must be at least 3 characters.";

            return;

        }


        // ========================================
        // Password Length
        // ========================================

        if (password.length < 6) {

            registerMessage.textContent =
                "❌ Password must be at least 6 characters.";

            return;

        }


        // ========================================
        // Password Match
        // ========================================

        if (password !== confirmPassword) {

            registerMessage.textContent =
                "❌ Passwords do not match.";

            return;

        }


        // ========================================
        // Get Users
        // ========================================

        let users =
            JSON.parse(
                localStorage.getItem("users")
            ) || [];


        // ========================================
        // Check Username
        // ========================================

        const existingUser =
            users.find(
                user =>
                    user.username.toLowerCase() ===
                    username.toLowerCase()
            );


        if (existingUser) {

            registerMessage.textContent =
                "❌ Username already exists.";

            return;

        }


        // ========================================
        // Create User
        // ========================================

        const newUser = {

            username: username,

            password: password

        };


        // ========================================
        // Save User
        // ========================================

        users.push(newUser);


        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );


        // ========================================
        // Success
        // ========================================

        registerMessage.textContent =
            "✅ Account created successfully!";


        // ========================================
        // Clear Fields
        // ========================================

        registerUsername.value = "";

        registerPassword.value = "";

        registerConfirmPassword.value = "";


        // ========================================
        // Go To Login
        // ========================================

        setTimeout(
            function() {

                window.location.href =
                    "login.html";

            },
            1000
        );

    }
);