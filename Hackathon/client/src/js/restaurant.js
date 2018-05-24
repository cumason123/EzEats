

function getRestaurants() {
  var xhr = new XMLHttpRequest();

  xhr.open("GET", "http://localhost:8080/getAll");
  xhr.send();
  setTimeout(function() {
      var jsonObjs = JSON.parse(xhr.responseText);

      console.log(jsonObjs);
        Object.keys(jsonObjs).forEach((key)=>{
        generate_table(jsonObjs[key]);
    });
  }, 3000);

};


function page(msg) {
  console.log(msg+"Page was called");
    const accountSid = 'AC1c7d3263fdec6f75cf79db375340dd39';
    const authToken = 'b7c6a30c3d3c747d9d52e96507a9a0c1';
    const twilio = require('twilio');
    const client = new twilio(accountSid, authToken)

    client.messages
    .create({
       body: 'This is a mock simulation of a smart contract from service provider' + msg + 'because I am too sleep deprived to'+
       'fix this otherwise',
       from: '+12013471834',
       to: '+9173285390'
     })
    .then(message => console.log(message.sid))
    .done();
}

function generate_table(jsonObj) {
  // get the reference for the body

  var body = document.getElementsByTagName("body")[0];
  
  // creates a <table> element and a <tbody> element
  var tbl = document.getElementsByClassName("table")[0];
  var tblBody = document.getElementsByClassName("tBody")[0];
 
    // creates a table row
    var row = document.createElement("tr");

      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row

      Object.keys(jsonObj).forEach((key)=>{
        if (key!=='password' && key!=='username' && key!=='uuid') {

          var cell = document.createElement("td");
          var cellText = document.createTextNode(jsonObj[key]);
          cell.appendChild(cellText);
          row.appendChild(cell);
        }
      });

      
    var aTag = document.createElement('button');

    aTag.setAttribute('id',"btn"+ jsonObj['business_name']);
    aTag.innerHTML = "Smart Contract Interaction";
    row.appendChild(aTag);
    // add the row to the end of the table body
    tblBody.appendChild(row);
    document.getElementById('btn'+jsonObj['business_name']).addEventListener("click", function(){
    page(jsonObj['business_name']);});
  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
}