"use client"
import { Card, CardBody, Spinner } from "@nextui-org/react";


export const SpinnerLoader = () => {
    return (
        <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 w-96"
            shadow="sm">
            <CardBody>
                <Spinner label="Cargando datos..." size="lg" classNames={{
                    label: 'text-red-500'
                }} />
            </CardBody>
        </Card>
    )
}
