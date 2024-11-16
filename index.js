
import { getAuth, createUserWithEmailAndPassword, doc, setDoc, db, getDoc, updateDoc, serverTimestamp } from "./firebase.js";

let btn = document.getElementById("register")
let email = document.getElementById("accountEmail")
let password = document.getElementById("accountPassword")
let name = document.getElementById("userName")
let Address = document.getElementById("Address")
let phoneNum = document.getElementById("phoneNum")

const auth = getAuth();
btn.addEventListener("click", async () => {
    if (email.value.trim() && password.value.trim()) {
        createUserWithEmailAndPassword(auth, email.value, password.value)
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
                    title: "Sign up successfully"
                });


                setTimeout(async () => {

                    try {
                        const user = auth.currentUser;
                        if (user) {
                            /////get uid
                            const uid = user.uid;
                            console.log(uid);

                            //////add user in database with id
                            await setDoc(doc(db, "usersWithId", uid), {
                                name: name.value,
                                address: Address.value,
                                phoneNo: phoneNum.value
                            });
                             console.log("Document written with ID: ", uid);

                             
                            const docRef = doc(db, "usersWithId", uid);
                            const docSnap = await getDoc(docRef);

                            //////////////////update data with time
                            const updateTimestamp = await updateDoc(docRef, {
                                timestamp: serverTimestamp()
                            });

                       //////////read user data
                            if (docSnap.exists()) {
                                console.log("Document data:", docSnap.data());
                            } else {
                                console.log("No such document!");
                            }                           


                        } else {
                            console.log("no user login");
                        }


                       

                        //////////////////set doc with static id

                        // await setDoc(doc(db, "userId", "098647"), {
                        //     name: name.value,
                        //     address: Address.value,
                        //     phoneNo:phoneNum.value
                        //   });
                        //   console.log("Document written with ID: ");



                        ///////////////////   get doc

                        // const docRef = await addDoc(collection(db, "users"), {
                        //   name: name.value,
                        //   address: Address.value,
                        //   phoneNo:phoneNum.value
                        // });
                    } catch (e) {
                        console.error("Error adding document: ", e);
                    }
                    location.href = "login.html"
                }, 1000)

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

    } else {
        Swal.fire({
            icon: "error",
            title: "Fill out the fields",

        });

    }



})



