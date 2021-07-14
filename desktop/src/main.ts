import { app, BrowserWindow, dialog, Menu, MenuItemConstructorOptions , shell } from "electron";
import { LCD_HEIGHT } from "gb-js-multi-emu-core/dist/components/gpu/constants";
import { LOAD_ROM_IPC_EVENT, RESTART_ROM_IPC_EVENT, VERSION_INFO_EVENT } from "./scripts/types";
import fs from "fs";
const pacakge = require("./package.json");

const isMac = process.platform === 'darwin';
const IS_PRODUCTION = process.env.NODE_ENV === "production";
const GIT_COMMIT_HASH = process.env.GIT_COMMIT_HASH || "";
const VERSION = pacakge.version;

const buildMenu = (windowInstance: BrowserWindow) : MenuItemConstructorOptions[] => {
    return [
        {
            label: "Emulator",
            submenu: [{
                label: "Load ROM",
                click: async () => {
                    const selectedFiles = dialog.showOpenDialogSync(windowInstance, {
                        title: "Please select your ROM file",
                        filters: [{
                            name: "ROM", extensions: [ "bin", "gb" ]
                        }],
                        properties: [ "openFile" ]
                    });
                    if (selectedFiles && selectedFiles.length && selectedFiles[0]) {
                        const romPath = selectedFiles[0];
                        try {
                            await fs.promises.access(romPath, fs.constants.F_OK | fs.constants.R_OK);
                            const romBinaryData = await fs.promises.readFile(romPath, {
                                encoding: null,
                                flag: "r"
                            });
                            windowInstance.webContents.send(LOAD_ROM_IPC_EVENT, romBinaryData);
                        } catch (error) {
                            dialog.showErrorBox("Missing permissions!", "You don't have permissions required to open ROM file. Please check your ROM's permissions / groups.");
                        }
                    }
                }
            }, {
                label: "Restart ROM",
                click: () => {
                    windowInstance.webContents.send(RESTART_ROM_IPC_EVENT);
                }
            }, {
                type: "separator",
            }, {
                label: "Quit",
                click: () => {
                    app.quit();
                }
            }]
        }, {
            label: "Help",
            submenu: [{
                label: "Controls",
                click: () => {
                    const controlsDialogWindow = new BrowserWindow({
                        title: "Controls",
                        modal: true,
                        maximizable: false,
                        resizable: false,
                        parent: windowInstance,
                        show: false,
                        width: 350,
                        height: 350,
                    });
                    controlsDialogWindow.setMenu(null);
                    controlsDialogWindow.loadURL(`file://${__dirname}/screens/controls.html`);
                    controlsDialogWindow.once('ready-to-show', () => {
                        controlsDialogWindow.show()
                    });
                }
            }, {
                label: "Version Info",
                click: () => {
                    const versionDialogWindow = new BrowserWindow({
                        title: "Version",
                        modal: true,
                        maximizable: false,
                        resizable: false,
                        parent: windowInstance,
                        show: false,
                        width: 350,
                        height: 250,
                        webPreferences: {
                            nodeIntegration: true,
                            contextIsolation: false,
                            devTools: !IS_PRODUCTION
                        }
                    });
                    versionDialogWindow.setMenu(null);
                    versionDialogWindow.loadURL(`file://${__dirname}/screens/version.html`);
                    versionDialogWindow.once('ready-to-show', () => {
                        versionDialogWindow.show();
                        versionDialogWindow.webContents.send(VERSION_INFO_EVENT, { VERSION, GIT_COMMIT_HASH });
                    });
                    versionDialogWindow.webContents.setWindowOpenHandler(({ url }) => {
                        shell.openExternal(url);
                        return { action: 'deny' };
                    });
                }
            }, {
                label: "Check out on GitHub",
                click: () => {
                    shell.openExternal("https://github.com/darekg11/gb-js-multi-emu");
                }
            }]
        }
    ]
}



const createMainWindow = () => {
    const mainWindowInstance = new BrowserWindow({
        width: 400,
        height: (LCD_HEIGHT * 2) + 50,
        title: "GB JS Multi Emu",
        maximizable: false,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: !IS_PRODUCTION
        }
    });
    mainWindowInstance.loadURL(`file://${__dirname}/screens/main.html`);
    const mainWindowMenu = Menu.buildFromTemplate(buildMenu(mainWindowInstance));
    mainWindowInstance.setMenu(mainWindowMenu);
}

app.whenReady().then(createMainWindow);

app.on("window-all-closed", () => {
    if (!isMac) {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
});