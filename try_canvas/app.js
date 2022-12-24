const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 800;

// 좌표의 시작: 왼쪽 위
// (x1, y1, width, height)

/*
집 그리기
*/

//벽 + 문
ctx.fillRect(550, 550, 50, 200);
ctx.fillRect(750, 550, 50, 200);
ctx.lineWidth = 2;
ctx.fillRect(650, 650, 50, 100);
ctx.fillRect(550, 550, 200, 20);

//지붕
ctx.moveTo(550, 550);
ctx.lineTo(675, 450);
ctx.lineTo(800, 550);
ctx.fill();

/*
사람 그리기
*/

//팔
ctx.beginPath();
ctx.fillRect(170, 170, 15, 100);
ctx.fillRect(310, 170, 15, 100);

//몸통
ctx.fillRect(220, 170, 60, 200);

//머리
//(x, y, 반지름, 시작 각도, 끝 각도)
ctx.arc(250, 100, 50, 0, 2 * Math.PI);
ctx.fill();

//눈
//fill color를 다르게 설정하기 때문에 beginPath
ctx.beginPath();
ctx.arc(270, 80, 8, Math.PI, 2 * Math.PI);
ctx.arc(230, 80, 8, Math.PI, 2 * Math.PI);
ctx.fillStyle = "white";
ctx.fill();
