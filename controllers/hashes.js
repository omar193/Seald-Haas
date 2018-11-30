const JWT = require('jsonwebtoken');
const Hash = require('../models/hash');

const crypto = require('crypto');
const key = 'TheKey%%123';


module.exports = {
    /*
     *return 200 if the ressource  already not exists & exists in the database using callback done
     *return hashed data value in res.json
    */
    calculateHash: async (req, res, next) => {
        //getting data, and iteration
        //req.value.body
        console.log('HashController.calculateHash() called!');
        const { data, algorithm, iteration } = req.value.body;
        const newHash = new Hash({ data, algorithm, iteration });
        await newHash.save();
        //Encrypt data 
        var hash = crypto.createHash('md5').update(data).digest("hex");
        console.log(hash);
        res.status(200).json({ hash });
    },
    /* 
     * return 0000000000000000000 when called
    **/
    generateDummyHash: async (req, res, next) => {
        console.log('Dummy function !');
        res.json({ hash: "0000000000000000000" });
    }
}