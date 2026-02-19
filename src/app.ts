import 'dotenv/config'
import { Server } from './presentation/server'
import { MongoDatabase } from './data/mongo/init'
import { envs } from './config/envs.plugin'
import { LogModel } from './data/mongo'

(async() => {
    main()
})()


async function main() {
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName:envs.MONGO_DB_NAME
    })
    Server.start();

    const logs = await LogModel.find()

    console.log(logs)


    
}