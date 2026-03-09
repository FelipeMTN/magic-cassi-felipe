import { Column, Heading, LineChart, Row, Schema, RadialGauge, Text, Background, Tag, Meta, BarChart, PieChart } from "@once-ui-system/core";
import { baseURL, product } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: product.analytics.title,
    description: product.analytics.description,
    baseURL: baseURL,
    path: product.analytics.path,
    canonical: product.analytics.canonical,
    image: product.analytics.image,
    robots: product.analytics.robots,
    alternates: product.analytics.alternates,
  });
}

export default function Analytics() {
  return (
    <>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={product.analytics.title}
        description={product.analytics.description}
        path={product.analytics.path}
      />
      <Column fillWidth gap="8" paddingX="16">
        <Row vertical="center" fillWidth horizontal="between" gap="8" wrap>
          <Heading variant="display-strong-s">
            Análises Financeiras
          </Heading>
        </Row>
        <Text variant="body-default-m" onBackground="neutral-medium">
          Acompanhe a evolução do seu patrimônio e o histórico dos seus aportes.
        </Text>
      </Column>
      <Row fillWidth gap="8" m={{direction: "column-reverse"}}>
        <Row flex={3}>
          <LineChart
            style={{height: "auto"}}
            minHeight={20}
            axis="x"
            title={<Row gap="4" vertical="center">Patrimônio: <Text marginRight="8" onBackground="neutral-weak">R$ 77.200</Text><Tag variant="success" prefixIcon="trendUp">8,2%</Tag></Row>}
            date={{
              start: new Date("2024-12-31"),
              end: new Date("2025-12-31"),
              format: "MMM",
              selector: true,
              dual: true,
              presets: {
                display: true,
                granularity: "month"
              },
            }}
            grid="y"
            series={[
              { key: "Patrimônio atual", color: "success" },
              { key: "Ano anterior", color: "gray" }
            ]}
            data={[
              { date: "2025-01-01", "Patrimônio atual": 45000, "Ano anterior": 32000 },
              { date: "2025-02-01", "Patrimônio atual": 47500, "Ano anterior": 34500 },
              { date: "2025-03-01", "Patrimônio atual": 50200, "Ano anterior": 37000 },
              { date: "2025-04-01", "Patrimônio atual": 52800, "Ano anterior": 39200 },
              { date: "2025-05-01", "Patrimônio atual": 55100, "Ano anterior": 41500 },
              { date: "2025-06-01", "Patrimônio atual": 58200, "Ano anterior": 43800 },
              { date: "2025-07-01", "Patrimônio atual": 61500, "Ano anterior": 46000 },
              { date: "2025-08-01", "Patrimônio atual": 64000, "Ano anterior": 48500 },
              { date: "2025-09-01", "Patrimônio atual": 67200, "Ano anterior": 51000 },
              { date: "2025-10-01", "Patrimônio atual": 70500, "Ano anterior": 53200 },
              { date: "2025-11-01", "Patrimônio atual": 73800, "Ano anterior": 55800 },
              { date: "2025-12-01", "Patrimônio atual": 77200, "Ano anterior": 58500 }
            ]}
          />
        </Row>
        <Column flex={1} radius="xl" border="neutral-alpha-weak" overflow="hidden">
          <Background
            position="absolute"
            data-solid="color"
            top="0"
            left="0"
            gradient={{
              display: true,
              x: 50,
              y: -50,
              width: 75,
              height: 100,
              colorStart: "brand-solid-medium",
            }}
            mask={{
              x: 50,
              y: 0,
              radius: 30,
            }}
          />
          <Column fill center gap="8" padding="40">
            <Row textVariant="label-default-xs" onBackground="brand-medium" align="center" marginBottom="20">Meta Anual</Row>
            <RadialGauge
              width={280}
              height={280}
              value={64}
              hue="success"
              unit="%"
              line={{
                count: 48,
                width: 2,
                length: 24,
              }}
            />
            <Text variant="label-default-s" onBackground="neutral-weak" align="center" marginTop="24">Objetivo de Patrimônio</Text>
            <Text variant="heading-strong-l" align="center">R$ 120.000</Text>
          </Column>
        </Column>
      </Row>

      <Row fillWidth gap="8" m={{direction: "column"}}>
        <LineChart
          axis="x"
          title={<Row gap="4" vertical="center">Aportes Mensais: <Text onBackground="neutral-weak" marginRight="8">R$ 2.800</Text><Tag variant="success" prefixIcon="trendUp">12%</Tag></Row>}
          date={{
            start: new Date("2024-12-31"),
            end: new Date("2025-12-31"),
            format: "MMM",
            selector: true,
            dual: true,
            presets: {
              display: true,
              granularity: "month"
            },
          }}
          grid="y"
          series={[
            { key: "Aporte realizado", color: "success" },
            { key: "Aporte planejado", color: "gray" }
          ]}
          data={[
            { date: "2025-01-01", "Aporte realizado": 2800, "Aporte planejado": 2500 },
            { date: "2025-02-01", "Aporte realizado": 2500, "Aporte planejado": 2500 },
            { date: "2025-03-01", "Aporte realizado": 2700, "Aporte planejado": 2500 },
            { date: "2025-04-01", "Aporte realizado": 2600, "Aporte planejado": 2500 },
            { date: "2025-05-01", "Aporte realizado": 2300, "Aporte planejado": 2500 },
            { date: "2025-06-01", "Aporte realizado": 3100, "Aporte planejado": 2500 },
            { date: "2025-07-01", "Aporte realizado": 3300, "Aporte planejado": 2500 },
            { date: "2025-08-01", "Aporte realizado": 2500, "Aporte planejado": 2500 },
            { date: "2025-09-01", "Aporte realizado": 2700, "Aporte planejado": 2500 },
            { date: "2025-10-01", "Aporte realizado": 3300, "Aporte planejado": 2500 },
            { date: "2025-11-01", "Aporte realizado": 3100, "Aporte planejado": 2500 },
            { date: "2025-12-01", "Aporte realizado": 2800, "Aporte planejado": 2500 }
          ]}
        />
        <Row fillWidth>
          <BarChart
            data-viz-style="sequential"
            title="Distribuição por Categoria de Meta"
            description="2025"
            axis="none"
            date={{
              start: new Date("2024-12-31"),
              end: new Date("2025-12-31"),
              format: "MMM",
              selector: true,
              dual: true,
              presets: {
                display: true,
                granularity: "month"
              },
            }}
            legend={{
              position: "bottom-center"
            }}
            series={[
              { key: "Reserva Emergência", color: "aqua" },
              { key: "Aposentadoria", color: "pink" },
              { key: "Viagens", color: "indigo" }
            ]}
            data={[
              { label: "2025", "Reserva Emergência": 25500, "Aposentadoria": 240000, "Viagens": 15500 }
            ]}
          />
        </Row>
      </Row>
      <Row fillWidth gap="8" m={{direction: "column"}}>
        <LineChart
          axis="x"
          title={<Row gap="4" vertical="center">Rendimentos: <Text onBackground="neutral-weak" marginRight="8">R$ 8.450</Text><Tag variant="success" prefixIcon="trendUp">10,2%</Tag></Row>}
          date={{
            start: new Date("2024-12-31"),
            end: new Date("2025-12-31"),
            format: "MMM",
            selector: true,
            dual: true,
            presets: {
              display: true,
              granularity: "month"
            },
          }}
          grid="y"
          series={[
            { key: "Rendimentos 2025", color: "success" },
            { key: "Rendimentos 2024", color: "gray" }
          ]}
          data={[
            { date: "2025-01-01", "Rendimentos 2025": 380, "Rendimentos 2024": 270 },
            { date: "2025-02-01", "Rendimentos 2025": 410, "Rendimentos 2024": 295 },
            { date: "2025-03-01", "Rendimentos 2025": 450, "Rendimentos 2024": 320 },
            { date: "2025-04-01", "Rendimentos 2025": 480, "Rendimentos 2024": 340 },
            { date: "2025-05-01", "Rendimentos 2025": 520, "Rendimentos 2024": 365 },
            { date: "2025-06-01", "Rendimentos 2025": 560, "Rendimentos 2024": 390 },
            { date: "2025-07-01", "Rendimentos 2025": 610, "Rendimentos 2024": 420 },
            { date: "2025-08-01", "Rendimentos 2025": 650, "Rendimentos 2024": 450 },
            { date: "2025-09-01", "Rendimentos 2025": 700, "Rendimentos 2024": 475 },
            { date: "2025-10-01", "Rendimentos 2025": 750, "Rendimentos 2024": 510 },
            { date: "2025-11-01", "Rendimentos 2025": 810, "Rendimentos 2024": 545 },
            { date: "2025-12-01", "Rendimentos 2025": 880, "Rendimentos 2024": 580 }
          ]}
        />
        <PieChart
          data-viz-style="sequential"
          title="Alocação de Investimentos"
          date={{
            start: new Date("2024-12-31"),
            end: new Date("2025-12-31"),
            format: "MMM",
            selector: true,
            dual: true,
            presets: {
              display: true,
              granularity: "month"
            },
          }}
          legend={{
            display: true,
            position: "bottom-center",
          }}
          ring={{ inner: 50, outer: 70 }}
          series={{
            key: "value",
          }}
          data={[
            { name: "Renda Fixa", value: 45 },
            { name: "Ações", value: 25 },
            { name: "Fundos Imobiliários", value: 18 },
            { name: "Internacional", value: 12 }
          ]}
        />
      </Row>
    </>
  );
}
