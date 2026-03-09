"use client";

import {
  Column,
  Row,
  Card,
  Heading,
  Text,
  Grid,
  Icon,
  Tag,
  Line,
  Background,
  ProgressBar,
  Button,
} from "@once-ui-system/core";
import { useState, useMemo } from "react";
import { 
  calculateCountdown,
  checkProgress,
  formatCurrency,
  formatPercent,
} from "@/lib/financial-calculations";

interface Goal {
  id: string;
  name: string;
  category: string;
  targetValue: number;
  currentValue: number;
  targetDate: Date;
  startDate: Date;
  monthlyContribution: number;
  icon: string;
  priority: 'high' | 'medium' | 'low';
}

const getCategoryIcon = (category: string): string => {
  switch (category.toLowerCase()) {
    case 'emergência': return 'shield';
    case 'viagem': return 'globe';
    case 'imóvel': return 'home';
    case 'aposentadoria': return 'sun';
    case 'educação': return 'book';
    case 'veículo': return 'car';
    default: return 'target';
  }
};

const getPriorityColor = (priority: string): "red" | "yellow" | "green" => {
  switch (priority) {
    case 'high': return 'red';
    case 'medium': return 'yellow';
    case 'low': return 'green';
    default: return 'green';
  }
};

const getPriorityLabel = (priority: string): string => {
  switch (priority) {
    case 'high': return 'Alta';
    case 'medium': return 'Média';
    case 'low': return 'Baixa';
    default: return priority;
  }
};

interface GoalCardProps {
  goal: Goal;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal }) => {
  const countdown = calculateCountdown(goal.targetDate);
  const now = new Date();
  const totalMonths = Math.ceil((goal.targetDate.getTime() - goal.startDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
  const monthsElapsed = Math.ceil((now.getTime() - goal.startDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
  
  const progress = checkProgress(
    goal.currentValue,
    goal.targetValue,
    monthsElapsed,
    totalMonths
  );

  const percentComplete = (goal.currentValue / goal.targetValue) * 100;

  const getStatusMessage = () => {
    if (progress.status === 'ahead' || progress.status === 'on-track') {
      return { text: "Sim! Continue assim!", color: "success" as const };
    } else if (progress.status === 'behind') {
      return { text: "Calma lá! Revise seus aportes", color: "warning" as const };
    } else {
      return { text: "Atenção! Meta em risco", color: "danger" as const };
    }
  };

  const statusMessage = getStatusMessage();

  return (
    <Card 
      padding="24" 
      gap="20" 
      radius="l" 
      fillWidth 
      direction="column"
      overflow="hidden"
    >
      <Background
        position="absolute"
        top="0"
        left="0"
        gradient={{
          display: true,
          x: 100,
          y: 0,
          width: 40,
          height: 60,
          colorStart: progress.status === 'ahead' || progress.status === 'on-track'
            ? "success-background-strong"
            : progress.status === 'behind'
              ? "warning-background-strong"
              : "danger-background-strong",
        }}
      />
      
      <Row horizontal="between" vertical="center">
        <Row gap="12" vertical="center">
          <Icon name={getCategoryIcon(goal.category)} size="m" onBackground="neutral-weak" />
          <Column gap="4">
            <Text variant="heading-strong-s">{goal.name}</Text>
            <Text variant="body-default-xs" onBackground="neutral-weak">{goal.category}</Text>
          </Column>
        </Row>
        <Tag 
          variant={statusMessage.color === "success" ? "success" : statusMessage.color === "warning" ? "warning" : "danger"}
          size="m"
        >
          {statusMessage.text}
        </Tag>
      </Row>

      <Column gap="8">
        <Row horizontal="between" vertical="center">
          <Text variant="body-default-s" onBackground="neutral-weak">Progresso</Text>
          <Text variant="label-default-s">{formatPercent(percentComplete)}</Text>
        </Row>
        <ProgressBar 
          value={percentComplete} 
          size="m"
        />
        <Row horizontal="between">
          <Text variant="body-default-xs" onBackground="neutral-weak">
            {formatCurrency(goal.currentValue)}
          </Text>
          <Text variant="body-default-xs" onBackground="neutral-weak">
            {formatCurrency(goal.targetValue)}
          </Text>
        </Row>
      </Column>

      <Line />

      <Grid columns="3" gap="s" fillWidth>
        <Column gap="4" horizontal="center">
          <Text variant="body-default-xs" onBackground="neutral-weak">Tempo Restante</Text>
          <Text variant="label-default-s">
            {countdown.isOverdue 
              ? "Vencido" 
              : countdown.years > 0 
                ? `${countdown.years}a ${countdown.months}m`
                : `${countdown.months}m ${countdown.days}d`
            }
          </Text>
        </Column>
        <Column gap="4" horizontal="center">
          <Text variant="body-default-xs" onBackground="neutral-weak">Aporte/Mês</Text>
          <Text variant="label-default-s">{formatCurrency(goal.monthlyContribution)}</Text>
        </Column>
        <Column gap="4" horizontal="center">
          <Text variant="body-default-xs" onBackground="neutral-weak">Prioridade</Text>
          <Row gap="4" vertical="center">
            <Tag variant={
              goal.priority === 'high' ? 'danger' : 
              goal.priority === 'medium' ? 'warning' : 'success'
            } size="s">
              {getPriorityLabel(goal.priority)}
            </Tag>
          </Row>
        </Column>
      </Grid>

      <Row gap="8">
        <Button 
          variant="secondary" 
          size="s" 
          fillWidth
          prefixIcon="edit"
          href={`/metas/${goal.id}/editar`}
        >
          Editar
        </Button>
        <Button 
          variant="secondary" 
          size="s" 
          fillWidth
          prefixIcon="chart"
          href={`/simulador?meta=${goal.id}`}
        >
          Simular
        </Button>
      </Row>
    </Card>
  );
};

export default function RoadmapClient() {
  const [filter, setFilter] = useState<'all' | 'on-track' | 'attention'>('all');

  const goals: Goal[] = [
    {
      id: "1",
      name: "Reserva de Emergência",
      category: "Emergência",
      targetValue: 30000,
      currentValue: 25500,
      targetDate: new Date("2025-06-30"),
      startDate: new Date("2024-01-01"),
      monthlyContribution: 1500,
      icon: "shield",
      priority: "high",
    },
    {
      id: "2",
      name: "Viagem Europa",
      category: "Viagem",
      targetValue: 25000,
      currentValue: 15500,
      targetDate: new Date("2025-12-31"),
      startDate: new Date("2024-06-01"),
      monthlyContribution: 800,
      icon: "globe",
      priority: "medium",
    },
    {
      id: "3",
      name: "Entrada Apartamento",
      category: "Imóvel",
      targetValue: 150000,
      currentValue: 42000,
      targetDate: new Date("2027-12-31"),
      startDate: new Date("2023-01-01"),
      monthlyContribution: 2000,
      icon: "home",
      priority: "high",
    },
    {
      id: "4",
      name: "Fundo de Aposentadoria",
      category: "Aposentadoria",
      targetValue: 2000000,
      currentValue: 240000,
      targetDate: new Date("2050-01-01"),
      startDate: new Date("2020-01-01"),
      monthlyContribution: 1500,
      icon: "sun",
      priority: "low",
    },
    {
      id: "5",
      name: "Curso MBA",
      category: "Educação",
      targetValue: 45000,
      currentValue: 18000,
      targetDate: new Date("2026-03-01"),
      startDate: new Date("2024-03-01"),
      monthlyContribution: 1200,
      icon: "book",
      priority: "medium",
    },
  ];

  const filteredGoals = useMemo(() => {
    if (filter === 'all') return goals;
    
    return goals.filter(goal => {
      const now = new Date();
      const totalMonths = Math.ceil((goal.targetDate.getTime() - goal.startDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
      const monthsElapsed = Math.ceil((now.getTime() - goal.startDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
      const progress = checkProgress(goal.currentValue, goal.targetValue, monthsElapsed, totalMonths);
      
      if (filter === 'on-track') {
        return progress.status === 'ahead' || progress.status === 'on-track';
      } else {
        return progress.status === 'behind' || progress.status === 'critical';
      }
    });
  }, [filter, goals]);

  const summaryStats = useMemo(() => {
    const onTrack = goals.filter(goal => {
      const now = new Date();
      const totalMonths = Math.ceil((goal.targetDate.getTime() - goal.startDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
      const monthsElapsed = Math.ceil((now.getTime() - goal.startDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
      const progress = checkProgress(goal.currentValue, goal.targetValue, monthsElapsed, totalMonths);
      return progress.status === 'ahead' || progress.status === 'on-track';
    }).length;

    const totalValue = goals.reduce((sum, g) => sum + g.currentValue, 0);
    const totalTarget = goals.reduce((sum, g) => sum + g.targetValue, 0);
    const totalMonthly = goals.reduce((sum, g) => sum + g.monthlyContribution, 0);

    return { onTrack, total: goals.length, totalValue, totalTarget, totalMonthly };
  }, [goals]);

  return (
    <Column fillWidth gap="24">
      <Grid columns="4" m={{columns: 2}} s={{columns: 2}} gap="m" fillWidth>
        <Card padding="20" gap="8" radius="l" fillWidth direction="column">
          <Text variant="label-default-s" onBackground="neutral-medium">
            Metas no Caminho
          </Text>
          <Row vertical="end" gap="8">
            <Heading variant="display-strong-xs">{summaryStats.onTrack}</Heading>
            <Text variant="body-default-s" onBackground="neutral-weak">de {summaryStats.total}</Text>
          </Row>
        </Card>
        
        <Card padding="20" gap="8" radius="l" fillWidth direction="column">
          <Text variant="label-default-s" onBackground="neutral-medium">
            Patrimônio Acumulado
          </Text>
          <Heading variant="display-strong-xs">{formatCurrency(summaryStats.totalValue)}</Heading>
        </Card>
        
        <Card padding="20" gap="8" radius="l" fillWidth direction="column">
          <Text variant="label-default-s" onBackground="neutral-medium">
            Total das Metas
          </Text>
          <Heading variant="display-strong-xs">{formatCurrency(summaryStats.totalTarget)}</Heading>
        </Card>
        
        <Card padding="20" gap="8" radius="l" fillWidth direction="column">
          <Text variant="label-default-s" onBackground="neutral-medium">
            Aporte Total/Mês
          </Text>
          <Heading variant="display-strong-xs">{formatCurrency(summaryStats.totalMonthly)}</Heading>
        </Card>
      </Grid>

      <Row gap="8">
        <Button
          variant={filter === 'all' ? 'primary' : 'secondary'}
          size="s"
          onClick={() => setFilter('all')}
        >
          Todas ({goals.length})
        </Button>
        <Button
          variant={filter === 'on-track' ? 'primary' : 'secondary'}
          size="s"
          onClick={() => setFilter('on-track')}
        >
          No Caminho ({summaryStats.onTrack})
        </Button>
        <Button
          variant={filter === 'attention' ? 'primary' : 'secondary'}
          size="s"
          onClick={() => setFilter('attention')}
        >
          Atenção ({summaryStats.total - summaryStats.onTrack})
        </Button>
      </Row>

      <Grid columns="2" m={{columns: 1}} gap="m" fillWidth>
        {filteredGoals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </Grid>

      {filteredGoals.length === 0 && (
        <Card padding="40" radius="l" fillWidth horizontal="center" vertical="center">
          <Column gap="12" horizontal="center">
            <Icon name="check" size="l" onBackground="success-weak" />
            <Text variant="heading-strong-s">Nenhuma meta nesta categoria</Text>
            <Text variant="body-default-m" onBackground="neutral-weak">
              {filter === 'attention' 
                ? "Parabéns! Todas as suas metas estão no caminho certo."
                : "Adicione metas para começar a acompanhar seu progresso."
              }
            </Text>
          </Column>
        </Card>
      )}
    </Column>
  );
}
