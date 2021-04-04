self.addEventListener('message', e => {
  postMessage(e.data.arr
    .map(elem => elem.email.toLowerCase().includes(e.data.value.toLowerCase()) ? elem : null)
    .filter(elem => Boolean(elem)))
})
