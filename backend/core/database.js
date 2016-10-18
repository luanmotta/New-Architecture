var mongoose = require('mongoose'),
    path     = require('path');

module.exports = function(uri) {

  var databasePath = path.resolve(__dirname, '../../index.js'),
      databaseUri  = uri || process.argv[2];

  if (!databaseUri) {
    console.log("\x1b[36m%s\x1b[0m", `É preciso inserir um banco de dados em ${databasePath}`);
    throw new Error ("Não foi inserido banco de dados.");
  }

  mongoose.connect(databaseUri);

  mongoose.connection.on('connected', function() {
      console.log('(+) Conectado ao MongoDB');
  });

  mongoose.connection.on('error', function(error){
      console.log('(X) Erro na conexão: ' + error);
  });

  mongoose.connection.on('disconnected', function() {
      console.log('(!) Desconectando do MongoDB');
  });

  process.on('SIGINT', function() {
      mongoose.connection.close(function() {
          console.log('(!) Aplicação finalizada, conexão encerrada');
          process.exit(0);
      });
  });
};
