"use client"
import { useEffect, useState } from "react";
import {
  Card,
  Metric,
  Text,
  CategoryBar,
  Grid,
  BarList,
  DonutChart,
  Title,
  BadgeDelta,
  Flex,
  Legend,
  List,
  ListItem,
  ProgressCircle,
} from "@tremor/react";
import { Skeleton } from "@nextui-org/react";
import clsx from 'clsx'
import { supabase } from '../utils/supabase';


export const Charts = () => {

  const [alumnosLoaded, setAlumnosLoaded] = useState(false);
  const [alumnos, setAlumnos] = useState({
    alumnosTotales: 0,
    presentaServicio: 0,
    presentaVerano: 0,
    noPresenta: 0,
    totalAdministracion: 0,
    totalGestionEmpresarial: 0,
    totalSistemasComputacionales: 0,
    totalIndustrial: 0,
    totalMecatronica: 0,
    totalArquitectura: 0,
    totalEnergiasRenovables: 0,
    totalGastronomia: 0,
    totalInnovacionAgricolaSustentable: 0,
    totalMujeres: 0,
    totalHombres: 0,
    totalSeptimo: 0,
    totalOctavo: 0,
    totalNoveno: 0,
    totalDecimo: 0,
    totalOnceavo: 0,
  });

  const metrics = [
    {
      title: "Total Alumnos",
      metric: alumnos.alumnosTotales,
      subCategoryValues: [alumnos.presentaServicio, alumnos.presentaVerano, alumnos.noPresenta],
      subCategroyColors: ["emerald", "yellow", "red"],
      subCategoryTitles: ["Realizan servicio", "Posible verano", "No presentan"],
    },
    {
      title: "Total Dependencias",
      metric: "182",
      subCategoryValues: [56, 126],
      subCategroyColors: ["indigo", "red"],
      subCategoryTitles: ["Vigentes", "Sin vigencia",],
    },
    {
      title: "Total Usuarios",
      metric: "4",
      subCategoryValues: [50, 50],
      subCategroyColors: ["blue", "rose"],
      subCategoryTitles: ["Administradores", "Prestadores"],
    },
  ];

  const alumnosCarreras = [
    { name: "Administracion", value: alumnos.totalAdministracion },
    { name: "Gestion Empresarial", value: alumnos.totalGestionEmpresarial },
    { name: "Sistemas Computacionales", value: alumnos.totalSistemasComputacionales },
    { name: "Industrial", value: alumnos.totalIndustrial },
    { name: "Mecatronica", value: alumnos.totalMecatronica },
    { name: "Arquitectura", value: alumnos.totalArquitectura },
    { name: "Energias Renovables", value: alumnos.totalEnergiasRenovables },
    { name: "Gastronomia", value: alumnos.totalGastronomia },
    { name: "Innovacion Agricola Sustentable", value: alumnos.totalInnovacionAgricolaSustentable },
  ];

  const alumnosSemestres = [
    { name: "Septimo", value: alumnos.totalSeptimo },
    { name: "Octavo", value: alumnos.totalOctavo },
    { name: "Noveno", value: alumnos.totalNoveno },
    { name: "Decimo", value: alumnos.totalDecimo },
    { name: "Onceavo", value: alumnos.totalOnceavo },
  ];

  const valueFormatter = (number) => `${Intl.NumberFormat("us").format(number).toString()}`;

  useEffect(() => {
    // Alumnos
    const getAlumnos = async () => {
      const { count: alumnosTotales } = await supabase
        .from('alumnos')
        .select('*', { count: 'exact' })
        .neq('creditosTotales', 250);

      const { count: presentaServicio } = await supabase
        .from('alumnos')
        .select('*', { count: 'exact' })
        .neq('creditosTotales', 250)
        .gte('creditosTotales', 182);

      const { count: presentaVerano } = await supabase
        .from('alumnos')
        .select('*', { count: 'exact' })
        .lt('creditosTotales', 176);

      const { count: noPresenta } = await supabase
        .from('alumnos')
        .select('*', { count: 'exact' })
        .neq('creditosTotales', 250)
        .gte('creditosTotales', 176)
        .lt('creditosTotales', 182);

      const { count: totalAdministracion } = await supabase
        .from('alumnos')
        .select('*', { count: 'exact' })
        .eq('carrera', 'INGENIERÍA EN ADMINISTRACIÓN')
        .neq('creditosTotales', 250);

      const { count: totalGestionEmpresarial } = await supabase
        .from('alumnos')
        .select('*', { count: 'exact' })
        .eq('carrera', 'INGENIERÍA EN GESTIÓN EMPRESARIAL')
        .neq('creditosTotales', 250);

      const { count: totalSistemasComputacionales } = await supabase
        .from('alumnos')
        .select('*', { count: 'exact' })
        .eq('carrera', 'INGENIERÍA EN SISTEMAS COMPUTACIONALES')
        .neq('creditosTotales', 250);

      const { count: totalIndustrial } = await supabase
        .from('alumnos')
        .select('*', { count: 'exact' })
        .eq('carrera', 'INGENIERÍA INDUSTRIAL')
        .neq('creditosTotales', 250);

      const { count: totalMecatronica } = await supabase
        .from('alumnos')
        .select('*', { count: 'exact' })
        .eq('carrera', 'INGENIERÍA MECATRÓNICA')
        .neq('creditosTotales', 250);

      const { count: totalArquitectura } = await supabase
        .from('alumnos')
        .select('*', { count: 'exact' })
        .eq('carrera', 'ARQUITECTURA')
        .neq('creditosTotales', 250);

      const { count: totalEnergiasRenovables } = await supabase
        .from('alumnos')
        .select('*', { count: 'exact' })
        .eq('carrera', 'INGENIERÍA EN ENERGÍAS RENOVABLES')
        .neq('creditosTotales', 250);

      const { count: totalGastronomia } = await supabase
        .from('alumnos')
        .select('*', { count: 'exact' })
        .eq('carrera', 'GASTRONOMÍA')
        .neq('creditosTotales', 250);

      const { count: totalInnovacionAgricolaSustentable } = await supabase
        .from('alumnos')
        .select('*', { count: 'exact' })
        .eq('carrera', 'INGENIERÍA EN INNOVACIÓN AGRÍCOLA SUSTENTABLE')
        .neq('creditosTotales', 250);

      const { count: totalMujeres } = await supabase
        .from('alumnos')
        .select('*', { count: 'exact' })
        .eq('genero', 'F')
        .neq('creditosTotales', 250);

      const { count: totalHombres } = await supabase
        .from('alumnos')
        .select('*', { count: 'exact' })
        .eq('genero', 'M')
        .neq('creditosTotales', 250);

      const { count: totalSeptimo } = await supabase
        .from('alumnos')
        .select('*', { count: 'exact' })
        .eq('semestre', 7)
        .neq('creditosTotales', 250);

      const { count: totalOctavo } = await supabase
        .from('alumnos')
        .select('*', { count: 'exact' })
        .eq('semestre', 8)
        .neq('creditosTotales', 250);

      const { count: totalNoveno } = await supabase
        .from('alumnos')
        .select('*', { count: 'exact' })
        .eq('semestre', 9)
        .neq('creditosTotales', 250);

      const { count: totalDecimo } = await supabase
        .from('alumnos')
        .select('*', { count: 'exact' })
        .eq('semestre', 10)
        .neq('creditosTotales', 250);

      const { count: totalOnceavo } = await supabase
        .from('alumnos')
        .select('*', { count: 'exact' })
        .eq('semestre', 11)
        .neq('creditosTotales', 250);

      setAlumnos({
        alumnosTotales,
        presentaServicio,
        presentaVerano,
        noPresenta,
        totalAdministracion,
        totalGestionEmpresarial,
        totalSistemasComputacionales,
        totalIndustrial,
        totalMecatronica,
        totalArquitectura,
        totalEnergiasRenovables,
        totalGastronomia,
        totalInnovacionAgricolaSustentable,
        totalMujeres,
        totalHombres,
        totalSeptimo,
        totalOctavo,
        totalNoveno,
        totalDecimo,
        totalOnceavo,
      });

      setAlumnosLoaded(true);
    };


    getAlumnos();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
        {!alumnosLoaded ? (
          metrics.map((item, index) => (
            <Card key={index} className="space-y-5 p-4" radius="lg">
              <Skeleton className="w-32 rounded-lg">
                <div className="h-3 rounded-lg bg-default-300"></div>
              </Skeleton>
              <Skeleton className="w-20 rounded-lg">
                <div className="h-8 rounded-lg bg-default-300"></div>
              </Skeleton>
              <div className="space-y-3">
                <Skeleton className="w-full rounded-lg">
                  <div className="h-3 rounded-lg bg-default-200"></div>
                </Skeleton>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                  </Skeleton>
                  <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                  </Skeleton>
                  <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                  </Skeleton>
                </div>
              </div>
            </Card>
          ))
        ) : (
          metrics.map((item) => (
            <Card key={item.title}>
              <Text>{item.title}</Text>
              <Metric>{item.metric}</Metric>
              <CategoryBar
                values={item.subCategoryValues}
                colors={item.subCategroyColors}
                className="mt-4"
              />
              <Legend
                categories={item.subCategoryTitles}
                colors={item.subCategroyColors}
                className="mt-3"
              />
            </Card>
          ))
        )}
      </Grid>

      <Grid numItemsMd={2} className="mt-6 gap-6">
        <Card>
          <Title>Alumnos por género</Title>
          <div className="flex flex-col items-center justify-center mt-12">
            <ProgressCircle value={Math.round((alumnos.totalMujeres / alumnos.alumnosTotales) * 100)} radius={120} color="fuchsia">
              <ProgressCircle value={Math.round((alumnos.totalMujeres / alumnos.alumnosTotales) * 100)} radius={104} color="blue" />
            </ProgressCircle>
            <div className="mt-8 flex items-center justify-between w-full">
              <div>
                <h4 className="text-sm text-gray-500">Mujeres</h4>
                <p className="font-medium text-fuchsia-600 text-3xl">{alumnos.totalMujeres}</p>
                <p className="text-gray-400">
                  {alumnos.alumnosTotales > 0 ? ((alumnos.totalMujeres / alumnos.alumnosTotales) * 100).toFixed(2) : 0}%
                </p>
              </div>
              <div>
                <h4 className="text-sm text-gray-500">Hombres</h4>
                <p className="font-medium text-blue-600 text-3xl">{alumnos.totalHombres}</p>
                <p className="text-gray-400">
                  {alumnos.alumnosTotales > 0 ? ((alumnos.totalHombres / alumnos.alumnosTotales) * 100).toFixed(2) : 0}%
                </p>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <Title>Alumnos por carrera</Title>
          <Flex className="mt-6">
            <Text>Carreras</Text>
            <Text className="text-right">Alumnos</Text>
          </Flex>
          <BarList
            data={alumnosCarreras}
            valueFormatter={valueFormatter}
            className="mt-2"
          />
        </Card>
        <Card>
        <Title>Alumnos por Semestre</Title>
          <div className="p-4 flex items-center space-x-6">
            <DonutChart
              data={alumnosSemestres}
              index="name"
              category="value"
              variant="pie"
              colors={["indigo", "violet", "fuchsia", "green", "yellow"]}
              className="h-60 w-full"
            />
            <List className="w-2/3">
              {alumnosSemestres.map((alumno) => (
                <ListItem key={alumno.name} className="space-x-2">
                  <div className="flex items-center space-x-2 truncate">
                    <span
                      className={clsx(
                        alumno.name === "Septimo" ? "bg-indigo-500" :
                          alumno.name === "Octavo" ? "bg-violet-500" :
                            alumno.name === "Noveno" ? "bg-fuchsia-500" :
                              alumno.name === "Decimo" ? "bg-green-500" :
                                alumno.name === "Onceavo" ? "bg-yellow-500" :
                                    "",
                        "h-2.5 w-2.5 rounded-sm flex-shrink-0"
                      )}
                    />

                    <span className="truncate">{alumno.name}</span>
                  </div>
                  <span>{alumno.value}</span>
                </ListItem>
              ))}
            </List>
          </div>
        </Card>
      </Grid>
    </div>
  )
}
