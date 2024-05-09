"use client"
import { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea, CheckboxGroup, useCheckbox, Chip, VisuallyHidden, tv } from "@nextui-org/react";
import { CustomCheckbox } from "./CustomCheckbox";
import { EnvelopeIcon, PhoneIcon, BuildingOfficeIcon, CheckIcon } from "@heroicons/react/20/solid";
import { supabase } from "../../utils/supabase";


const checkbox = tv({
    slots: {
        base: "border-default hover:bg-default-200",
        content: "text-default-500"
    },
    variants: {
        isSelected: {
            true: {
                base: "border-green-500 bg-green-500 hover:bg-green-500 hover:border-green-500",
                content: "text-primary-foreground pl-1"
            }
        },
        isFocusVisible: {
            true: {
                base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
            }
        }
    }
})
export default function NewDependencyModal({ isOpen, onOpenChange, editData }) {

    const {
        children,
        isSelected,
        isFocusVisible,
        getBaseProps,
        getLabelProps,
        getInputProps,
    } = useCheckbox({
        defaultSelected: true,
    })

    const styles = checkbox({ isSelected, isFocusVisible })

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        nombrePrograma: '',
        clavePrograma: '',
        institucion: '',
        objetivo: '',
        actividades: '',
        perfil: [],
        directorGeneral: '',
        responsableArea: '',
        telefono: '',
        correo: '',
        domicilio: '',
    });

    // Determina si el modal está en modo de edición basado en si editData tiene contenido
    const isEditMode = editData !== null;

    // Carga los datos para editar cuando el modal se abre en modo de edición
    useEffect(() => {
        if (isEditMode && editData) {
            setFormData(editData);
        } else {
            // Restablece el formulario si se está creando una nueva dependencia
            setFormData({
                nombrePrograma: '',
                clavePrograma: '',
                institucion: '',
                objetivo: '',
                actividades: '',
                perfil: [],
                directorGeneral: '',
                responsableArea: '',
                telefono: '',
                correo: '',
                domicilio: '',
            });
        }
    }, [editData, isEditMode]);

    // Función para manejar los cambios en los inputs y textareas
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    // Función para manejar los cambios en el CheckboxGroup
    const handleCheckboxChange = (value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            perfil: value,
        }));
    };


    // Función para manejar el cambio en el checkbox individual 'Dependencia vigente'
    const handleActiveChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            isActive: e.target.checked,
        }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            let result; // Esta variable almacenará la respuesta de Supabase.

            console.log('Enviando datos: ', isEditMode);
            if (isEditMode) {
                // Estás en modo de edición, actualiza la dependencia existente.
                result = await supabase
                    .from('dependencias')
                    .update({ ...formData })
                    .match({ id: editData.id });
            } else {
                // Estás en modo de creación, inserta una nueva dependencia.
                result = await supabase
                    .from('dependencias')
                    .insert([formData]);
            }

            // Desestructura data y error de la respuesta de Supabase.
            const { data, error } = result;

            if (error) throw error;
            console.log('Datos enviados con éxito: ', data);
            onOpenChange(false); // Cierra el modal después de la operación exitosa.
        } catch (error) {
            console.error('Error al enviar los datos: ', error);
        } finally {
            setIsSubmitting(false); // Restablece el estado de envío independientemente del resultado.
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Agregar Nueva Dependencia</ModalHeader>
                        <ModalBody>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <h2 className="text-xl text-slate-600 font-semibold">Datos del Programa</h2>
                                    <Input
                                        name="nombrePrograma"
                                        isRequired
                                        type="text"
                                        variant="bordered"
                                        label="Nombre del Programa"
                                        value={formData.nombrePrograma}
                                        onChange={handleInputChange}
                                    />
                                    <div className="flex gap-4">
                                        <Input
                                            name="clavePrograma"
                                            type="text"
                                            variant="bordered"
                                            label="Clave del Programa"
                                            value={formData.clavePrograma}
                                            onChange={handleInputChange}
                                        />
                                        <Input
                                            name="institucion"
                                            isRequired
                                            type="text"
                                            variant="bordered"
                                            label="Institución"
                                            value={formData.institucion}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <Textarea
                                        name="objetivo"
                                        variant="bordered"
                                        label="Objetivo"
                                        minRows={2}
                                        placeholder="Objetivo del Programa"
                                        value={formData.objetivo}
                                        onChange={handleInputChange}
                                    />
                                    <Textarea
                                        name="actividades"
                                        variant="bordered"
                                        label="Actividades"
                                        minRows={10}
                                        placeholder="Actividades a realizar"
                                        value={formData.actividades}
                                        onChange={handleInputChange}
                                    />
                                    <div className="flex flex-col gap-1 w-full">
                                        <CheckboxGroup
                                            isRequired
                                            className="gap-1"
                                            label="Seleccionar perfiles"
                                            orientation="horizontal"
                                            value={formData.perfil}
                                            onChange={handleCheckboxChange}
                                        >
                                            <CustomCheckbox name="perfil" value="administracion">Administración</CustomCheckbox>
                                            <CustomCheckbox name="perfil" value="gestionEmpresarial">Gestión Empresarial</CustomCheckbox>
                                            <CustomCheckbox name="perfil" value="sistemasComputacionales">Sistemas Computacionales</CustomCheckbox>
                                            <CustomCheckbox name="perfil" value="industrial">Industrial</CustomCheckbox>
                                            <CustomCheckbox name="perfil" value="mecatronica">Mecatrónica</CustomCheckbox>
                                            <CustomCheckbox name="perfil" value="arquitectura">Arquitectura</CustomCheckbox>
                                            <CustomCheckbox name="perfil" value="energiasRenovables">Energías Renovables</CustomCheckbox>
                                            <CustomCheckbox name="perfil" value="gastronomia">Gastronomía</CustomCheckbox>
                                            <CustomCheckbox name="perfil" value="innovacionAgricolaSustentable">Innovación Agrícola Sustentable</CustomCheckbox>
                                        </CheckboxGroup>

                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h2 className="text-xl text-slate-600 font-semibold">Datos de la empresa</h2>
                                    <Input
                                        name="directorGeneral"
                                        isRequired
                                        type="text"
                                        variant="bordered"
                                        label="Director General"
                                        value={formData.directorGeneral}
                                        onChange={handleInputChange}
                                    />
                                    <Input
                                        name="responsableArea"
                                        isRequired
                                        type="text"
                                        variant="bordered"
                                        label="Responsable de Área"
                                        value={formData.responsableArea}
                                        onChange={handleInputChange}
                                    />
                                    <Input
                                        name="correo"
                                        type="email"
                                        variant="bordered"
                                        label="Correo Electrónico"
                                        placeholder="correo@ejemplo.com"
                                        endContent={
                                            <EnvelopeIcon className="w-5 h-5 text-default-400 pointer-events-none flex-shrink-0" />
                                        }
                                        value={formData.correo}
                                        onChange={handleInputChange}
                                    />
                                    <Input
                                        name="telefono"
                                        type="tel"
                                        variant="bordered"
                                        label="Teléfono"
                                        placeholder="123 456 7890"
                                        endContent={
                                            <PhoneIcon className="w-5 h-5 text-default-400 pointer-events-none flex-shrink-0" />
                                        }
                                        value={formData.telefono}
                                        onChange={handleInputChange}
                                    />
                                    <Input
                                        name="domicilio"
                                        type="text"
                                        variant="bordered"
                                        label="Domicilio"
                                        placeholder="Calle, Colonia, Ciudad, Estado"
                                        endContent={
                                            <BuildingOfficeIcon className="w-5 h-5 text-default-400 pointer-events-none flex-shrink-0" />
                                        }
                                        value={formData.domicilio}
                                        onChange={handleInputChange}
                                    />
                                    {/* <div className="text-gray-500 flex flex-col gap-2">
                                        <span>Dependencia vigente</span>
                                        <label {...getBaseProps()}>
                                            <VisuallyHidden>
                                                <input {...getInputProps()} />
                                            </VisuallyHidden>
                                            <Chip
                                                checked={formData.isActive}
                                                onChange={handleActiveChange}
                                                classNames={{
                                                    base: styles.base(),
                                                    content: styles.content(),
                                                }}
                                                color="green"
                                                startContent={isSelected ? <CheckIcon className="ml-1 w-4 h-4 text-white" /> : null}
                                                variant="faded"
                                                {...getLabelProps()}
                                            >
                                                {children ? children : isSelected ? "Vigente" : "No vigente"}
                                            </Chip>
                                        </label>
                                    </div> */}
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Cancelar
                            </Button>
                            <Button color="primary" isLoading={isSubmitting} onPress={handleSubmit}>
                                {isSubmitting ? 'Guardando...' : 'Guardar'}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
