import nodemailer from 'nodemailer'
import { envs } from '../../config/envs.plugin'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'

interface SendMailOptions {
    to: string | string[]
    subject: string
    htmlBody: string
    attachments: Attachment[]
    //TODO add attachments and other options
}

interface Attachment{
    filename: string,
    path: string
}

//TODO: Attachment

export class EmailService {

    private transporter =nodemailer.createTransport( {
        host: "smtp.gmail.com",
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }   
    } )
    constructor() {}

    async sendEmail (options: SendMailOptions ): Promise<boolean> {
        const { to, subject, htmlBody, attachments = []} = options
        try {
            
            const sendInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments
            })
            //console.log(sendInformation)

            return true
        } catch (error) {

            return false
        }

    }

    async sendEmailWithFileSystemLogs(to:string | string[]) {
        const subject = 'Logs from NOC'
        const htmlBody = `<h3>Attached are the logs from NOC</h3>
                        <p>Please find the attached logs from NOC.</p>
                        <p>Best regards,</p>`
        const attachments: Attachment[] = [
            {
                filename: 'logs-high.log',
                path: './logs/logs-high.log'
            },
            {
                filename: 'logs-medium.log',
                path: './logs/logs-medium.log'
            },
            {
                filename: 'logs-all.log',
                path: './logs/logs-all.log'
            }
        ]
        return this.sendEmail({ to, subject, htmlBody, attachments })
    }
}