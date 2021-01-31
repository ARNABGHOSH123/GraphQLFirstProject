const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

mongoose.connect('mongodb+srv://arnab_ghosh:RadhaMadhav1234%40@testcluster0.d3xja.gcp.mongodb.net/graph_ql_db?retryWrites=true&w=majority',
                {useNewUrlParser: true,useUnifiedTopology:true});
mongoose.connection.once('open',() => {
  console.log('connected to mongodb');
});

app.use('/graphql',graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('now listening on port 4000');
});
