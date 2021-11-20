'use strict';

const FIELD_BLOCK = 30;
const BLOCK_SIZE = 20;
const FIELD_SIZE = FIELD_BLOCK * BLOCK_SIZE;

const can = document.getElementById("can");
can.width = FIELD_SIZE;
can.height = FIELD_SIZE;
can.style.border = "4px solid #555"
const context = can.getContext("2d");

var prayer_x = 1;
var prayer_y = 28;

var goal_x = 0;
var goal_y = 0;

const field = [
  [1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1],
  [1,0,1,0,0,0,1,0,0,0,0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1],
  [1,0,1,0,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,0,1,1,1,0,1,0,1,1],
  [1,0,0,0,1,0,0,0,1,0,0,0,0,1,1,1,0,0,0,0,1,0,1,0,0,0,1,0,0,1],
  [1,1,1,0,0,0,1,0,0,0,1,0,0,0,0,1,1,1,1,0,1,0,1,0,1,0,1,1,0,1],
  [1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,1,0,1,0,1,0,1,0,0,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1,0,1,0,1,0,1,0,1,1,0,1],
  [1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,0,0,1,0,0,1,0,1,0,1,0,1,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,1,0,1,0,1,1,1,0,1,0,1,1],
  [1,0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,0,1,0,0,0,0,1,0,0,0,1,0,0,1],
  [1,0,1,0,1,1,1,0,0,0,0,1,0,0,0,1,0,1,1,0,1,1,1,0,1,0,1,0,1,1],
  [1,0,1,0,1,0,1,1,1,1,0,1,0,1,0,1,0,0,0,0,1,0,1,0,1,0,1,0,0,1],
  [1,0,0,0,1,0,0,0,0,1,0,1,0,1,0,1,0,1,1,0,1,0,1,0,1,1,1,1,0,1],
  [1,0,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,0,0,0,1,0,1,0,1,0,0,0,0,1],
  [1,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1],
  [1,1,1,1,1,1,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
  [1,0,0,0,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,0,0,1,0,1],
  [1,0,1,1,0,1,0,1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,1,0,1,0,1],
  [1,0,1,0,0,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,0,0,0,1,0,1],
  [1,0,1,1,1,1,0,1,0,1,0,1,0,0,0,1,0,1,1,1,0,1,0,0,0,1,0,1,0,1],
  [1,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,1],
  [1,0,1,1,1,1,1,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
  [1,0,1,0,0,0,0,0,0,0,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,0,0,0,0,1],
  [1,0,1,1,1,1,1,0,1,1,0,0,0,1,0,1,0,0,0,1,0,1,0,1,1,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1],
  [1,0,1,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

function fieldPoint () {
  for (let y = 0; y < FIELD_BLOCK; y++) {
    for (let x = 0; x < FIELD_BLOCK; x++) {
      if (field[y][x] == 3) {
        goal_x = x;
        goal_y = y;
      };
    };
  };
};

fieldPoint();

/*var field = [];
for (var y = 0; y < FIELD_BLOCK; y++) {
  field[y] = [];
  for (var x = 0; x < FIELD_BLOCK; x++) {
    field[y][x] = 0;
  };
};*/
function drawAll () {
  context.clearRect(0,0,FIELD_SIZE,FIELD_SIZE);
  /*for (var y = 0; y < FIELD_BLOCK; y++) {
    for (var x = 0; x < FIELD_BLOCK; x++) {
      if (x == 0 || x == FIELD_BLOCK - 1) {
        field[y][x] = 1;
      }else if (y == 0 || y == FIELD_BLOCK - 1){
        field[y][x] = 1;
      }else if (x == prayer_x && y == prayer_y) {
        field[y][x] = 2;
      }else {
        field[y][x] = 0;
      }
    };
  };*/
  field[prayer_y][prayer_x] = 2;
  for (var y = 0; y < FIELD_BLOCK; y++) {
    for (var x = 0; x < FIELD_BLOCK; x++) {
      if (field[y][x] == 1) {
        var fp_x = x * BLOCK_SIZE;
        var fp_y = y * BLOCK_SIZE;
        context.fillStyle="BLUE";
        context.fillRect(fp_x,fp_y,BLOCK_SIZE,BLOCK_SIZE);
        context.strokeStyle = "BLACK";
        context.strokeRect(fp_x,fp_y,BLOCK_SIZE,BLOCK_SIZE);
      } else if (field[y][x] == 2) {
        var fp_x = prayer_x * BLOCK_SIZE;
        var fp_y = prayer_y * BLOCK_SIZE;
        context.fillStyle="RED";
        context.fillRect(fp_x,fp_y,BLOCK_SIZE,BLOCK_SIZE);
        context.strokeStyle = "BLACK";
        context.strokeRect(fp_x,fp_y,BLOCK_SIZE,BLOCK_SIZE);
      } else if (field[y][x] == 3) {
        var fp_x = x * BLOCK_SIZE;
        var fp_y = y * BLOCK_SIZE;
        context.fillStyle="LIGHTGREEN";
        context.fillRect(fp_x,fp_y,BLOCK_SIZE,BLOCK_SIZE);
        context.strokeStyle = "BLACK";
        context.strokeRect(fp_x,fp_y,BLOCK_SIZE,BLOCK_SIZE);
      }
    };
  };
}

drawAll();

document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 37:
      if (checkMove(-1,0) && checkGoal(-1,0)) prayer_x--;//左
      break;
    case 38:
      if (checkMove(0,-1) && checkGoal(0,-1)) prayer_y--;//上
      break;
    case 39:
      if (checkMove(1,0) && checkGoal(1,0)) prayer_x++;//右
      break;
    case 40:
      if (checkMove(0,1) && checkGoal(0,1)) prayer_y++;//下
      break;
  }
  drawAll();
}

function checkGoal (mx,my) {
  if (field[prayer_y + my][prayer_x + mx] == 3) {
    alert("ゴール！！");
    return true;
  }else {
    return true;
  };
};

function checkMove(mx,my) {
  var npx = prayer_x + mx;
  var npy = prayer_y + my;
  if (field[npy][npx] != 1) {
    return true;
  };
};