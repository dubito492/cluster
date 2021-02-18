const waffle = $("#waffle")
const header = $("header.home-header")

let apps = [
  { 
    name: "Charge",
		src: "h/charge"
  },
  { 
    name: "Coda",
		src: "h/coda"
  },
	{ 
    name: "CutScene",
		src: "h/cutscene"
  }
  // { 
  //   name: "Profile"
  // },
  // { 
  //   name: "Profile"
  // }
]
let navApps

const toggleMenu = () => {
  if(removeMenu()) {
    return
  }
  
  navApps = document.createElement("div")
  navApps.className = "nav-apps flex justify-between wrap"
  apps.forEach(app => {
    let a = new App(app.name, app.src || "#")
    navApps.innerHTML += a.render()
  })
  header.appendChild(navApps)
}

const removeMenu = () => {
  if(navApps) {
    navApps.remove()
    navApps = null
    return true
  }
}

document.body.addEventListener("click", (e) => {
  e.target.closest("#waffle") ? toggleMenu () : removeMenu()
})

class App {
  constructor(name="App", src="#", img="/images/default.png") {
    this.name = name || "App"
    this.src = src || "#"
    this.img = img
  }

  render() {
    return (`
      <a class="app" href=" ${ this.src } ">
        <img src="${ this.img }" alt="${ this.name.toLowerCase() } app image" />
        <p>${ this.name }</p>
      </a>
    `)
  }
}

/**
 * <div class="nav-apps flex justify-between wrap">
    <div class="app">
      <img src="/images/default.png" alt="profile picture" />
      <p>Account</p>
    </div>
    <div class="app">
      <img src="/images/default.png" alt="profile picture" />
      <p>Music</p>
    </div>
    <div class="app">
      <img src="/images/default.png" alt="profile picture" />
      <p>Editor</p>
    </div>
  </div>
 * 
 */