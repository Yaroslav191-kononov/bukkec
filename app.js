const express = require("express");
const multer  = require("multer");
let appExpress = express();
const path = require('path');
const nodemailer = require('nodemailer');
const urlencodedParser = express.urlencoded({extended: false});
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydatabase.db');
const qrcode = require('qrcode');
// let { app, BrowserWindow } = require('electron');
// const createWindow = () => {
//   const win = new BrowserWindow({
//   })
//    win.loadURL('http://localhost:3000/')
//  }
// app.whenReady().then(() => {  
//   createWindow()
// })
let transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465,
  secure: true,
  auth: {
      user: 'buccek@mail.ru',
      pass: 'aS3whCRhckTNNcjHyNh5',
  },
});
appExpress.get('/',(_, response)=>response.sendFile(__dirname + "/index.html"));
appExpress.get('/code',async (_, response)=>{
  const qr = await qrcode.toDataURL('https://github.com/Yaroslav191-kononov/kurs.git');
  response.send(qr);
});
appExpress.use(express.static(path.join(__dirname, 'public')));
appExpress.post('/comm',urlencodedParser,function (req, res) {
  const sql = `SELECT \`comm\`,\`foruser\`.\`name\`,\`img\` FROM \`coment\` JOIN \`foruser\` ON \`user_id\`=\`foruser\`.\`id\``;
  db.all(sql, function(err, resalt) {
    res.end(JSON.stringify(resalt));
  });
});
appExpress.post('/commAdd',multer({dest:__dirname+"\\public\\uploads"}).single("img"),urlencodedParser,function (req, res) {
  const sql = `SELECT \`comm\`,\`foruser\`.\`name\` FROM \`coment\` JOIN \`foruser\` ON \`user_id\`=\`foruser\`.\`id\` WHERE \`foruser\`.\`name\`='${req.body.userUser}'`;
  db.all(sql, function(err, result) {
    result.length==0?AddComm(req,res):UpdaseComm(req,res);
  });
});
appExpress.post('/',urlencodedParser, function (req, res) {
  const sql = `SELECT * FROM \`foruser\` WHERE \`name\`='${req.body.userName}'`;
  db.all(sql, function(err,result) {
    SendMassege(req.body.userEmail);
    result.length==0?AddUser(req,res):UpdaseUser(req,result,res);
  });
});
function AddComm(req,res){
  const sql = `INSERT INTO \`foruser\`(\`name\`, \`email\`, \`quantity\`) VALUES('${req.body.userUser}', '${null}',0)`;
  db.run(sql, (err)=>err);
  const sql1 = `SELECT \`id\` FROM \`foruser\` WHERE \`name\`='${req.body.userUser}'`;
  db.all(sql1, function(err,result) {
    let sql2=`INSERT INTO \`coment\`(\`user_id\`, \`comm\`,\`img\`) VALUES (${result[0].id},'${req.body.userComment}'`;
    sql2 +=req.file?`,'${req.file.filename}')`:`,NULL)`;
    db.run(sql2, err=>res.end(err?(console.log(err),'что-то пошло не так'):'ваш комментарий обновлён'))
  });
}
function UpdaseComm(req,res){
  const sql=`UPDATE coment SET comm = '${req.body.userComment}' WHERE user_id IN (SELECT id FROM foruser WHERE name = '${req.body.userUser}')`;
  db.run(sql, (err)=>res.end(err?('что-то пошло не так',console.log(err)):'ваш комментарий обновлён'));
}
function AddUser(req,res){
  const sql = `INSERT INTO \`foruser\`(\`name\`, \`email\`, \`quantity\`) VALUES('${req.body.userName }', '${req.body.userEmail}',1)`;
  db.run(sql, (err)=>err?console.log(err):console.log(res));
  res.sendFile(__dirname + "/index.html");
}
function UpdaseUser(req,results,res){
  const sql = `UPDATE \`foruser\` SET \`quantity\`=${results[0].quantity+1},\`email\`='${req.body.userEmail}' WHERE \`name\`='${req.body.userName}'`;
  db.run(sql, (err)=>err?console.log(err):console.log(res));
  res.sendFile(__dirname + "/index.html");
}
function SendMassege(userEmail){
  let message = transporter.sendMail({
    from: 'Buccek Comp <buccek@mail.ru>',
    to: `${userEmail}, ${userEmail}`,
    subject: 'подтвердите покупку',
    text: '',
    html:`<div style="
    width:100%;
    height:100%;
    bacground:black;
    font-family: verdana;
    ">
    <div style="
    margin:100px 100px;
    bacground:silver;
    color:white;
    "><h2>вы совершили покупку</h2></div>
    </div>`
  })
  console.log(message);
  }
  appExpress.listen(10000, '0.0.0.0', ()=>console.log("(http://localhost:10000/, '0.0.0.0')Сервер запущен..."));