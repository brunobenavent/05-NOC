import 'dotenv/config'
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";
import { Server } from './presentation/server'
import { MongoDatabase } from './data/mongo/init'
import { envs } from './config/envs.plugin'
import { LogModel } from './data/mongo'
import { Pool } from 'pg'

(async() => {
    main()
})()


async function main() {
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName:envs.MONGO_DB_NAME
    })
    const pool = new Pool({
        connectionString: envs.POSTGRES_URL,
    });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });
    const newLog = await LogModel.create({
        data: {
            level: 'HIGH',
            message: 'test message',
            origin: 'app.ts'
        }

    })

    Server.start();

    const logs = await LogModel.find()

    console.log(logs)


    
}