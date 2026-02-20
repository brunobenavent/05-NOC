import { Pool } from 'pg';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, SeverityLevel } from '../../generated/prisma/client';
import { envs } from '../../config/envs.plugin';



const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH        
}

const pool = new Pool({
    connectionString: envs.POSTGRES_URL,
});
const adapter = new PrismaPg(pool);
const prismaClient = new PrismaClient({ adapter });

    export class PostgresLogDatasource implements LogDatasource {
        async saveLog(log: LogEntity): Promise<void> {
            const level = severityEnum[log.level]
            const newLog = await prismaClient.logModel.create({
                data: {
                    ...log,
                    level
                }
            })
            console.log('Postgres log created', newLog.id)

        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            const level = severityEnum[severityLevel]

            const dbLogs = await prismaClient.logModel.findMany({
                where: {
                    level
                }
            })
            return dbLogs.map(dbLog => LogEntity.fromObject(dbLog))
        }

    }