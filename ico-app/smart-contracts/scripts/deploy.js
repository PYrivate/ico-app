const { ethers } = require("hardhat");
const path = require("path");

function getTime() {
  const now = new Date(); // Get the current date
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const from = Math.floor(Date.now() / 1000);
  const to = Math.floor(tomorrow.getTime() / 1000);
  return [from, to];
}

async function main() {
  //SYST
  console.log("Deploying SYST Contract...");
  const SYSTFactory = await ethers.getContractFactory("SYST");
  const SYST = await SYSTFactory.deploy();

  console.log("Deployed SYST:", SYST.address);

  const [from, to] = getTime();
  console.log("Time interval: ", from, to);

  //systICO
  console.log("Deploying systICO Contract...");
  const SystICOFactory = await ethers.getContractFactory("SystICO");
  const SystICO = await SystICOFactory.deploy(syst.address, from, to);

  console.log("Deployed systICO:", systICO.address);

  saveFrontendFiles(systICO, syst);
}

function saveFrontendFiles(systICO, syst) {
  const fs = require("fs");
  const contractsDir = path.join(
    __dirname,
    "..",
    "..",
    "client",
    "src",
    "contracts"
  );

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  const time_interval = getTime();

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify(
      { SystICO: systICO.address, SYST: syst.address },
      undefined,
      2
    )
  );

  fs.writeFileSync(
    path.join(contractsDir, "time-interval.json"),
    JSON.stringify(
      { from: time_interval[0], to: time_interval[1] },
      undefined,
      2
    )
  );

  const SystICOArtifact = artifacts.readArtifactSync("SystICO");
  const SYSTArtifact = artifacts.readArtifactSync("SYST");

  fs.writeFileSync(
    path.join(contractsDir, "SystICO.json"),
    JSON.stringify(SystICOArtifact, null, 2)
  );

  fs.writeFileSync(
    path.join(contractsDir, "SYST.json"),
    JSON.stringify(SYSTArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
