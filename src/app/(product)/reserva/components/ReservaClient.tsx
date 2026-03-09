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
  RadialGauge,
  Input,
  Button,
  BarChart,
} from "@once-ui-system/core";
import { useState, useMemo } from "react";
import { 
  calculateEmergencyFundStatus,
  formatCurrency,
  formatPercent,
} from "@/lib/financial-calculations";

export default function ReservaClient() {
  const [monthlyExpenses, setMonthlyExpenses] = useState(5000);
  const [currentReserve, setCurrentReserve] = useState(25500);
  const [targetMonths, setTargetMonths] = useState(6);
  const [monthlyContribution, setMonthlyContribution] = useState(1500);

  const status = useMemo(() => {
    return calculateEmergencyFundStatus(
      currentReserve,
      monthlyExpenses,
      targetMonths,
      monthlyContribution
    );
  }, [currentReserve, monthlyExpenses, targetMonths, monthlyContribution]);

  const monthsCovered = currentReserve / monthlyExpenses;
  
  const chartData = useMemo(() => {
    const data = [];
    let balance = currentReserve;
    
    for (let i = 0; i <= 12; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() + i);
      
      data.push({
        date: date.toISOString().split('T')[0],
        "Reserva Atual": Math.round(balance),
        "Meta": status.targetValue,
      });
      
      balance += monthlyContribution;
    }
    
    return data;
  }, [currentReserve, monthlyContribution, status.targetValue]);

  const formatInputCurrency = (value: number) => {
    return value.toLocaleString('pt-BR');
  };

  const parseInputCurrency = (value: string) => {
    return Number(value.replace(/\D/g, '')) || 0;
  };

  const getStatusColor = () => {
    if (status.isSufficient) return "success";
    if (status.percentComplete >= 50) return "warning";
    return "danger";
  };

  const getStatusMessage = () => {
    if (status.isSufficient) {
      return {
        title: "Parabéns! Sua reserva está completa!",
        description: "Você tem proteção financeira adequada. Considere investir o excedente em outras metas.",
        icon: "check",
      };
    } else if (status.percentComplete >= 75) {
      return {
        title: "Quase lá!",
        description: `Faltam apenas ${formatCurrency(status.targetValue - currentReserve)} para completar sua reserva.`,
        icon: "target",
      };
    } else if (status.percentComplete >= 50) {
      return {
        title: "Você está no caminho certo!",
        description: "Continue contribuindo regularmente para atingir sua meta de segurança.",
        icon: "trending-up",
      };
    } else {
      return {
        title: "Priorize sua reserva de emergência",
        description: "Esta é a base da sua segurança financeira. Recomendamos focar nela antes de outros investimentos.",
        icon: "alert-triangle",
      };
    }
  };

  const statusMessage = getStatusMessage();

  return (
    <Column fillWidth gap="24">
      <Row fillWidth gap="24" m={{direction: "column"}}>
        <Column flex={1} gap="24">
          <Card padding="32" gap="24" radius="l" fillWidth direction="column" overflow="hidden">
            <Background
              position="absolute"
              top="0"
              left="0"
              gradient={{
                display: true,
                x: 50,
                y: -30,
                width: 75,
                height: 100,
                colorStart: status.isSufficient ? "success-background-strong" : "brand-background-strong",
              }}
              mask={{
                x: 50,
                y: 0,
                radius: 30,
              }}
            />
            
            <Column horizontal="center" gap="16">
              <Text variant="label-default-s" onBackground="neutral-medium">
                Cobertura Atual
              </Text>
              <RadialGauge
                width={240}
                height={240}
                value={Math.min(status.percentComplete, 100)}
                hue={getStatusColor()}
                unit="%"
                line={{
                  count: 48,
                  width: 2,
                  length: 20,
                }}
              />
              <Column gap="4" horizontal="center">
                <Text variant="heading-strong-l">
                  {monthsCovered.toFixed(1)} meses
                </Text>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  de {targetMonths} meses recomendados
                </Text>
              </Column>
            </Column>

            <Line />

            <Grid columns="2" gap="m" fillWidth>
              <Column gap="4">
                <Text variant="body-default-xs" onBackground="neutral-weak">Valor Atual</Text>
                <Text variant="heading-strong-s">{formatCurrency(currentReserve)}</Text>
              </Column>
              <Column gap="4" horizontal="end">
                <Text variant="body-default-xs" onBackground="neutral-weak">Meta</Text>
                <Text variant="heading-strong-s">{formatCurrency(status.targetValue)}</Text>
              </Column>
              <Column gap="4">
                <Text variant="body-default-xs" onBackground="neutral-weak">Falta</Text>
                <Text variant="heading-strong-s" onBackground={status.isSufficient ? "success-weak" : "warning-weak"}>
                  {status.isSufficient ? "Completo!" : formatCurrency(status.targetValue - currentReserve)}
                </Text>
              </Column>
              <Column gap="4" horizontal="end">
                <Text variant="body-default-xs" onBackground="neutral-weak">Tempo Estimado</Text>
                <Text variant="heading-strong-s">
                  {status.isSufficient 
                    ? "Atingido" 
                    : status.monthsToComplete > 0 
                      ? `${status.monthsToComplete} meses` 
                      : "Defina um aporte"
                  }
                </Text>
              </Column>
            </Grid>
          </Card>

          <Card 
            padding="24" 
            gap="16" 
            radius="l" 
            fillWidth 
            direction="column"
            border={status.isSufficient ? "success-alpha-medium" : "warning-alpha-medium"}
          >
            <Row vertical="center" gap="12">
              <Icon 
                name={statusMessage.icon} 
                onBackground={status.isSufficient ? "success-weak" : "warning-weak"} 
              />
              <Text variant="heading-strong-s">{statusMessage.title}</Text>
            </Row>
            <Text variant="body-default-m" onBackground="neutral-medium">
              {statusMessage.description}
            </Text>
          </Card>
        </Column>

        <Column flex={1} gap="24">
          <Card padding="24" gap="20" radius="l" fillWidth direction="column">
            <Heading variant="heading-strong-s">Configure sua reserva</Heading>
            
            <Column gap="16">
              <Column gap="8">
                <Text variant="label-default-s" onBackground="neutral-medium">
                  Despesas Mensais
                </Text>
                <Input
                  id="monthly-expenses"
                  label=""
                  value={formatInputCurrency(monthlyExpenses)}
                  onChange={(e) => setMonthlyExpenses(parseInputCurrency(e.target.value))}
                  prefix="R$"
                />
                <Text variant="body-default-xs" onBackground="neutral-weak">
                  Inclua aluguel, alimentação, transporte, contas e outros gastos fixos.
                </Text>
              </Column>

              <Column gap="8">
                <Text variant="label-default-s" onBackground="neutral-medium">
                  Reserva Atual
                </Text>
                <Input
                  id="current-reserve"
                  label=""
                  value={formatInputCurrency(currentReserve)}
                  onChange={(e) => setCurrentReserve(parseInputCurrency(e.target.value))}
                  prefix="R$"
                />
              </Column>

              <Column gap="8">
                <Text variant="label-default-s" onBackground="neutral-medium">
                  Meses de Cobertura Desejados
                </Text>
                <Input
                  id="target-months"
                  label=""
                  type="number"
                  value={targetMonths.toString()}
                  onChange={(e) => setTargetMonths(Number(e.target.value) || 3)}
                  min={3}
                  max={12}
                />
                <Text variant="body-default-xs" onBackground="neutral-weak">
                  Recomendamos entre 6 e 12 meses para maior segurança.
                </Text>
              </Column>

              <Column gap="8">
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
              </Column>
            </Column>
          </Card>

          <Card padding="24" gap="16" radius="l" fillWidth direction="column">
            <Heading variant="heading-strong-s">Dicas para sua reserva</Heading>
            
            <Column gap="12">
              <Row gap="12" vertical="start">
                <Icon name="check" size="s" onBackground="success-weak" />
                <Text variant="body-default-s">
                  Mantenha sua reserva em investimentos de alta liquidez, como Tesouro Selic ou CDBs de liquidez diária.
                </Text>
              </Row>
              <Row gap="12" vertical="start">
                <Icon name="check" size="s" onBackground="success-weak" />
                <Text variant="body-default-s">
                  Não use a reserva para investimentos de risco ou compras planejadas.
                </Text>
              </Row>
              <Row gap="12" vertical="start">
                <Icon name="check" size="s" onBackground="success-weak" />
                <Text variant="body-default-s">
                  Reavalie suas despesas mensais periodicamente para manter a reserva adequada.
                </Text>
              </Row>
              <Row gap="12" vertical="start">
                <Icon name="check" size="s" onBackground="success-weak" />
                <Text variant="body-default-s">
                  Se você é autônomo ou tem renda variável, considere uma reserva maior (9-12 meses).
                </Text>
              </Row>
            </Column>
          </Card>
        </Column>
      </Row>

      <BarChart
        style={{height: "auto"}}
        height={undefined}
        minHeight={20}
        border="neutral-medium"
        radius="l"
        axis="x"
        title="Projeção da Reserva"
        description="Próximos 12 meses"
        date={{
          start: new Date(),
          end: new Date(new Date().setMonth(new Date().getMonth() + 12)),
          format: "MMM",
          selector: false,
        }}
        grid="y"
        series={[
          { key: "Reserva Atual", color: "brand" },
          { key: "Meta", color: "success" },
        ]}
        data={chartData}
      />
    </Column>
  );
}
