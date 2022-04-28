const { createUser, userList, userListOrdered } = require('./db.js');
const inquirer = require('inquirer');

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

const listQuestion = [
    {
        type: 'confirm',
        name: 'chooseOptionList',
        message: 'Would you like a list of all the users?'
    },
];

const listorderQuestion = [
    {
        type: 'confirm',
        name: 'chooseListOrder',
        message: 'Would you like to filter users by age?'
    },
];

const createQuestion = [
    {
        type: 'confirm',
        name: 'chooseCreateUser',
        message: 'Would you like to create a user?'
    },
];

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
    inquirer.prompt(listQuestion).then(async listAnswer => {
        if (listAnswer.chooseOptionList) {
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
            inquirer.prompt(createQuestion).then(createAnswer => {
                if (createAnswer.chooseCreateUser) {
                    askUserQuestion();
                }
                else {
                    console.log('Have a great day!')
                }
            });
        }
    });
})();



