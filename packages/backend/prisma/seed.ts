import {Prisma, PrismaClient} from '@prisma/client'
import {hashSync} from 'bcrypt';


const prisma = new PrismaClient()

// モデル投入用のデータ定義
const userData: Prisma.UserCreateInput[] = [
  {
    name: 'hoge1',
    email: 'hoge1@example.com',
    password: hashSync('Password', 10)
  },
  {
    name: 'hoge2',
    email: 'hoge2@example.com',
    password: hashSync('Password', 10)
  },
  {
    name: 'hoge3',
    email: 'hoge3@example.com',
    password: hashSync('Password', 10)
  },
]

const transfer = async () => {
  const users = [];
  for (const u of userData) {
    const user = prisma.user.create({
      data: u,
    })
    users.push(user);
  }
  return await prisma.$transaction(users);
}

// 定義されたデータを実際のモデルへ登録する処理
const main = async () => {
  console.log(`Start seeding ...`)

  await transfer();

  console.log(`Seeding finished.`)
}

// 処理開始
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })