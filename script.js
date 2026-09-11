// Time
function getTime(){
    document.querySelector("#timeElement").innerHTML = new Date().toLocaleString();
}

getTime()
setInterval(getTime, 1000);

// Window Functionality
dragWindow(document.getElementById("landing"))

function dragWindow(windowElement){
    var initX = 0;
    var initY = 0;
    var curX = 0;
    var curY = 0;

    if (document.getElementById(windowElement.id + "topbar")){
        document.getElementById(windowElement.id + "topbar").onmousedown = startDragging;
    } else {
        windowElement.onmousedown = startDragging;
    }

    function startDragging(e){
        e = e || window.event;
        e.preventDefault();

        initX = e.clientX;
        initY = e.clientY;

        document.onmouseup = stopDragging;
        document.onmousemove = moveWindow;
    }

    function moveWindow(e){
        e = e || window.event;
        e.preventDefault();

        curX = initX - e.clientX;
        curY = initY - e.clientY;
        initX = e.clientX;
        initY = e.clientY;

        windowElement.style.top = (windowElement.offsetTop - curY) + "px";
        windowElement.style.left = (windowElement.offsetLeft - curX) + "px";
    }

    function stopDragging(){
        document.onmouseup = null;
        document.onmousemove = null;
    }
}