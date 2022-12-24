//캔버스 요소
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//스타일 요소 (색, 스타일, 굵기)
const lineWidth = document.getElementById("line-width");
const color = document.getElementById("color");
//forEach를 사용하기 위해 배열로 만듦
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const modeBtn = document.getElementById("mode-btn");

//지우개 요소
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = 800;
ctx.lineWidth = CANVAS_HEIGHT.value;

let isPainting = false;
let isFilling = false;

/*
캔버스 관련 이벤트
*/

function onMove(event) {
  //그리기 or 브러쉬 이동
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}

function onMouseDown(event) {
  //그리기 시작
  isPainting = true;
}

function canclePainting(event) {
  //그리기 끝
  isPainting = false;
}

function onCanvasClick(event) {
  //fill 모드일 때 전체 색상 채우기 = 캔버스 크기만큼 사각형 그리기
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", canclePainting);
//mouse down 상태로 캔버스를 나가면 다시 들어와도 그려지는 오류 해결을 위해 canvas leave를 감지
canvas.addEventListener("mouseleave", canclePainting);
canvas.addEventListener("click", onCanvasClick);

/*
그리기 관련 이벤트
*/

function onLineWidghChange(event) {
  //브러쉬 두께 변경
  ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
  //브러쉬 색상 변경
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
  //즐겨찾기 색상 선택 (브러쉬 색상 변경)
  //dataset은 html에서 직접 설정해준 data- 요소를 사용하는 것
  ctx.strokeStyle = event.target.dataset.color;
  ctx.fillStyle = event.target.dataset.color;
  color.value = event.target.dataset.color;
}

function onModeClick() {
  //그리기, 채우기 모드 선택
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
}

function onDestroyClick() {
  //모두 지우기 = 캔버스 크기만큼 흰색 사각형 그리기
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  //destroy 이후 바로 fill을 할 때 색상이 변경되지 않는 오류 수정
  //위에서 fillStyle = "white"로 설정했기 때문에 fill이 채워지지 않음
  ctx.fillStyle = color.value;
}

function onEraserClick() {
  //지우개
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
}

lineWidth.addEventListener("change", onLineWidghChange);
color.addEventListener("change", onColorChange);
//각 div마다 이벤트 부여
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
