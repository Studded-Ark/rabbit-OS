// Time
function getTime(){
    document.querySelector("#timeElement").innerHTML = new Date().toLocaleString();
}

getTime()
setInterval(getTime, 1000);

// Window Drag Functionality
function dragWindow(windowElement){
    var initX = 0;
    var initY = 0;
    var curX = 0;
    var curY = 0;

    if (document.getElementById(windowElement + "topbar")){
        document.getElementById(windowElement + "topbar").onmousedown = startDragging;
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

// Window Minimizing/Opening
function closeWindow(windowElement){
    windowElement.style.display = "none"
};

function openWindow(windowElement){
    windowElement.style.display = "block"
};

function openable(windowName){
    var windowOpen = document.querySelector("#" + windowName + "open")
    windowOpen.addEventListener("click", function(){
        openWindow(document.querySelector("#" + windowName))
        if (windowOpen.classList.contains("app")){
            selectApp(windowOpen)
        }
        highestIndex++;
        document.querySelector("#" + windowName).style.zIndex = highestIndex
    });

    var windowClose = document.querySelector("#" + windowName + "close")
    windowClose.addEventListener("click", function(){
        closeWindow(document.querySelector("#" + windowName))
        if (windowOpen.classList.contains("selectedapp")){
            deselectApp(windowOpen)
        }
    });
}

// Z-Index stuff
var highestIndex = 0

function addWindowRiseHandling(windowElement){
    windowElement.addEventListener("mousedown", function(){
        highestIndex++;
        windowElement.style.zIndex = highestIndex

    })
}

// Appbar Functionality
var selectedApp = undefined

function selectApp(appElement){
    appElement.classList.add("selectedapp")
    selectedApp = appElement
}

function deselectApp(appElement){
    appElement.classList.remove("selectedapp")
    selectedApp = undefined
}

// init
function initWindow(windowName){
    dragWindow(document.getElementById(windowName));
    openable(windowName);
    addWindowRiseHandling(document.getElementById(windowName))
}

initWindow("landing")
initWindow("wiki")