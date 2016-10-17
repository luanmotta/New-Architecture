var app  = require('./backend/core/config.js')(),
    port = process.env.PORT || 8080;
require('./backend/core/database.js')(/* É preciso inserir o banco de dados aqui. */);

app.listen(port);
console.log("luan-test on port " + port);