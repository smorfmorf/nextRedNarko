import os from "os";

const nets = os.networkInterfaces();
for (const [name, addrs] of Object.entries(nets)) {
    const fixedName = Buffer.from(name, "latin1").toString("utf8"); // исправление кириллицы
    for (const addr of addrs) {
        if (!addr.internal && addr.mac) {
            console.log(`Interface: ${fixedName}, MAC: ${addr.mac}`);
        }
    }
}