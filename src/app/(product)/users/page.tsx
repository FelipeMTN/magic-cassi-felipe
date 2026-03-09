import { Column, Heading, Meta, Row, Schema } from "@once-ui-system/core";
import TableClient from "./components/TableClient";
import { baseURL, product } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: product.users.title,
    description: product.users.description,
    baseURL: baseURL,
    path: product.users.path,
    canonical: product.users.canonical,
    image: product.users.image,
    robots: product.users.robots,
    alternates: product.users.alternates,
  });
}

export default function Users() {
  return (
    <>
    <Schema
        as="webPage"
        baseURL={baseURL}
        title={product.users.title}
        description={product.users.description}
        path={product.users.path}
      />
        <Heading paddingLeft="16" variant="display-strong-s">
          Users
        </Heading>
        <TableClient />
    </>
  )
}