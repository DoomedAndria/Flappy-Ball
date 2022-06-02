let ball;
let width = 800;
let height = 600
let gameStarted;
let img;


function setup() {
  createCanvas(width, height);
  ball = new Ball();
  ground = new Ground();
  obstacle0 = new ObstacleDow(0);
  obstacle1 = new ObstacleDow(1);
  obstacle2 = new ObstacleDow(2);
  obstacle3 = new ObstacleDow(3);
  gameStarted = false;

  frameRate(60);
}

function draw() {
  background(54, 170, 224);
  // ground.show();
  ball.show();
  obstacle0.show();
  obstacle1.show();
  obstacle2.show();
  obstacle3.show();

  if (gameStarted && !collideForAll(obstacle0, obstacle1, obstacle2, obstacle3, ball)) {
    ball.update();
    obstacle0.update(obstacle3);
    obstacle1.update(obstacle0);
    obstacle2.update(obstacle1);
    obstacle3.update(obstacle2);

  }
  else if (!gameStarted) {
    startingTexts();
  }
  else {
    endingTexts();
  }

}

function collide(bal, obs) {
  return (bal.x >= obs.x - bal.radius && bal.x <= obs.x + obs.width + bal.radius &&
    (bal.y >= obs.y - bal.radius || bal.y <= obs.y - obs.dist + bal.radius));
}
function collideForAll(obs0, obs1, obs2, obs3, bal) {
  return collide(bal, obs0) || collide(bal, obs1) || collide(bal, obs2) || collide(bal, obs3);
}

function ObstacleDow(a) {
  this.width = 50;
  this.x = 200 + a * 250 + random(1, 5) * 10;
  this.height = random(2, 8) * 50;
  this.y = height - this.height;
  this.speed = 5;
  this.dist = 150 + random(1, 3) * 20;




  this.update = function (forwardObs) {
    if (this.x + this.width <= 0) {
      this.x = forwardObs.x + 200 + random(1, 3) * 20;
      this.height = random(2, 8) * 40;
      this.y = height - this.height;
      this.dist = 100 + random(2) * 50;
    }
    this.x -= this.speed;
  }
  this.show = function () {
    fill(0, 255, 0);
    rect(this.x, this.y, this.width, this.height);
    rect(this.x, 0, this.width, height - this.height - this.dist);
  }
}

function startingTexts() {
  textSize(32);
  fill(255, 0, 106);
  textStyle(BOLD);
  text("Press \"S\" to start", width / 2 - 150, height / 2 - 50);
  text("Press \"R\" to restart", width / 2 - 150, height / 2);
  text("Press \"SPACE\" to jump", width / 2 - 150, height / 2 + 50);
}
function endingTexts() {
  textSize(64);
  fill(255, 0, 0);
  text("You Died", width / 2 - 150, height / 2 - 50);
  textSize(32);
  fill(255, 0, 106);
  textStyle(BOLD);
  text("Press \"R\" to restart", width / 2 - 150, height / 2 + 50);
}

function keyPressed() {
  if (keyCode === 32) {
    ball.jump();
  }
  if (key === 'r') {
    setup();
  }
  if (key === 's') {
    gameStarted = true;
  }
}
function Ground() {
  this.height = 50;
  this.yCoor = height - this.height;
  this.show = function () {
    fill(0, 255, 0);
    rect(0, this.yCoor, width, height);
  }

}


function Ball() {
  this.radius = 15;
  this.x = 80;
  this.y = height / 2;
  this.speed = 0
  this.acceler = 0.5;
  this.jumpSpeed = -7;

  this.update = function () {
    if (this.y + this.speed <= ground.yCoor - this.radius) {
      this.speed += this.acceler;
      this.y += this.speed;

    }
    else if (this.y + this.speed != ground.yCoor - this.radius) {
      this.y = ground.yCoor - this.radius;
      this.speed = - this.speed * 7 / 12;
    }
  }
  this.show = function () {
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }
  this.jump = function () {
    if (gameStarted)
      this.speed = this.jumpSpeed;

  }
}