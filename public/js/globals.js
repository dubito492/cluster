const createAlert = (message) => {
  const alertContainer = document.createElement("div");
  alertContainer.textContent = message;
  alertContainer.className = "alert";

  document.body.appendChild(alertContainer);

  const removeAlert = () => {
    alertContainer.style.opacity = 0;
		alertContainer.ontransitionend = () => {
      alertContainer.remove();
		}
  }

  setTimeout(removeAlert, 3000);
}

const query = (url, body) => {
	return fetch(url, {
		method: "POST,
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
	}).then(res => res.json()).catch(e => {
		createAlert(`failed api: ${url}`);
		return {};
	});
}