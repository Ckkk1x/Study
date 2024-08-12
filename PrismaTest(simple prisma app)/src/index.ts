import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Создание нового пользователя
  const newUser = await prisma.user.create({
    data: {
      email: 'alice@prisma.io',
      name: 'Alice',
    },
  });
  console.log('Created new user:', newUser);

  // Чтение всех пользователей
  const allUsers = await prisma.user.findMany();
  console.log('All users:', allUsers);
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
