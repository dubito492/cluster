const admin = require("firebase-admin")
const defaultUser = require("./defaultUser")

module.exports = (firestore) => {
  const users = firestore.collection("users")

  class User {

    static async create(email, username, password) {
      const [ userDetails, adminParameters ] = defaultUser(email, username, password)
      const taken = await User.query("username", username)

      if(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(username) || username.includes(' ')) {
        throw new Error("usernames cannot contain special characters or spaces")
      }
      else if(username.length <= 6) {
        throw new Error("your username should be longer than 6 characters")
      }
      else if(!taken.empty) {
        throw new Error("that username has been taken")
      }
      
      const user = await admin.auth().createUser(adminParameters).catch(e => {
        throw new Error("that email has been taken")
      })
    
      return users.doc(user.uid).set(userDetails, { merge: true })
    }
    
    static query(mode, query) {
      const modes = {
        uid: () => users.doc(query).get(),
        email: () => admin.auth().getUserByEmail(query).then(user => user.toJSON()),
        username: () => users.where('publicInfo.displayName', '==', query).get(),
        identifier: () => admin.auth().getUsers(query).then(res => res.users)
      }
      

      if(modes.hasOwnProperty(mode)) {
        return modes[mode]()
      }
      return {}
    }
  }

  return User
} 