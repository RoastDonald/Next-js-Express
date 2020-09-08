import loaders from "./loaders/index";
import config from "./config/index";

const main = async () => {
  const app = express();
  loaders(app);
  app.listen(config.serverPORT, () => {
    console.log(`Server Running at ${conifg.serverPORT}`);
  });
};

await main();
