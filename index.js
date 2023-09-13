const {exec} = require("child_process");
const fs = require("fs");

function showProcess() {
    let command;
    if (process.platform === "win32") {
        command = "powershell \"Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }\"";
    } else if (process.platform === "linux") {
        command = "ps -A -o %cpu,%mem,comm | sort -nr | head -n 1";
    } else if (process.platform === "darwin") {
        command = 'ps -A -o %cpu,%mem,comm -r';
    } else {
        console.log("The current OS is not supported");
        return;
    }

    const pathFile = "activityMonitor.log";
    const delay = 60000;
    let lastTime = 0;
    setInterval(() => {
        exec(command, (error, stdout) => {
            if (error !== null) {
                console.log(`error: ${error}`);
            }

            const processesInfo = stdout.trim();
            process.stdout.write(`\r${processesInfo}`);

            const currentTime = Date.now();
            const monitorMsg = `${currentTime}: ${processesInfo}`;
            if (currentTime - lastTime >= delay) {
                fs.appendFile(pathFile, `${monitorMsg}` + "\n", (error) => {
                    if (error) {
                        console.error("Error in activityMonitor.log:", error);
                    }
                });
                lastTime = currentTime;
            }
        })
    }, 100);
}

showProcess();
