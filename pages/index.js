import Head from "next/head";
import {
  Box,
  Heading,
  Avatar,
  Text,
  Image,
  Grid,
  Badge,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";
import matter from "gray-matter";
import { orderBy, filter } from "lodash";
var GithubSlugger = require("github-slugger");
const fs = require("fs");
import Link from "next/link";

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>FFF-Podcast</title>
        <meta property="og:title" content={"Vantage Point"} />
        <meta name="twitter:title" content={"Vantage Point"} />
        <meta name="og:url" content={"https://vantage-point.vercel.app"} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={"Vantage Point"} />
        <meta
          name="description"
          content={
            "Der FFF-Podcast informiert über Themen rund um den Klimawandel, Umweltschutz und natürlich Fridays for Future"
          }
        />
        <meta
          property="og:description"
          content={
            "Der FFF-Podcast informiert über Themen rund um den Klimawandel, Umweltschutz und natürlich Fridays for Future."
          }
        />
        <meta
          name="twitter:description"
          content={
            "Der FFF-Podcast informiert über Themen rund um den Klimawandel, Umweltschutz und natürlich Fridays for Future"
          }
        />
        <meta property="og:image" content={props.featured.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={props.featured.image} />
      </Head>
      <Link href={`/posts/${props.featured.slug}`}>
        <Box
          height="300px"
          width="100%"
          position="relative"
          overflow="hidden"
          marginBottom="6"
          borderRadius="lg"
          position="relative"
          zIndex="2"
          display={["none", "block", "block"]}
        >
          <Box
            background={`linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${props.featured.image})`}
            height="300px"
            backgroundPosition="center"
            width="100%"
            objectFit="cover"
            position="relative"
            _hover={{ transform: "scale(1.02)" }}
            transition="ease-in .5s"
          >
            <Box position="absolute" bottom="12" left="10">
              <Heading color="white" fontSize="45px" pb="2">
                {props.featured.title}
              </Heading>
              <Text color="white" fontSize="25px" mb="0!important">
                {props.featured.issue == "1" ? "Editor's note" : `by ${props.featured.author}` }
              </Text>
            </Box>
          </Box>
        </Box>
      </Link>
      <SimpleGrid columns={[1, 2, 2]} spacing={10}></SimpleGrid>
      <div id="latest">
        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(3, 1fr)",
            "repeat(3, 1fr)",
          ]}
          gap={4}
        >
          <GridItem colSpan={2}>
            <SimpleGrid columns={[1, 1, 2]} spacing={6}>
              <Box
                height="300px"
                width="100%"
                position="relative"
                overflow="hidden"
                as="a"
                href={`/posts/${props.featured.slug}`}
                marginBottom="6"
                borderRadius="lg"
                position="relative"
                zIndex="2"
                display={["block", "none", "none"]}
              >
                <Box
                  background={`linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${props.featured.image})`}
                  backgroundSize="cover"
                  _hover={{ transform: "scale(1.05)" }}
                  objectFit="cover"
                  width="100%"
                  borderRadius="lg"
                  height="100%"
                  transition="ease-in .5s"
                >
                  <Box position="absolute" bottom="12" left="10" pr="10">
                    <Heading
                      color="white"
                      fontSize="35px"
                      pb="2"
                      fontWeight="bold"
                    >
                      {props.featured.title}
                    </Heading>
                    <Text color="white" fontSize="16px" mb="0!important">
                      by {props.featured.author} <br />
                      <Badge mt="2" pl="2" pr="2">
                        Issue #{props.featured.issue}
                      </Badge>
                    </Text>
                  </Box>
                </Box>
              </Box>
              {props.posts.map((post) => (
                <Box
                  height="300px"
                  width="100%"
                  position="relative"
                  overflow="hidden"
                  as="a"
                  href={`/posts/${post.slug}`}
                  marginBottom="6"
                  borderRadius="lg"
                  position="relative"
                  zIndex="2"
                >
                  <Box
                    background={`linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${post.image})`}
                    backgroundSize="cover"
                    _hover={{ transform: "scale(1.05)" }}
                    objectFit="cover"
                    width="100%"
                    borderRadius="lg"
                    height="100%"
                    transition="ease-in .5s"
                  >
                    <Box position="absolute" bottom="12" left="10" pr="10">
                      <Heading
                        color="white"
                        fontSize="35px"
                        pb="2"
                        fontWeight="bold"
                      >
                        {post.title}
                      </Heading>
                      <Text color="white" fontSize="16px" mb="0!important">
                        by {post.author} <br />
                        <Badge mt="2" pl="2" pr="2">
                          Issue #{post.issue}
                        </Badge>
                      </Text>
                    </Box>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          </GridItem>
          <GridItem colSpan={1}>
            <Box
              width="100%"
              objectFit="cover"
              marginBottom="6"
              borderRadius="lg"
              position="relative"
              borderColor="black"
              borderWidth="1px"
            >
              <Box p="5">
                <Text pb="15px">
                  <Heading display="inline-block">
                    🖋 Zitat des Monats
                  </Heading>
                </Text>
                <Text style={{ lineHeight: '1.9'}}>
                If the ocean dies, we die!-
                </Text>
                <Text style={{ lineHeight: '1.9'}}>
                Captain Paul Watson-Gründer Sea Shepherd Conservation Society
                </Text>
              </Box>
            </Box>
            <Box
              width="100%"
              objectFit="cover"
              marginBottom="6"
              borderRadius="lg"
              position="relative"
              borderColor="black"
              borderWidth="1px"
              display={props.featured.issue == "1" ? "none" : "block"}
            >
              <Box p="5">
                <Text pb="3">
                  <Avatar
                   
                  />
                  <Heading display="inline-block">Editor's Note</Heading>
                </Text>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Blandit turpis cursus in hac habitasse platea dictumst
                  quisque. Maecenas sed enim ut sem viverra aliquet eget sit. Mi
                  tempus imperdiet nulla malesuada pellentesque. Bibendum est
                  ultricies integer quis auctor elit sed vulputate.
                  <br />
                  <br />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Blandit turpis cursus in hac habitasse platea dictumst
                  quisque.
                </Text>
              </Box>
            </Box>
            <Box
              width="100%"
              objectFit="cover"
              marginBottom="6"
              borderRadius="lg"
              position="relative"
              borderColor="black"
              borderWidth="1px"
            >
              
            </Box>
          </GridItem>
        </Grid>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  var slugger = new GithubSlugger();
  const context = require.context("../posts", false, /\.md$/);
  var posts = [];
  let featured;
  console.log(context.keys());
  for (const key of context.keys()) {
    const post = key.slice(2);
    const file = fs.readFileSync(`./posts/${post}`, "utf8");
    const content = matter(file);
    if (content.data.featured == true) {
      featured = {
        title: content.data.title,
        slug: slugger.slug(content.data.title),
        author: content.data.author,
        image: content.data.image ? content.data.image : null,
        date: content.data.date,
        issue: content.data.issue,
      };
    } else {
      posts.push({
        title: content.data.title,
        slug: slugger.slug(content.data.title),
        author: content.data.author,
        image: content.data.image ? content.data.image : null,
        date: content.data.date,
        issue: content.data.issue,
      });
    }
  }
  posts = orderBy(posts, "title");
  posts = orderBy(posts, "issue", "desc");
  console.log(featured);
  return { props: { posts, featured: featured } };
}
