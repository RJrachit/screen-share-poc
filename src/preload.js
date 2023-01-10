const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    setText: (title) => ipcRenderer.invoke('btn-click', title)
    }
)