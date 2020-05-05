const myID = 'cakecake';

//buttons and enter page inputs
let canvas;
let regularExit;
let emergencyExit;
let videoCall;
let sites = ["https://www.amazon.com/s?k=stationary&ref=nb_sb_noss_2.com/", "https://www.freshdirect.com/browse.jsp?pageType=browse&id=veg&pageSize=30&all=false&activePage=1&sortBy=null&orderAsc=false&activeTab=product&trk=gnav", "https://www.youtube.com/watch?v=0xPwHR8_D2w.com/", "https://en.wikipedia.org/wiki/Main_Page", "https://www.ebay.com/b/Home-Office-Furniture-Set/88057/bn_1519964"];
let randomSite;
let password;
let passwordInput;
let username;
let usernameInput;
let state;
let myMsgX = 50;
let myMsgY = 50;
let theirMsgX = 50;
let theirMsgY = 100;

// Communication
let peer = null;
let conn = null;
let msgInput;
let sendBtn;
let idInput;
let connectBtn;
let theirMsg = ' ';
let myMsg = '';

function setup() {

    canvas = createCanvas(1100, windowHeight);
    canvas.parent("mybody");

    textBox = createDiv(); // creates a div
    textBox.id('textbox');

    //create peer object
    peer = new Peer(myID, {
      key: 'lwjd5qra8257b9',
      debug: 2
    });

    // pass connection ID into peer object
    peer.on('open', function(id) {
      console.log('My peer ID is: ' + id);
    });

    // executes when connection is established
    peer.on('connection', function(c) {
      conn = c;
    });


    usernameInput = createInput();
    usernameInput.position(520, 280);
    usernameInput.elt.style.borderColor = "#ffffff";

    passwordInput = createInput('', 'password');
    passwordInput.position(520, 325);
    passwordInput.elt.style.borderColor = "#ffffff";

    connectBtn = createButton("Enter Chat");
    connectBtn.position(760, 310);
    connectBtn.mousePressed(connect);
    connectBtn.elt.style.width = "100px";
    connectBtn.elt.style.height = "30px";
    connectBtn.elt.style.fontFamily = "'Roboto', sans-serif";
    connectBtn.elt.style.fontWeight = "600";
    connectBtn.elt.style.color = "#ffffff";
    connectBtn.elt.style.backgroundColor = "#43B6BD";
    connectBtn.elt.style.border = "none";

    codeInput = createInput();
    codeInput.position(520, 370);
    codeInput.elt.style.borderColor = "#ffffff";
}

function draw() {
    switch(state) {
        case 1:
          chatScreen();
          displayMsg();
          console.log("you're in the chat screen");
        break;

        case 2:
          console.log("you're in state 2");
        break;
        
        default: 
          passwordScreen();
          console.log("you're in the password screen");
      }
}

function passwordScreen() {
    windowResized();
    background("#065A60");
    text("Username: ", 400, 300);
    text("Enter password: ", 400, 350);
    text("Enter chat code: ", 400, 400);
    fill("#ffffff");

    if(username != null){
        state = 1;
    }
}


function connect() {
    if (conn) { // Close old connection if applicable
      conn.close();
    }
    conn = peer.connect(codeInput.value(), { // Creates a new connection using the entered ID
      reliable: true
    });
    conn.on('open', function() {
      console.log("connected to: " + conn.peer);
    });
    conn.on('data', function(data) {
      console.log("received: " + data);
      theirMsg = data;
    });

    resizeCanvas(1100, windowHeight);
    username = usernameInput.value(); 
    console.log("submitted!");

    usernameInput.remove();
    passwordInput.remove();
    canvas.elt.style.zIndez = "-10999";
}

function hostID() {
    textSize(12);
    if (peer.id == null) {
      text("generating Host ID...", 50, 50);
    } else if (peer.id != null) { // if peer.id IS NOT empty
      text("My ID: " + peer.id, 50, 50);
    } else if (peer.disconnected) {
      text("Disconnected" + peer.id, 50, 50);
    }
}

