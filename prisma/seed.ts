import { hash } from '@node-rs/bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const user = {
    id: 'fafeeb2e-4783-424f-b220-321954cefb66',
    email: 'admin@admin.com',
    username: 'admin',
    password: await hash('admin'),
    fullName: 'admin',
  };

  if ((await prisma.user.count({ where: { id: user.id } })) == 0) {
    const u = await prisma.user.create({
      data: user,
    });
    const site = await prisma.site.create({
      data: {
        name: 'Majalengka',
        address: 'Majalengka, Jawa Barat',
      },
    });

    await prisma.userSite.create({
      data: {
        userId: u.id,
        siteId: site.id,
      },
    });
  }

  await prisma.$disconnect();

  process.exit(0);
}

main();
