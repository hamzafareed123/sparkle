import { transporter } from './transporter'
import { contactNotificationTemplate } from './contactEmailTemplate'
import { env } from '../config/env'

export const sendContactNotification = async (name: string, email: string, phone: string | undefined, message: string) => {
  await transporter.sendMail({
    from: `"Sparkle & Shine" <${env.email.user}>`,
    to: env.email.user,
    subject: `📩 New Inquiry from ${name}`,
    html: contactNotificationTemplate(name, email, phone, message),
  })
}
