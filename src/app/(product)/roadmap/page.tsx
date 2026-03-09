import {
  Column,
  Row,
  Heading,
  Text,
  Schema,
  Meta,
  Button,
} from "@once-ui-system/core";
import { baseURL } from "@/resources";
import RoadmapClient from "./components/RoadmapClient";

export async function generateMetadata() {
  return Meta.generate({
    title: "Roadmap Financeiro - Organizador de Metas",
    description: "Acompanhe o progresso das suas metas financeiras com alertas inteligentes",
    baseURL: baseURL,
    path: "/roadmap",
    canonical: `${baseURL}/roadmap`,
    robots: "index,follow",
  });
}

export default function RoadmapPage() {
  return (
    <>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title="Roadmap Financeiro"
        description="Acompanhe o progresso das suas metas financeiras com alertas inteligentes"
        path="/roadmap"
      />
      <Column fillWidth gap="8" paddingX="16">
        <Row vertical="center" fillWidth horizontal="between" gap="8" wrap>
          <Heading variant="display-strong-s">
            Roadmap Financeiro
          </Heading>
          <Button prefixIcon="plus" size="s" data-border="rounded" href="/metas/nova">
            Nova Meta
          </Button>
        </Row>
        <Text variant="body-default-m" onBackground="neutral-medium">
          Visualize suas metas com alertas de desvio e status em tempo real.
        </Text>
      </Column>

      <RoadmapClient />
    </>
  );
}
