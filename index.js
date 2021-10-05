const inquirer = require("inquirer");
const jest = require("jest");
const fs = require("fs");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const currentEmployees = [];

newTeamMember = () => {
    inquirer.prompt([
        {
            message: "Add team member's name",
            name: "name"
        },
        {
            type:"list",
            message: "Add team member's role",
            name: "role",
            choices: [
                "Engineer",
                "Intern",
                "Manager"
            ],
        },
        {
            message:"Add team member's ID",
            name: "id"
        },
        {
            message:"Add team member's email addgress",
            name:"email"
        }
    ])
    .then()
};