function chatScreen() { 
    background("white");
    regularExitBtn();
    emergencyExitBtn();
    startVideoCall();
    noLoop();
    connectBtn.remove();
    codeInput.remove();
    canvas.elt.style.zIndez = "-9999";

    msgInput = createInput();
    msgInput.position(200, 620);
    msgInput.size(500, 40);
    msgInput.style('color', '#000000');
    msgInput.style('border', '2px solid #ffc800');
    msgInput.style('outline', 'none');
    msgInput.elt.style.fontWeight = "500";
    msgInput.style('fontFamily', 'Roboto');
    msgInput.style('fontSize', '14px');
  
    sendBtn = createButton('Send');
    sendBtn.position(760, 620);
    sendBtn.size(100, 40);
    sendBtn.mousePressed(sendMsg);
    sendBtn.elt.style.fontFamily = "'Roboto', sans-serif";
    sendBtn.style('fontSize', '14px');
    sendBtn.elt.style.fontWeight = "600";
    sendBtn.elt.style.color = "#ffffff";
    sendBtn.elt.style.backgroundColor = "#ffc800";
    sendBtn.elt.style.border = "none";
}


function sendMsg() {
    if (conn && conn.open) {
      myMsg = msgInput.value();
      conn.send(myMsg);
      console.log("msg sent!");
      msgInput.value('');
      displayMsg();
    } else {
      console.log("not connected");
    }
}

function receiveMsg() {
  conn.on('data', function(data) {
    console.log("received: " + data);
    theirMsg = data;
  });
}

function displayMyMsg() {
  fill('#43B6BD');
  text(myMsg, myMsgX, myMsgY + 100, 500, 100);
}

function displayTheirMsg() {
  fill('#065A60');
  text(theirMsg, theirMsgX, theirMsgY + 50, 500, 100);
}

function displayMsg() {
  textSize(24);
  displayMyMsg();
  displayTheirMsg();
}

function keyPressed() {
    if (keyCode === 13) { //send msg when ENTER key is pressed
      sendMsg();
    }
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    canvas.elt.style.zIndex = "0";
}

function closeWindow() {
  window.open("index.html", "_self");
}

function openZoomCall() {
  window.open("https://NewSchool.zoom.us/j/9579316204");
}

function regularExitBtn() {
    regularExit = createButton("Leave the Chat");
    regularExit.position(1170, 50);
    regularExit.size(220, 40);
    regularExit.mousePressed(closeWindow);
    regularExit.elt.style.zIndex = "1";
    regularExit.elt.style.width = "150px";
    regularExit.elt.style.height = "50px";
    regularExit.elt.style.fontFamily = "'Roboto', sans-serif";
    regularExit.elt.style.fontSize = "15px";
    regularExit.elt.style.fontWeight = "600";
    regularExit.elt.style.color = "#ffffff";
    regularExit.elt.style.backgroundColor = "#43B6BD";
    regularExit.elt.style.border = "none";
}

function emergencyExitBtn() {
    emergencyExit = createButton("Emergency Exit");
    emergencyExit.position(1170, 130);
    emergencyExit.size(220, 40);
    emergencyExit.mousePressed(openRandomSite);
    emergencyExit.elt.style.zIndex = "2";
    emergencyExit.elt.style.width = "150px";
    emergencyExit.elt.style.height = "50px";
    emergencyExit.elt.style.fontFamily = "'Roboto', sans-serif";
    emergencyExit.elt.style.fontWeight = "600";
    emergencyExit.elt.style.fontSize = "15px";
    emergencyExit.elt.style.color = "#ffffff";
    emergencyExit.elt.style.backgroundColor = "#43B6BD";
    emergencyExit.elt.style.border = "none";

}

function startVideoCall() {
    videoCall = createButton("Video Call");
    videoCall.position(1170, 210);
    videoCall.size(220, 40);
    videoCall.mousePressed(openZoomCall);
    videoCall.elt.style.zIndex = "3";
    videoCall.elt.style.width = "150px";
    videoCall.elt.style.height = "50px";
    videoCall.elt.style.fontFamily = "'Roboto', sans-serif";
    videoCall.elt.style.fontWeight = "600";
    videoCall.elt.style.fontSize = "15px";
    videoCall.elt.style.color = "#ffffff";
    videoCall.elt.style.backgroundColor = "#43B6BD";
    videoCall.elt.style.border = "none";
}

function openRandomSite() {
    randomSite = random(sites);
    window.open(randomSite);
}

