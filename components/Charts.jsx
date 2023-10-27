"use client"
import {
  Card,
  Metric,
  Text,
  CategoryBar,
  Grid,
  DonutChart,
  Title,
  BadgeDelta,
  Flex,
  Legend,
  List,
  ListItem,
} from "@tremor/react";


export const Charts = () => {

  const cards = [
    {
      title: "Total Alumnos",
      metric: "434",
      subCategoryValues: [200, 234],
      subCategroyColors: ["emerald", "yellow"],
      subCategoryTitles: ["Realizan servicio", "Posible verano"],
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

  const cities = [
    {
      name: "Arquitectura",
      sales: 120,
      deltaType: "increase",
    },
    {
      name: "Gastronomia",
      sales: 50,
      deltaType: "moderateDecrease",
    },
    {
      name: "Sistemas Computacionales",
      sales: 48,
      deltaType: "moderateIncrease",
    },
    {
      name: "Industrial",
      sales: 189,
      deltaType: "moderateDecrease",
    },
    {
      name: "Energias Renovables",
      sales: 46,
      deltaType: "moderateIncrease",
    },
    {
      name: "Mecatronica",
      sales: 89,
    },
    {
      name: "Innovacion Agricola Sustentable",
      sales: 82,
    },
  ];

  const valueFormatter = (number) => `${Intl.NumberFormat("us").format(number).toString()}`;


  return (
    <div className="flex flex-col gap-4">
      <div>
        <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
          {cards.map((item) => (
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
          ))}
        </Grid>
      </div>

      <div>
        <Card className="max-w-md mx-auto">
          <Flex className="space-x-8" justifyContent="start" alignItems="center">
            <Title>Alumnos</Title>
          </Flex>
          <Legend categories={cities.map((city) => city.name)} className="mt-6" />
          <DonutChart
            data={cities}
            category="sales"
            index="name"
            valueFormatter={valueFormatter}
            className="mt-6"
          />
        </Card>
      </div>
    </div>
  )
}
