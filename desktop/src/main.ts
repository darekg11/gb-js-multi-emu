import { app, BrowserWindow, dialog, Menu, MenuItemConstructorOptions, ipcMain, shell } from "electron";
import path from "path";
import { LCD_HEIGHT, LCD_WIDTH } from "gb-js-multi-emu-core/dist/components/gpu/constants";
import { CLOSE_SETTINGS_WINDOW_EVENT, LOAD_ROM_IPC_EVENT, RESTART_ROM_IPC_EVENT, SETTINGS_CHANGED_EVENT, VERSION_INFO_EVENT } from "./scripts/types";
import fs from "fs";
import { DEFAULT_SCREEN_SCALE_FACTOR_VALUE, SCREEN_SCALE_FACTOR_SETTING_KEY_NAME } from "./scripts/settings";
const pacakge = require("./package.json");

const isMac = process.platform === 'darwin';
const IS_PRODUCTION = app.isPackaged;
const VERSION = pacakge.version;
const GIT_COMMIT_HASH = fs.readFileSync(`${__dirname}/git_commit`, { encoding: "ascii" });

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
                label: "Settings",
                click: () => {
                    const settingsDialogWindow = new BrowserWindow({
                        title: "Settings",
                        modal: true,
                        maximizable: false,
                        resizable: false,
                        parent: windowInstance,
                        show: false,
                        width: 600,
                        height: 600,
                        webPreferences: {
                            nodeIntegration: true,
                            contextIsolation: false,
                            devTools: !IS_PRODUCTION
                        }
                    });
                    settingsDialogWindow.setMenu(null);
                    settingsDialogWindow.loadURL(`file://${__dirname}/screens/settings.html`);
                    settingsDialogWindow.once('ready-to-show', () => {
                        settingsDialogWindow.show()
                    });
                    ipcMain.on(CLOSE_SETTINGS_WINDOW_EVENT, () => {
                        settingsDialogWindow.destroy();
                    })
                }
            },{
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
                        width: 400,
                        height: 400,
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
        title: "GB JS Multi Emu",
        maximizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: !IS_PRODUCTION
        },
        icon: path.join(__dirname, "/assets/icons/128x128.png")
    });
    // it's via callbacks since doing async await breaks Electron along the way when setting window
    mainWindowInstance.webContents.executeJavaScript(`localStorage.getItem('${SCREEN_SCALE_FACTOR_SETTING_KEY_NAME}')`)
        .then(screenScaleFactor => screenScaleFactor || DEFAULT_SCREEN_SCALE_FACTOR_VALUE)
        .catch(() => DEFAULT_SCREEN_SCALE_FACTOR_VALUE)
        .then(screenScaleFactor => {
            mainWindowInstance.setSize(LCD_WIDTH * screenScaleFactor, (LCD_HEIGHT * screenScaleFactor) + 50);
            mainWindowInstance.setResizable(false);
        });
    mainWindowInstance.loadURL(`file://${__dirname}/screens/main.html`);
    const mainWindowMenu = Menu.buildFromTemplate(buildMenu(mainWindowInstance));
    mainWindowInstance.setMenu(mainWindowMenu);
    ipcMain.on(SETTINGS_CHANGED_EVENT, (event, newSettings: string) => {
        if (newSettings) {
            const settings = JSON.parse(newSettings);
            mainWindowInstance.setResizable(true);
            mainWindowInstance.setSize(LCD_WIDTH * settings.screen_scale_factor, (LCD_HEIGHT * settings.screen_scale_factor) + 50);
            mainWindowInstance.setResizable(false);
            mainWindowInstance.webContents.send(SETTINGS_CHANGED_EVENT);
        }
    })
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