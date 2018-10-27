var express = require('express');
var apiRoutes = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../DB/models/user');
const formidable = require('express-formidable');
const Web3 = require('web3');
const mailer = require('../helper/mailer');
var LoyaltyFactory = require('../ethereum/build/Loyalty.json');
var parseXlsx = require('excel');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.NODEURL));
let accounts = null;
if(process.env.accountAddress){
    accounts = [process.env.accountAddress]
}
console.log(process.env.ContractAddress);
const getInstance = () => {
    return new web3.eth.Contract(
        JSON.parse(LoyaltyFactory.interface),
        process.env.ContractAddress
    );
}
var Ads = require('../DB/models/ads');

var Comapny = require('../DB/models/company');
apiRoutes.post('/authenticate', function (req, res) {
    if (req.body.name === 'root' && req.body.password === 'root') {

        var payload = {
            admin: true
        }
        var token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.json({
            success: true,
            message: 'Enjoy!!!',
            token: token,
            isAdmin: true,
            user: {
                name: 'root',
                id: 'user.id'
            }
        });
        return;
    }
    User.findOne({
        name: req.body.name
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                var payload = {
                    admin: user.admin
                }
                var token = jwt.sign(payload, process.env.SECRET, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.json({
                    success: true,
                    message: 'Enjoy!!!',
                    token: token,
                    isAdmin: user.admin,
                    user: {
                        name: user.name,
                        id: user.id,
                        uId: user.uId,
                        cId: user.uId
                    }
                });
            }
        }
    });
});

apiRoutes.get('/contract', function (req, res) {
    res.json(LoyaltyFactory);
});

