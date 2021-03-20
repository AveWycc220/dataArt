const CONFIG = {
  lengthOfDays: 7,
  defaultDay: 0
}

const initHTML = () => {
  const buttonList = createButtonList()
  createDivApp(buttonList)
  initFirstTable(buttonList[CONFIG.defaultDay])
}

const createDivApp = (buttonList) =>  {
  const appendFunc = getAppendCurryingFunc(new DocumentFragment())
  document.body.appendChild(appendFunc
  (createElement({className: 'App'}))
  ([createElement({className: 'btn-container'}), createElement({className: 'div-table loading', innerHTML:'Loading'})])
  (buttonList)
  ())
}

const initFirstTable = button => button.click()

const createTable = (id, data) => {
  const divTable = document.querySelector('.div-table')
  const table = document.querySelector('.table')
  if (divTable.classList.contains('loading')) {
    divTable.classList.remove('loading')
    divTable.innerHTML = ''
  }
  if (table) table.remove()
  const appendFunc = getAppendCurryingFunc(new DocumentFragment())
  divTable.appendChild(appendFunc(createElement({type: 'table', id: id, className: 'table'}))
  ([createRow(data, true), createRow(data, false, true), ...getRows(data)])
  ())
}

const createRow = (data, header=false, explanation=false) => {
  const appendFunc = getAppendCurryingFunc(new DocumentFragment())
  if (header) {
    return appendFunc
    (createElement({type: 'tr', className: 'table__header'}))
    ([createElement({type: 'td', className: 'table__base', innerHTML: `Base: ${data.base}`}),
      createElement({type: 'td', className: 'table__time', innerHTML: `Time: ${data.date}`})])
    ()
  } else if (explanation) {
    return appendFunc
    (createElement({type: 'tr', className: 'table__explanation'}))
    ([createElement({type: 'td', className: 'table__code table__code_explanation', innerHTML: `CODE`}),
      createElement({type: 'td', className: 'table__value table__value_explanation', innerHTML: `VALUE`})])
    ()
  }
  else {
    return appendFunc
    (createElement({type: 'tr', className: 'table__element'}))
    ([createElement({type: 'td', className: 'table__code', innerHTML: `${data.code}`}),
      createElement({type: 'td', className: 'table__value', innerHTML: `${data.value}`})])
    ()
  }
}

const createElement = ({className = '', innerHTML = '', type= 'div', id=''}) => {
  const div = document.createElement(type)
  div.className = className
  div.innerHTML = innerHTML
  div.id = id
  return div
}

const getAppendCurryingFunc = parent => {
  const parentLocal = parent
  return function append(child) {
    if (!child) return parentLocal
    if (child instanceof Array && child.length !== 0) {
      child.forEach(item => parent.appendChild(item))
      parent = child[0]
    } else {
      parent.appendChild(child)
      parent = child
    }
    return append
  }
}

const createButton = innerHTML => {
  const btn = document.createElement('button')
  const time = innerHTML
  btn.className = 'btn-container__button'
  btn.id = innerHTML
  btn.innerHTML = innerHTML
  createClickEvent(btn, time)
  return btn
}

const createClickEvent = (btn, time) => {
  btn.addEventListener('click', () => {
    btn.blur()
    getData(time).then(data => createTable(time, data))
  })
}

const getTimes = function* () {
  const dateNow = new Date()
  let dateMonth = dateNow.getMonth() + 1
  yield `${dateNow.getFullYear()}-${dateMonth < 10 ? `0${dateMonth}` : `${dateMonth}`}-${dateNow.getDate()}`
  for (let i = 1; i < CONFIG.lengthOfDays; i++) {
    dateNow.setDate(dateNow.getDate() - 1)
    dateMonth = dateNow.getMonth() + 1
    yield `${dateNow.getFullYear()}-${dateMonth < 10 ? `0${dateMonth}` : `${dateMonth}`}-${dateNow.getDate()}`
  }
}

const getButtons = function* (timeList) {
  for (let i = 0; i < CONFIG.lengthOfDays; i++) {
    yield createButton(timeList[i])
  }
}

const getRows = function* (data) {
  for (let key in data.rates) {
    yield createRow({code: key, value: data.rates[key]})
  }
}

const createButtonList = () => {
  return [...getButtons([...getTimes()])]
}

const getData = async (time) => {
  const res = await fetch(`https://api.exchangeratesapi.io/${time}?base=RUB`)
  return await res.json()
}

initHTML()