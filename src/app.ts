import 'dotenv/config'
import { Server } from './presentation/server'
import { MongoDatabase } from './data/mongo/init'
import { envs } from './config/envs.plugin'

(async() => {
    main()
})()


async function main() {
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName:envs.MONGO_DB_NAME
    })
    Server.start();
    
}