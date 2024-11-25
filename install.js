var Service = require('node-windows').Service;
var svc = new Service({
 name:'NEWTE_XML_JSON',
 description: 'Run Xml to Json',
 script: 'C:\\Newte\\JsonXml\\index.js'
});

svc.on('install',function(){
 svc.start();
});

svc.install();