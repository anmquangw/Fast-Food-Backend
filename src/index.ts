import App from "./app";

try {
  new App().run();
} catch (e) {
  if (App.isDebug) console.log(e);
}
