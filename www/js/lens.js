document.getElementById('img-container').addEventListener('mouseover',
    function () {
        imageZoom('featured');

    });

function imageZoom(imgID) {
    var img = document.getElementById(imgID);
    var lens = document.getElementById('lens');

    lens.style.backgroundImage = `url( ${img.src} )`;

    var ratio = 3;

    lens.style.backgroundSize = (img.width * ratio) + 'px ' + (img.height * ratio) + 'px';

    img.addEventListener("mousemove", moveLens);
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("touchmove", moveLens);

    function moveLens() {
        var pos = getCursor();
        
        var positionLeft = pos.x - (lens.offsetWidth / 2);
        var positionTop = pos.y - (lens.offsetHeight / 2);
        if (positionLeft < 0) {
            positionLeft = 0;
        }

        if (positionTop < 0) {
            positionTop = 0;
        }

        if (positionLeft > img.width - lens.offsetWidth / 3) {
            positionLeft = img.width - lens.offsetWidth / 3
        }

        if (positionTop > img.height - lens.offsetHeight / 3) {
            positionTop = img.height - lens.offsetHeight / 3
        }


        lens.style.left = positionLeft + 'px';
        lens.style.top = positionTop + 'px';

        lens.style.backgroundPosition = "-" + (pos.x * ratio) + 'px -' + (pos.y * ratio) + 'px';
    }

    function getCursor() {
        /* Function gets position of mouse in dom and bounds
         of image to know where mouse is over image when moved
        
        1 - set "e" to window events
        2 - Get bounds of image
        3 - set x to position of mouse on image using pageX/pageY - bounds.left/bounds.top
        4- Return x and y coordinates for mouse position on image
        
         */

        var e = window.event;
        var bounds = img.getBoundingClientRect();

        //console.log('e:', e)
        //console.log('bounds:', bounds)
        var x = e.pageX - bounds.left;
        var y = e.pageY - bounds.top;
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;

        return { 'x': x, 'y': y }
    }

}

imageZoom('featured');