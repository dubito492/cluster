import { firebaseLogin } from "./firebase.js"

const inputFields = $("#input-fields");
const toggleForm = $("span");
const button = $("button");
const form = $("form");
const username = $(".hide");

// true => sign in
let formType = true;

const signIn = () => {
  const email = $("input[name='email']").value;
  const password = $("input[name='password']").value;
  firebaseLogin(email, password)
}

const signUp = async () => {
  let data = {};
  for(const [key, value] of new FormData(form).entries()) {
    data[key] = value;
  }

  const details = await query("/l/sign-up", data);
  console.log(details)
  createAlert(details.error || details.success);
}

const changeFormContent = () => {
  formType = !formType;


	if (formType) {
    username.name = "";
    username.classList.add("hide");
    button.onclick = signIn
    button.textContent = "sign in";
    toggleForm.textContent = "don't have an account? sign up.";
	}
  else {
    username.name = "username";
    username.classList.remove("hide");
    button.onclick = signUp
    button.textContent = "sign up";
    toggleForm.textContent = "have an account? sign in.";
  }
}

form.addEventListener("keypress", e => {
  if(e.key == "Enter") {
    button.click()
  }
})

toggleForm.addEventListener("click", changeFormContent);
button.onclick = signIn;