'use strict'

var fs = require('fs');
var parser = require('csv-parser');

var csvData={};
fs.createReadStream(__dirname + '/haushaltsbuch.csv')
    .pipe(parser({separator: ';'}))
    .on('data', function(csvrow) {
        var key = csvrow.Oberkategorie + '#' + csvrow.Unterkategorie;
        var value = 0;
        if (new Date(csvrow.Datum) >= new Date('01.01.2016')) {
          if (csvData[key]) {
            value = csvData[key];
          }
          value += parseFloat(csvrow.Betrag.replace(',', '.'));
          csvData[key] = value;         
        }
    })
    .on('end', function() {
      console.log(csvData);
      var line = '';
      for (var index in csvData) {
        line += index + ';' + csvData[index] + '\n';
      }
      console.log(line);
    });

