
export const EmailTemplate = ({
    matricula,
    nombre,
    apePaterno,
    apeMaterno
}) => (
    <div>
        <h1>Welcome, {nombre}!</h1>
        <p>
            Tu nombre completo es {apePaterno} {apeMaterno} {nombre}
        </p>
        <p style={
            {
                color: 'red',
                fontSize: '20px',
            }
        }>
            Tu matrícula es {matricula}
        </p>
    </div>
);
