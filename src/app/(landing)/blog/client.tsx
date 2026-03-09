"use client";

import { useState } from "react";
import { Column, Heading, Row, IconButton, Button, Grid } from "@once-ui-system/core";
import { PostsClient } from "./components";
import { Newsletter } from "../components";
import { social } from "@/resources";

export function BlogClient({ totalPosts, posts }: { totalPosts: number, posts: any[] }) {
  const [postsToShow, setPostsToShow] = useState(9);
  
  const handleShowMore = () => {
    setPostsToShow(prev => Math.min(prev + 9, totalPosts));
  };

  return (
    <Column maxWidth="l"  horizontal="center" paddingX="l">
      <Row fillWidth horizontal="center" paddingX="12">
        <Row fillWidth paddingX="l" paddingBottom="32" horizontal="between" vertical="center">
          <Heading variant="heading-strong-l">
            Blog
          </Heading>
          <Row gap="12">
            {social.map((item) => (
              <IconButton
                key={item.name}
                href={item.link}
                icon={item.icon}
                size="s"
                variant="secondary"
              />
            ))}
          </Row>
        </Row>
      </Row>
      <Column fillWidth gap="32">
        <PostsClient posts={posts} range={[1,1]} thumbnail direction="row" minHeight={24}/>
        <Row fillWidth m={{direction: "column"}} gap="32" paddingTop="40">
          <PostsClient direction="column" posts={posts} range={[2, 3]} thumbnail/>
        </Row>
        <Newsletter marginY="40"/>
        <Grid fillWidth columns={2} m={{columns: 1}} gap="32">
          <PostsClient direction="column" posts={posts} range={[4, Math.min(postsToShow, totalPosts)]} thumbnail/>
        </Grid>
        {postsToShow < totalPosts && (
          <Row fillWidth horizontal="center" paddingTop="24">
            <Row maxWidth={24}>
              <Button 
                fillWidth 
                variant="secondary" 
                data-border="rounded"
                onClick={handleShowMore}
              >
                Show more
              </Button>
            </Row>
          </Row>
        )}
      </Column>
    </Column>
  );
}
