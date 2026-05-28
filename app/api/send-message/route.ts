// app/api/send-message/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, content } = await request.json();

    const formUrl = process.env.FORM_ACTION_URL;
    const emailField = process.env.FORM_EMAIL_ID;
    const contentField = process.env.FORM_CONTENT_ID;

    if (!formUrl || !emailField || !contentField) {
      return NextResponse.json(
        { error: "Server configurations missing" },
        { status: 500 },
      );
    }

    const formData = new URLSearchParams();
    formData.append(emailField, email);
    formData.append(contentField, content);

    const response = await fetch(formUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
      redirect: "manual",
    });

    // Google Forms typically returns status 0 (opaque), 200, or 302 on success
    const isValidSuccess =
      response.ok || response.status === 302 || response.status === 0;

    if (!isValidSuccess) {
      console.error(`Google Form rejected payload. Status: ${response.status}`);
      throw new Error("Failed to forward response to Google Forms");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
