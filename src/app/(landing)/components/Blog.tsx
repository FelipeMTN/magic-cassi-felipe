import { Column, Row, Scroller, Heading } from "@once-ui-system/core";
import { Posts } from "../blog/components/Posts";

export const Blog = ({ ...flex }: React.ComponentProps<typeof Column>) => {
  return (
    <Row fillWidth background="surface" horizontal="center">
      <Column gap="20" {...flex}>
        <Heading marginLeft="l" variant="heading-strong-s">
          From the blog
        </Heading>
        <Scroller fadeColor="surface">
          <Row fitWidth gap="20">
            <Posts range={[1, 5]} direction="column" width={28} fillHeight background="surface"/>
          </Row>
        </Scroller>
      </Column>
    </Row>
  );
}