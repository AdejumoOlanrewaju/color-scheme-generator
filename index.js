let colors = ""
let Parent = document.querySelector(".main")
let inputColor = document.querySelector(".inputcolor")
let Mode = document.querySelector(".mode")
let hexCode = []
let copyColor = document.getElementsByClassName("col-parent")
let colourStr = ""
let newStr = ""
let select = ""
inputColor.addEventListener("change", chooseColor)
function chooseColor(event){
  colourStr = event.target.value
  newStr = colourStr.replace("#", "")
}

let loading = false

function handleClick(event){
  loading = true
  if(loading){
    document.querySelector(".progress-bar").style.display = "block"
  }
  event.preventDefault()
  select = Mode.value
  fetch(`https://www.thecolorapi.com/scheme?hex=${newStr}&mode=${select.toLowerCase()}&count=5`)
  .then(res => res.json())
  .then(data => {
      loading = false
      if(loading === false){
        document.querySelector(".progress-bar").style.display = "none"
      }
    // colors = data.colors 
    renderChild(data)
  })
  .catch(err => {
    document.getElementById("error-text").textContent = `Pls turn on your internet connection`
  })
}

let pallete = ""

function renderChild(data){ 
    let html = ""
    pallete = data.colors
    for(let i = 0; i < pallete.length; i++){
       colors = pallete[i].hex.value
       hexCode[i] = colors
      html += `
      <div class = "col-parent">
        <div id = "col-child" class = "col-child " style = "background : ${colors}" >
        
        </div>
        <p class = "col-text">${colors}</p>
      </div>
        `      
      } 
      Parent.innerHTML = html
      copyclick()
}

async function copy(id){
 let copyLine = await navigator.clipboard.writeText(hexCode[id])
 alert(`copied color: ${hexCode[id]} `)
 console.log(copyLine)

}



function copyclick(){
  for(let i = 0; i < copyColor.length; i++){
    copyColor[i].addEventListener('click', function(){
      copy(i)
      
    })
  }
}
 
  
