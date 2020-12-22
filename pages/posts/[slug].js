import matter from "gray-matter";
import { orderBy, filter } from "lodash";
var GithubSlugger = require("github-slugger");
const fs = require("fs");
var Markdown = require("react-markdown");
import { Box, Heading, Image, Text, Grid } from "@chakra-ui/react";
import Head from "next/head";

export default function Home(props) {
  return (
    <Box>
      <Head>
        <title>FFF-Podcast</title>
        <meta
          property="og:title"
          content={`${props.post.title} - FFF Podcast`}
        />
        <meta
          name="twitter:title"
          content={`${props.post.title} - FFF Podcast`}
        />
        <meta name="og:url" content={"https://vantage-point-dun.vercel.app"} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={"FFF-Podcast"} />
        <meta
          name="description"
          content={
            "Der FFF-Podcast informiert über Themen rund um den Klimawandel, Umweltschutz und natürlich Fridays for Future."
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
            "Der FFF-Podcast informiert über Themen rund um den Klimawandel, Umweltschutz und natürlich Fridays for Future."
          }
        />
        <meta property="og:image" content={props.post.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={props.post.image} />
      </Head>
      <Image
        src={props.post.image}
        height="300px"
        width="100%"
        objectFit="cover"
        marginBottom="6"
        borderRadius="lg"
        display={["block", "block", "none"]}
      />

      <Box>
        <Image
          src={props.post.image}
          float="right"
          objectFit="cover"
          margin="6"
          borderRadius="lg"
          width="45%"
          display={["none", "none", "block"]}
        />
        <Heading fontSize="3em" marginBottom="6">
          {props.post.title}{" "}
          <span
            style={{
              fontSize: "26px",
              fontWeight: "400",
              fontFamily: "Castoro",
            }}
          >
            {" "}
            by {props.post.author} (Issue #{props.post.issue})
          </span>
        </Heading>
        <Markdown allowDangerousHtml={true} source={props.post.content} />
      </Box>

      <Text>
        <i>
          {props.post.editor
            ? `Zuletzt bearbeitet von: ${props.post.editor}.`
            : ""}
        </i>
      </Text>
    </Box>
  );
}

export async function getStaticPaths() {
  var slugger = new GithubSlugger();
  const context = require.context("../../posts", false, /\.md$/);
  const posts = [];
  console.log(context.keys());
  for (const key of context.keys()) {
    const post = key.slice(2);
    const file = fs.readFileSync(`./posts/${post}`, "utf8");
    const content = matter(file);
    posts.push({
      params: { slug: slugger.slug(content.data.title) },
    });
  }
  return {
    paths: posts,
    fallback: false, // See the "fallback" section below
  };
}

export async function getStaticProps(params) {
  var slugger = new GithubSlugger();
  const context = require.context("../../posts", false, /\.md$/);
  const posts = [];
  console.log(params.params.slug);
  for (const key of context.keys()) {
    const post = key.slice(2);
    const file = fs.readFileSync(`./posts/${post}`, "utf8");
    const content = matter(file);
    console.log(content);
    posts.push({
      title: content.data.title,
      slug: slugger.slug(content.data.title),
      content: content.content,
      author: content.data.author,
      issue: content.data.issue,
      image: content.data.image ? content.data.image : null,
      editor: content.data.editor ? content.data.editor : null,
    });
  }
  const post = filter(posts, (post) => post.slug === params.params.slug)[0];
  return { props: { post: post } };
}
