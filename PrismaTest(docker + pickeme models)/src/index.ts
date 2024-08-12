import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Создание пользователя с профилем
  const newUser = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      profile: {
        create: {
          phone: '123-456-7890',
        },
      },
      places: {
        create: [
          { name: 'Place 1', location: 'Location 1' },
          { name: 'Place 2', location: 'Location 2' },
        ],
      },
      events: {
        create: [
          {
            name: 'Event 1',
            description: 'Description 1',
            date: new Date(),
            place: {
              connectOrCreate: {
                where: { id: 1 },  // Указываем ID вместо имени для однозначной идентификации
                create: { name: 'Place 1', location: 'Location 1' },
              },
            },
          },
        ],
      },
    },
  });
  console.log('Created new user:', newUser);

  // Извлечение данных
  const allUsers = await prisma.user.findMany({
    include: {
      profile: true,
      places: true,
      events: {
        include: {
          place: true,
          payments: true,
        },
      },
      payments: true,
    },
  });
  console.log('All users:', allUsers);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
