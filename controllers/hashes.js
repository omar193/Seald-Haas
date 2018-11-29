const JWT = require('jsonwebtoken');
const Hash = require('../models/hash');

const crypto = require('crypto');
const key = 'TheKey%%123';


module.exports = {
    calculateHash: async (req, res, next) => {
        //getting data and iteration
        //req.value.body
        console.log('contents of req.value.body', req.value.body);
        console.log('HashController.calculateHash() called!');
        const { data, algorithm, iteration } = req.value.body;
        const newHash = new Hash({ data, algorithm, iteration });
        await newHash.save();
        
        //Encrypt data 
        var hash = crypto.createCipher("aes-256-ctr",key).update(data,"utf-8","hex");
        console.log(hash);


        res.status(200).json({ hash });






    },
    generateDummyHash: async (req, res, next) => {
        console.log('Dummy function !');
        res.json({ hash: "0000000000000000000" });



    }
}