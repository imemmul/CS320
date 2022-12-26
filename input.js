let inputDirection = { x: 0, y: 0 }
let lastInputDirection = { x: 0, y: 0 }
var command = "STARTING"
var new_command = command
URL = "http://192.168.1.104:4000/commands"

// This should be converted into a background listener.
function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
	  if ((new Date().getTime() - start) > milliseconds){
		break;
	  }
	}
}

function command_listener(){
  $(function() {
    var t = 1;
    console.log("Hey, the ajax will start! t's value: " + t);
    $.ajax({
        url: URL,
        method: 'GET',
        success: function (data) {
            t++;
            console.log("We've received an answer! value: " + data);
            send_command(command, data)
        },
        error: function (xhr, status, error) {
            t++;
            console.log("We've received an error!  value: " + data);
        }
    });
    console.log("Hey, the ajax just ended.... Not really. t's value: " + t);
  });
  console.log("I am running")
}

setInterval(command_listener, 500);

function send_command(command, new_command){
  if (new_command != command){
    console.log("Command moved the snake")
    move_snake(parse_command(new_command))
    command = new_command
    }
}


function parse_command(command){
  var move_key = ""
  if(command == "UP"){
    move_key = 'ArrowUp'
  }else if(command =="LEFT"){
    move_key = 'ArrowLeft'
  }else if(command == "RIGHT"){
    move_key = 'ArrowRight'
  }else if(command == "DOWN"){
    move_key = 'ArrowDown'
  }else if (command == "PAUSE"){
    move_key = "P"
  }else{
    move_key = "C"
  }
  console.log(move_key)
  return move_key
}

function move_snake(command){
    switch (command) {
      case 'ArrowUp':
        if (lastInputDirection.y !== 0) break
        inputDirection = { x: 0, y: -1 }
        break
      case 'ArrowDown':
        if (lastInputDirection.y !== 0) break
        inputDirection = { x: 0, y: 1 }
        break
      case 'ArrowLeft':
        if (lastInputDirection.x !== 0) break
        inputDirection = { x: -1, y: 0 }
        break
      case 'ArrowRight':
        if (lastInputDirection.x !== 0) break
        inputDirection = { x: 1, y: 0 }
        break
    }
}

export function getInputDirection() {
  lastInputDirection = inputDirection
  return inputDirection
}