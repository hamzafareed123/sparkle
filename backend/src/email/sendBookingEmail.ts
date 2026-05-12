import { transporter } from './transporter'
import { bookingConfirmationTemplate } from './bookingEmailTemplate'
import { env } from '../config/env'

export const sendBookingConfirmation = async (to: string, name: string, bookingId: string, serviceType: string, date: string, time: string) => {
  await transporter.sendMail({
    from: `"Sparkle & Shine" <${env.email.user}>`,
    to,
    subject: '✅ Booking Confirmed - Sparkle & Shine',
    html: bookingConfirmationTemplate(name, bookingId, serviceType, date, time),
  })
}
