const generatorOfSequences = function* (names, genres, values) {
  for (let i = 0; i < names.length; i++) {
    yield {name: names[i], genre: genres[i], value: values[i],
      toString: function() { return `Name: ${this.name} | Genre: ${this.genre} | Value: ${this.value}` }}
  }
}

const names = ['The Guest', 'The Shawshank Redemption', 'The Shop Around the Corner', '1917', 'Joker',
  'Lock, Stock and Two Smoking Barrels', 'Sen to Chihiro no kamikakushi', 'Gentlemen',
  `It's a Wonderful Life`, 'Casablanca']
const genres = ['thriller', 'drama', 'romance', 'military', 'thriller', 'black comedy', 'fantasy', 'crime comedy',
  'drama', 'drama']
const values = [218, 230, 240, 205, 250, 280, 270, 190, 201, 252]

const filmList = [...generatorOfSequences(names, genres, values)]

const findMinFilm = list => {
  let min = list[0].value
  let min_index = 0
  for (let i = 0; i < names.length; i++) {
    if (list[i].value < min) {
      min = list[i].value
      min_index = i
    }
  }
  console.log(`Film with min value = ${list[min_index]}`)
  return list[min_index]
}

function findMaxFilm(list) {
  let max = list[0].value
  let max_index = 0
  for (let i = 0; i < names.length; i++) {
    if (list[i].value > max) {
      max = list[i].value
      max_index = i
    }
  }
  console.log(`Film with max value = ${list[max_index]}`)
  return list[max_index]
}

const findAverage = function(list) {
  let average = 0
  for (let key of list) {
    average += key.value
  }
  average /= list.length
  console.log(`Average = ${average}`)
  return average
}


findMinFilm(filmList)
findMaxFilm(filmList)
findAverage(filmList)