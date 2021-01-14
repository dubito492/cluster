import { firebaseLogin } from "./firebase.js"

const inputFields = document.getElementById("input-fields");
const toggleForm = document.querySelector("span");
const button = document.querySelector("button");

// true => sign in
let formType = true;

const signIn = () => {
  const email = document.querySelector("input[name='email']").value;
  const password = document.querySelector("input[name='password']").value;
  firebaseLogin(email, password)
}

const changeFormContent = () => {
  formType = !formType;
  
	let confirm = document.getElementById("pass-confirm");

	if (formType) {
		confirm.name = "";
		confirm.classList.add("hide");
    button.onclick = signIn
    button.textContent = "sign in";
    toggleForm.textContent = "don't have an account? sign up.";
	}
  else {
		confirm.name = "pass-confirm";
		confirm.classList.remove("hide");
    button.textContent = "sign up";
    toggleForm.textContent = "have an account? sign in.";
  }
}

toggleForm.addEventListener("click", changeFormContent);
button.onclick = signIn;