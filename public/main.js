'use strict';

var app = angular.module('myApp', [])


app.controller('mainCtrl', function($scope, $http){
  $scope.transactions = []; 
  $scope.balance = 0;
  getTransactions();


  $scope.addTrans = function(){
    var trans = angular.copy($scope.newTrans)

    if (trans.value >= 0){
      trans.credit = trans.value 
    } else {
      trans.debit = trans.value
    }
    delete trans.value
    
    // trans.date = trans.date.toDateString();
    $scope.transactions.push(trans);
    $scope.newTrans = {} //clears out all the inputs
    $http.post('/transaction/add', trans)
    .then(function(res){
      updateBalance()
    }, function(err) {
      console.error(err);
    });
  }


  function getTransactions(){
    $http.get('/transaction')
    .then(function(res){
      res.data = res.data.map(transaction => {
        transaction.date = new Date(transaction.date)
        return transaction;
      })
      $scope.transactions = res.data
      updateBalance()
    }, function(err){
      console.error(err);
    });
    
  }
//   $scope.editIndex = null
//   $scope.updateContact = function(index){
//    $scope.editIndex = index
//  }

//  $scope.enterInfo = function(){
//   $scope.contacts[$scope.editIndex] =  $scope.editContact

//   $http.put('/contacts/update/', $scope.contacts)
//   .then(function(res){
//     $scope.contacts = res.data

//   }, function(err){
//     console.error(err);
//   });  
// }


$scope.deleteTrans = function(_id){
  swal({   title: "Are you sure?",   
    text: "You will not be able to recover this transaction!",
    type: "warning",
    showCancelButton: true, 
    confirmButtonColor: "#DD6B55", 
    confirmButtonText: "Yes, delete it!",
    closeOnConfirm: false },
    function(){   
   $scope.transactions = $scope.transactions.filter(function(trans){
    return trans.id !== _id;
  })
   $http.delete(`/transaction/delete/${_id}`)
   .then(function(res){
    updateBalance()

  }, function(err){
    console.error(err);
  });
  swal("Deleted!",
   "Your transaction has been deleted.",
   "success"); 
});


}

function  updateBalance(){
  $scope.balance = $scope.transactions.reduce(function(balance, transaction){
    return balance += transaction["credit"] || transaction["debit"] || 0;
  }, 0);

  if ($scope.balance <= 50){
    $scope.phrase = 'You are really poor.'
  } else if ($scope.balance <= 5000) {
    $scope.phrase = 'Hey, not too bad.'
  } else {
    $scope.phrase = 'Can I borrow some money?'
  }
}

});



