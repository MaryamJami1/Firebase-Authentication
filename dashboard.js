import { getAuth, sendEmailVerification, signOut, collection, db, onSnapshot, query, where } from "./firebase.js";

let emailVerify = document.getElementById("btn-EmailVerify");
emailVerify.addEventListener("click", () => {
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

const auth = getAuth();
let logOut = document.getElementById("btn-logout");
logOut.addEventListener("click", () => {
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
            location.href = "index.html";
        }, 2000);

    }).catch((error) => {
        console.log(error);
    });
});

let trendingPost = document.getElementById("trendingPost");
let searchBtn = document.getElementById("searchBtn");
let searchCategory = document.getElementById("searchCategory");

const usersRef = collection(db, "posts");

const qAll = query(usersRef);
const unsubscribeAll = onSnapshot(qAll, (querySnapshot) => {
    trendingPost.innerHTML = ""; 
    if (querySnapshot.empty) {
        trendingPost.innerHTML = "<p>No posts available.</p>";
    } else {
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            trendingPost.innerHTML += `
                <div class="card mb-3">
                    <div class="card-body">
                        <p class="card-text">${doc.data().post}</p>
                        <p class="text-muted">${doc.data().time?.toDate().toLocaleString()}</p>
                    </div>
                </div>`;
        });
    }
});

searchBtn.addEventListener("click", () => {
    const selectedCategory = searchCategory.value;

    if (!selectedCategory) {
        trendingPost.innerHTML = "<p>Loading...</p>";
        const qAll = query(usersRef);
        const unsubscribeAll = onSnapshot(qAll, (querySnapshot) => {
            trendingPost.innerHTML = "";
            if (querySnapshot.empty) {
                trendingPost.innerHTML = "<p>No posts available.</p>";
            } else {
                querySnapshot.forEach((doc) => {
                    console.log(doc.data());
                    trendingPost.innerHTML += `
                        <div class="card mb-3">
                            <div class="card-body">
                                <p class="card-text">${doc.data().post}</p>
                                <p class="text-muted">${doc.data().time?.toDate().toLocaleString()}</p>
                            </div>
                        </div>`;
                });
            }
        });
    } else {
        trendingPost.innerHTML = "<p>Loading...</p>";
        const qCategory = query(usersRef, where("category", "==", selectedCategory));
        const unsubscribeCategory = onSnapshot(qCategory, (querySnapshot) => {
            trendingPost.innerHTML = ""; 
            if (querySnapshot.empty) {
                trendingPost.innerHTML = "<p>No posts found in this category.</p>";
            } else {
                querySnapshot.forEach((doc) => {
                    console.log(doc.data());
                    trendingPost.innerHTML += `
                        <div class="card mb-3">
                            <div class="card-body">
                                <h5 class="card-title">${doc.data().category}</h5>
                                <p class="card-text">${doc.data().post}</p>
                                <p class="text-muted">${doc.data().time?.toDate().toLocaleString()}</p>
                            </div>
                        </div>`;
                });
            }
        });
    }
});
