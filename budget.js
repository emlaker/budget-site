const COGNITO_CLIENT_ID = "7huhjr18f1fup31qrefifvgb1r";
const COGNITO_USER_POOL_ID = "us-east-1_H0XIM5TfM";
const COGNITO_REGION = "us-east-1"; // Change to your AWS region

async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const loginMessage = document.getElementById("login-message");
    loginMessage.innerText = "Logging in...";

    try {
        const response = await fetch(`https://us-east-1h0xim5tfm.auth.us-east-1.amazoncognito.com`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-amz-json-1.1",
                "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth"
            },
            body: JSON.stringify({
                AuthFlow: "USER_PASSWORD_AUTH",
                ClientId: COGNITO_CLIENT_ID,
                AuthParameters: {
                    USERNAME: username,
                    PASSWORD: password
                }
            })
        });

        const data = await response.json();
        if (data.AuthenticationResult) {
            localStorage.setItem("idToken", data.AuthenticationResult.IdToken);
            document.getElementById("login-container").classList.add("hidden");
            document.getElementById("user-info").classList.remove("hidden");
            document.getElementById("user-email").innerText = username;
        } else {
            loginMessage.innerText = "Login failed: " + data.message;
        }
    } catch (error) {
        loginMessage.innerText = "Error logging in. Check credentials.";
    }
}

function logout() {
    localStorage.removeItem("idToken");
    document.getElementById("login-container").classList.remove("hidden");
    document.getElementById("user-info").classList.add("hidden");
}
