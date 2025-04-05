const createTeam = document.querySelector("#create-team-button");
const teamcolumn = document.querySelector("#teams-column");
const Name = document.querySelector("#NameInput");
const teamdesc = document.querySelector("#team-desc");
const custombody = document.querySelector(".custom-body");
const teamForm = document.querySelector("#team-addition-form");

createTeam.onclick = generateDiv;
function generateDiv() {
    // Create a new div element
    var newDiv = document.createElement("div");

    // Add content to the new div
    newDiv.innerHTML = "This is a dynamically generated div";
    // newDiv.style.backgroundColor["black"];
    // Add a class to the new div for styling
    newDiv.className = "generated-div";

    // Append the new div to the container
    // var container = document.getElementById("container");
    custombody.appendChild(newDiv);
}

