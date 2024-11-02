
import { getAuth, createUserWithEmailAndPassword } from "./firebase.js";

let btn = document.getElementById("register")
let email = document.getElementById("accountEmail")
let password = document.getElementById("accountPassword")



const auth = getAuth();
btn.addEventListener("click", () => {
    if (email.value.trim() && password.value.trim()) {
        createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);

            })

    }

    else {
        console.log("insert your data");

    }
})
