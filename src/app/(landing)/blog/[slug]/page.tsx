import { Metadata } from 'next';
import { notFound } from "next/navigation";
import { Meta, Schema, AvatarGroup, Column, Heading, HeadingNav, Row, Text, Media } from "@once-ui-system/core";
import { CustomMDX } from "@/app/(landing)/components";
import { Posts } from "../components";
import { baseURL, landing } from "@/resources";
import { formatDate } from "@/utils";
import { getPosts } from "@/utils/utils";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = await getPosts(["src", "content", "blog"]);
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join('/') : routeParams.slug || '';

  const posts = await getPosts(["src", "content", "blog"]);
  let post = posts.find((post: any) => post.slug === slugPath);

  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `${landing.blog.path}/${post.slug}`,
  });
}

export default async function Blog({
  params
}: { params: Promise<{ slug: string | string[] }> }) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join('/') : routeParams.slug || '';

  const posts = await getPosts(["src", "content", "blog"]);
  let post = posts.find((post: any) => post.slug === slugPath);

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person: any) => ({
      src: person.avatar,
    })) || [];

  return (
    <Row fillWidth paddingX="l">
      <Row maxWidth={14} s={{hide: true}}/>
      <Row fillWidth horizontal="center">
        <Column maxWidth="m" horizontal="center" as="section" gap="12">
          <Schema
            as="blogPosting"
            baseURL={baseURL}
            path={`${landing.blog.path}/${post.slug}`}
            title={post.metadata.title}
            description={post.metadata.summary}
            datePublished={post.metadata.publishedAt}
            dateModified={post.metadata.publishedAt}
            image={post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`}
            author={post.metadata.team && post.metadata.team.length > 0 ? {
              name: post.metadata.team[0].name,
              url: `${baseURL}${landing.blog.path}`,
              image: `${baseURL}${post.metadata.team[0].avatar}`,
            } : undefined}
          />
          <Column fillWidth horizontal="center" gap="20">
            <Text variant="body-default-xs" onBackground="neutral-weak">
              {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
            </Text>
            <Heading variant="display-strong-s" align="center">
              {post.metadata.title}
            </Heading>
            <Row gap="16" vertical="center" marginBottom="20" marginTop="8">
              {avatars.length > 0 && <AvatarGroup reverse size="s" avatars={avatars} limit={2} />}
              <Text variant="label-default-m" onBackground="neutral-medium" align="center">
                {post.metadata.team?.length > 0 && (
                  post.metadata.team.length <= 2 ? 
                  post.metadata.team.map((person: any) => person.name).join(" and ") :
                  post.metadata.team.map((person: any) => person.name).slice(0, 2).join(", ") + " + " + (post.metadata.team.length - 2) + " more"
                )}
              </Text>
            </Row>
          </Column>
          {post.metadata.image && (
            <Media src={post.metadata.image}
              alt={post.metadata.title}
              aspectRatio="16/9"
              border="neutral-alpha-weak"
              radius="l"
              marginTop="24"
              marginBottom="8"
            />
          )}
          <Column as="article" maxWidth="s" paddingTop="48" paddingX="m">
            <CustomMDX source={post.content} />
          </Column>
          <Column maxWidth="m" horizontal="center" gap="48" paddingTop="104">
            <Text variant="heading-strong-xl">
              Related posts
            </Text>
            <Row fillWidth m={{direction: "column"}} gap="20">
              <Posts range={[1, 2]} direction="column"/>
            </Row>
          </Column>
        </Column>
      </Row>
      <Column maxWidth={14} paddingLeft="40" fitHeight position="sticky" top="128" gap="16" m={{hide: true}}>
        <HeadingNav fitHeight/>
      </Column>
    </Row>
  );
}