apiRoutes.use(function (req, res, next) {
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

apiRoutes.get('/', function (req, res) {
    res.json({ message: 'Ping <<<<<....>>>>> Pong!' });
});


apiRoutes.get('/getCompamies', async function (req, res) {
    accounts = accounts || await web3.eth.getAccounts();
    const totalCompanies = await getInstance().methods.getAllCompanies().call();
    let count = Number(totalCompanies);
    var companies = [];
    var indexs = [];
    while (count > 0) {
        indexs.push(count - 1);
        count--;
    }
    var ss = await Promise.all(indexs.map(async (_in) => {
        const comp = await getInstance().methods.getCompany(_in).call();
        companies.push({
            name: comp,
        });
    }));
    res.json({
        success: true,
        addr: process.env.ContractAddress,
        companies: companies
    });

});


apiRoutes.get('/getReedemable', async function (req, res) {
    accounts = accounts || await web3.eth.getAccounts();
    const totalAds = await getInstance().methods.totalAds().call();
    let count = Number(totalAds);
    var Ads = [];
    var indexs = [];
    while (count > 0) {
        indexs.push(count - 1);
        count--;
    }
    var ss = await Promise.all(indexs.map(async (_in) => {
        const comp = await getInstance().methods.displayAd(_in).call();
        Ads.push({
            text: comp[1],
            id: comp[0],
        });
    }));
    res.json({
        success: true,
        Ads: Ads
    });

});

apiRoutes.get('/getUsers', async function (req, res) {
    accounts = accounts || await web3.eth.getAccounts();
    const totalUsers = await getInstance().methods.getAllUsers().call();
    var numUsers = 0;
    numUsers.push({
        num: totalUsers,
    });
    res.json({
        success: true,
        Usr: numUsers
    });

});
apiRoutes.post('/redeem', async function (req, res) {
    accounts = accounts || await web3.eth.getAccounts();
    await getInstance().methods.redeemAd(parseInt(req.body.aId), parseInt(req.body.uId)).send({ from: accounts[0], gas: 99999 });
    res.status(200).send({
        success: true,
        message: 'Plan Activated'
    });

})
apiRoutes.post('/enroll', async function (req, res) {
    var existingCompany = await Comapny.findOne({
        name: req.body.name
    });
    if (existingCompany) {
        res.status(200).send({
            success: false,
            message: 'Company Already Exist'
        });
    } else {
        const account = await web3.eth.accounts.create(req.body.password || "12345");
        var _company = new Comapny({
            name: req.body.name,
            password: req.body.password,
            privateKey: account.privateKey,
            accountKey: account.address
        })
        _company.save(async function (err, cmp) {
            if (err) {
                res.status(500).send({
                    success: false,
                    message: 'Company::Saved == ERROR'
                });
            } else {
                accounts = accounts || await web3.eth.getAccounts();
                await getInstance().methods.addCompany(cmp.id, cmp.name).send({ from: accounts[0], gas: 99999 });
                totalCompanies = await getInstance().methods.getAllCompanies().call();
                res.json({
                    success: true,
                    company: cmp,
                    total: totalCompanies,
                    message: 'Saving Company!!!!'
                });

            }
        });
    }
});


async function saveUser(user, cId, accounts) {
    return new Promise(async (resolve) => {
        var existingUser = await User.findOne({
            name: user.name
        });
        if (existingUser) {
            resolve(true);
        } else {
            var _user = new User({
                name: user.name,
                password: user.name,
                admin: false,
                uId: user.uId,
                bal: user.bal,
                cId: cId
            })
            _user.save(async function (err, usr) {
                if (err) {
                    resolve(false);
                } else {
                    // addUser(uint uId, string name, uint cId, uint bal)
                    await getInstance().methods.addUser(parseInt(user.uId), user.name, cId, parseInt(user.bal)).send({ from: accounts[0] });
                    resolve();
                }
            });
        }
    });
}


apiRoutes.post('/addAd', async function (req, res) {
    var _ad = new Ads({
        text: req.body.text,
        price: req.body.price,
        cId: req.body.cId
    })
    _ad.save(async function (err, ad) {
        if (err) {
            res.status(500).send({
                success: false,
                message: 'Ad ::Not Saved to system'
            });
        } else {
            accounts = accounts || await web3.eth.getAccounts();
            await getInstance().methods.createAd(parseInt(ad.price), ad.text, parseInt(ad.cId)).send({ from: accounts[0],gas: 200000 });
            res.json({
                success: true,
                message: 'Ad Saved to system'
            });
        }
    });
});
apiRoutes.use(formidable());
apiRoutes.post('/enrollEmp', async function (req, res) {
    const pathOfFile = req.files.file.path;
    const cId = parseInt(req.fields.cId);
    accounts =   accounts || await web3.eth.getAccounts();
    parseXlsx.default(pathOfFile).then(async (data) => {
        var potatoBag = [];
        for (let index = 1; index < data.length; index++) {
            var _user = {
                name: data[index][1],
                password: data[index][1],
                uId: data[index][2],
                bal: data[index][3],
                admin: false
            };
            potatoBag.push(_user);
        }
        var ss = await Promise.all(potatoBag.map(async (_in) => {
            await saveUser(_in, cId, accounts);
        }));
        res.json({
            success: false,
            message: 'Done!'
        });
    });



});

function sendMail(usr) {
    let mailOptions = {
        from: `"Loyalty Exchange " <rishabhthaney@gmail.com>`, // sender's address,
        to: usr.name, // list of receivers
        subject: 'Welcome to Loyalty Exchange Program', // Subject line
        html: '<p>You are enrolled with us!! Please use your email address as your user name and password!!<br/><br/>Click <a href="' + '//localhost:4200' + '">here</a> check out cool offers and redeem them.</p>' // html body
    };
    mailer.sendMail(mailOptions);
}



async function saveUser(user, cId, accounts) {
    return new Promise(async (resolve) => {
        var existingUser = await User.findOne({
            name: user.name,
            cId: user.cId
        });
/*         var basePrice = await Comapny.findOne(
            {
                basePrice: company.basePrice
            }
        ); */
        if (existingUser) {
            await getInstance().methods.addUser(parseInt(user.uId), user.name, cId, parseInt(user.bal)).send({ from: accounts[0], gas: 200000 });
            resolve(true);
        } else {
            var _user = new User({
                name: user.name,
                password: user.name,
                admin: false,
                uId: user.uId,
                bal: user.bal,
                cId: cId
            })
            _user.save(async function (err, usr) {
                if (err) {
                    resolve(false);
                } else {
                    // addUser(uint uId, string name, uint cId, uint bal)
                    await getInstance().methods.addUser(parseInt(user.uId), user.name, cId, parseInt(user.bal)).send({ from: accounts[0], gas: 200000 });
                    setTimeout(() => {
                        sendMail(usr);
                    }, 200)
                    resolve();
                }
            });
        }
    });
}




module.exports = apiRoutes;
