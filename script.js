// Time
function getTime(){
    document.querySelector("#timeElement").innerHTML = new Date().toLocaleString();
}
getTime()
setInterval(getTime, 1000);