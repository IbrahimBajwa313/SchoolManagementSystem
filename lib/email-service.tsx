// Email service for sending fee notifications
export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

export interface EmailRecipient {
  email: string
  name: string
  studentName?: string
}

export class EmailService {
  private static instance: EmailService

  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService()
    }
    return EmailService.instance
  }

  async sendEmail(to: EmailRecipient[], template: EmailTemplate): Promise<boolean> {
    try {
      // In a real implementation, you would use a service like:
      // - Nodemailer with SMTP
      // - SendGrid
      // - AWS SES
      // - Resend

      console.log(`[EMAIL] Sending to ${to.length} recipients`)
      console.log(`[EMAIL] Subject: ${template.subject}`)

      // Simulate email sending
      for (const recipient of to) {
        console.log(`[EMAIL] Sent to: ${recipient.email} (${recipient.name})`)
      }

      return true
    } catch (error) {
      console.error("[EMAIL] Failed to send email:", error)
      return false
    }
  }

  generateFeeReminderTemplate(studentName: string, feeAmount: number, dueDate: string): EmailTemplate {
    const subject = `Fee Reminder - ${studentName} - Monthly Fee Due`

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: #164e63; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .fee-details { background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .amount { font-size: 24px; font-weight: bold; color: #ec4899; }
            .footer { background: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Greenwood International School</h1>
            <p>Monthly Fee Reminder</p>
          </div>
          <div class="content">
            <h2>Dear Parent/Guardian,</h2>
            <p>This is a friendly reminder that the monthly fee for <strong>${studentName}</strong> is due.</p>
            
            <div class="fee-details">
              <h3>Fee Details:</h3>
              <p><strong>Student:</strong> ${studentName}</p>
              <p><strong>Amount Due:</strong> <span class="amount">$${feeAmount}</span></p>
              <p><strong>Due Date:</strong> ${dueDate}</p>
            </div>
            
            <p>Please ensure payment is made by the due date to avoid any late fees. You can make payments through:</p>
            <ul>
              <li>Online payment portal</li>
              <li>Bank transfer</li>
              <li>Cash/Check at school office</li>
            </ul>
            
            <p>If you have any questions or concerns, please contact our accounts department.</p>
            
            <p>Thank you for your cooperation.</p>
            <p><strong>Greenwood International School</strong><br>
            Accounts Department</p>
          </div>
          <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </body>
      </html>
    `

    const text = `
      Greenwood International School - Monthly Fee Reminder
      
      Dear Parent/Guardian,
      
      This is a friendly reminder that the monthly fee for ${studentName} is due.
      
      Fee Details:
      Student: ${studentName}
      Amount Due: $${feeAmount}
      Due Date: ${dueDate}
      
      Please ensure payment is made by the due date to avoid any late fees.
      
      Thank you for your cooperation.
      
      Greenwood International School
      Accounts Department
    `

    return { subject, html, text }
  }
}
