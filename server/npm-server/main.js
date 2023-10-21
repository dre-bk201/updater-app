const express = require("express");
const semver = require("semver");
const app = express();
const port = 8000;

function parseParam(param) {
  let params = param.split("-");
  return {
    target: params[0],
    arch: params[1],
    current_version: params[2],
  };
}

app.get("/releases/*", async (req, res) => {

  let updateMetadata = await fetch("https://github.com/dre-bk201/so-frontend/releases/download/smartorganizer-app-v0.1.1/latest.json");
  let metadata = await updateMetadata.json();

  // { '0': 'windows-x86_64-0.0.1' }
  let { target, arch, current_version } = parseParam(req.params["0"]);
  if (!semver.valid(semver.coerce(current_version))) console.error("Invalid version");

  const { url, signature } = metadata.platforms[`${target}-${arch}`];

  res.send({
    version: metadata.version,
    pub_date: metadata.pub_date,
    url,
    signature
  });
});

app.listen(port, () => {
  console.log("Example app listening on port: ", port);
});
