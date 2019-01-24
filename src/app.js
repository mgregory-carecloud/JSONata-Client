// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require('electron')


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1050,
    height: 687,
    icon: `${__dirname}/src/public/images/icon.png`,
    webPreferences: {
      nodeIntegration: true
    }
  })


  mainWindow.loadURL(`file://${__dirname}/public/index.html`)
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  const template = [
        {
          label: 'Edit',
          submenu: [
            {
              role: 'undo'
            },
            {
              role: 'redo'
            },
            {
              type: 'separator'
            },
            {
              role: 'cut'
            },
            {
              role: 'copy'
            },
            {
              role: 'paste'
            },
            {
              role: 'pasteandmatchstyle'
            },
            {
              role: 'delete'
            },
            {
              role: 'selectall'
            }
          ]
        },
        {
          label: 'View',
          submenu: [
            {
              role: 'reload'
            },
            {
              role: 'forcereload'
            },
            {
              role: 'toggledevtools'
            },
            {
              type: 'separator'
            },
            {
              role: 'resetzoom'
            },
            {
              role: 'zoomin'
            },
            {
              role: 'zoomout'
            },
            {
              type: 'separator'
            },
            {
              role: 'togglefullscreen'
            }
          ]
        },
        {
          role: 'window',
          submenu: [
            {
              role: 'minimize'
            },
            {
              role: 'close'
            }
          ]
        },
        {
          role: 'help',
          submenu: [
            {
              label: 'Learn More',
              click () {
                shell.openExternal('https://electronjs.org')
              }
            },
            {
              label: 'Documentation',
              click () {
                shell.openExternal(
                  `https://github.com/electron/electron/tree/v${process.versions.electron}/docs#readme`
                )
              }
            },
            {
              label: 'Community Discussions',
              click () {
                shell.openExternal('https://discuss.atom.io/c/electron')
              }
            },
            {
              label: 'Search Issues',
              click () {
                shell.openExternal('https://github.com/electron/electron/issues')
              }
            }
          ]
        }
      ]
    
      if (process.platform === 'darwin') {
        template.unshift({
          label: 'Electron',
          submenu: [
            {
              role: 'about'
            },
            {
              type: 'separator'
            },
            {
              role: 'services',
              submenu: []
            },
            {
              type: 'separator'
            },
            {
              role: 'hide'
            },
            {
              role: 'hideothers'
            },
            {
              role: 'unhide'
            },
            {
              type: 'separator'
            },
            {
              role: 'quit'
            }
          ]
        })
        template[1].submenu.push({
          type: 'separator'
        }, {
          label: 'Speech',
          submenu: [
            {
              role: 'startspeaking'
            },
            {
              role: 'stopspeaking'
            }
          ]
        })
        template[3].submenu = [
          {
            role: 'close'
          },
          {
            role: 'minimize'
          },
          {
            role: 'zoom'
          },
          {
            type: 'separator'
          },
          {
            role: 'front'
          }
        ]
      } else {
        template.unshift({
          label: 'File',
          submenu: [{
            role: 'quit'
          }]
        })
      }
    
      const menu = Menu.buildFromTemplate(template)
      Menu.setApplicationMenu(menu)

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
