import {
  Column,
  Row,
  Card,
  Heading,
  Text,
  Grid,
  Line,
  Button,
  Scroller,
  StatusIndicator,
  Icon,
  LineChart,
  Schema,
  Meta,
  Background,
  RadialGauge
} from "@once-ui-system/core";
import { baseURL, product } from "@/resources";
import GoalsTableClient from "./components/GoalsTableClient";

export async function generateMetadata() {
  return Meta.generate({
    title: product.dashboard.title,
    description: product.dashboard.description,
    baseURL: baseURL,
    path: product.dashboard.path,
    canonical: product.dashboard.canonical,
    image: product.dashboard.image,
    robots: product.dashboard.robots,
    alternates: product.dashboard.alternates,
  });
}

interface StatCardProps extends React.ComponentProps<typeof Card> {
  title: string;
  value: string;
  change: string;
  positive?: boolean;
  href?: string;
  subtitle?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, positive = true, href, subtitle, ...flex }) => (
  <Card minWidth={12} href={href} padding="20" gap="12" radius="l" overflow="hidden" fillWidth direction="column" {...flex}>
    <Background
      position="absolute"
      top="0"
      left="0"
      gradient={{
        display: true,
        x: 100,
        y: 0,
        width: 50,
        height: 75,
        colorStart: positive ? "success-background-strong" : "danger-background-strong",
      }}
    />
    <Row vertical="center" gap="12">
      <Row fillWidth textVariant="label-default-s" onBackground="neutral-medium">
        {title}
      </Row>
      <Row gap="8" vertical="center" onBackground={positive ? "success-weak" : "danger-weak"}>
        <Icon size="xs" name={positive ? "trendUp" : "trendDown"}/>
        <Text variant="body-default-xs">{change}</Text>
      </Row>
    </Row>
    <Heading variant="display-strong-xs">
      {value}
    </Heading>
    {subtitle && (
      <Text variant="body-default-xs" onBackground="neutral-weak">
        {subtitle}
      </Text>
    )}
  </Card>
);

interface GoalItemProps {
  name: string;
  status: 'ahead' | 'on-track' | 'behind' | 'critical';
  progress: number;
  href?: string;
  icon: string;
  targetDate: string;
}

const GoalItem: React.FC<GoalItemProps> = ({ name, status, progress, icon, targetDate, href = "#" }) => {
  const getStatusLabel = (s: string) => {
    switch (s) {
      case 'ahead': return 'Adiantado';
      case 'on-track': return 'No caminho';
      case 'behind': return 'Atrasado';
      case 'critical': return 'Crítico';
      default: return s;
    }
  };

  const getStatusColor = (s: string): "green" | "yellow" | "red" | "gray" => {
    switch (s) {
      case 'ahead': return "green";
      case 'on-track': return "green";
      case 'behind': return "yellow";
      case 'critical': return "red";
      default: return "gray";
    }
  };

  return (
    <Card direction="column" background="transparent" href={href} border="transparent" fillWidth>
      <Row fillWidth horizontal="between" height="64" vertical="center" paddingX="24">
        <Row vertical="center" gap="12">
          <Icon name={icon} size="xs" onBackground="neutral-weak"/>
          <Column gap="2">
            <Text variant="body-default-s">{name}</Text>
            <Text variant="body-default-xs" onBackground="neutral-weak">{targetDate}</Text>
          </Column>
        </Row>
        <Row vertical="center" gap="12">
          <Text variant="body-default-xs" onBackground="neutral-weak">{progress}%</Text>
          <Text variant="body-default-xs" onBackground="neutral-weak">{getStatusLabel(status)}</Text>
          <StatusIndicator color={getStatusColor(status)}/>
        </Row>
      </Row>
      <Line />
    </Card>
  );
};

interface ContributionItemProps {
  month: string;
  planned: string;
  actual: string;
  difference: number;
  icon: string;
}

