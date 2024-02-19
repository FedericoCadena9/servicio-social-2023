import { Auth } from '@supabase/auth-ui-react'
import { useState, useEffect } from 'react';
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Divider, Skeleton } from "@nextui-org/react";
import { clientSupabase as supabase } from '../utils/supabase';


export default function AuthForm({ view }) {
    const translateVariables = {
        "sign_up": {
            "email_label": "Correo Electrónico",
            "password_label": "Crear contraseña",
            "email_input_placeholder": "Ingresa tu correo electrónico",
            "password_input_placeholder": "Ingresa una contraseña",
            "button_label": "Registrarse",
            "loading_button_label": "Registrando ...",
            "social_provider_text": "Regístrate con {{provider}}",
            "link_text": "¿No tienes una cuenta? Regístrate",
            "confirmation_text": "Revisa tu correo electrónico para confirmar tu cuenta"
        },
        "sign_in": {
            "email_label": "Correo Electrónico",
            "password_label": "Contraseña",
            "email_input_placeholder": "Ingresa tu correo electrónico",
            "password_input_placeholder": "Ingresa tu contraseña",
            "button_label": "Iniciar Sesión",
            "loading_button_label": "Iniciando Sesión ...",
            "social_provider_text": "Inicia sesión con {{provider}}",
            "link_text": "¿Ya tienes una cuenta? Inicia Sesión",
        },
        "magic_link": {
            "email_input_label": "Correo Electrónico",
            "email_input_placeholder": "Ingresa tu correo electrónico",
            "button_label": "Enviar Magic Link",
            "loading_button_label": "Enviando Magic Link ...",
            "link_text": "Enviar correo con Magic Link",
            "confirmation_text": "Revisa tu correo electrónico para iniciar sesión"
        },
        "forgotten_password": {
            "email_label": "Correo Electrónico",
            "password_label": "Contraseña",
            "email_input_placeholder": "Ingresa tu correo electrónico",
            "button_label": "Enviar instrucciones",
            "loading_button_label": "Enviando instrucciones ...",
            "link_text": "¿Olvidaste tu contraseña?",
            "confirmation_text": "Revisa tu correo electrónico para cambiar tu contraseña"
        },
        "update_password": {
            "password_label": "Nueva contraseña",
            "password_input_placeholder": "Ingresa tu nueva contraseña",
            "button_label": "Actualizar contraseña",
            "loading_button_label": "Actualizando contraseña ...",
            "confirmation_text": "Tu contraseña ha sido actualizada"
        },
    }

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <>
                <Skeleton className="rounded-lg">
                    <div className="h-12 rounded-lg bg-default-300"></div>
                </Skeleton>

                <Divider className="my-6" />

                <div className="space-y-3">
                    <Skeleton className="w-2/5 rounded-lg">
                        <div className="h-3 w-2/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="rounded-lg">
                        <div className="h-10 rounded-lg bg-default-300"></div>
                    </Skeleton>
                    <Skeleton className="rounded-lg">
                        <div className="h-10 rounded-lg bg-default-300"></div>
                    </Skeleton>
                </div>
            </>
        );
    }

    return (

        <Auth
            supabaseClient={supabase}
            view={view}
            appearance={{ theme: ThemeSupa }}
            theme="light"
            providers={['google']}
            showLinks={false}
            redirectTo={`${location.origin}/auth/callback`}
            localization={{
                variables: translateVariables
            }}
        />

    )
}