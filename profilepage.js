import { doc, getAuth, setDoc, getDoc, db, serverTimestamp } from "./firebase.js";
let postBtn = document.getElementById("postBtn")
let postText = document.getElementById("postText")
let postDiv = document.getElementById("postDiv")
let timeShow = document.getElementById("time")


const auth = getAuth();
postBtn.addEventListener("click", async () => {
    const user = auth.currentUser;
    if (user) {
        /////get uid
        const uid = user.uid;
        console.log(uid);

        //////add user in database with id
        await setDoc(doc(db, "post", uid), {
            post: postText.value,
            timestamp: serverTimestamp()
        });
        console.log("Document written with ID: ", uid);
        postDiv.innerHTML = postText.value



        ///////read user data and get time

        const docRef = doc(db, "post", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            let hour = docSnap.data().timestamp.toDate().getHours().toString()
            let minute = docSnap.data().timestamp.toDate().getMinutes().toString()
            timeShow.innerHTML = `Time ${hour}:${minute}`;
        }
        else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
        postText.value = " "
    }
})

