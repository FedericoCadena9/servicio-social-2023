export const EmailTemplate = ({
    nombre,
    apePaterno,
    apeMaterno,
    dependencia,
    linkDocumentos,
    fechaInicio,
    fechaFin,
    fechaEntregaDocumentos,
}) => (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', color: '#333' }}>
        <h1 style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>Inicio del Periodo de Servicio Social</h1>
        <p>Estimado(a) {apePaterno} {apeMaterno} {nombre},</p>
        <p>Reciba un cordial saludo. Nos complace informarle que el periodo para la realización del Servicio Social ha dado inicio. A continuación, le detallamos la información pertinente:</p>

        <h3>1. Asignación de Dependencia:</h3>
        <p>- Le ha sido asignada la dependencia: {dependencia}.</p>

        <h3>2. Fechas Cruciales:</h3>
        <p>- Fecha de Inicio: {fechaInicio}.</p>
        <p>- Fecha de Conclusión: {fechaFin}.</p>

        <h3>3. Reinscripción a la Materia de Servicio Social:</h3>
        <p>- Al ser asignado a una dependencia y haber cumplido con el 70% de los créditos, deberá reinscribirse a la materia de Servicio Social para que sus avances sean evaluados bimestralmente.</p>

        <h3>4. Documentación Requerida:</h3>
        <p>Se le adjuntaron en este correo los siguientes documentos, los cuales deberán ser consolidados en un único archivo PDF, en el siguiente orden:</p>
        <ol>
            <li>Carta Compromiso de Servicio Social.</li>
            <li>Solicitud de Servicio Social.</li>
            <li>Registro del Programa de Servicio Social (Formato F1) - Disponible en <a href={linkDocumentos} target="_blank" rel="noopener noreferrer">este enlace</a>.</li>
        </ol>
        <p>- Fecha Límite de Entrega: {fechaEntregaDocumentos}.</p>

        <h3>5. Bitácora de Horas:</h3>
        <p>- También le compartimos la bitácora de horas para registrar las horas y actividades realizadas. Este documento se entregará hasta nuevo aviso.</p>

        <p>Quedamos a su disposición para cualquier duda o aclaración. Apreciamos su atención y cooperación. ¡Éxito en su periodo de servicio social!</p>

        <p style={{ borderTop: '1px solid #ccc', paddingTop: '10px', fontSize: '14px', color: '#555' }}>
            Atentamente,<br />
            <span style={{ fontWeight: 'bold', fontSize: '16px' }}>Lic. Alba Mendoza Montaño</span><br />
            <span style={{ fontStyle: 'italic' }}>Secretaria de Departamento de Residencias Profesionales y Servicio Social.</span><br />
            <a href="mailto:serviciosocial@iteshu.edu.mx" style={{ color: '#007BFF' }}>serviciosocial@iteshu.edu.mx</a><br />
            <a href="tel:017617248080" style={{ color: '#007BFF' }}>01 761 72 48080</a> -
            <a href="tel:017617248079" style={{ color: '#007BFF' }}>480 79</a> Ext. 1023
        </p>
    </div>
);