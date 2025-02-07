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
// discussions.onclick = discussionsclick;
//let channelon = false;
function channelclick(){
    // if(channelon){
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
        // title.innerText = "Home";
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
    // title.innerText = "Home";
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
    // chatlist.style.display = "none";
    channel_stick.style.display = "block"
    returnicon.style.display = "none";
    channeluserui.style.display = "none";
}

function addChannel() {
    textbody.style.display = "none";
    listochannels.style.display = "none";
    listingchannels.style.display = "none";
    // title.innerText = "Home";
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

// const avatar = document.getElementById('avatar');

// avatar.addEventListener('dragover', (event) => {
//     event.preventDefault();
//     avatar.style.borderColor = 'blue'; // Change border color on drag over
// });

// avatar.addEventListener('dragleave', () => {
//     avatar.style.borderColor = '#ccc'; // Revert border color on drag leave
// });

// avatar.addEventListener('drop', (event) => {
//     event.preventDefault();
//     avatar.style.borderColor = '#ccc'; // Revert border color on drop

//     const files = event.dataTransfer.files;
//     if (files.length > 0) {
//         const file = files[0];
//         if (file.type.startsWith('image/')) {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 avatar.innerHTML = `<img src="${e.target.result}" alt="Dropped Image">`;
//             };
//             reader.readAsDataURL(file);
//         } else {
//             avatar.textContent = 'Please drop an image file.';
//         }
//     }
// });

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

  // This function handlers saving the channel data to the database
function ChannelCreation(event) {
    event.preventDefault(); // Prevent the default form submission behavior
  
    // Get form values
    var name = document.getElementById('ChannelName').value;
  
    // Create an object with the form data
    var ChannelData = {
        ChannelName: name,
    };
  
    // Send form data to the backend
    fetch('/saveChannelData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ChannelData)
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

