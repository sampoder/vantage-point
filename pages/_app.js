import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import { Box, Heading, Grid, Text, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";

const theme = extendTheme({
  fonts: {
    body: "'Castoro', system-ui, sans-serif",
    heading: "'Playfair Display', serif",
    mono: "Menlo, monospace",
  },
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  console.log(pageProps);
  return (
    <ChakraProvider theme={theme}>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        <Box
          display={["none", "block", "block"]}
          style={{
            width: "200px",
            position: "fixed",
            height: "100vh",
            backgroundColor: "#FAF8EB",
          }}
        >
          <Image src="https://cloud-iik259j2s.vercel.app/0untitled_design-18.png" />
          <Box position="absolute" bottom="30px" width="100%">
            <Navigation
              onSelect={({ itemId }) => {
                router.push(itemId);
              }}
              items={[
                {
                  title: "Home",
                  itemId: "/",
                  // you can use your own custom Icon component as well
                  // icon is optional
                },
                {
                  title: "About us",
                  itemId: "/about",
                },
              ]}
            />
          </Box>
        </Box>
        <Box
          width={["100vw", "calc(95vw)", "calc(95vw)"]}
          paddingLeft={["10px", "250px", "250px"]}
          paddingRight={["10px", "0px", "0px"]}
          paddingBottom={["10px", "10px"]}
          paddingTop={["70px", "70px"]}
        >
          <Heading pb="7" display={["block", "none", "none"]} textAlign="center">
            Vantage Point
          </Heading>
          <Component {...pageProps} />
          <hr style={{ marginTop: "20px", paddingBottom: "10px" }} />
          <Text>
            Produced by students from{" "}
            <Link href="https://gwa.edu.sg" style={{fontWeight: '600'}}>GEMS World Academy Singapore</Link>. Contact the team: <Link href="mailto:contact@vantage-point.online" style={{fontWeight: '600'}}>contact@vantage-point.online</Link>
          </Text>
        </Box>
      </Grid>
    </ChakraProvider>
  );
}

export default MyApp;
