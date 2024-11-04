import { getAuth, onAuthStateChanged, updateProfile } from './firebase.js';
let profilePage = document.getElementById("profilePage");




//////////// profile page

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(user);

    profilePage.innerHTML =
      `<section class="h-100 gradient-custom-2">
             <div class="container py-5 h-100">
                      <div class="row d-flex justify-content-center">
             <div class="col col-lg-9 col-xl-8">
               <div class="card">
                    <div class="rounded-top text-white d-flex flex-row" style="background-color: #000; height:200px;">
                  <div class="ms-4 mt-5 d-flex flex-column" style="width: 150px;">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s"
                 id="image" alt="Generic placeholder image" class=" img-thumbnail mt-4 mb-2"
                style="width: 150px; z-index: 1; max-height: 160px">
             <button type="button" class="btn btn-success" id="updateProfile" style="z-index: 1;">Update profile</button>
                 </div>
                  <div class="ms-3" style="margin-top: 130px;">
              <h5 id="name1">Name<h5>
              <p> ${user.emailVerified ? "Verified" : "Not Verified"}</p>
                </div>
              </div>
          <div class="p-4 text-black bg-body-tertiary">
            <div class="d-flex justify-content-end text-center py-1 text-body">
              <div>
                <p class="mb-1 h5">253</p>
                <p class="small text-muted mb-0">Photos</p>
              </div>
              <div class="px-3">
                <p class="mb-1 h5">1026</p>
                <p class="small text-muted mb-0">Followers</p>
              </div>
              <div>
                <p class="mb-1 h5">478</p>
                <p class="small text-muted mb-0">Following</p>
              </div>
            </div>
          </div>
          <div class="card-body p-4 text-black">
            <div class="mb-5  text-body">
              <p class="lead fw-normal mb-1">About</p>
              <div class="p-4 bg-body-tertiary">
                <p class="font-italic mb-1" id="profession">Profession</p>
                <p class="font-italic mb-1" id="city">City</p>
                <p class="font-italic mb-0">${user.email}</p>
          
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-4 text-body">
              <p class="lead fw-normal mb-0">Recent photos</p>
              <p class="mb-0"><a href="#!" class="text-muted">Show all</a></p>
            </div>
            <div class="row g-2">
              <div class="col mb-2">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp" alt="image 1"
                  class="w-100 rounded-3">
              </div>
              <div class="col mb-2">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp" alt="image 1"
                  class="w-100 rounded-3">
              </div>
            </div>
            <div class="row g-2">
              <div class="col">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp" alt="image 1"
                  class="w-100 rounded-3">
              </div>
              <div class="col">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp" alt="image 1"
                  class="w-100 rounded-3">
              </div>

                           <button type="button" class="btn btn-success" id="dashboard" style="z-index: 1;">Go to dashboard</button>

                  </div>
                 </div>
                </div>
               </div>
              </div>
               </div>
        </section>`


    //////////// update profile

    let update = document.getElementById("updateProfile");
    console.log(update);

    update.addEventListener("click", async () => {

      const { value: name } = await Swal.fire({
        title: "Enter your Name",
        input: "text",
        inputPlaceholder: "Enter your Name",
        inputAttributes: {
          autocapitalize: "off",
          autocorrect: "off"
        }
      });



      const { value: url } = await Swal.fire({
        title: "Enter your URL",
        input: "url",
        inputPlaceholder: "Enter the URL"
      });

      const { value: profession } = await Swal.fire({
        title: "Enter your profession",
        input: "text",
        inputPlaceholder: "Enter your profession",
        inputAttributes: {
          autocapitalize: "off",
          autocorrect: "off"
        }
      });


      const { value: city } = await Swal.fire({
        title: "Enter your city",
        input: "text",
        inputPlaceholder: "Enter your city",
        inputAttributes: {
          autocapitalize: "off",
          autocorrect: "off"
        }
      });

      updateProfile(auth.currentUser, {

        displayName: name,
        photoURL: url,
      })
        .then(() => {
          let name1 = document.getElementById("name1")
          let image = document.getElementById("image")
          image.src = url
          console.log(image);
          let professionName = document.getElementById("profession")
          let cityName = document.getElementById("city")
          name1.innerHTML = name
          professionName.innerHTML = profession
          cityName.innerHTML = city



          Swal.fire({
            icon: "success",
            title: "Profile Update",
          });
        })
        .catch((error) => {
          switch (error) {
            case "FirebaseError: Firebase: Photo URL too long. (auth/invalid-profile-attribute).":
              Swal.fire({
                icon: "error",
                title: "URl too Long",
                text: "Please enter another url."
              });
              break;
          }
          console.log(error);
        });
    })





    //////////// go to dashboard
    let dashboard = document.getElementById("dashboard")
    dashboard.addEventListener("click", () => {

      location.href = "dashboard.html"
    })


  }
  else {
    Swal.fire({
      icon: "error",
      text: "User is logout."
    });

  }
});





