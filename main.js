const { app, BrowserWindow } = require('electron');
const { exec } = require('child_process');
const path = require('path');
// const { isProcessRunning } = require('./lib/veriProcess');

let appWin;
const processNameToCheck = 'plugin_pdf_prod_64';
const processPath = path.join(__dirname, 'plugins', 'plugin_pdf_prod_64.exe');

createWindows = () => {

    exec('tasklist', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar tasklist: ${error}`);
            return;
        }

        const isProcessRunning = stdout.toLowerCase().includes(processNameToCheck.toLowerCase());

        if (isProcessRunning) {
            console.log(`El proceso "${processNameToCheck}" esta ejecutandose: true`);
        } else {
            console.log(`El proceso "${processNameToCheck}" no esta en ejecucion: false`);
            console.log(`Iniciando el proceso desde ${processPath}`);

            // Ejecuta el proceso desde la carpeta plugins
            exec(`"${processPath}"`, (startError, startStdout, startStderr) => {
                if (startError) {
                    console.error(`Error al iniciar el proceso: ${startError}`);
                    return;
                }

                console.log(`Proceso "${processNameToCheck}" iniciado.`);
            });
        }
    });


    appWin = new BrowserWindow({
        width: 800,
        height: 600,
        title: 'Zizi Pos Printer',
        resizable: true,
    });

    appWin.loadURL(`file://${__dirname}/dist/index.html`);

    appWin.setMenu(null);

    appWin.on('closed', () => {
        appWin = null;
    })
}


app.on('ready', createWindows);

app.on('window-all-closed', () => app.quit());