const ContributionItem: React.FC<ContributionItemProps> = ({ month, planned, actual, difference, icon }) => (
  <Card direction="column" background="transparent" border="transparent" fillWidth>
    <Row fillWidth horizontal="between" paddingX="24" height="64" vertical="center">
      <Column fillWidth gap="8">
        <Text variant="body-default-s">{month}</Text>
        <Row vertical="center" gap="12" data-scaling="90">
          <Text variant="label-default-s" onBackground="neutral-weak">
            Planejado: {planned}
          </Text>
        </Row>
      </Column>
      <Row vertical="center" gap="12">
        <Column gap="2" horizontal="end">
          <Text variant="label-default-s">{actual}</Text>
          <Text 
            variant="body-default-xs" 
            onBackground={difference >= 0 ? "success-weak" : "danger-weak"}
          >
            {difference >= 0 ? '+' : ''}{difference}%
          </Text>
        </Column>
        <Icon name={icon} size="xs" onBackground={difference >= 0 ? "success-weak" : "danger-weak"}/>
      </Row>
    </Row>
    <Line />
  </Card>
);

export default function Dashboard() {
  // Dados de demonstração - em produção viriam do banco
  const patrimonyData = [
    { date: "2025-01-01", "Patrimônio atual": 45000, "Projeção conservadora": 45000 },
    { date: "2025-02-01", "Patrimônio atual": 47500, "Projeção conservadora": 46500 },
    { date: "2025-03-01", "Patrimônio atual": 50200, "Projeção conservadora": 48000 },
    { date: "2025-04-01", "Patrimônio atual": 52800, "Projeção conservadora": 49500 },
    { date: "2025-05-01", "Patrimônio atual": 55100, "Projeção conservadora": 51000 },
    { date: "2025-06-01", "Patrimônio atual": 58200, "Projeção conservadora": 52500 },
    { date: "2025-07-01", "Patrimônio atual": 61500, "Projeção conservadora": 54000 },
    { date: "2025-08-01", "Patrimônio atual": 64000, "Projeção conservadora": 55500 },
    { date: "2025-09-01", "Patrimônio atual": 67200, "Projeção conservadora": 57000 },
    { date: "2025-10-01", "Patrimônio atual": 70500, "Projeção conservadora": 58500 },
    { date: "2025-11-01", "Patrimônio atual": 73800, "Projeção conservadora": 60000 },
    { date: "2025-12-01", "Patrimônio atual": 77200, "Projeção conservadora": 61500 },
  ];

  const goals = [
    { name: "Reserva de Emergência", status: "on-track" as const, progress: 85, icon: "shield", targetDate: "Jun 2025" },
    { name: "Viagem Europa", status: "ahead" as const, progress: 62, icon: "globe", targetDate: "Dez 2025" },
    { name: "Entrada Apartamento", status: "behind" as const, progress: 28, icon: "home", targetDate: "Dez 2027" },
    { name: "Aposentadoria", status: "on-track" as const, progress: 12, icon: "sun", targetDate: "Jan 2050" },
  ];

  const contributions = [
    { month: "Janeiro 2025", planned: "R$ 2.500", actual: "R$ 2.800", difference: 12 },
    { month: "Dezembro 2024", planned: "R$ 2.500", actual: "R$ 2.500", difference: 0 },
    { month: "Novembro 2024", planned: "R$ 2.500", actual: "R$ 2.200", difference: -12 },
    { month: "Outubro 2024", planned: "R$ 2.500", actual: "R$ 3.000", difference: 20 },
    { month: "Setembro 2024", planned: "R$ 2.500", actual: "R$ 2.600", difference: 4 },
  ];

  return (
    <>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={product.dashboard.title}
        description={product.dashboard.description}
        path={product.dashboard.path}
      />
      <Column fillWidth gap="8" paddingX="16">
        <Row vertical="center" fillWidth horizontal="between" gap="8" wrap>
          <Heading variant="display-strong-s">
            Painel Financeiro
          </Heading>
          <Button prefixIcon="plus" size="s" data-border="rounded" href="/metas">
            Nova <Row s={{hide: true}} marginLeft="4">Meta</Row>
          </Button>
        </Row>
        <Text variant="body-default-m" onBackground="neutral-medium">
          Olá! <Row inline s={{hide: true}}>Veja como está seu progresso financeiro.</Row>
        </Text>
      </Column>

      <Scroller fadeColor="surface">
        <Row fitWidth flex={1}>
          {[
            { title: "Patrimônio Total", value: "R$ 77.200", change: "8,2%", positive: true, subtitle: "vs. mês anterior" },
            { title: "Aporte Mensal", value: "R$ 2.800", change: "12%", positive: true, subtitle: "acima do planejado" },
            { title: "Reserva Emergência", value: "85%", change: "5%", positive: true, subtitle: "da meta de 6 meses" },
            { title: "Próx. Meta", value: "182 dias", change: "No caminho", positive: true, subtitle: "Viagem Europa" },
          ].map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              positive={stat.positive}
              subtitle={stat.subtitle}
              marginRight={index < 3 ? "8" : "0"}
              href="/analytics"
            />
          ))}
        </Row>
      </Scroller>

      <Row fillWidth gap="8" m={{direction: "column-reverse"}}>
        <Row flex={3}>
          <LineChart
            style={{height: "auto"}}
            height={undefined}
            minHeight={20}
            border="neutral-medium"
            radius="l"
            axis="x"
            title="Evolução do Patrimônio"
            description="2025"
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
              { key: "Projeção conservadora", color: "gray" }
            ]}
            data={patrimonyData}
          />
        </Row>
        <Column flex={1} radius="l" border="neutral-medium" overflow="hidden">
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
            <Row textVariant="label-default-xs" onBackground="brand-medium" align="center" marginBottom="20">
              Meta Anual
            </Row>
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
            <Text variant="label-default-s" onBackground="neutral-weak" align="center" marginTop="24">
              Objetivo de investimento
            </Text>
            <Text variant="heading-strong-l" align="center">R$ 120.000</Text>
            <Text variant="body-default-xs" onBackground="neutral-weak" align="center">
              Faltam R$ 42.800
            </Text>
          </Column>
        </Column>
      </Row>

      <Grid columns="2" m={{columns: 1}} gap="m" fillWidth>
        <Column fillWidth border="neutral-medium" radius="l" overflow="hidden" height={20}>
          <Row vertical="center" horizontal="between" fillWidth paddingLeft="24" paddingRight="12" paddingY="12" gap="m" wrap>
            <Heading wrap="nowrap" variant="heading-strong-s">
              Suas Metas
            </Heading>
            <Row gap="4">
              <Button weight="default" variant="secondary" size="s" href="/metas">
                Ver todas
              </Button>
            </Row>
          </Row>
          
          <Column fillWidth borderTop="neutral-medium" overflowY="auto">
            {goals.map((goal, index) => (
              <GoalItem
                key={index}
                name={goal.name}
                status={goal.status}
                progress={goal.progress}
                icon={goal.icon}
                targetDate={goal.targetDate}
                href="/roadmap"
              />
            ))}
          </Column>
        </Column>

        <Column border="neutral-medium" radius="l" fillWidth overflow="hidden" height={20}>
          <Row fillWidth vertical="center" horizontal="between" paddingLeft="24" paddingRight="12" paddingY="12" gap="16" wrap>
            <Heading wrap="nowrap" variant="heading-strong-s">
              Aportes Recentes
            </Heading>
            <Button size="s" weight="default" variant="secondary" suffixIcon="chevronRight" href="/analytics">
              Histórico
            </Button>
          </Row>
          <Column fillWidth borderTop="neutral-medium" overflowY="auto">
            {contributions.map((contribution, index) => (
              <ContributionItem 
                key={index}
                month={contribution.month}
                planned={contribution.planned}
                actual={contribution.actual}
                difference={contribution.difference}
                icon={contribution.difference >= 0 ? "trendUp" : "trendDown"}
              />
            ))}
          </Column>
        </Column>
      </Grid>
      
      <GoalsTableClient />
    </>
  );
}
