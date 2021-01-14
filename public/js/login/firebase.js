const firebaseConfig = {
  apiKey: "AIzaSyCoU4svFBEv-XAzBWwmrgV95LNSwLcr7mY",
  authDomain: "cluster-a3ce9.firebaseapp.com",
  projectId: "cluster-a3ce9",
  storageBucket: "cluster-a3ce9.appspot.com",
  messagingSenderId: "880997189038",
  appId: "1:880997189038:web:fe4fdbf3c6b6451a49343f",
  measurementId: "G-58QNG897CP"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

const firebaseLogin = async (email, password) => {
	let idToken;
	try {
		let { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
		idToken = await firebase.auth().currentUser.getIdToken();
	}
	catch(e) {
    console.log(e);
    switch(e.code) {
      case "auth/user-not-found":
        createAlert("that account doesn't exist");
        break;
      case "auth/invalid-email":
        createAlert("invalid email");
        break;
      default:
        createAlert("invalid email or password");
    }
	}

  if(idToken) {
    let details = await query("/l/sign-in", { idToken })

    if(details.hasOwnProperty("error")) {
      createAlert(details.error)
    }
    else {
      await firebase.auth().signOut()
      window.location.assign(details.success)
    }
  }
}

export {
  firebaseLogin
}