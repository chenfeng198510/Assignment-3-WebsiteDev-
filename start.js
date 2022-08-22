const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://cfeng198510:fc65345562@cluster0.tr4fe3f.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection
  .on('open', () => {
   console.log('Mongoose connection open');
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });
  require('./models/Product');
  require('./models/Registration');

 const app = require('./app');
 const server = app.listen(3000, () => {
   console.log(`Express is running on port ${server.address().port}`);
 });