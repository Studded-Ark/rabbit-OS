// Time
function getTime(){
    document.querySelector("#timeElementA").innerHTML = new Date().toLocaleTimeString();
    document.querySelector("#timeElementB").innerHTML = new Date().toLocaleDateString();
}

getTime()
setInterval(getTime, 1000);

// Window Drag Functionality
function dragWindow(windowName){
    var initX = 0;
    var initY = 0;
    var curX = 0;
    var curY = 0;
    var windowElement = document.getElementById(windowName)

    if (document.getElementById(windowName + "topbar")){
        document.getElementById(windowName + "topbar").onmousedown = startDragging;
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

// Settings stuff
const backgroundNames = [
    "Kingdom_Outskirts",
    "Scholars_Nest",
    "Kings_Arsenal",
    "Red_Darkhouse",
    "Churchmouse_Streets",
    "Emerald_Lakeside",
    "The_Pale_Keep",
    "Moonlit_Pinnacle",
    "Crack_In_The_Geode",
    "Darkhouse_Depths",
    "Atelier_Aurum",
    "Subterra_Sanctum",
    "Looping_Hallway",
    "Reflecting_Pool"
]

const savedBackground = localStorage.getItem("backgroundImage")
var curBackgroundOption = undefined
if (savedBackground){
    document.body.style.backgroundImage = 'url(apps/system/backgrounds/' + savedBackground + '.png)'
    document.querySelector("#"+ savedBackground).classList.add("selectedapp")
} else {
    var randBackground = backgroundNames[Math.floor(Math.random() * backgroundNames.length)]
    curBackgroundOption = document.querySelector("#"+ randBackground)
    curBackgroundOption.classList.add("selectedapp")
    document.body.style.backgroundImage = 'url(apps/system/backgrounds/' + randBackground + '.png)'
}

for (const backgroundName of backgroundNames){
    document.querySelector("#"+ backgroundName).addEventListener("click", function(){
        if (curBackgroundOption){curBackgroundOption.classList.remove("selectedapp")}

        curBackgroundOption = document.querySelector("#"+ backgroundName)
        curBackgroundOption.classList.add("selectedapp")

        const location = "apps/system/backgrounds/" + backgroundName + ".png"
        document.body.style.backgroundImage = 'url(' + location + ')'

        localStorage.setItem("backgroundImage", backgroundName)
    })
}

const blurButton = document.querySelector("#blur")
function blur(){
    if (blurButton.textContent == "Blur: On") {
        blurButton.textContent = "Blur: Off"

        for (const div of document.body.children){
            div.classList.remove("blur")
        }
    } else {
        blurButton.textContent = "Blur: On"

        for (const div of document.body.children){
            div.classList.add("blur")
        }
    }
    localStorage.setItem("blur", blurButton.textContent)
}
blurButton.addEventListener("click",blur)
if (localStorage.getItem("blur")){
    if (localStorage.getItem("blur") == "Blur: On"){
        blurButton.textContent = "Blur: On"
        for (const div of document.body.children){
            div.classList.add("blur")
        }
    } else {
        blurButton.textContent = "Blur: Off"
        for (const div of document.body.children){
            div.classList.remove("blur")
        }
    }
} else {
    for (const div of document.body.children){
            div.classList.add("blur")
    }
}

const shadowButton = document.querySelector("#dropshadow")
function shadow(){
    if (shadowButton.textContent == "Drop Shadow: On") {
        shadowButton.textContent = "Drop Shadow: Off"

        for (const div of document.body.children){
            div.classList.remove("dropshadow")
        }
    } else {
        shadowButton.textContent = "Drop Shadow: On"

        for (const div of document.body.children){
            div.classList.add("dropshadow")
        }
    }
    localStorage.setItem("shadow", shadowButton.textContent)
}
shadowButton.addEventListener("click",shadow)
if (localStorage.getItem("shadow")){
    if (localStorage.getItem("shadow") == "Drop Shadow: On"){
        shadowButton.textContent = "Drop Shadow: On"
        for (const div of document.body.children){
            div.classList.add("dropshadow")
        }
    } else {
        shadowButton.textContent = "Drop Shadow: Off"
        for (const div of document.body.children){
            div.classList.remove("dropshadow")
        }
    }
} else {
    for (const div of document.body.children){
            div.classList.add("shadow")
    }
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
    dragWindow(windowName);
    openable(windowName);
    addWindowRiseHandling(document.getElementById(windowName))
}

initWindow("landing")
initWindow("wiki")
initWindow("system")