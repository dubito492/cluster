const admin = require("firebase-admin")

const createSession = (idToken) => {
  const expiresIn = 60 * 60 * 24 * 7 * 1000
  return admin.auth().createSessionCookie(idToken, { expiresIn })
}

const verifySession = async (session) => {
	return admin.auth().verifySessionCookie(session, true)
}

const removeSession = async (req, res) => {
  const cookie = req.cookies.session || ''
  res.clearCookie("session")
  try {
    const claims = await admin.auth().verifySessionCookie(cookie)
    await admin.auth().revokeRefreshTokens(claims.sub)
  }
  catch(e) {}
}

const sessionMiddleware = async (req, res, next) => {
  const cookie = req.cookies.session || ''
  if(cookie) {
    try {
      res.locals.claims = await verifySession(cookie)
      next()
    }
    catch(e) {
      res.redirect("/login")
    }
    return
  }
  res.redirect("/login")
}

module.exports = (firestore) => {
  return {
    createSession,
    verifySession,
    removeSession,
    sessionMiddleware
  }
}