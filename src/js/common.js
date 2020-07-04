var user_id=1;
let status = document.querySelector(".status");
var user = JSON.parse(localStorage.getItem("user_"+user_id));
if (user == null) {
    user = {}
}
if (user.status!="" && typeof user["status"]!=="undefined") setStatus(user.status)

function setStatus (value) {
    var new_status = value.replace(/<\/?[a-zA-Z]+>/gi,'');
    user.status=new_status;
    status.innerHTML=new_status;
}

function saveObj_localStorage (key,obj) {
    var json = JSON.stringify(obj);
    localStorage.setItem(key,json);
}

var clicked = false;
let ch_status_el = document.createElement ("div");
ch_status_el.classList.add("change_status");
let ch_status_input = document.createElement('input');
let ch_status_button = document.createElement('button');
ch_status_button.innerHTML="Сохранить";
ch_status_el.appendChild(ch_status_input)
ch_status_el.appendChild(ch_status_button)

status.addEventListener("click", (e)=>{
    if (!clicked) {
        clicked=true
        e.target.parentNode.appendChild(ch_status_el);
    }
})

ch_status_button.addEventListener("click", ()=>{
    change_status ()
})

ch_status_input.addEventListener("keydown", (e)=>{
    if (e.keyCode === 13) {
        change_status ()
    }
})

function change_status () {
    var new_status = ch_status_input.value.trim();
    if (new_status!="") {
        setStatus(new_status);
        saveObj_localStorage("user_"+user_id, user);
    }
    let title = document.querySelector(".user-title");
    title.removeChild(document.querySelector(".user-title .change_status"))
    clicked=false;
}


document.querySelector("#user-header").addEventListener("click", (e)=>{
    document.querySelector("#user-header").classList.toggle("open")
})