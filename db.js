const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: 'file:dev.db',
        },
    },
});

const createUser = async (user) => {
    await prisma.user.create({
        data: user
    });
}

const userList = async () => {
    return await prisma.user.findMany();
}

const userListOrdered = async () => {
    return await prisma.user.findMany({
        orderBy: {
            age: 'asc',
          }
    });
}

module.exports = { createUser, userList, userListOrdered }

