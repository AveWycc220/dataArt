interface IEmployee {
    readonly name: string
    readonly surname: string
    readonly age: number
    doWork: () => string
    getStringInfo: () => string
    getObjectInfo: () => object
}

class Employee implements IEmployee {
    readonly name: string
    readonly surname: string
    readonly age: number

    constructor(name: string, surname: string, age: number) {
        this.name = name
        this.surname = surname
        this.age = age
    }

    doWork(): string {
        return 'I dont know what i need to do!'
    }

    getObjectInfo(): object {
        return {name: this.name, surname: this.surname, age: this.age}
    }

    getStringInfo(): string {
        return `Name: ${this.name} | Surname: ${this.surname} | Age: ${this.age}`
    }
}

class Developer extends Employee {
    constructor(name: string, surname: string, age: number) {
        super(name, surname, age)
    }

    doWork(): string {
        return 'I will do some features'
    }
}

class Tester extends Employee {
    constructor(name: string, surname: string, age: number) {
        super(name, surname, age)
    }

    doWork(): string {
        return 'I will try to destroy this application'
    }
}

interface IProject {
    readonly developersList: Array<Developer>
    readonly testersList: Array<Tester>
    addDeveloper: (developer: Developer) => void
    addTester: (tester: Tester) => void
    getTeam: () => object
}

class Project implements IProject {
    readonly developersList: Array<Developer>
    readonly testersList: Array<Tester>

    constructor() {
        this.developersList = []
        this.testersList = []
    }

    addDeveloper(developer: Developer) {
        this.developersList.push(developer)
    }

    addTester(tester: Tester) {
        this.testersList.push(tester)
    }

    getTeam() {
        const getInfoOfEmployee = elem => elem.getStringInfo()
        return {
            developersList: this.developersList.map(getInfoOfEmployee),
            testersList: this.testersList.map(getInfoOfEmployee)
        }
    }
}

const project: Project = new Project()

const developerBob: Developer = new Developer('Bob', 'Smith', 20)
const developerJohn: Developer = new Developer('John', 'Doe', 22)
const testerAlex: Tester = new Tester('Alex', 'Green', 21)

project.addDeveloper(developerBob)
project.addDeveloper(developerJohn)
project.addTester(testerAlex)

console.log(project.getTeam())