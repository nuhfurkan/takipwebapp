const tologin = document.querySelectorAll(".logged-out");
const tologout = document.querySelectorAll(".logged-in");

function initBody() {
  tologin.forEach(item => item.style.display = "block");
  tologout.forEach(item => item.style.display = "none");
}

firebase.auth().onAuthStateChanged((user) => {
  setup(user);
  console.log("current state is" + user);
})

const setup = (user) => {
  console.log(user);
  if(user) {
    tologin.forEach(item => item.style.display = "none");
    tologout.forEach(item => item.style.display = "block");
  } else {
    tologin.forEach(item => item.style.display = "block");
    tologout.forEach(item => item.style.display = "none");
  }
}

// new user
function signUpFormValidate() {
  var email = document.getElementById("inputEmailSignUp").value;
  var pass1 = document.getElementById("inputPasswordSignUp1").value;
  var pass2 = document.getElementById("inputPasswordSignUp2").value;
  
  console.log(email);
  console.log(pass1);
  console.log(pass2);
  if (pass1 != pass2) {
    alert("not matching pass");
  } else {
    var password = pass1;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      console.log(userCredential);
      var user = userCredential.user;
      
      $('#signup').modal('hide');
      alert("Succesfully created a new account!");
      console.log("Succes _ new user");
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      alert(errorMessage)
      // ..
    }); 
  }
}

// log out
function logout() {
  firebase.auth().signOut().then(() => {
    alert("Succesfully signed out!");
    console.log("Succes _ sign out");
  })
}

function signInValidate() {
  var email = document.getElementById("signin-email").value;
  var pass = document.getElementById("signin-pass").value;

  console.log(email);
  console.log(pass);

  firebase.auth().signInWithEmailAndPassword(email, pass).then(cred => {
    $("login").modal("hide");
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    console.log(cred.user);
    alert("Succesfully logged in!");
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    alert(errorMessage)
    // ..
  }); 
}