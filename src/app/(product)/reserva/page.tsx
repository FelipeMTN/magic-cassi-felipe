import {
  Column,
  Row,
  Heading,
  Text,
  Schema,
  Meta,
} from "@once-ui-system/core";
import { baseURL } from "@/resources";
import ReservaClient from "./components/ReservaClient";

export async function generateMetadata() {
  return Meta.generate({
    title: "Reserva de Emergência - Organizador de Metas",
    description: "Gerencie sua reserva de emergência e proteja-se contra imprevistos",
    baseURL: baseURL,
    path: "/reserva",
    canonical: `${baseURL}/reserva`,
    robots: "index,follow",
  });
}

export default function ReservaPage() {
  return (
    <>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title="Reserva de Emergência"
        description="Gerencie sua reserva de emergência e proteja-se contra imprevistos"
        path="/reserva"
      />
      <Column fillWidth gap="8" paddingX="16">
        <Row vertical="center" fillWidth horizontal="between" gap="8" wrap>
          <Heading variant="display-strong-s">
            Reserva de Emergência
          </Heading>
        </Row>
        <Text variant="body-default-m" onBackground="neutral-medium">
          Sua proteção financeira contra imprevistos. O primeiro passo para uma vida financeira saudável.
        </Text>
      </Column>

      <ReservaClient />
    </>
  );
}
