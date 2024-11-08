
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider,db,collection,addDoc } from "./firebase.js";

let btn = document.getElementById("register")
let email = document.getElementById("accountEmail")
let password = document.getElementById("accountPassword")
let google = document.getElementById("google")
let name = document.getElementById("userName")
let rollNum = document.getElementById("rollNum")
let phoneNum = document.getElementById("phoneNum")

const auth = getAuth();
btn.addEventListener("click", async() => {
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


            });
            try {
                const docRef = await addDoc(collection(db, "users"), {
                  name: name.value,
                  rollNum: rollNum.value,
                  phoneNum:phoneNum.value,
                });
    
                
                console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }
    
              

    }

    else {
        Swal.fire({
            icon: "error",
            title: "Fill out the fields",

        });

    }




})



const provider = new GoogleAuthProvider();
google.addEventListener("click",()=>{

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
})