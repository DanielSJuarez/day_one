const { createUser, userList, userListOrdered } = require('./db.js');
const inquirer = require('inquirer');
const Choice = require('inquirer/lib/objects/choice');

const userQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "What's your name?"
    },
    {
        type: 'number',
        name: 'age',
        message: 'What is your age?'
    },
];

const finishedQuestion = [
    {
        type: 'confirm',
        name: 'finished',
        message: 'Are you finished?'
    },
];

const listorderQuestion = [
    {
        type: 'confirm',
        name: 'chooseListOrder',
        message: 'Would you like to filter users by age?'
    },
];

const initialQuestions = [
    {
        type: 'list',
        name: 'initialChoices',
        message: 'Would you like a list of users, or would you like to create a user?',
        choices: ['List of users', 'Create a user']
    },
]

const askUserQuestion = () => {
    inquirer.prompt(userQuestions).then(userAnswers => {
        inquirer.prompt(finishedQuestion).then(async finishedAnswer => {
            await createUser(userAnswers)
            if (!finishedAnswer.finished) {
                askUserQuestion();
            }
            else {
                console.log('Have a great day!')
            }
        });
    });
};

(() => {
    inquirer.prompt(initialQuestions).then(async listAnswer => {
        if (listAnswer.initialChoices === 'List of users') {
            inquirer.prompt(listorderQuestion).then(async orderAnswer => {
                if (orderAnswer.chooseListOrder) {
                    let listOfUsersAge = await userListOrdered();
                    console.log(listOfUsersAge);
                }
                else {
                    let listOfUsersDefault = await userList();
                    console.log(listOfUsersDefault);
                }
            });
        }
        else {
            askUserQuestion();
        }
    });
})();



