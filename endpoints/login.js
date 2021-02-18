const { user: User, session } = require("../database")

module.exports = (app, config) => {
	app.get("/login", (req, res) => {
		res.render("login.html")
	})

  app.get('/logout', async (req, res) => {
		await session.removeSession(req, res).catch(e => {
      res.redirect('/')
    })
    res.redirect('/')
	})

  app.post("/l/:resource", async (req, res) => {
    const { resource } = req.params || {}
    if(!resource) {
      res.json({ error: "invalid login resource" })
    }

    switch(resource) {
      case "sign-in": {
        const { idToken } = req.body || {}
        if(!idToken) {
          res.json({ error: "invalid id token" })
          return
        }

        try {
					res.cookie("session", await session.createSession(idToken), {
						httpOnly: true,
						secure: true
					})
					res.json({ success: "/h" })
				}
				catch(e) {
          console.log(e)
					res.json({ error: 'failed to create session' })
				}
        break
      }
      case "sign-up": {
        const { email, username, password } = req.body
        try {
          await User.create(email, username, password)
          res.json({ success: "sign in with your new account" })
        }
        catch(e) {
          res.json({ error: e.message.toLowerCase() })
        }
        break
      }
      default:
        res.json({ error: "invalid resource" })
    }
  })
}