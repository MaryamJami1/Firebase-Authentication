import { doc, getAuth, getDoc, getDocs, db, serverTimestamp, addDoc, collection, query, where, onSnapshot, updateDoc, orderBy } from "./firebase.js";
let postBtn = document.getElementById("postBtn");
let postText = document.getElementById("postText");
let getPost = document.getElementById("getPost");
let getDiv = document.getElementById("getDiv");
let userName = document.getElementById("name");
let userAddress = document.getElementById("address")
let userNum = document.getElementById("phoneNum")
let useremail = document.getElementById("email")




/////////////// get user info quesries
const userRef = collection(db, "userWithId");
const u = query(userRef);

const unsub = onSnapshot(u, async () => {
    console.log("calling")

    ////////read user data
    const user = auth.currentUser;
    console.log(user);
    const uid = user.uid;
    console.log(uid);

    const docRef = doc(db, "usersWithId", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log(docSnap.data());

        let name = docSnap.data().name;
        userName.innerText = name;

        let address = docSnap.data().address;
        userAddress.innerHTML = address;

        let number = docSnap.data().phoneNo;
        userNum.innerHTML = number

        let email = docSnap.data().email;
        useremail.innerHTML = email;


    } else {
        console.log("No such document!");
    }

});





const auth = getAuth();
postBtn.addEventListener("click", async () => {
    const user = auth.currentUser;
    console.log(user);

    if (user) {
        ///// Get UID
        const uid = user.uid;
        console.log(uid);

        // Get the post text and selected category
        const postContent = postText.value.trim();
        const selectedCategory = document.getElementById("categorySelect").value;

        if (!postContent) {
            Swal.fire({
                icon: "warning",
                text: "Please write something before posting"
            });
            return;
        }

        if (!selectedCategory) {
            Swal.fire({
                icon: "warning",
                text: "Please select a category for your post!"
            });
            return;
        }

        ////// Add data with random ID
        try {
            const docRef = await addDoc(collection(db, "posts"), {
                post: postContent,
                category: selectedCategory,
                id: uid,
                time: serverTimestamp(),
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    } else {
        console.log("No user logged in");
    }

    // Update the UI
    getDiv.innerHTML = `<p>${postText.value}</p>`;
    postText.value = "";
});





////////////////// get post by id
getPost.addEventListener("click", async () => {
    const user = auth.currentUser;
    console.log(user);
    const uid = user.uid;
    console.log(uid);

    const q = query(collection(db, "posts"), where("id", "==", uid));

    try {
        const querySnapshot = await getDocs(q);
        getDiv.innerHTML = " ";
        for (const doc of querySnapshot.docs) {
            const data = doc.data();
            getDiv.innerHTML += `<div>${data.post}</div></br></br>`;

        }

    } catch (e) {
        console.log(e);
    }



});
