import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

const libsql = createClient({
  // @ts-expect-error Description of why the error is expected and being ignored
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN
})
const adapter = new PrismaLibSQL(libsql)

export const prisma = new PrismaClient({ adapter })
