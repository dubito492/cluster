module.exports = (app, config) => {
	app.get("/@:username", sessionMiddleware, (req, res) => {
		const { username } = req.params || {}

    const database = (await User.query("uid", res.locals.claims.uid)).data()

    if(!resource) {
      res.render(path.join(__dirname, "../templates/home/index.html"), {
				name: database.publicInfo.displayName
			})
    }
    else if(routes.includes(resource)) {
      res.render(path.join(__dirname, "../templates/home", `${resource}.html`), {
				name: database.publicInfo.displayName
			});
    }
    else {
      res.status(404).render("error.html", {
        error: "404: Whoops! You're lost."
      })
    }


	})
}