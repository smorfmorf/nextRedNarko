import { S3Client, s3, write } from "bun";

// const s3Store = new S3Client({
//     accessKeyId: "admin",
//     secretAccessKey: "password123",
//     bucket: "mazaka",
//     endpoint: "http://127.0.0.1:9000",
//     region: "us-east-1",
// });
//!
// const file = s3.file("IMG_6094.png");
// // читаем из S3 и сохраняем на диск
// await Bun.write("./IMG_6094.png", await file.arrayBuffer());
//!

// await write(file, JSON.stringify({ hello: "Вортлер файт" }));

// const data = await file.json();




// import os from "os";

// const nets = os.networkInterfaces();
// for (const [name, addrs] of Object.entries(nets)) {
//     const fixedName = Buffer.from(name, "latin1").toString("utf8"); // исправление кириллицы
//     for (const addr of addrs) {
//         if (!addr.internal && addr.mac) {
//             console.log(`Interface: ${fixedName}, MAC: ${addr.mac}`);
//         }
//     }
// }


import { Database } from "bun:sqlite";
const db = new Database("./prisma/dev.db");
const result = db.query("SELECT * FROM 'Order' LIMIT 1").get();
console.log(result);

