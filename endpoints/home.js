const { user: User, session: { sessionMiddleware } } = require("../database");
const path = require("path")

const routes = [
  "chat",
  "books",
  "music",
  "games",
  "charge",
	"coda",
	"cutscene",
  "settings",
  "notifications"
]

module.exports = (app, config) => {
  app.get([ "/h", "/h/:resource" ], sessionMiddleware, async (req, res) => {
    const { resource } = req.params || {}

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

  // TODO: change this to match /h/:resource
}