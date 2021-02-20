const waffle = $("#waffle")
const header = $("header.home-header")

let apps = [
  { 
    name: "Charge",
		src: "h/charge",
		img: "https://lh3.googleusercontent.com/proxy/zQ651PoY8KJNPfuG2a9cxpvajMP23ulaF2IFroLPK2ylwPviO46WnWZZol-eTC0Tdw1Pm7cFBr8ZPt4IxQH8NNP9PA"
  },
  { 
    name: "Clef",
		src: "h/clef"
  },
	{ 
    name: "CutScene",
		src: "h/cutscene"
  }
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