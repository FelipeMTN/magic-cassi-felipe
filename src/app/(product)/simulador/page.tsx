import {
  Column,
  Row,
  Card,
  Heading,
  Text,
  Grid,
  Button,
  LineChart,
  Schema,
  Meta,
  Background,
} from "@once-ui-system/core";
import { baseURL, product } from "@/resources";
import SimulatorClient from "./components/SimulatorClient";

export async function generateMetadata() {
  return Meta.generate({
    title: "Simulador de Cenários - Organizador Financeiro",
    description: "Simule diferentes cenários para suas metas financeiras",
    baseURL: baseURL,
    path: "/simulador",
    canonical: `${baseURL}/simulador`,
    robots: "index,follow",
  });
}

export default function SimuladorPage() {
  return (
    <>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title="Simulador de Cenários"
        description="Simule diferentes cenários para suas metas financeiras"
        path="/simulador"
      />
      <Column fillWidth gap="8" paddingX="16">
        <Row vertical="center" fillWidth horizontal="between" gap="8" wrap>
          <Heading variant="display-strong-s">
            Simulador de Cenários
          </Heading>
        </Row>
        <Text variant="body-default-m" onBackground="neutral-medium">
          Compare diferentes estratégias de investimento e veja como elas impactam suas metas.
        </Text>
      </Column>

      <SimulatorClient />
    </>
  );
}
