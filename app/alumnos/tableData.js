const columns = [
  { name: "Matricula", uid: "matricula", sortable: true },
  { name: "Nombre(s)", uid: "nombre", sortable: true },
  { name: "Apellido Paterno", uid: "apePaterno", sortable: true },
  { name: "Apellido Materno", uid: "apeMaterno", sortable: true },
  { name: "Genero", uid: "genero", sortable: true },
  { name: "Carrera", uid: "carrera", sortable: true },
  { name: "Semestre", uid: "semestre", sortable: true },
  { name: "Creditos Totales", uid: "creditosTotales", sortable: true },
    { name: "Creditos Actuales", uid: "creditosActuales", sortable: true },
];

const statusOptions = [
  { name: "Todos", uid: "all" },
  { name: "Activos", uid: "active" },
  { name: "No acredita", uid: "negative" },
];

const initialValues = ["matricula", "nombre", "apePaterno", "apeMaterno", "carrera", "semestre", "creditosTotales", "creditosActuales"];

export { columns, statusOptions, initialValues };
