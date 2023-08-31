'use client'
import { HeroPattern } from '@/components/HeroPattern'
import Head from 'next/head';
import AuthForm from '@/components/AuthForm'
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { motion } from "framer-motion"


export default function Login() {
    return (
        <>
            <div className='grid grid-cols-12 w-full min-h-screen'>
                <HeroPattern />
                <div className="col-span-12 lg:col-span-6 lg:mx-20 mx-4 flex items-center justify-center">
                    <Card className="pt-4 md:px-6 z-10">
                        <CardHeader className="flex flex-col items-center text-center">
                            <div>
                                <p className="text-emerald-600 dark:text-emerald-600 lg:text-xl font-medium xl:w-96">Departamento de Convenios y Gestión de Proyectos
                                </p>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <AuthForm view={'magic_link'} />
                        </CardBody>
                    </Card>
                </div>
                <div className="col-span-12 lg:col-span-6 hidden lg:inline-block">
                    <div className='w-full h-full flex items-center justify-center'>
                        <motion.div animate={{ y: [-16, 0, -16] }} transition={{ duration: 3.6, repeat: Infinity, repeatType: "loop", }} className='lg:w-80 lg:h-80 md:w-56 md:h-56 bg-emerald-500 dark:bg-emerald-600 rounded-full col-span-6'></motion.div>
                        <div className='w-96 max-h-full md:h-40 lg:h-56 backdrop-blur-lg rounded md:bg-transparent lg:bg-slate-50/0 top-1/2 col-span-6 absolute'></div>
                    </div>
                </div>
            </div>
        </>
    )
}