const { Router } = require('express');
const router = Router();
const axios = require('axios');

let host ='https://echo-serv.tbxnet.com/v1'; 
let filesPath = '/secret/files';
let fileDataPath = '/secret/file/';
let token = 'aSuperSecretKey';

let  headers = {
    'Content-Type': 'application/json',
    'Accept': 'text/plain',
    'Authorization': `Bearer ${token}`,
  }
  

router.get('/files/data', (req, res) => {
    let fileName = req.query.fileName;
    if(fileName){
        getData([fileName]).then((datafiles)=>{
            if(datafiles.length>0){
                res.json(datafiles[0]);
            }else{
                res.status(404).json({code: 404, message: 'Archivo no encontrado o es inválido'});
            }
        });
    }else{
        axios.get(`${host}${filesPath}`,{headers}).then(function (response) {
            let files = response.data.files;
            getData(files).then(function(datafiles){
                res.json(datafiles);
            });
          })
          .catch(function (error) {
            console.log('ocurrio un error extrayendo los archivos');
            console.log(error)
          })
    }
})

router.get('/files/list', (req, res) => {   
    axios.get(`${host}${filesPath}`,{headers}).then(function (response) {
        res.json(response.data.files);
      })
      .catch(function (error) {
        console.log('ocurrio un error extrayendo los archivos');
        console.log(error)
      })
})


async function getData(files){
    let dataFiles = [];
    await Promise.all(files.map((file,index)=>{
        return axios.get(`${host}${fileDataPath}${file}`,{headers}).then(function(response){
            let validateLines = [];
            let lines = response.data.split('\n');
            lines = lines.slice(1);
            lines.forEach(element => {
                let validateLine = element.split(',');
                if(validateLine.length ==4 && validateLine[0] && validateLine[1] && validateLine[2] && isNumeric(validateLine[2]) && validateLine[3]){
                    validateLines.push({text: validateLine[1], number: validateLine[2], hex:validateLine[3]});
                    
                }
            });
            if(validateLines.length >1 ){
                dataFiles.push({file: file, lines: validateLines});
            }
        }).catch(function(error){
            console.log(`error extrayendo el archivo ${file} ${error}`)
            return dataFiles;
        })
    }));
    return dataFiles;
}

function isNumeric(str) {
    if (typeof str != "string") return false
    return !isNaN(str) &&
           !isNaN(parseFloat(str))
}
  
 
module.exports = router;