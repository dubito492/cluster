const defaultUser = (email, username, password) => {
  return [
    {
      privateInfo: {
        creditCard: "none",
        notifications: [],
        chatRefs: [],
      },
      publicInfo: {
        bio: "New to Cluster!",
        displayName: username,
        email,
        releases: {
          music: [],
          games: [],
          posts: []
        },
        friends: [],
        badges: [ "Alpha" ]
      },
      settings: {},
      chats: [],
      games: [],
      music: [],
      posts: []
    },
    {
      email,
      password,
      displayName: username,
      emailVerified: false,
      disabled: false,
    }
  ]
}

module.exports = defaultUser