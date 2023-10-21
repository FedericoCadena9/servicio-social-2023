import { EmailTemplate } from "../../../components/EmailTemplate";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(req) {
  const { matricula, nombre, apePaterno, apeMaterno, pdfResults } =
    await req.json();

  try {
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["federicocadena091@gmail.com"],
      subject: `Welcome ${nombre}!`,
      react: EmailTemplate({ matricula, nombre, apePaterno, apeMaterno }),
      attachments: [
        {
          filename: "invoice.pdf",
          content: pdfResults,
        },
      ],
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
