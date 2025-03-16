
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface BrevoResponse {
  success: boolean;
  message?: string;
}

// Replace this with your actual Brevo API key
// This can also be stored in your environment variables for better security
const BREVO_API_KEY = "YOUR_BREVO_API_KEY"; 

/**
 * Send contact form data to Brevo API
 */
export async function sendContactForm(data: ContactFormData): Promise<BrevoResponse> {
  try {
    if (!BREVO_API_KEY || BREVO_API_KEY === "YOUR_BREVO_API_KEY") {
      console.warn("Please set up your Brevo API key");
      return { 
        success: false, 
        message: "API key is not configured. Please set up your Brevo API key." 
      };
    }

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY
      },
      body: JSON.stringify({
        sender: {
          name: data.name,
          email: data.email
        },
        to: [
          {
            // Replace with your email where you want to receive contact form submissions
            email: "your@email.com", 
            name: "Site Owner"
          }
        ],
        subject: data.subject,
        htmlContent: `
          <html>
            <body>
              <h3>New contact form submission</h3>
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Subject:</strong> ${data.subject}</p>
              <p><strong>Message:</strong></p>
              <p>${data.message.replace(/\n/g, '<br>')}</p>
            </body>
          </html>
        `
      })
    });

    const responseData = await response.json();
    
    if (response.ok) {
      return { success: true };
    } else {
      return { 
        success: false, 
        message: responseData.message || "Failed to send email through Brevo" 
      };
    }
  } catch (error) {
    console.error("Error sending email through Brevo:", error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "An unknown error occurred" 
    };
  }
}
