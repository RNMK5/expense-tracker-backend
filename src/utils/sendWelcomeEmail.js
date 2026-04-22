const sendEmail = require("./sendWelcomeEmail");

const sendWelcomeEmail = async (user) => {
  const subject = "Welcome to SpendWise";

  const text = `
Hello ${user.name},

Welcome to SpendWise.

Your account has been created successfully. You can now:
- Track your expenses and income
- View reports and insights
- Download monthly PDF summaries

We’re glad to have you onboard.

Regards,
SpendWise Team
  `;

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #172033;">
      <h2 style="margin-bottom: 8px;">Welcome to SpendWise, ${user.name}!</h2>
      <p>Your account has been created successfully.</p>
      <p>You can now:</p>
      <ul>
        <li>Track your income and expenses</li>
        <li>View financial insights and reports</li>
        <li>Download monthly PDF summaries</li>
      </ul>
      <p style="margin-top: 20px;">We’re glad to have you onboard.</p>
      <p><strong>SpendWise Team</strong></p>
    </div>
  `;

  await sendEmail({
    to: user.email,
    subject,
    text,
    html,
  });
};

module.exports = sendWelcomeEmail;