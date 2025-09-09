import { Resend } from "resend";
import { render } from "@react-email/render";
import { ContactEmailTemplate } from "@/components/email-template";

export async function POST(req: Request) {
  // // Check if RESEND_API_KEY exists
  // if (!process.env.RESEND_API_KEY) {
  //   console.error("RESEND_API_KEY is not set in environment variables");
  //   return Response.json(
  //     {
  //       success: false,
  //       error: "Server configuration error. Please contact the administrator.",
  //     },
  //     { status: 500 }
  //   );
  // }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return Response.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    const emailHtml = await render(
      ContactEmailTemplate({ name, email, message })
    );

    await resend.emails.send({
      from: "onboarding@resend.dev", // Default Resend domain for testing
      to: "k.hoenyefia@gmail.com", // Your Gmail address
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: emailHtml,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Detailed email error:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      error,
    });

    return Response.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong, please try again.",
      },
      { status: 500 }
    );
  }
}
