const CONFIG = {
  URL: `https://jsonplaceholder.typicode.com/comments`,
  ROOT: document.querySelector('.App') || document.body
}

const getData = async () => {
  try {
    let res = await fetch(CONFIG.URL)
    return res.status === 200 ? await res.json() : false
  } catch (e) {
    console.log(e + ` ServerError. Please try again.`)
  }
}

const initElements = (data) => {
  CONFIG.ROOT.appendChild(createInput('author-email', data))
  paintComments(data)
}

const createInput = (className, data) => {
  const inputFolder = document.createElement('input')
  inputFolder.type = 'text'
  inputFolder.classList.add(className)
  inputFolder.addEventListener('input', e => {
    let worker = new Worker('./worker.js')
    worker.postMessage({arr: data, value: e.target.value})
    worker.onmessage = (e) => {
      paintComments(e.data)
    }
  })
  return inputFolder
}

const paintComments = (data) => {
  let mainDiv = createMainDiv()
  data.forEach(elem => {
    const divElem = document.createElement('div')
    divElem.classList.add('comment')
    divElem.id = elem.id
    divElem.innerHTML = `
    <hr/>
    <p id="name">Name = ${elem.name || ' '}</p>
    <p id="email">Email = ${elem.email || ' '}</p>
    <p id="body">Comment = ${elem.body || ' '}</p>
    `
    mainDiv.appendChild(divElem)
  })
  CONFIG.ROOT.appendChild(mainDiv)
}

const createMainDiv = () => {
  let div = document.querySelector('.comments-list')
  if (div) {
    while (div.firstChild) {
      div.removeChild(div.firstChild);
    }
  } else {
    div = document.createElement('div')
    div.classList.add('comments-list')
  }
  return div
}

getData().then((data) => initElements(data))
