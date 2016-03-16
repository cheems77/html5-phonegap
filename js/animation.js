function sprite(options)
{
    var that = {},
        frameIndex = 0,
        tickCount = 0,
        ticksPerFrame = 4,
        numberOfFrames = 10;


    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;

    that.update = function () {

        context.clearRect(0, 0, that.width, that.height);

        tickCount += 1;
        if (tickCount > ticksPerFrame) {

            tickCount = 0;

            // If the current frame index is in range
            if (frameIndex < numberOfFrames - 1) {
                // Go to the next frame
                frameIndex += 1;
            } else {
                frameIndex = 0;
            }
        }
    };

    that.render = function()
    {
        that.context.drawImage(
            that.image,
            frameIndex * that.width / numberOfFrames,
            0,
            that.width / numberOfFrames,
            that.height,
            0,
            0,
            that.width / numberOfFrames,
            that.height);
    }
    return that;
};

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

canvas.width =  100;
canvas.height = 100;
var coinImage = new Image();
coinImage.src = './images/coin-sprite-animation.png';


var startPoint1 = {};
var startPoint2 = {};
var endPoint1 = {};
var endPoint2 = {};
var centerPoint = {};

canvas.addEventListener('touchstart', function(event) {
    // make sure our "touches" is 2 - representing two fingers
    if (event.touches.length == 2)
    {
        // track where our fingers are
        var point1 = event.touches[0];
        var point2 = event.touches[1];
        startPoint1.x = point1.clientX;
        startPoint1.y = point1.clientY;
        startPoint2.x = point2.clientX;
        startPoint2.y = point2.clientY;
    }

}, false);
canvas.addEventListener('touchend', function(event) {
    return false;
}, false);
canvas.addEventListener('touchmove', function(event) {
    // make sure our "touches" is 2 - representing two fingers
    if (event.touches.length == 2)
    {
        // track where our fingers are
        var point1 = event.touches[0];
        var point2 = event.touches[1];
        endPoint1.x = point1.clientX;
        endPoint1.y = point1.clientY;
        endPoint2.x = point2.clientX;
        endPoint2.y = point2.clientY;
        // calculate the euclidean distance for each finger.
        // we need to know the distance between the start point of finger 1 and the end point of finger 1
        // we need to know the distance between the start point of finger 2 and the end point of finger 2
        var distance1 = Math.sqrt(Math.pow(startPoint1.x - startPoint2.x, 2) + Math.pow(startPoint1.y - startPoint2.y, 2));
        var distance2 = Math.sqrt(Math.pow(endPoint1.x - endPoint2.x, 2) + Math.pow(endPoint1.y - endPoint2.y, 2));
        // take the two distances and get a ratio.
        var ratio = distance2 / distance1;
        // clear our canvas when the user is moving around with two fingers
        context.clearRect(0, 0, canvas.width, canvas.height);
        // redraw our image but take the original sizes and scale them by the ratio.
        context.drawImage(imageObj, 0, 0, imageObj.width * ratio, imageObj.height * ratio);
    }
}, false);
var coin = new sprite({
    context: context,
    width: 1000,
    height: 100,
    image: coinImage
});
function gameLoop () {

    window.requestAnimationFrame(gameLoop);

    coin.update();
    coin.render();
}

// Start the game loop as soon as the sprite sheet is loaded
coinImage.addEventListener("load", gameLoop);