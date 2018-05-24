const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = 8080;
const Web3 = require('Web3');
const cors = require('cors');
var ABI;
var MyContract;
var ADDRESS;
var web3js;
var data = {};
function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxx-xxxxxx-4xxx-yxxx-xxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

app.listen(port.toString(), function(req, res) {
	console.log('Listening on http://localhost:' + port.toString());
	web3js = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/B0H6SvaNDa1zOXROqrp1"));
	// web3s = new Web3(new Web3.providers.HttpProvider("http://"))
	ABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "uuid",
				"type": "bytes32"
			},
			{
				"name": "email",
				"type": "bytes32"
			},
			{
				"name": "username",
				"type": "bytes32"
			},
			{
				"name": "password",
				"type": "bytes32"
			},
			{
				"name": "phone_number",
				"type": "bytes32"
			},
			{
				"name": "physical_address",
				"type": "bytes32"
			},
			{
				"name": "website",
				"type": "bytes32"
			},
			{
				"name": "business_name",
				"type": "bytes32"
			}
		],
		"name": "addResturant",
		"outputs": [
			{
				"name": "",
				"type": "bytes32[8]"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "uuid",
				"type": "bytes32"
			}
		],
		"name": "deleteResturant",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "uuid",
				"type": "bytes32"
			}
		],
		"name": "makeTransaction",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "uuid",
				"type": "bytes32"
			}
		],
		"name": "get",
		"outputs": [
			{
				"name": "",
				"type": "bytes32[8]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getIDs",
		"outputs": [
			{
				"name": "",
				"type": "bytes32[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "resturant_group",
		"outputs": [
			{
				"name": "uuid",
				"type": "bytes32"
			},
			{
				"name": "email",
				"type": "bytes32"
			},
			{
				"name": "username",
				"type": "bytes32"
			},
			{
				"name": "password",
				"type": "bytes32"
			},
			{
				"name": "phone_number",
				"type": "bytes32"
			},
			{
				"name": "physical_address",
				"type": "bytes32"
			},
			{
				"name": "website",
				"type": "bytes32"
			},
			{
				"name": "business_name",
				"type": "bytes32"
			},
			{
				"name": "popularity",
				"type": "uint32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "testA",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "testB",
		"outputs": [
			{
				"name": "",
				"type": "bytes32[]"
			}
		],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "testC",
		"outputs": [
			{
				"name": "",
				"type": "bytes32[8]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
	ADDRESS = "0xf01d40605cb3fc3803b11f32e694e25a2598d1d3";
	web3js.eth.defaultAccount = web3js.eth.accounts[0];

	MyContract = new web3js.eth.Contract(ABI, ADDRESS);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.get('/', function(req, res) {
	res.status(200);
});


app.post('/get', function(req, res) {
	console.log("READ");
	var body = req.body;
	body = JSON.parse(Object.keys(body)[0]);

	console.log(body);
	console.log(typeof body.id);

	console.log("Sent: ");
	console.log(body.id);
	console.log(typeof body.id);
	MyContract.methods.get(body.id).call().then( (response) => {
		console.log("Wait fin");
		console.log(response);
		response = web3js.utils.hexToAscii(response[0]);
		res.send(response);
	}, function(err) {
		console.log("README str");
		console.log(err);
		res.send(err);
	});
});

app.post('/register', function(req, res) {
	var body = req.body;
	body = JSON.parse(Object.keys(body)[0]);
	if (typeof body.email == undefined || typeof body.username == undefined || typeof body.password == undefined || 
		typeof body.phone_number == undefined || typeof body.physical_address == undefined ||
		typeof body.website == undefined || typeof body.business_name == undefined) {
		res.status(404);
		res.send('Null field');
		console.log("404 err");
		console.log(body);
	} else {

		// var buff = "12345678912345678912345678912345";
		// var uuid = uuidv5(body.name + body.password + body.username, buff);
		var uuid = web3js.utils.fromAscii(generateUUID());
		body.email = web3js.utils.fromAscii(body.email);
		body.username = web3js.utils.fromAscii(body.username);
		body.password = web3js.utils.fromAscii(body.password);
		body.phone_number = web3js.utils.fromAscii(body.phone_number);
		body.physical_address = web3js.utils.fromAscii(body.physical_address);
		body.website = web3js.utils.fromAscii(body.website);
		body.business_name = web3js.utils.fromAscii(body.business_name);


		var success = MyContract.methods.addResturant(uuid, body.email, body.username, body.password, body.phone_number, 
			body.physical_address, body.website, body.business_name).call().then(function(response) {
			console.log("Success Value");
			res.status(200);
			res.send(response);
		}, function(err) {
			console.log("README Error");
			console.log(err);
			res.status(404);
			res.send(err);
		});
	}
});

app.get('/getAll', function(req, res) {
	var uuids;

	MyContract.methods.getIDs().call().then((response)=>{
		console.log("Success");
		uuids = response;
		setTimeout(()=>{res.send(data)}, 160*uuids.length);

		console.log(response);
		async function doThing(i) {
				let response = await MyContract.methods.get(uuids[i]).call();
				var subBlock = {};
				console.log(i+" Iteration");

				subBlock['uuid'] = web3js.utils.hexToAscii(response[0].replace(/0+$/g, ""));
				subBlock['email'] = web3js.utils.hexToAscii(response[1].replace(/0+$/g, ""));
				subBlock['username'] = web3js.utils.hexToAscii(response[2].replace(/0+$/g, ""));
				subBlock['password'] = web3js.utils.hexToAscii(response[3].replace(/0+$/g, ""));
				subBlock['phone_number'] = web3js.utils.hexToAscii(response[4].replace(/0+$/g, ""));
				subBlock['physical_address'] = web3js.utils.hexToAscii(response[5].replace(/0+$/g, ""));
				subBlock['website'] = web3js.utils.hexToAscii(response[6].replace(/0+$/g, ""));
				subBlock['business_name'] = web3js.utils.hexToAscii(response[7].replace(/0+$/g, ""));


				data[i+""] = subBlock;
		}

		for (var i = 0; i < uuids.length; i++) {
			doThing(i);
		}
	});
	
});

app.get("/showAll", function(req, res) {
	res.send(data);
});
app.get('/testA', function(req, res) {
	MyContract.methods.testA().call().then((response)=>{
		console.log("Success");
		res.send(response);
	}, (err)=> {
		console.log("Test Failure");
		res.send(err);
	});
});

app.get('/testC', function(req, res) {
	MyContract.methods.testC().call().then((response)=>{
		console.log("Success");
		res.send(response);
	}, (err)=> {
		console.log("Test Failure");
		res.send(err);
	});
})

app.get('/login', function(req, res) {
	res.status(200);
	// Logic
});


