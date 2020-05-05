// Profile
const myID = '1234'; // give this ID to your guest

// Communication
let canvas;
let peer = null;
let conn = null;
let msgInput;
let sendBtn;
let theirMsg = ' ';
let myMsg = ' ';

function setup() {
    canvas = createCanvas(1100, windowHeight);
    canvas.parent("mybody");
    messageButtons();


    //create peer object
    peer = new Peer(myID, {
      key: 'lwjd5qra8257b9',
      debug: 2
      // add own key
      // add host to get off cloud
    });
  
    // pass connection ID into peer object
    peer.on('open', function(id) {
      console.log('My peer ID is: ' + id);
    });
  
    // executes when connection is established
    peer.on('connection', function(c) {
      conn = c;
      receiveMsg();
    });
}

function draw() {
    displayMsg();
}

function messageButtons() {
    msgInput = createInput();
    msgInput.position(200, 600);
    msgInput.size(500, 70);
    msgInput.style('color', '#000000');
    msgInput.style('border', '2px solid #ffc800');
    msgInput.style('outline', 'none');
  
    sendBtn = createButton('send');
    sendBtn.position(760, 620);
    sendBtn.size(100, 40);
    sendBtn.mousePressed(sendMsg); 
}

function hostID() {
    textSize(12);
    if (peer.id == null) {
      text("generating Host ID...", 50, 50);
    } else if (peer.id != null) { // if peer.id IS NOT empty
      text("Host ID: " + peer.id, 50, 50);
    } else if (peer.disconnected) {
      text("Disconnected" + peer.id, 50, 50);
    }
}
  
function receiveMsg() {
    conn.on('data', function(data) {
      console.log("received: " + data);
      theirMsg = data;
    });
}
  
  function sendMsg() {
    if (conn && conn.open) {
      myMsg = msgInput.value();
      conn.send(myMsg);
      console.log("msg sent!");
      msgInput.value('');
    } else {
      console.log("not connected");
    }
  }



function keyPressed() {
    if (keyCode === 13) { //send msg when ENTER key is pressed
        sendMsg();
    }
}
  
function displayMsg() {
    fill('black');
    textSize(24);
    // their message
    text(theirMsg, 50, 100, 200, 200);
    fill('#000000');
    // my message
    text(myMsg, 50, height / 2 + 70, 200, 200);
    fill('#000000');
}