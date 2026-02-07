import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const username = process.env.ADMIN_USERNAME || 'admin'
    const password = process.env.ADMIN_PASSWORD || 'admin123'

    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
        where: { username }
    })

    if (existingAdmin) {
        console.log('Admin user already exists')
        return
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create admin
    const admin = await prisma.admin.create({
        data: {
            username,
            password: hashedPassword
        }
    })

    console.log('Admin user created successfully!')
    console.log(`Username: ${admin.username}`)
    console.log(`Password: ${password}`)
}

main()
    .catch((e) => {
        console.error('Error creating admin:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
