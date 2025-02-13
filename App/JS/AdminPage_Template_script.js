document.addEventListener('DOMContentLoaded', function() {
    const parentDiv = document.getElementById('friends-icon');
    const childDiv = document.getElementById('menu');

    parentDiv.addEventListener('click', function() {
        if (childDiv.style.display === 'none' || childDiv.style.display === '') {
            childDiv.style.display = 'block';
        } else {
            childDiv.style.display = 'none';
        }
    });
});

const profile_icon_popup = document.querySelector(".profile-icon");
const popup = document.querySelector("#pop-up");
profile_icon_popup.onclick = function(){
    popup.style.display = "block";
}
const back = document.querySelector("#back");
back.onclick = function() {
    popup.style.display = "none";
}
document.querySelector("#add-team").onclick = function() {
    popup.style.display = "block";
    document.querySelector("#profile-pop-up").innerHTML = `
                <div id="team-addition-form">
                
                <div id="TeamNameForm" >
                    <label for="dropdown" id="NameInput-placeholder" style="left: 50px;">Team Name:</label>
                        <input id="NameInput" placeholder="Name" style="padding-left: 45px;"><br><br>
                    <label for="dropdown" id="RoleInput-placeholder" style="left: 50px;">Team Description:</label>
                        <input id="team-desc" placeholder="Team description" style="padding-left: 50px;">
                    <div class="general-buttons" id="create-team-button">
                        Create Team
                    </div>
                    <a href="../HTML/AdminPage_Template.html" id="link">
                        <div class="general-buttons" id="back" style = "top: -25px; position: relative">
                            Back
                        </div>
                    </a>
                    <!-- <a href="../HTML/AdminPage_Template.html">
                        <div class="general-buttons" id="create-team-button">
                            Create Team
                        </div>
                    </a> -->
                </div>
            </div>`;
}


//Team create
// const createTeam = document.querySelector("#create-team-button");
// const teamcolumn = document.querySelector("#teams-column");
// const Name = document.querySelector("#NameInput");
// const teamdesc = document.querySelector("#team-desc");
// const custombody = document.querySelector(".custom-body");
// const teamForm = document.querySelector("#team-addition-form");

// createTeam.onclick = generateDiv;
// function generateDiv() {
//     // Create a new div element
//     var newDiv = document.createElement("div");

//     // Add content to the new div
//     newDiv.innerHTML = "This is a dynamically generated div";
//     newDiv.style.backgroundColor["black"];
//     // Add a class to the new div for styling
//     newDiv.className = "generated-div";

//     // Append the new div to the container
//     // var container = document.getElementById("container");
//     teamForm.appendChild(newDiv);
// }


function loadDiv() {
    // Parse the URL query parameters
    // var params = new URLSearchParams(window.location.search);
    var team = document.createElement("div");
    team.innerHTML = localStorage.getItem("message");
    // Create a new div element and set its text content
        team.id = "sharedDiv";
        team.style = document.getElementById("team-profile").style;
        // // Append the new div to the container
        // var container = document.getElementById("teams-column");
        
    document.getElementByClassName("custom-body").appendChild(newDiv);
}

document.getElementById("create-team-button").addEventListener("click", function() {
        generateDiv();
    // document.getElementByClassName("custom-body").innnerText += "<br>";
});
function generateDiv() {
    // Create a new div element
    var newDiv = document.createElement("div");

    // Add content to the new div
    newDiv.innerHTML = document.getElementById("NameInput").value;
    document.getElementById("NameInput").value = "";
    alert("Working or not??");
    newDiv.style.backgroundColor = "rgb(44, 121, 202)";
    newDiv.style.width = "fit-content";
    newDiv.style.textAlign = "right";
    newDiv.style.position = "relative";
    newDiv.style.borderRadius = "50px";
    newDiv.style.padding = "15px";
    newDiv.style.margin = "10px";``
    // newDiv.style.float = "right";
    // Add a class to the new div for styling
    newDiv.className = "generated";

    // Append the new div to the container
    // var container = document.getElementById("container");
    document.querySelector(".custom-body").appendChild(newDiv);
}