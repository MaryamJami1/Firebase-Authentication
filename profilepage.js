import { doc, getAuth, setDoc, getDoc, db, serverTimestamp, addDoc, collection } from "./firebase.js";
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

        //////add user in database with id
        // await setDoc(doc(db, "post", uid), {
        //     post: postText.value,
        //     timestamp: serverTimestamp()
        // });
        // console.log("Document written with ID: ", uid);
        postDiv.innerHTML = postText.value
        postText.value = " "


        ///////read user data and get time

//         const docRef = doc(db, "posts", uid);
//         const docSnap = await getDoc(docRef);
        

//         try{
//             if (docSnap.exists()) {
//                 let hour = docSnap.data().timestamp.toDate().getHours().toString()
//                 let minute = docSnap.data().timestamp.toDate().getMinutes().toString()
//                 timeShow.innerHTML = `Time ${hour}:${minute}`;
//             }
//             else{
//                 console.log("no document");
                
//             }
//         }
//       catch(e){
// console.log(e);

//       }


    } else {
        console.log("no user");

    }


})

