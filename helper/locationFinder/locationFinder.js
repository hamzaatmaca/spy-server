const { spawn } = require("child_process");
const path = require("path");

exports.locationFinder = (val) => {
  return new Promise((resolve, reject) => {
    let arr = [];

    val.map((p) => {
      arr.push(p.data.location);
    });

    const pythonFilePath = path.join(__dirname, "location.py");
    const pythonProcess = spawn("python", [
      pythonFilePath,
      JSON.stringify(arr),
    ]);

    pythonProcess.stdout.on("data", (data) => {
      resolve(String(data));
    });

    pythonProcess.stderr.on("data", (data) => {
      reject(`${data}`);
    });

    /* pythonProcess.on("close", (code) => {
      console.log(`Python dosyası kapatıldı, çıkış kodu: ${code}`);
    }); */
  });
};
