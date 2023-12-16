const userButton = document.querySelector(".user_image");
const userProfile = document.querySelector(".user_detail");

userButton.addEventListener("click", ()=> {
    if (userProfile.style.display == "block"){
        userProfile.style.display = "none";
    }
    else{
        userProfile.style.display = "block";
    }
})