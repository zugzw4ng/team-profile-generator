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
<body class="orange lighten-5">
    <header>
        <h1 class="center">
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
    generateHTMLStart();
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
                    choices: ["yes", "no"]
                }
            ])
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
                                generateHTMLFinish();
                            }
                        });
                })
        })

}

function generateHTMLStart() {
    fs.writeFile("./dist/team-profile.html", setHTMLStart, function (err) {
        if (err) {
            console.log(err);
        }
    })
}

function generateMemberHTML(member) {
    return new Promise(function (resolve, reject) {
        const name = member.getName();
        const role = member.getRole();
        const id = member.getId();
        const email = member.getEmail();
        let data = "";
        if (role === "Engineer") {
            const gitHubName = member.getGithub();
            data = `<div class="col s6">
            <div class="card blue-grey darken-1">
              <div class="card-content white-text">
                <span class="card-title">${name}, Engineer</span>
              </div>
              <div class="card-action">
               <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">GitHub: ${gitHubName}</li>
            </ul>
              </div>
            </div>
          </div>`;
        } else if (role === "Intern") {
            const schoolName = member.getSchool();
            data = `<div class="col s6">
            <div class="card blue-grey darken-1">
              <div class="card-content white-text">
                <span class="card-title">${name}, Intern</span>
              </div>
              <div class="card-action">
               <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">School Name: ${schoolName}</li>
            </ul>
              </div>
            </div>
          </div>`;
        } else {
            const officeNumber = member.getOfficeNumber();
            data = `<div class="col s6">
            <div class="card blue-grey darken-1">
              <div class="card-content white-text">
                <span class="card-title">${name}, Manager</span>
              </div>
              <div class="card-action">
               <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">Office Contact Number: ${officeNumber}</li>
            </ul>
              </div>
            </div>
          </div>`;
        }
        console.log("adding team member...");
        fs.appendFile("./dist/team-profile.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });
}

function generateHTMLFinish() {
    fs.appendFile("./dist/team-profile.html", setHTMLFinish, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("Complete!");
}

init();