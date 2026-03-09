"use client";

import { Column, Row, Heading, Input, Text, Button, PasswordInput, MediaUpload, Icon, IconButton } from "@once-ui-system/core";
import { useState } from "react";

function General() {
  const [name, setName] = useState("Usuário");
  const [email, setEmail] = useState("usuario@email.com");
  const [password, setPassword] = useState("password");
  const [avatar, setAvatar] = useState("/images/lorant.jpg");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  return (
    <Column fillWidth gap="-1">
      <Row fillWidth gap="20" paddingY="24" paddingLeft="16" paddingRight="24" topRadius="l" border="neutral-alpha-medium" background="surface" s={{direction: "column"}}>
        <Column fillWidth gap="2" vertical="center" paddingLeft="12">
          <Heading variant="heading-strong-xs">
            Avatar
          </Heading>
          <Text variant="label-default-s" onBackground="neutral-weak">
            Envie sua foto de perfil
          </Text>
        </Column>
        <MediaUpload minWidth={4} maxWidth={4} minHeight={4} maxHeight={4} radius="full"
          initialPreviewImage={avatar}
          emptyState={
            <Row gap="4" vertical="center">
              <Icon size="xs" name="plus" />
              <Text variant="label-default-s">Adicionar</Text>
            </Row>
          } />
      </Row>
      <Row fillWidth gap="20" paddingY="24" paddingLeft="16" paddingRight="24" border="neutral-alpha-medium" background="surface" s={{direction: "column"}}>
        <Column fillWidth gap="2" vertical="center" paddingLeft="12">
          <Heading variant="heading-strong-xs">
            Nome
          </Heading>
          <Text variant="label-default-s" onBackground="neutral-weak">
            Altere seu nome
          </Text>
        </Column>
        {isEditingName ? (
          <Row maxWidth={20} vertical="center" gap="8">
            <Input
              id="name"
              height="s"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={20}
            />
            <Button size="s" label="Salvar" onClick={() => setIsEditingName(false)} />
          </Row>
        ) : (
          <Row vertical="center" gap="24" minHeight="48">
            <Text variant="label-default-s" onBackground="neutral-weak" wrap="nowrap">{name}</Text>
            <IconButton variant="secondary" icon="edit" onClick={() => setIsEditingName(true)} />
          </Row>
        )}
      </Row>
      <Row fillWidth gap="20" paddingY="24" paddingLeft="16" paddingRight="24" border="neutral-alpha-medium" background="surface" s={{direction: "column"}}>
        <Column fillWidth gap="2" vertical="center" paddingLeft="12">
          <Heading variant="heading-strong-xs">
            E-mail
          </Heading>
          <Text variant="label-default-s" onBackground="neutral-weak">
            Altere seu endereço de e-mail
          </Text>
        </Column>
        {isEditingEmail ? (
          <Row maxWidth={20} vertical="center" gap="8">
            <Input
              id="email"
              height="s"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={64}
            />
            <Button size="s" label="Salvar" onClick={() => setIsEditingEmail(false)} />
          </Row>
        ) : (
          <Row vertical="center" gap="24" minHeight="48">
            <Text variant="label-default-s" onBackground="neutral-weak" wrap="nowrap">{email}</Text>
            <IconButton variant="secondary" icon="edit" onClick={() => setIsEditingEmail(true)} />
          </Row>
        )}
      </Row>
      <Row fillWidth gap="20" paddingY="24" paddingLeft="16" paddingRight="24" border="neutral-alpha-medium" background="surface" s={{direction: "column"}}>
        <Column fillWidth gap="2" vertical="center" paddingLeft="12">
          <Heading variant="heading-strong-xs">
            Senha
          </Heading>
          <Text variant="label-default-s" onBackground="neutral-weak">
            Altere sua senha
          </Text>
        </Column>
        {isEditingPassword ? (
          <Row maxWidth={20} vertical="center" gap="8">
            <PasswordInput
              id="password"
              height="s"
              placeholder="Nova senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              maxLength={64}
            />
            <Button size="s" label="Salvar" onClick={() => setIsEditingPassword(false)} />
          </Row>
        ) : (
          <Row minHeight="48">
            <IconButton variant="secondary" icon="edit" onClick={() => setIsEditingPassword(true)} />
          </Row>
        )}
      </Row>
      <Row fillWidth gap="20" paddingY="24" paddingLeft="16" paddingRight="24" bottomRadius="l" border="danger-alpha-medium" background="danger-medium" s={{direction: "column"}}>
        <Column fillWidth gap="2" vertical="center" paddingLeft="12">
          <Heading variant="heading-strong-xs">
            Excluir conta
          </Heading>
          <Text variant="label-default-s" onBackground="danger-weak">
            Exclua permanentemente sua conta
          </Text>
        </Column>
        <Button size="s" label="Excluir" variant="danger"/>
      </Row>
    </Column>
  );
}

export { General };
