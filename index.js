
const express = require("express");
const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");

const manifest = {
  id: "community.reliable.addon",
  version: "1.0.0",
  name: "Reliable Addon",
  description: "Template addon with provider failover",
  resources: ["stream"],
  types: ["movie", "series"],
  idPrefixes: ["tt"]
};

const builder = new addonBuilder(manifest);

// Replace these with your own legal/user-owned providers.
async function getStreams(id) {
  const providers = [
    async () => [],
    async () => []
  ];

  for (const provider of providers) {
    try {
      const streams = await provider();
      if (streams.length > 0) return streams;
    } catch {}
  }

  return [];
}

builder.defineStreamHandler(async ({ id }) => {
  return {
    streams: await getStreams(id)
  };
});

const app = express();
serveHTTP(builder.getInterface(), { app });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));
