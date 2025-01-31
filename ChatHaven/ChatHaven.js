const channeling = document.querySelector("#channels");
const barocontent = document.querySelector("#left-column");
const listochannels = document.querySelector(".text1");
const listingchannels = document.querySelector(".channellist");
const textbody = document.querySelector(".text1channels");
const discussions = document.querySelector("#discussions");
const home = document.querySelector("#home");
const title = document.querySelector("#headframe");
const add = document.querySelector("#add");

channeling.onclick = channelclick;
home.onclick = Homecoming;
// discussions.onclick = discussionsclick;
//let channelon = false;
function channelclick(){
    // if(channelon){
        listochannels.style.display = "none";
        listingchannels.style.display = "none";
        textbody.style.display = "block"
        title.innerText = "Channels";
        add.style.display = "block";
        title.appendChild(add);
    // }
}

function Homecoming() {
        textbody.style.display = "none"
        listochannels.style.display = "block";
        listingchannels.style.display = "none";
        // title.innerText = "Home";
        add.style.display = "none";
        channelon = true;
        title.innerHTML = "Home"
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
