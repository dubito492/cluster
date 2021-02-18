const { session: { sessionMiddleware }, user: User } = require("../database")

module.exports = (app, config) => {
  app.get("/js/user.js", sessionMiddleware, async (req, res) => {
    const provider = (await User.query("email", res.locals.claims.email)).providerData[0]
    const database = (await User.query("uid", res.locals.claims.uid)).data()
    const user = JSON.stringify({
      ...provider,
      ...database
    }, null, 2)

		res.setHeader('Content-Type', 'text/javascript')
		res.send(`const user = ${ user } \n\nexport default user`)
  })
}