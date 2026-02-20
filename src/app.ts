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


    Server.start();

    // const logs = await LogModel.find()




    
}