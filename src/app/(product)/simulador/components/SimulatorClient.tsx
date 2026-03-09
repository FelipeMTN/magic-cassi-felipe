"use client";

import {
  Column,
  Row,
  Card,
  Heading,
  Text,
  Grid,
  Button,
  LineChart,
  Background,
  Input,
  SegmentedControl,
  Icon,
  Tag,
} from "@once-ui-system/core";
import { useState, useMemo } from "react";
import { 
  calculateCompoundInterest, 
  compareScenarios, 
  formatCurrency,
  formatPercent,
  calculateGoalProjection,
} from "@/lib/financial-calculations";

interface ScenarioConfig {
  name: string;
  monthlyContribution: number;
  annualRate: number;
  color: "success" | "warning" | "danger" | "gray" | "brand";
}

export default function SimulatorClient() {
  const [initialValue, setInitialValue] = useState(50000);
  const [monthlyContribution, setMonthlyContribution] = useState(2500);
  const [targetValue, setTargetValue] = useState(500000);
  const [years, setYears] = useState(10);
  const [selectedScenario, setSelectedScenario] = useState<string>("all");

  const scenarios: ScenarioConfig[] = [
    { name: "Conservador (6% a.a.)", monthlyContribution, annualRate: 0.06, color: "gray" },
    { name: "Moderado (10% a.a.)", monthlyContribution, annualRate: 0.10, color: "brand" },
    { name: "Arrojado (15% a.a.)", monthlyContribution, annualRate: 0.15, color: "success" },
  ];

  const results = useMemo(() => {
    return scenarios.map(scenario => {
      const projection = calculateCompoundInterest(
        initialValue,
        scenario.monthlyContribution,
        scenario.annualRate,
        years * 12
      );
      
      const goalProjection = calculateGoalProjection(
        targetValue,
        initialValue,
        scenario.monthlyContribution,
        scenario.annualRate
      );

      return {
        ...scenario,
        finalValue: projection.finalValue,
        totalInvested: projection.totalInvested,
        totalInterest: projection.totalInterest,
        monthsToGoal: goalProjection.monthsToGoal,
        expectedDate: goalProjection.expectedDate,
        onTrack: goalProjection.onTrack,
        monthlyData: projection.monthlyData,
      };
    });
  }, [initialValue, monthlyContribution, targetValue, years]);

  const chartData = useMemo(() => {
    const data: Array<Record<string, number | string>> = [];
    const months = years * 12;
    
    for (let i = 0; i <= months; i += 3) {
      const date = new Date();
      date.setMonth(date.getMonth() + i);
      
      const entry: Record<string, number | string> = {
        date: date.toISOString().split('T')[0],
      };

      results.forEach((result, index) => {
        const monthData = result.monthlyData[i] || result.monthlyData[result.monthlyData.length - 1];
        if (monthData) {
          entry[result.name] = Math.round(monthData.balance);
        }
      });

      data.push(entry);
    }
    
    return data;
  }, [results, years]);

  const formatInputCurrency = (value: number) => {
    return value.toLocaleString('pt-BR');
  };

  const parseInputCurrency = (value: string) => {
    return Number(value.replace(/\D/g, '')) || 0;
  };

  return (
    <Column fillWidth gap="24">
      <Grid columns="4" m={{columns: 2}} s={{columns: 1}} gap="m" fillWidth>
        <Card padding="20" gap="12" radius="l" fillWidth direction="column">
          <Text variant="label-default-s" onBackground="neutral-medium">
            Valor Inicial
          </Text>
          <Input
            id="initial-value"
            label=""
            value={formatInputCurrency(initialValue)}
            onChange={(e) => setInitialValue(parseInputCurrency(e.target.value))}
            prefix="R$"
          />
        </Card>
        
        <Card padding="20" gap="12" radius="l" fillWidth direction="column">
          <Text variant="label-default-s" onBackground="neutral-medium">
            Aporte Mensal
          </Text>
          <Input
            id="monthly-contribution"
            label=""
            value={formatInputCurrency(monthlyContribution)}
            onChange={(e) => setMonthlyContribution(parseInputCurrency(e.target.value))}
            prefix="R$"
          />
        </Card>
        
        <Card padding="20" gap="12" radius="l" fillWidth direction="column">
          <Text variant="label-default-s" onBackground="neutral-medium">
            Meta Final
          </Text>
          <Input
            id="target-value"
            label=""
            value={formatInputCurrency(targetValue)}
            onChange={(e) => setTargetValue(parseInputCurrency(e.target.value))}
            prefix="R$"
          />
        </Card>
        
        <Card padding="20" gap="12" radius="l" fillWidth direction="column">
          <Text variant="label-default-s" onBackground="neutral-medium">
            Prazo (anos)
          </Text>
          <Input
            id="years"
            label=""
            type="number"
            value={years.toString()}
            onChange={(e) => setYears(Number(e.target.value) || 1)}
            min={1}
            max={50}
          />
        </Card>
      </Grid>

      <LineChart
        style={{height: "auto"}}
        height={undefined}
        minHeight={24}
        border="neutral-medium"
        radius="l"
        axis="x"
        title="Projeção de Patrimônio"
        description="Comparação entre cenários"
        date={{
          start: new Date(),
          end: new Date(new Date().setFullYear(new Date().getFullYear() + years)),
          format: "MMM yyyy",
          selector: false,
        }}
        grid="y"
        series={[
          { key: "Conservador (6% a.a.)", color: "gray" },
          { key: "Moderado (10% a.a.)", color: "brand" },
          { key: "Arrojado (15% a.a.)", color: "success" },
        ]}
        data={chartData}
      />

      <Grid columns="3" m={{columns: 1}} gap="m" fillWidth>
        {results.map((result, index) => (
          <Card 
            key={index}
            padding="24" 
            gap="16" 
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
                width: 50,
                height: 75,
                colorStart: result.color === "success" 
                  ? "success-background-strong" 
                  : result.color === "brand" 
                    ? "brand-background-strong" 
                    : "neutral-alpha-weak",
              }}
            />
            <Row vertical="center" horizontal="between">
              <Text variant="heading-strong-s">{result.name.split(" (")[0]}</Text>
              <Tag 
                variant={result.onTrack ? "success" : "warning"} 
                size="s"
              >
                {result.onTrack ? "Atinge meta" : "Não atinge"}
              </Tag>
            </Row>
            
            <Column gap="8">
              <Row horizontal="between">
                <Text variant="body-default-s" onBackground="neutral-weak">Valor Final</Text>
                <Text variant="label-default-s">{formatCurrency(result.finalValue)}</Text>
              </Row>
              <Row horizontal="between">
                <Text variant="body-default-s" onBackground="neutral-weak">Total Investido</Text>
                <Text variant="label-default-s">{formatCurrency(result.totalInvested)}</Text>
              </Row>
              <Row horizontal="between">
                <Text variant="body-default-s" onBackground="neutral-weak">Ganho com Juros</Text>
                <Text variant="label-default-s" onBackground="success-weak">
                  +{formatCurrency(result.totalInterest)}
                </Text>
              </Row>
              <Row horizontal="between">
                <Text variant="body-default-s" onBackground="neutral-weak">Rentabilidade</Text>
                <Text variant="label-default-s" onBackground="success-weak">
                  {formatPercent((result.totalInterest / result.totalInvested) * 100)}
                </Text>
              </Row>
            </Column>

            <Row 
              paddingTop="16" 
              borderTop="neutral-alpha-weak" 
              horizontal="between" 
              vertical="center"
            >
              <Column gap="2">
                <Text variant="body-default-xs" onBackground="neutral-weak">
                  Tempo até a meta
                </Text>
                <Text variant="label-default-s">
                  {result.onTrack 
                    ? `${Math.floor(result.monthsToGoal / 12)} anos e ${result.monthsToGoal % 12} meses`
                    : "Meta não atingida"
                  }
                </Text>
              </Column>
              <Icon 
                name={result.onTrack ? "check" : "warning"} 
                onBackground={result.onTrack ? "success-weak" : "warning-weak"}
              />
            </Row>
          </Card>
        ))}
      </Grid>

      <Card padding="24" gap="16" radius="l" fillWidth direction="column" border="brand-alpha-medium">
        <Row vertical="center" gap="12">
          <Icon name="lightbulb" onBackground="brand-weak" />
          <Text variant="heading-strong-s">Dica do Organizador</Text>
        </Row>
        <Text variant="body-default-m" onBackground="neutral-medium">
          {results[1].onTrack 
            ? `Com o cenário moderado, você atingirá sua meta de ${formatCurrency(targetValue)} em aproximadamente ${Math.floor(results[1].monthsToGoal / 12)} anos. Considere diversificar entre renda fixa e variável para equilibrar risco e retorno.`
            : `Para atingir sua meta de ${formatCurrency(targetValue)}, considere aumentar seus aportes mensais ou estender o prazo. Com o cenário arrojado, você precisaria de ${Math.floor(results[2].monthsToGoal / 12)} anos.`
          }
        </Text>
      </Card>
    </Column>
  );
}
