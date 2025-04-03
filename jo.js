const fs = require("fs");
const { join } = require("path");

const t = require("exectimer");
const Tick = t.Tick;

const util = require("util");
const execSync = util.promisify(require("child_process").execSync);

var JavaScriptObfuscator = require("javascript-obfuscator");

async function readFileText(fileName) {
  return new Promise(async (resolve, reject) => {
    fs.readFile(`./${fileName}`, "utf8", (err, jsonString) => {
      if (err) {
        console.log("File Read failed:", err);
        return resolve(null);
      }
      console.log("File Read Data::");
      //console.log(jsonString);
      return resolve(jsonString);
    });
  });
}

async function writeFileText(fileName, content) {
  console.log("writeFileText started::");
  //console.log(content);

  return new Promise(async (resolve, reject) => {
    fs.writeFile(`./${fileName}`, content, function (error, result) {
      if (error) {
        console.log("File Update Failed: " + error);
        return resolve(null);
      } else {
        console.log("File Update Success");
        return resolve(true);
      }
    });
  });
}

async function startObfuscation(fileName) {
  var tick = new Tick(fileName);
  tick.start();

  console.log(`${fileName} STARTED`);

  const background = await readFileText(fileName);
  var obfuscationResult = JavaScriptObfuscator.obfuscate(background);
  await writeFileText(fileName, obfuscationResult.getObfuscatedCode());

  tick.stop();

  var results = t.timers[fileName];
  if (results) {
    console.log(fileName + " took: " + results.parse(results.duration()));
  }
}


async function build(){

    execSync(`npm run build`, {
        stdio: "inherit",
      })

    await startObfuscation("build/background.js");
    await startObfuscation("build/content.js");

}

build();

