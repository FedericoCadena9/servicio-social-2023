"use client"
import { useEffect, useState } from 'react'
import supabase from '@/utils/supabase';
import { Bar } from 'react-chartjs-2'
import { Card, CardHeader, Avatar, CardBody, CardFooter, Divider } from "@nextui-org/react";
import { UserGroupIcon } from '@heroicons/react/20/solid';

export const Charts = () => {

  const [alumnosTotal, setAlumnosTotal] = useState(0);
  const [alumnosInfo, setAlumnosInfo] = useState([]);
  const [dependencias, setDependencias] = useState([]);

  useEffect(() => {
    const getChartInfo = async () => {
      const { count: total, error: totalError } = await supabase.from('alumnos').select('*', { count: 'exact' })
      const { data: alumnos, error: alumnosError } = await supabase.from('alumnos').select('genero, carrera', { count: 'exact' }).neq('creditosTotales', 250);
      const { count: dependencias, error: dependenciasError } = await supabase.from('dependencias').select('*', { count: 'exact' });

      if (!totalError && total) {
        setAlumnosTotal(total);
      }

      if (!alumnosError && alumnos) {
        setAlumnosInfo(alumnos);
      }

      if (!dependenciasError && dependencias) {
        setDependencias(dependencias);
      }

    };
    getChartInfo();
  }, []);


  return (
    <div>
      <div className="flex gap-4">
        <Card className="w-full">
          <CardHeader className="flex gap-3">
            <Avatar classNames={
              {
                base: "bg-black",
              }
            } radius="sm" fallback={
              <UserGroupIcon className="w-6 h-6 text-slate-100" />
            } />
            <div className="flex flex-col">
              <p className="text-md font-semibold text-slate-800">Estudiantes Activos</p>
              <p className="text-small text-default-500">{alumnosInfo.length}</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className='text-default-500 text-sm'>Estudiantes Totales en el ciclo: {alumnosTotal}</p>
          </CardBody>
        </Card>

        <Card className="w-full">
          <CardHeader className="flex gap-3">
            <Avatar classNames={
              {
                base: "bg-black",
              }
            } radius="sm" fallback={
              <UserGroupIcon className="w-6 h-6 text-slate-100" />
            } />
            <div className="flex flex-col">
              <p className="text-md font-semibold text-slate-800">Dependencias Vigentes</p>
              <p className="text-small text-default-500">{dependencias}</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className='text-default-500 text-sm'>Dependencias Totales en profesiones: {dependencias}</p>
          </CardBody>
        </Card>

        <Card className="w-full">
          <CardHeader className="flex gap-3">
            <Avatar classNames={
              {
                base: "bg-black",
              }
            } radius="sm" fallback={
              <UserGroupIcon className="w-6 h-6 text-slate-100" />
            } />
            <div className="flex flex-col">
              <p className="text-md font-semibold text-slate-800">Dependencias Vigentes</p>
              <p className="text-small text-default-500">{dependencias}</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className='text-default-500 text-sm'>Dependencias Totales en profesiones: {dependencias}</p>
          </CardBody>
        </Card>

        <Card className="w-full">
          <CardHeader className="flex gap-3">
            <Avatar classNames={
              {
                base: "bg-black",
              }
            } radius="sm" fallback={
              <UserGroupIcon className="w-6 h-6 text-slate-100" />
            } />
            <div className="flex flex-col">
              <p className="text-md font-semibold text-slate-800">Dependencias Vigentes</p>
              <p className="text-small text-default-500">{dependencias}</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className='text-default-500 text-sm'>Dependencias Totales en profesiones: {dependencias}</p>
          </CardBody>
        </Card>
      </div>

      {/* <Bar  /> */}
    </div>
  )
}
