const columns = [
  { name: "Nombre del Programa", uid: "nombrePrograma", sortable: true },
  { name: "Clave del Programa", uid: "clavePrograma", sortable: true },
  { name: "Objetivo", uid: "objetivo", sortable: true },
  { name: "Actividades a realizar", uid: "actividades", sortable: true },
  { name: "Perfil Profesional", uid: "perfil", sortable: true },
  { name: "Director General", uid: "directorGeneral", sortable: true },
  { name: "Responsable del Área", uid: "responsableArea", sortable: true },
  { name: "Teléfono", uid: "telefono", sortable: true },
  { name: "Correo Electrónico", uid: "correo", sortable: true },
  { name: "Domicilio", uid: "domicilio", sortable: true },
  {name: "Acciones", uid: "actions"},

];

const statusOptions = [
  { name: "Todos", uid: "all" },
  { name: "Vigentes", uid: "vigent" },
  { name: "No Vigentes", uid: "expired" },
];

const initialValues = [
    "clavePrograma",
    "nombrePrograma",
    "perfil",
    "correo",
    "domicilio",
    "actions"
];

export { columns, statusOptions, initialValues };
