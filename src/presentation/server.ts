import { url } from 'inspector';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { CronService } from './cron/cron-service';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasorce';
import { EmailService } from './email/email.service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';

const fileSystemRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
)
const emailService =  new EmailService()
export class Server {
    public static start() {

        console.log("Server is running…")
        //send email
         
        new SendEmailLogs(emailService, fileSystemRepository).execute(['brunobenavent@gmail.com', 'comunicacion@viverosguzman.es'])
        
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://www.google.com'
        //         new CheckService(
        //             fileSystemRepository,
        //             () => console.log(`${url} is ok`),
        //             (error) => console.log(`${url} is not ok: ${error}`)

        //         ).execute('https://www.google.com')
        //         //new CheckService().execute('http://localhost:3000')
        //     }   
        // );
        
    }

}