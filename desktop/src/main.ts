import { app, BrowserWindow, Menu, MenuItemConstructorOptions } from "electron";
import { LCD_WIDTH, LCD_HEIGHT } from "gb-js-multi-emu-core/dist/components/gpu/constants";

let mainWindowInstance = null;
const isMac = process.platform === 'darwin';
const IS_PRODUCTION = process.env.NODE_ENV === "production";

const mainWindowMenuTemplate: MenuItemConstructorOptions[] = [
    {
        label: "Emulator",
        submenu: [{
            label: "Load ROM"
        }, {
            label: "Restart ROM"
        }, {
            label: "Options"
        }, {
            type: "separator",
        }, {
            label: "Quit",
            click: () => {
                app.quit();
            }
        }]
    }, {
        label: "Debugging",
        submenu: [{
            label: "Show debugging tools"
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
];

const mainWindowMenu = Menu.buildFromTemplate(mainWindowMenuTemplate);

const createMainWindow = () => {
    mainWindowInstance = new BrowserWindow({
        width: 400,
        height: (LCD_HEIGHT * 2) + 20,
        title: "GB JS Multi Emu",
        maximizable: false,
        maxHeight: (LCD_HEIGHT * 5) + 20,
        webPreferences: {
            nodeIntegration: true,
            devTools: !IS_PRODUCTION
        }
    });
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