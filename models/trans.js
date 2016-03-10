'use strict';

var fs = require('fs');
var path = require('path');
var uuid = require('uuid');

var transFilePath = path.join(__dirname, "../data/trans.json")


exports.write = function(transactions, cb) {
  fs.writeFile(transFilePath, JSON.stringify(transactions), cb);
};

exports.read = function(cb){
  fs.readFile(transFilePath, function(err, data){
    if(err) return cb(err);
    var transactions = JSON.parse(data);
    cb(null, transactions);
  });
}

exports.create = function(newTrans, cb) {

  this.read((err, transactions) => {
    if(err) return cb(err);
    newTrans.id = uuid();
    transactions.push(newTrans);
    this.write(transactions, cb);
  });
};


exports.delete = function(id, cb)  {
  console.log(1)
  this.read((err, transactions) => {
    console.log(id)
    console.log(2)
  var length = transactions.length
  transactions = transactions.filter(function(trans){
    return trans.id !== id;
  });
  if(length === transactions.length) {
  console.log(3)
    cb( {err: "Transaction not found"});
  }
  this.write(transactions, cb);
});
}

