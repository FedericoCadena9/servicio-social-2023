import UsersTable from '../../components/usuarios/Table';
import { supabase } from '../../utils/supabase';


import { DashboardLayout } from '../../components/DashboardLayout'
import { TextBlock } from "../../components/TextBlock";
import { InviteUserModal } from "../../components/usuarios/InviteUserModal";

export const revalidate = 0;

export default async function UsuariosPage() {

    const { data, error } = await supabase.auth.admin.listUsers()

    return (
        <DashboardLayout>
            <TextBlock type={'Usuarios'} text={'Agrega o elimina usuarios para ingreso a la plataforma.'} />
            <div className="flex sm:justify-end w-full">
                <InviteUserModal />
            </div>

            <UsersTable serverUsers={data ?? []} />
        </DashboardLayout>
    )
}
