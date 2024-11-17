import { doc, getAuth, getDoc, getDocs, db, serverTimestamp, addDoc, collection, query, where, onSnapshot, updateDoc } from "./firebase.js";
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

const unsub = onSnapshot(u, async() => {
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
        /////get uid
        const uid = user.uid;
        console.log(uid);

        ////// add data with random id
        try {
            const docRef = await addDoc(collection(db, "posts"), {
                post: postText.value,
                id: uid,
                time: serverTimestamp(),
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    } else {
        console.log("no user");

    }


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
        querySnapshot.forEach((doc) => {
            getDiv.innerHTML += `<div>${doc.data().post}</div> </br></br> `

        });
    } catch (e) {
        console.log(e);

    }


});




///////////////// queries for get all posts
const usersRef = collection(db, "posts");

const q = query(usersRef)
const unsubscribe = onSnapshot(q, async (querySnapshot) => {
    console.log("calling");

    /////// post
    querySnapshot.forEach(async (doc) => {
        const querySnapshot = await getDocs(q);
        getDiv.innerHTML += `<p>${postText.value}</p>`;
        postText.value = " "
    });

});

