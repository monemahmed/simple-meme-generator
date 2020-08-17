let dc = document.querySelector("#dc");
const SCRadio = document.querySelector("#single_canvas");
const DCRadio = document.querySelector("#double_canvas");
const SCContaier = document.querySelector(".single-canvas");
const DCContaier = document.querySelector(".double-canvas");

ctx = dc.getContext("2d");
ctx.fillStyle = "blue";
ctx.fillRect(0, 200, 400, 200);

SCRadio.addEventListener("click", function () {
  SCContaier.style.display = "block";
  DCContaier.style.display = "None";
});
DCRadio.addEventListener("click", function () {
  DCContaier.style.display = "block";
  SCContaier.style.display = "None";
});

//previous Content Need Tinkering

let file;
let bgImage = document.querySelector("#bgImage");
let bgImageTop = document.querySelector("#bgImageTop");
let bgImageBottom = document.querySelector("#bgImageBottom");

bgImage.addEventListener("change", handleFileSelect);
bgImageTop.addEventListener("change", handleFileSelect);
bgImageBottom.addEventListener("change", handleFileSelect);

function textChangeListener(evt) {
  var id = evt.target.id;
  var text = evt.target.value;
  console.log(text);

  if (id == "text-top") {
    window.topLineText = text;
  } else {
    window.bottomLineText = text;
  }

  redrawMeme(window.imageSrc, window.topLineText, window.bottomLineText);
}

function redrawMeme(image, topLine, bottomLine, targetId, from) {
  // Get Canvas2DContext
  let canvas;
  if (targetId == "bgImage") {
    canvas = document.querySelector(".single-canvas canvas");
  } else if (targetId == "bgImageTop" || targetId == "bgImageBottom") {
    canvas = document.querySelector(".double-canvas canvas");
  } else if (!targetId && window.id == "bgImage")
    canvas = document.querySelector(".single-canvas canvas");
  else if (!targetId && window.id != "bgImage")
    canvas = document.querySelector(".double-canvas canvas");

  console.log("targetId=", targetId, "canvs= ", canvas);

  let ctx = canvas.getContext("2d");

  // Your code here
  if (image != null && targetId == "bgImage")
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  else if (image != null && targetId == "bgImageTop") {
    window.images[0] = image;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height / 2);
  } else if (image != null && targetId == "bgImageBottom") {
    console.log(image);

    window.images[1] = image;
    ctx.drawImage(image, 0, canvas.height / 2, canvas.width, canvas.height / 2);
  } else if (!targetId && window.id == "bgImage") {
    console.log("Yes I am Here");
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  } else if (!targetId && window.id != "bgImage") {
    ctx.drawImage(window.images[0], 0, 0, canvas.width, canvas.height / 2);
    ctx.drawImage(
      window.images[1],
      0,
      canvas.height / 2,
      canvas.width,
      canvas.height / 2
    );
  }
  ctx.font = "30pt Impact";
  ctx.textAlign = "center";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 3;
  ctx.fillStyle = "white";

  if (topLine != null) {
    let i = 0;
    let singleLine = "";
    let lines = [];
    while (true) {
      let width = ctx.measureText(singleLine).width;
      if (!topLineText[i]) {
        lines.push(singleLine);
        break;
      }

      singleLine += topLineText[i];
      i += 1;
      if (width >= 450) {
        lines.push(singleLine);
        singleLine = "";
      }
    }
    console.log(singleLine);
    console.log(lines);
    lines.map(function (line, factor) {
      ctx.fillText(line, canvas.width / 2, 40 * (factor + 1));
      ctx.strokeText(line, canvas.width / 2, 40 * (factor + 1));
    });
  }

  if (bottomLine != null) {
    ctx.fillText(bottomLine, canvas.width / 2, canvas.height - 20);
    ctx.strokeText(bottomLine, canvas.width / 2, canvas.height - 20);
  }
}

// function saveFile() {
//   window.open(document.querySelector("canvas").toDataURL());
// }

function handleFileSelect(evt) {
  let targetId = evt.target.id;
  window.id = targetId;
  if (targetId == "bgImage") {
    var canvasWidth = 400;
    var canvasHeight = 400;
  }

  var file = evt.target.files[0];

  var reader = new FileReader();
  reader.onload = function (fileObject) {
    var data = fileObject.target.result;

    // Create an image object
    var image = new Image();
    image.onload = function () {
      window.imageSrc = this;
      redrawMeme(window.imageSrc, null, null, targetId);
    };

    // Set image data to background image.
    image.src = data;
  };
  reader.readAsDataURL(file);
}

window.topLineText = "";
window.bottomLineText = "";
window.images = [null, null];
window.id = "";
var input1 = document.getElementById("text-top");
var input2 = document.getElementById("text-bottom");
input1.oninput = textChangeListener;
input2.oninput = textChangeListener;
// document.querySelector("button").addEventListener("click", saveFile, false);
