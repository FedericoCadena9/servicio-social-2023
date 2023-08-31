'use client'
import { Button } from "@nextui-org/react";

export default function SignOutButton() {
    return (
        <>
            <form action="/auth/signout" method="post">
                <Button color="primary" variant="shadow" type='submit'>
                    Cerrar Sesión
                </Button>
            </form>
        </>
    )
}
