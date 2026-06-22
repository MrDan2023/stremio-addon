
const express = require("express");
const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");
const { getStreams } = require("./providers/providerManager");

const builder = new addonBuilder({
    id:"community.production.addon",
    version:"1.0.0",
    name:"Production Addon",
    resources:["stream"],
    types:["movie","series"],
    idPrefixes:["tt"]
});

builder.defineStreamHandler(async ({id}) => ({
    streams: await getStreams(id)
}));

const app = express();
serveHTTP(builder.getInterface(), { app });

app.listen(process.env.PORT || 3000);
