import {getAuth, sendEmailVerification, signOut, collection, db, onSnapshot, query } from "./firebase.js";



// verify with email
let emailVerify = document.getElementById("btn-EmailVerify");
emailVerify.addEventListener("click", ()=>{
    const auth = getAuth();
    sendEmailVerification(auth.currentUser)
      .then(() => {
        Swal.fire({
            icon: "success",
            title: "Email has been sent!",
            text: "Verify with your email"
        });
      });
    
});





// sign out
const auth = getAuth();
let logOut = document.getElementById("btn-logout");
logOut.addEventListener("click", ()=>{
    signOut(auth).then(() => {
        console.log("user has been signed out");

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
            title: "Sign out successfully"
        });


        setTimeout(() => {
            location.href = "index.html"
        }, 2000)

    
        
      }).catch((error) => {
        console.log(error);
        
      });
})






///////////// queries for get all posts
let trendingPost =document.getElementById("trendingPost")

const usersRef = collection(db, "posts");

const q = query(usersRef)
const unsubscribe = onSnapshot(q, async (querySnapshot) => {
    console.log("calling");

    /////// post
    querySnapshot.forEach(async (doc) => {
       console.log(doc.data());
    
       trendingPost.innerHTML += `${doc.data().post} </br></br>`
       
    });

});






