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
const returnicon = document.querySelector("#return-icon");
const friendadditionform = document.querySelector("#friend-addition-form");
const channeladditionform = document.querySelector("#channel-addition-form");
const userlist = document.querySelector(".user-list");
const chatlist = document.querySelector("#left-columnName");
const addchannel = document.querySelector("#addchannel");
const teamfunmatsu = document.querySelector("#funmatsu-pool");
const channeluserui = document.querySelector("#channel-user-ui");

teamfunmatsu.onclick = enterTeamFunmatsu;
returnicon.onclick = channelclick;
addchannel.onclick = addChannel;
chatlist.onclick = seeChannel;
add.onclick = addUser;
friendsicon.onclick = friendOnClick;
channeling.onclick = channelclick;
home.onclick = Homecoming;
function channelclick(){
        listochannels.style.display = "none";
        listingchannels.style.display = "none";
        textbody.style.display = "none";
        title.innerText = "Teams";
        add.style.display = "block";
        channel_stick.style.display = "block";
        title.appendChild(add);
        barocontent.style.display = "none";
        channeladditionform.style.display = "none";
        returnicon.style.display = "none"; 
        userlist.style.display = "block";
        friendadditionform.style.display = "none"; 
        channeluserui.style.display = "none";
    // }
}

function Homecoming() {
        textbody.style.display = "none";
        listochannels.style.display = "block";
        listingchannels.style.display = "none";
        add.style.display = "none";
        channelon = true;
        title.innerHTML = "Dashboard<hr>";
        channel_stick.style.display = "block";
        barocontent.style.display = "none";
        friendadditionform.style.display = "none";
        channeladditionform.style.display = "none";
        returnicon.style.display = "none";
        channeluserui.style.display = "none";
}

function friendOnClick(){
    channel_stick.style.display = "none";
    barocontent.style.display = "block";
    returnicon.style.display = "none";
    channeluserui.style.display = "none";
}

function addUser(){
    textbody.style.display = "none";
    listochannels.style.display = "none";
    listingchannels.style.display = "none";
    add.style.display = "none";
    title.innerHTML = "Add User<hr>";
    userlist.style.display = "none";
    friendadditionform.style.display = "block";
    channeladditionform.style.display = "none";
    returnicon.style.display = "none";
    channeluserui.style.display = "none";
}

function seeChannel(){
    barocontent.style.display = "none";
    channel_stick.style.display = "block"
    returnicon.style.display = "none";
    channeluserui.style.display = "none";
}

function addChannel() {
    textbody.style.display = "none";
    listochannels.style.display = "none";
    listingchannels.style.display = "none";
    add.style.display = "none";
    title.innerHTML = "Add Teams<hr>";
    userlist.style.display = "none";
    channeladditionform.style.display = "block";
    friendadditionform.style.display = "none";
    channel_stick.style.display = "none";
    returnicon.style.display = "block";
    channeluserui.style.display = "none";
}

function enterTeamFunmatsu() {
    userlist.style.display = "none";
    channeluserui.style.display = "flex";
}

// This function handlers saving the team name and description to the database
function TeamCreation(event) {
    event.preventDefault(); // Prevent the default form submission behavior
  
    // Get form values
    var name = document.getElementById('NameInput').value;
    var description = document.getElementById('team-desc').value;
  
    // Create an object with the form data
    var teamData = {
        NameInput: name,
        teamDescription: description,
    };
  
    // Send form data to the backend
    fetch('/saveTeamData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(teamData)
    })
    .then(response => {
      if (response.ok) {
        // Handle success (e.g., show a success message)
        console.log('Data saved successfully!');
      } else {
        // Handle errors
        console.error('Error saving data');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }


