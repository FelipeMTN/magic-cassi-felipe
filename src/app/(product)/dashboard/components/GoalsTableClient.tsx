"use client";

import {
  Row,
  Text,
  StatusIndicator,
  Icon,
} from "@once-ui-system/core";
import { Table, TableColumn } from "../../components/Table";

interface Goal {
  id: string;
  name: string;
  category: string;
  targetValue: number;
  currentValue: number;
  progress: number;
  targetDate: string;
  status: 'ahead' | 'on-track' | 'behind' | 'critical';
  monthlyContribution: number;
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const getStatusLabel = (status: string): string => {
  switch (status) {
    case 'ahead': return 'Adiantado';
    case 'on-track': return 'No caminho';
    case 'behind': return 'Atrasado';
    case 'critical': return 'Crítico';
    default: return status;
  }
};

const getStatusColor = (status: string): "green" | "yellow" | "red" | "gray" => {
  switch (status) {
    case 'ahead': return "green";
    case 'on-track': return "green";
    case 'behind': return "yellow";
    case 'critical': return "red";
    default: return "gray";
  }
};

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

export default function GoalsTableClient() {
  const goalsData: Goal[] = [
    { 
      id: "1", 
      name: "Reserva de Emergência", 
      category: "Emergência",
      targetValue: 30000, 
      currentValue: 25500, 
      progress: 85,
      targetDate: "Jun 2025", 
      status: "on-track",
      monthlyContribution: 1500
    },
    { 
      id: "2", 
      name: "Viagem Europa", 
      category: "Viagem",
      targetValue: 25000, 
      currentValue: 15500, 
      progress: 62,
      targetDate: "Dez 2025", 
      status: "ahead",
      monthlyContribution: 800
    },
    { 
      id: "3", 
      name: "Entrada Apartamento", 
      category: "Imóvel",
      targetValue: 150000, 
      currentValue: 42000, 
      progress: 28,
      targetDate: "Dez 2027", 
      status: "behind",
      monthlyContribution: 2000
    },
    { 
      id: "4", 
      name: "Fundo de Aposentadoria", 
      category: "Aposentadoria",
      targetValue: 2000000, 
      currentValue: 240000, 
      progress: 12,
      targetDate: "Jan 2050", 
      status: "on-track",
      monthlyContribution: 1500
    },
    { 
      id: "5", 
      name: "Curso MBA", 
      category: "Educação",
      targetValue: 45000, 
      currentValue: 18000, 
      progress: 40,
      targetDate: "Mar 2026", 
      status: "on-track",
      monthlyContribution: 1200
    },
  ];

  const goalColumns: TableColumn<Goal>[] = [
    {
      key: "name",
      title: <Text variant="label-default-s">Meta</Text>,
      render: (item: Goal) => (
        <Row gap="12" vertical="center">
          <Icon name={getCategoryIcon(item.category)} size="s" onBackground="neutral-weak" />
          <Text variant="label-default-s">{item.name}</Text>
        </Row>
      ),
    },
    {
      key: "category",
      title: <Text variant="label-default-s">Categoria</Text>,
      render: (item: Goal) => (
        <Text variant="label-default-s" onBackground="neutral-weak">{item.category}</Text>
      ),
    },
    {
      key: "progress",
      title: <Text variant="label-default-s">Progresso</Text>,
      render: (item: Goal) => (
        <Row gap="8" vertical="center">
          <Text variant="label-default-s">{item.progress}%</Text>
          <Text variant="body-default-xs" onBackground="neutral-weak">
            {formatCurrency(item.currentValue)} / {formatCurrency(item.targetValue)}
          </Text>
        </Row>
      ),
    },
    {
      key: "targetDate",
      title: <Text variant="label-default-s">Data Alvo</Text>,
      render: (item: Goal) => <Text variant="label-default-s" onBackground="neutral-weak">{item.targetDate}</Text>,
    },
    {
      key: "monthlyContribution",
      title: <Text variant="label-default-s">Aporte/Mês</Text>,
      align: "end",
      render: (item: Goal) => <Text variant="label-default-s">{formatCurrency(item.monthlyContribution)}</Text>,
    },
    {
      key: "status",
      title: <Text variant="label-default-s">Status</Text>,
      align: "end",
      render: (item: Goal) => (
        <Row gap="8" vertical="center" horizontal="end">
          <Text variant="body-default-xs" onBackground="neutral-weak">{getStatusLabel(item.status)}</Text>
          <StatusIndicator color={getStatusColor(item.status)} />
        </Row>
      ),
    },
  ];

  return (
    <Table
      background="surface"
      heading={<Text variant="heading-strong-s">Todas as Metas</Text>}
      data={goalsData}
      columns={goalColumns}
      selectable
      getId={(item: Goal) => item.id}
      showSearch
      filterFn={(item: Goal, query: string) => 
        [item.name, item.category, item.targetDate, item.status]
          .filter(Boolean)
          .some((value: string) => value.toLowerCase().includes(query.toLowerCase()))
      }
    />
  );
}
