import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "./firebase.js";

let btn = document.getElementById("login")
let email = document.getElementById("loginEmail");
let password = document.getElementById("loginPass");


const auth = getAuth();
btn.addEventListener("click", () => {
    if (email.value.trim() && password.value.trim()) {
        signInWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                const Toast = Swal.mixin({
                    toast: true,
                    position: "center",
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Signed in successfully"
                });

                setTimeout(() => {
                    location.href = "dashboard.html"
                }, 1000)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                switch (errorMessage) {
                    case "Firebase: Error (auth/invalid-credential).":
                        Swal.fire({
                            icon: "error",
                            title: "Wrong Credentials",
                            text: "Please double-check your Credentials and try again.",
                        });

                }

                console.log(error.message);

            });
    } else {
        Swal.fire({
            icon: "error",
            title: "Fill out the fields",

        });
    }


})


const provider = new GoogleAuthProvider();
google.addEventListener("click", () => {

    const auth = getAuth();
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log(user);
            
          
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
})