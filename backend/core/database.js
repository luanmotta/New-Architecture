module.exports = function(app, mongoose) {

  var yourDatabase;

  if (!yourDatabase) throw new Error ('É preciso inserir um banco de dados em "New-Architecture/backend/core/database.js"');

  mongoose.connect(yourDatabase);

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
