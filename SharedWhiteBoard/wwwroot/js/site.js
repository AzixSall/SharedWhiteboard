// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var canvasx = $(canvas).offset().left;
var canvasy = $(canvas).offset().top;
var last_mousex = last_mousey = 0;
var mousex = mousey = 0;
var mousedown = false;
var tooltype = 'draw';

$(canvas).on('mousedown', function (e) {
    console.log("mouse down")
    last_mousex = mousex = parseInt(e.clientX - canvasx);
    last_mousey = mousey = parseInt(e.clientY - canvasy);
    mousedown = true;
});

$(canvas).on('mouseup', function (e) {
    mousedown = false;
});

var drawCanvas = function (prev_x, prev_y, x, y, clr) {
    ctx.beginPath();
    console.log("X: " + x + " Y: " + y);
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = clr
    ctx.lineWidth = 3;
    ctx.moveTo(prev_x, prev_y);
    ctx.lineTo(x, y);
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.stroke();
};

$(canvas).on('mousemove', function (e) {
    mousex = parseInt(e.clientX - canvasx);
    mousey = parseInt(e.clientY - canvasy);
    var clr = $('select[id=color]').val()

    if ((last_mousex > 0 && last_mousey > 0) && mousedown) {
        drawCanvas(mousex, mousey, last_mousex, last_mousey, clr);
        connection.invoke('drawing', last_mousex, last_mousey, mousex, mousey, clr);
    }
    last_mousex = mousex;
    last_mousey = mousey;

    //$('#output').html('current: ' + mousex + ', ' + mousey + '<br/>last: ' + last_mousex + ', ' + last_mousey + '<br/>mousedown: ' + mousedown);
});

var connection = new signalR.HubConnectionBuilder()
    .withUrl('/drawing')
    .build();

connection.on('drawing', function (prevX, prevY, currentX, currentY, color) {
    drawCanvas(prevX, prevY, currentX, currentY, color);
});

connection.start();