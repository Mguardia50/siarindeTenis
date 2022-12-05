const sysData = {
    
    id: process.pid,
    ejecutable: process.execPath,
    version: process.version,
    OS: process.platform,
    memory: process.memoryUsage(),
    memory_usage: JSON.stringify(process.memoryUsage()),
    args: process.argv,
    directorio: process.cwd()
    }


export default sysData