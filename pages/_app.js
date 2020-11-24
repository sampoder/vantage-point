import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react"
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import { Box, Heading, Grid, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

const theme = extendTheme({
  fonts: {
    body: "'Castoro', system-ui, sans-serif",
    heading: "'Playfair Display', serif",
    mono: "Menlo, monospace",
  },
})

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  console.log(pageProps);
  return (
    <ChakraProvider theme={theme}>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        <Box style={{ width: "200px", paddingTop: "70px", position: 'fixed', height: '100vh' }}>
          <Heading paddingLeft="9" paddingBottom="3" marginBottom="3" paddingTop="3" border="1px" borderTopRightRadius="lg" borderBottomRightRadius="lg" borderColor="#CBD5E0">
            Vantage Point
          </Heading>
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
                title: "Poetry",
                itemId: "/poetry",
              },
              {
                title: "About us",
                itemId: "/about",
              },
            ]}
          />
        </Box>
        <Box style={{ width: 'calc(95vw)', paddingLeft: '250px', paddingBottom: '10px', paddingTop: '70px'}}>
          <Component {...pageProps} />
          <hr style={{marginTop: '20px', paddingBottom: '10px'}}/>
          <Text>Produced by students from GEMS World Academy Singapore.</Text>
        </Box>
      </Grid>
    </ChakraProvider>
  );
}

export default MyApp;
