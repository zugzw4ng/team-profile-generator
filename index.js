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
            type: "list",
            message: "Add team member's role",
            name: "role",
            choices: [
                "Engineer",
                "Intern",
                "Manager"
            ],
        },
        {
            message: "Add team member's ID",
            name: "id"
        },
        {
            message: "Add team member's email addgress",
            name: "email"
        }
    ])
        .then(function ({ name, role, id, email }) {
            let roleSpec = "";
            if (role === "Engineer") { roleSpec = "Github username" }
            else if (role === "Intern") { roleSpec = "School name" }
            else { roleSpec === "Office number" };
            inquirer.prompt([
                {
                    message: `Enter team member's ${roleSpec}`,
                    name: "roleSpec"
                },
                {
                    type: "list",
                    message: "Add more team members?",
                    name: "addMembers",
                    choices: [yes, no],
                }
            ])
        }
        )
        .then(function ({ roleSpec, addMembers }) {
            let newestMember;
            if (role === "Engineer") {
                newMember = new Engineer(name, id, email, roleSpec)
            } else if (role === "Intern") {
                newMember = new Intern(name, id, email, roleSpec)
            } else {
                newMember = new Manager(name, id, email, roleSpec);
            }
            currentEmployees.push(newestMember);
            generateMemberHTML(newestMember)
                .then(function () {
                    if (addMembers === "yes") {
                        newTeamMember();
                    } else {
                        finishHTML();
                    }
                });
        })
}
