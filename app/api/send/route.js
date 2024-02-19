import { EmailTemplate } from "../../../components/EmailTemplate";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(req) {
  try {
    const { matricula, nombre, apePaterno, apeMaterno, attachments } = await req.json();
    const data = await resend.emails.send({
      from: "Departamento de Servicio Social <serviciosocial@iteshu.edu.mx>",
      to: [`a${matricula}@iteshu.edu.mx`],
      // to: ["federicocadena091@gmail.com"],
      subject: `${matricula} - Comienzo del Periodo de Servicio Social y Asignación de Dependencias`,
      react: EmailTemplate({ matricula, nombre, apePaterno, apeMaterno }),
      attachments,
    });

    return NextResponse.json(
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error },
      {
        status: 500,
      }
    );
  }
}
