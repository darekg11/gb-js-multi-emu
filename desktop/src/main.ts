import { app, BrowserWindow, dialog, Menu, MenuItemConstructorOptions } from "electron";
import { LCD_HEIGHT } from "gb-js-multi-emu-core/dist/components/gpu/constants";
import { LOAD_ROM_IPC_EVENT } from "./scripts/types";
import fs from "fs";

const isMac = process.platform === 'darwin';
const IS_PRODUCTION = process.env.NODE_ENV === "production";

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
                label: "Restart ROM"
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
                label: "Controls"
            }, {
                label: "Version Info"
            }, {
                label: "Check out on GitHub"
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
    Menu.setApplicationMenu(mainWindowMenu);
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