import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

var ipfsAPI = require('ipfs-api');

const files = [
    {
        path: '/test21.txt',
        content: (Buffer)
}
];

myContractAddress = "0x9b3962a1393a61de4cba04c93def084154ed29bc";

var ABIArray = [{"constant":true,"inputs":[],"name":"policyTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"claim","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numActPolicies","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"buyPolicy","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"extract","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"sendClaims","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"currentAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"_policytime","type":"uint256"},{"name":"_premium","type":"uint256"},{"name":"_claim","type":"uint256"}],"payable":true,"type":"constructor"}];


Template.hello.onCreated(function helloOnCreated() {
    // counter starts at 0
    this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
    counter() {
        var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'})

        ipfs.files.add(files, function (err, files) {
            // 'files' will be an array of objects
        })


        var template = Template.instance();

        web3.eth.getBalance("0x4649ADe97B70F141A80108Fb6d71CaBa446f1664", function(err, res){
                console.log("Contract Balance: " + res);
            }
        );

        myContract = web3.eth.contract(ABIArray, function(err, res){
            }
        );
        contractInstance = myContract.at(myContractAddress);
        console.log(contractInstance);

        contractInstance.numActPolicies(function(err, res){
            console.log("Number of Policies: " + res);
            TemplateVar.set(template, "numActPol", res);
        });

    },
});

Template.hello.events({
    'click button'(event, instance) {
        // increment the counter when button is clicked
        contractInstance.buyPolicy({value: web3.toWei('10', 'ether'), gas: 3000000},function(err, res){
        })


    },
});
