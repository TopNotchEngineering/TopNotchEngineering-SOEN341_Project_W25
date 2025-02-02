const channeling = document.querySelector("#channels");
const barocontent = document.querySelector("#left-column");
const listochannels = document.querySelector(".text1");
const listingchannels = document.querySelector(".channellist");
const textbody = document.querySelector(".text1channels");
const home = document.querySelector("#home");
const title = document.querySelector("#headframe");
const add = document.querySelector("#add");
const channel_stick = document.querySelector("#other-left-column");
const friendsicon = document.querySelector("#friends-icon");
const friendadditionform = document.querySelector("#friend-addition-form");
const userlist = document.querySelector(".user-list");


add.onclick = addUser;
friendsicon.onclick = friendOnClick;
channeling.onclick = channelclick;
home.onclick = Homecoming;
// discussions.onclick = discussionsclick;
//let channelon = false;
function channelclick(){
    // if(channelon){
        listochannels.style.display = "none";
        listingchannels.style.display = "none";
        textbody.style.display = "block";
        title.innerText = "Channels";
        add.style.display = "block";
        channel_stick.style.display = "block";
        title.appendChild(add);
        barocontent.style.display = "none";
    // }
}

function Homecoming() {
        textbody.style.display = "none";
        listochannels.style.display = "block";
        listingchannels.style.display = "none";
        // title.innerText = "Home";
        add.style.display = "none";
        channelon = true;
        title.innerHTML = "Dashboard<hr>";
        channel_stick.style.display = "block";
        barocontent.style.display = "none";
        friendadditionform.style.display = "none";
}

function friendOnClick(){
    channel_stick.style.display = "none";
    barocontent.style.display = "block";
}

function addUser(){
    textbody.style.display = "none";
    listochannels.style.display = "none";
    listingchannels.style.display = "none";
    // title.innerText = "Home";
    add.style.display = "none";
    title.innerHTML = "Add User<hr>";
    userlist.style.display = "none";
    friendadditionform.style.display = "block";
}
// function discussionsclick(){
//     listochannels.style.display = "none";
//     listingchannels.style.display = "none";
//     newmsg.textContent = "You got it";
//     newmsg.style.width = '100px';
//     newmsg.style.height = '20px + i';
//     newmsg.style["border-radius"] = '20px';
//     newmsg.style.padding = '10px';
//     newmsg.style.margin = '10px';
//     newmsg.style.backgroundColor = 'lightblue';
//     textbody.appendChild(newmsg);
// }
