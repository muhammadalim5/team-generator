const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const util = require('util')
const writeFileAsync = util.promisify(fs.writeFile);

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = []

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

   

function member() {
    inquirer.prompt(
        [
            {
                type: 'confirm',
                message: 'Add another team Member!',
                name: 'anotherMember',
              
            },
        ]
    ).then(val => {
        if (val.anotherMember) {
            aboutMember()
        }
        else {
            finish()
        }

    })
}

async function finish() {
    
    const rendering = await render(employees)
    await writeFileAsync(outputPath, rendering);
 
}


function aboutMember() {
    inquirer.prompt(
        [
            {
                type: 'list',
                message: 'Choose type of employee!',
                choices: [
                    'Engineer',
                    'Intern',
                ],
                name: 'choice'
            },

        ]
    ).then(val => {
        if (val.choice === "Engineer") {
            engineerInfo()
        }
        else {
            internInfo()
        }
    })
}

function managerInfo() {
    inquirer.prompt(
        [
            {
                type: 'input',
                message: "What is the Manager's name?",
                name: 'name',
              

            },
            {
                type: 'input',
                message: "What is manager's ID?",
                name: 'id',
               
            },
            {
                type: 'input',
                message: "What is manager's email?",
                name: 'email',
            
                
                
            },
            {
                type: 'input',
                message: "What is the Manager's office number?",
                name: 'officeNumber',
            
            }
        ]
    )
        .then(val => {
            const manager = new Manager(val.name, val.id, val.email, val.officeNumber)
            employees.push(manager)
            member()
        }
        )
}



function engineerInfo() {
    inquirer.prompt(
        [
            {
                type: 'input',
                message: "What is the Engineer's  name?",
                name: 'name',
             
            },
            {
                type: 'input',
                message: "What is Engineer's  ID?",
                name: 'id',
            
            },
            {
                type: 'input',
                message: "What is Engineer's  email?",
                name: 'email',
        
            },
            {
                type: 'input',
                message: "What is the Engineer's GitHub username?",
                name: 'github',
            
            }
        ]
    )
        .then(val => {
            const engineer = new Engineer(val.name, val.id, val.email, val.github)
            employees.push(engineer)
            member()
        }
        )
}

function internInfo() {
    return inquirer.prompt(
        [
            {
                type: 'input',
                message: "What is the Intern's  name?",
                name: 'name',
         
            },
            {
                type: 'input',
                message: "What is Intern's  ID?",
                name: 'id',
         
            },
            {
                type: 'input',
                message: "What is Intern's  email?",
                name: 'email',
          
            },
            {
                type: 'input',
                message: "What is the Intern's School name?",
                name: 'schoolname',
   
            }
        ]
    )
        .then(val => {
            const intern = new Intern(val.name, val.id, val.email, val.schoolname)
            employees.push(intern)
            member()
        }
        )
}

async function init() {
    try {
        await managerInfo()


    } catch (err) {
        console.log(err);
    }
}
init();



