import matter from "gray-matter";
import { orderBy, filter } from "lodash";
var GithubSlugger = require("github-slugger");
const fs = require("fs");
var Markdown = require("react-markdown");
import { Box, Heading, Image, Grid } from "@chakra-ui/react";
import Head from "next/head";

export default function Home(props) {
  return (
    <Box>
      <Head>
        <title>Vantage Point</title>
        <meta
          property="og:title"
          content={`${props.post.title} - Vantage Point`}
        />
        <meta
          name="twitter:title"
          content={`${props.post.title} - Vantage Point`}
        />
        <meta name="og:url" content={"https://vantage-point.vercel.app"} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={"Vantage Point"} />
        <meta
          name="description"
          content={
            "Vantage Point strives to deliver different perspectives to you and spur you to use your own voice."
          }
        />
        <meta
          property="og:description"
          content={
            "Vantage Point strives to deliver different perspectives to you and spur you to use your own voice."
          }
        />
        <meta
          name="twitter:description"
          content={
            "Vantage Point strives to deliver different perspectives to you and spur you to use your own voice."
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
      />
      <Heading fontSize="4em" marginBottom="6">
        {props.post.title}{" "}
        <span
          style={{ fontSize: "26px", fontWeight: "400", fontFamily: "Castoro" }}
        >
          {" "}
          by {props.post.author} (Issue #{props.post.issue})
        </span>
      </Heading>

      <Markdown source={props.post.content} />
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
    });
  }
  const post = filter(posts, (post) => post.slug === params.params.slug)[0];
  return { props: { post: post } };
}
