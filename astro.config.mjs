import { defineConfig } from "astro/config";
import solidJs from "@astrojs/solid-js";
import unocss from "unocss/astro";
import deno from "@astrojs/deno";
import { vritePlugin } from "@vrite/sdk/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [
    solidJs(),
    unocss({
      injectReset: true,
    }),
    vritePlugin({
      accessToken: "",
      contentGroupId: "",
    }),
  ],
  output: "server",
  adapter: deno(),
});
