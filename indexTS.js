var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Employee = /** @class */ (function () {
    function Employee(name, surname, age) {
        this.name = name;
        this.surname = surname;
        this.age = age;
    }
    Employee.prototype.doWork = function () {
        return 'I dont know what i need to do!';
    };
    Employee.prototype.getObjectInfo = function () {
        return { name: this.name, surname: this.surname, age: this.age };
    };
    Employee.prototype.getStringInfo = function () {
        return "Name: " + this.name + " | Surname: " + this.surname + " | Age: " + this.age;
    };
    return Employee;
}());
var Developer = /** @class */ (function (_super) {
    __extends(Developer, _super);
    function Developer(name, surname, age) {
        return _super.call(this, name, surname, age) || this;
    }
    Developer.prototype.doWork = function () {
        return 'I will do some features';
    };
    return Developer;
}(Employee));
var Tester = /** @class */ (function (_super) {
    __extends(Tester, _super);
    function Tester(name, surname, age) {
        return _super.call(this, name, surname, age) || this;
    }
    Tester.prototype.doWork = function () {
        return 'I will try to destroy this application';
    };
    return Tester;
}(Employee));
var Project = /** @class */ (function () {
    function Project() {
        this.developersList = [];
        this.testersList = [];
    }
    Project.prototype.addDeveloper = function (developer) {
        this.developersList.push(developer);
    };
    Project.prototype.addTester = function (tester) {
        this.testersList.push(tester);
    };
    Project.prototype.getTeam = function () {
        var getInfoOfEmployee = function (elem) { return elem.getStringInfo(); };
        return {
            developersList: this.developersList.map(getInfoOfEmployee),
            testersList: this.testersList.map(getInfoOfEmployee)
        };
    };
    return Project;
}());
var project = new Project();
var developerBob = new Developer('Bob', 'Smith', 20);
var developerJohn = new Developer('John', 'Doe', 22);
var testerAlex = new Tester('Alex', 'Green', 21);
project.addDeveloper(developerBob);
project.addDeveloper(developerJohn);
project.addTester(testerAlex);
console.log(project.getTeam());
