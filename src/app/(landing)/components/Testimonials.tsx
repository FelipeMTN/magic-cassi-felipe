import {
  AutoScroll,
  Column,
  Fade,
  Flex,
  Heading,
  Mask,
  MatrixFx,
  SmartLink,
  Text,
  User,
} from "@once-ui-system/core";
import { ReactNode } from "react";

interface Testimonial {
  content: ReactNode;
  avatar?: string;
  name?: string;
  role?: string;
  link?: string;
  company?: string;
}

interface Props extends Omit<React.ComponentProps<typeof Flex>, "content"> {
  testimonials: Testimonial[];
}

export const Testimonials: React.FC<Props> = ({ testimonials, ...flex }) => (
  <Column fillWidth borderBottom="neutral-medium" {...flex}>
    <Mask fill bottom="0" position="absolute" x={50} y={100} radius={50}>
      <MatrixFx
        size={1.5}
        spacing={5}
        fps={24}
        colors={["brand-solid-strong"]}
        flicker
      />
    </Mask>
    <Column fillWidth horizontal="center" gap="12" paddingTop="xl">
      <Column maxWidth="xs" gap="24" horizontal="center" paddingX="l">
        <Heading variant="display-strong-s" align="center">
          Used by people who don't have time to design
        </Heading>
        <Text align="center" wrap="balance" variant="heading-default-l" onBackground="neutral-weak">
          Build momentum without debt
        </Text>
      </Column>
      <AutoScroll fillWidth marginTop="48" speed="slow">
        {testimonials.slice(0, Math.ceil(testimonials.length / 2)).map((testimonial, index) => (
          <Column
            key={index}
            background="page"
            radius="l"
            border="neutral-medium"
            vertical="between"
            marginRight="12"
            minWidth={20}
            fillWidth
          >
            <Column fillWidth padding="32" gap="24">
             <Text wrap="balance" variant="heading-default-m">
                {testimonial.content}
              </Text>
              {(testimonial.role || testimonial.company) && (
                <User
                  avatarProps={{ src: testimonial.avatar }}
                  name={testimonial.name}
                  subline={
                    <>
                      {testimonial.role}{" "}
                      {testimonial.link && testimonial.company && (
                        <SmartLink unstyled href={testimonial.link}>
                          {testimonial.company}
                        </SmartLink>
                      )}
                    </>
                  }
                />
              )}
            </Column>
          </Column>
        ))}
      </AutoScroll>
      <AutoScroll fillWidth reverse speed="slow">
        {testimonials.slice(Math.ceil(testimonials.length / 2)).map((testimonial, index) => (
          <Column
            key={index}
            background="page"
            radius="l"
            border="neutral-medium"
            vertical="between"
            marginRight="12"
            minWidth={20}
            fillWidth
          >
            <Column fillWidth padding="32" gap="24">
              <Text wrap="balance" variant="heading-default-m">
                {testimonial.content}
              </Text>
              {(testimonial.role || testimonial.company) && (
                <User
                  avatarProps={{ src: testimonial.avatar }}
                  name={testimonial.name}
                  subline={
                    <>
                      {testimonial.role}{" "}
                      {testimonial.link && testimonial.company && (
                        <SmartLink unstyled href={testimonial.link}>
                          {testimonial.company}
                        </SmartLink>
                      )}
                    </>
                  }
                />
              )}
            </Column>
          </Column>
        ))}
      </AutoScroll>
      <Fade pointerEvents="none" fillHeight width={24} s={{hide: true}} top="0" to="right" position="absolute" left="0" />
      <Fade pointerEvents="none" fillHeight width={24} s={{hide: true}} top="0" to="left" position="absolute" right="0" />
    </Column>
  </Column>
);