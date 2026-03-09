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
import GoalsTableClient from "../dashboard/components/GoalsTableClient";

export async function generateMetadata() {
  return Meta.generate({
    title: "Minhas Metas - Organizador Financeiro",
    description: "Gerencie todas as suas metas financeiras em um só lugar",
    baseURL: baseURL,
    path: "/metas",
    canonical: `${baseURL}/metas`,
    robots: "index,follow",
  });
}

export default function MetasPage() {
  return (
    <>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title="Minhas Metas"
        description="Gerencie todas as suas metas financeiras em um só lugar"
        path="/metas"
      />
      <Column fillWidth gap="8" paddingX="16">
        <Row vertical="center" fillWidth horizontal="between" gap="8" wrap>
          <Heading variant="display-strong-s">
            Minhas Metas
          </Heading>
          <Button prefixIcon="plus" size="s" data-border="rounded" href="/metas/nova">
            Nova Meta
          </Button>
        </Row>
        <Text variant="body-default-m" onBackground="neutral-medium">
          Visualize e gerencie todas as suas metas financeiras.
        </Text>
      </Column>

      <GoalsTableClient />
    </>
  );
}
