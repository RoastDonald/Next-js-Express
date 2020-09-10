import "../styles/globals.css";
import "../styles/main.css";
import Layout from "../hoc/layout";

const App = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
