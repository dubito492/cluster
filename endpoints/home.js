module.exports = (app, config) => {
	app.get("/home", (req, res) => {
		res.render("home.html")
	})

  // TODO: change this to match /h/:resource
}