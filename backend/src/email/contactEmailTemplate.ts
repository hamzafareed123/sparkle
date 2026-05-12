export const contactNotificationTemplate = (name: string, email: string, phone: string | undefined, message: string) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #2563eb;">New Contact Form Submission 📩</h2>
    <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
      <tr><td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Name</strong></td><td style="padding: 8px; border: 1px solid #e5e7eb;">${name}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Email</strong></td><td style="padding: 8px; border: 1px solid #e5e7eb;">${email}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Phone</strong></td><td style="padding: 8px; border: 1px solid #e5e7eb;">${phone || 'Not provided'}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Message</strong></td><td style="padding: 8px; border: 1px solid #e5e7eb;">${message}</td></tr>
    </table>
  </div>
`
