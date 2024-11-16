import { doc, getAuth, setDoc, getDocs, db, serverTimestamp, addDoc, collection, query, where, onSnapshot,updateDoc } from "./firebase.js";
let postBtn = document.getElementById("postBtn");
let postText = document.getElementById("postText");
let getPost = document.getElementById("getPost");
let getDiv = document.getElementById("getDiv");


const auth = getAuth();
postBtn.addEventListener("click", async () => {
    const user = auth.currentUser;
    if (user) {
        /////get uid
        const uid = user.uid;
        console.log(uid);

        // add data with random id
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


})

////////////////// get post by id
getPost.addEventListener("click", async () => {
    const q = query(collection(db, "posts"), where("id", "==", "stZykA7b0KX7wS37ELWZtcjqZF13"));

    try {
        const querySnapshot = await getDocs(q);
        getDiv.innerHTML =" ";
        querySnapshot.forEach((doc) => {
         
            getDiv.innerHTML += `<div>${doc.data().post}</div> </br> </br>`
        });
    } catch (e) {
        console.log(e);

    }


})



///////////////// queries for posts
const usersRef = collection(db, "posts");

const q = query(usersRef, where("id", "==", "stZykA7b0KX7wS37ELWZtcjqZF13"))
const unsubscribe = onSnapshot(q, (querySnapshot) => {
    console.log("calling");
    const user = auth.currentUser;
    const uid = user.uid;
    const washingtonRef = doc(db, "posts", uid);

    querySnapshot.forEach(async (doc) => {

        const querySnapshot = await getDocs(q);
        getDiv.innerHTML +=`<div>${postText.value}</div>`;
        postText.value=" "
    
       

    });
});