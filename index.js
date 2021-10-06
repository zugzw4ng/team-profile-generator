const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const currentEmployees = [];

const setHTMLStart = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link rel="stylesheet" href="./style.css">
    <title>Team Profile</title>
</head>
<body>
    <header>
        <h1>
            Team Profile
        </h1>
    </header>
    <main>
    <ul id=card-area>`

const setHTMLFinish = `
</ul>
</main>
</body>
</html>`

function init() {
    generateHTML();
    addTeamMember();
}

function addTeamMember() {
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
                newestMember = new Engineer(name, id, email, roleSpec)
            } else if (role === "Intern") {
                newestMember = new Intern(name, id, email, roleSpec)
            } else {
                newestMember = new Manager(name, id, email, roleSpec);
            }
            currentEmployees.push(newestMember);
            generateMemberHTML(newestMember)
                .then(function () {
                    if (addMembers === "yes") {
                        addTeamMember();
                    } else {
                        finishHTML();
                    }
                });
        })
}

function generateHTML() {
    fs.writeFile("./dist/team-profile.html", setHTMLStart, function(err) {
        if (err) {
            console.log(err);
        }
    })
}

function generateMemberHTML()


