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
        /////get uid
        const uid = user.uid;
        console.log(uid);

        ////// add data with random id
        try {
            const docRef = await addDoc(collection(db, "posts"), {
                h1:title.value,
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
    getDiv.innerHTML = `<p>${postText.value}</p>`;
    postText.value = " "

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


let cloudName = "dk1awivy2"
let unsignedUploadPreset = "t5mrntvv"

// cover photo

let  coverBtn = document.getElementById("coverBtn");
let coverInput = document.getElementById("coverInput");
let coverDiv = document.getElementById("coverDiv")


coverBtn.addEventListener("click", () => {
    fileInput.click()
    // coverDiv.innerHTML=" "

})



coverInput.addEventListener("change", async () => {
    let file = coverInput.files[0]
    

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", unsignedUploadPreset);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload/`, {
            method: "POST",
            body: formData,
        });
    
        const data = await response.json();
        let src = data.secure_url;
        console.log("Uploaded file URL:", src);
    
        // Transform the URL
        // let transformedUrl = src.replace(
        //     "upload/",
        //     "upload/h_200,w_150/r_max/"
        // );
    
        // console.log("Transformed URL:", transformedUrl);
    
        // Create and append the image
        let img = new Image();
        img.src = src;
        coverDiv.appendChild(img);
    } catch (error) {
        console.error("Error during upload or transformation:", error);
    }
    
}
)






// profile photo

let pic = document.getElementById("uploadButton")
let fileInput = document.getElementById("fileInput")
let profileDiv = document.getElementById("profileDiv")



pic.addEventListener("click", () => {
    fileInput.click()
    profileDiv.innerHTML=" "

})

fileInput.addEventListener("change", async () => {
    let file = fileInput.files[0]
    

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", unsignedUploadPreset);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload/`, {
            method: "POST",
            body: formData,
        });
    
        const data = await response.json();
        let src = data.secure_url;
        console.log("Uploaded file URL:", src);
    
        // Transform the URL
        let transformedUrl = src.replace(
            "upload/",
            "upload/h_200,w_150/r_max/"
        );
    
        console.log("Transformed URL:", transformedUrl);
    
        // Create and append the image
        let img = new Image();
        img.src = transformedUrl;
        profileDiv.appendChild(img);
    } catch (error) {
        console.error("Error during upload or transformation:", error);
    }
    
}
)