const createAlert = (message) => {
  const alertContainer = document.createElement("div");
  alertContainer.textContent = message;
  alertContainer.className = "alert alert-in";

  document.body.appendChild(alertContainer);

  const removeAlert = () => {
    alertContainer.classList.remove("alert-in");

    setTimeout(() => {
      alertContainer.style.animation = "0.2s alert-in linear reverse forwards"
      alertContainer.onanimationend = () => {
        alertContainer.remove();
      }
    })
  }

  setTimeout(removeAlert, 3000);
}

const query = (url, body) => {
	return fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
	}).then(res => res.json()).catch(e => {
		createAlert(`failed api: ${url}`);
		return {};
	});
}

const $ = (tag) => {
  let nodes = document.querySelectorAll(tag)
  return nodes.length > 1 ? [ ...nodes ] : nodes[0]
}