
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
                const Toast = Swal.mixin({
                    toast: true,
                    position: "center",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Sign up successfully"
                });


                setTimeout(() => {
                    location.href = "login.html"
                }, 2000)

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                switch (errorMessage) {
                    case "Firebase: Password should be at least 6 characters (auth/weak-password).":
                        Swal.fire({
                            icon: "error",
                            title: "Weak Password",
                            text: "Password should be at least 8 characters long."
                        });
                        break;

                    case "Firebase: Error (auth/invalid-email).":
                        Swal.fire({
                            icon: "error",
                            title: "Invalid Email",
                            text: "Please enter a valid email address."
                        });
                        break;

                    case "Firebase: Error (auth/email-already-in-use).":
                        Swal.fire({
                            icon: "error",
                            title: "Email already Exists",
                            text: "If you are already registered, please SignIn"
                        });
                        break;
                }
                console.log(errorMessage);


            })

    }

    else {
        Swal.fire({
            icon: "error",
            title: "Fill out the fields",

        });

    }


})
