const columns = [
  { name: "Matricula", uid: "matricula", sortable: true },
  { name: "Nombre(s)", uid: "nombre", sortable: true },
  { name: "Apellido Paterno", uid: "apePaterno", sortable: true },
  { name: "Apellido Materno", uid: "apeMaterno", sortable: true },
  { name: "Genero", uid: "genero", sortable: true },
  { name: "Carrera", uid: "carrera", sortable: true },
  { name: "Semestre", uid: "semestre", sortable: true },
  { name: "Creditos Totales", uid: "creditosTotales", sortable: true },
  { name: "Estatus", uid: "status", sortable: true },
  { name: "Creditos Actuales", uid: "creditosActuales", sortable: true },
  { name: "Clave Dependencia", uid: "dependenciaId"},
  {name: "Acciones", uid: "actions"},
];

const statusColorMap = {
  presentaServicio: "success",  // Para los que pueden hacer servicio
  noPresenta: "danger", // Para los que no pueden hacer servicio
  presentaVerano: "warning",  // Para los que deberían hacer verano
};

const statusOptions = [
  { name: "Presenta servicio", uid: "presentaServicio" },
  { name: "No presenta", uid: "noPresenta" },
  { name: "Presenta verano", uid: "presentaVerano" },
];

const initialValues = [
  "matricula",
  "nombre",
  "apePaterno",
  "apeMaterno",
  "carrera",
  "semestre",
  "status",
  "creditosTotales",
  "dependenciaId",
  "actions"
];

export { columns, statusOptions, statusColorMap, initialValues };
