
var fs = require('fs');
var request = require('request');
var url = 'https://raw.github.com/pcm-dpc/COVID-19/master/legacy/dati-regioni/dpc-covid19-ita-regioni-';
let date_ob = new Date();
fs.readdir('./dataset_covid_19_regione_campania/dati_regione_latest/', (err, files) => {
    if (!files.length) {
        console.log("Cartella REGIONE vuota");
    } else {
        var Namefile = files[0];
        var data = date_ob.getFullYear() + '' + ("0" + (date_ob.getMonth() + 1)).slice(-2) + '' + ("0" + date_ob.getDate()).slice(-2); 
        var file = 'dpc-covid19-ita-regioni-'+data+ '.csv';
        if (Namefile == file) {
            console.log("Gia Scaricato REGIONE");
        } else {
            url = url +''+ data+'.csv';
            request.get(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var csv = body;
                    var file = './dataset_covid_19_regione_campania/dati_regione_latest/dpc-covid19-ita-regioni-'+data+'.csv';
                    fs.writeFile(file, body, function (err) {
                        if (err) return console.log(err);
                        console.log('File REGIONE scaricato');
                        //eliminzaione file
                        Nomefile = './dataset_covid_19_regione_campania/dati_regione_latest/' + files[0];
                        fs.unlink(Nomefile, function (err) {
                        if (err) throw err;
                            console.log('File REGIONE eliminato');
                        });
                        require('./insertLatestDataRegione.js');
                    });       
                } else {
                    console.log("File REGIONE ancora non esistente");
                }
            });
        }
    }
});