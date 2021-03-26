class Employee {
  constructor(name, surname, age) {
    this._name = name
    this._surname = surname
    this._age = age
  }

  getObjectInfo() {
    return {name: this._name, surname: this._surname, age: this._age}
  }

  getStringInfo() {
    return `Name: ${this._name} | Surname: ${this._surname} | Age: ${this._age}`
  }

  doWork() {
    return 'I dont know what i need to do!'
  }
}

class Developer extends Employee {
  constructor(name, surname, age) {
    super(name, surname, age)
  }

  doWork() {
    return 'I will do some features'
  }
}

class Tester extends Employee {
  constructor(name, surname, age) {
    super(name, surname, age)
  }

  doWork() {
    return 'I will try to destroy this application'
  }
}

class Project {
  constructor() {
    this._developersList = []
    this._testersList = []
  }

  addDeveloper(developer) {
    if (developer instanceof Developer) {
      this._developersList.push(developer)
    } else {
      throw new Error(`TypeError: addDeveloper except Developer, but get ${developer.constructor.name}`)
    }
  }

  addTester(tester) {
    if (tester instanceof Tester) {
      this._testersList.push(tester)
    } else {
      throw new Error(`TypeError: addTester except Tester, but get ${tester.constructor.name}`)
    }
  }

  getTeam() {
    const getInfoOfEmployee = elem => elem.getStringInfo()
    return {
      developersList: this._developersList.map(getInfoOfEmployee),
      testersList: this._testersList.map(getInfoOfEmployee)
    }
  }
}

const project = new Project()

const developerBob = new Developer('Bob', 'Smith', 20)
const developerJohn = new Developer('John', 'Doe', 22)
const testerAlex = new Tester('Alex', 'Green', 21)

project.addDeveloper(developerBob)
project.addDeveloper(developerJohn)
project.addTester(testerAlex)

console.log(project.getTeam())