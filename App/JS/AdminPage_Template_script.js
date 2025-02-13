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
    document.querySelector("#inside-pop-up").style.display = "block";
    document.querySelector("#team-addition-form").style.display = "none";
}
const back = document.querySelector("#back");
back.onclick = function() {
    popup.style.display = "none";
}
document.querySelector("#back2").onclick = function() {
    popup.style.display = "none";
}
document.querySelector("#add-teams").onclick = function() {
    popup.style.display = "block";
    document.querySelector("#inside-pop-up").style.display = "none";
    document.querySelector("#team-addition-form").style.display = "block";
}

document.getElementById("create-team-button").onclick = function() {
    generateDiv();
}

// else alert("It doesnt even exist yet bud!");
function generateDiv() {
    // Create a new div element
    let newDiv = document.createElement("div");
    let newerDiv = document.createElement("div");
    let roundDiv = document.createElement('div');

    // Add content to the new div
    newDiv.innerHTML = document.getElementById("NameInput").value[0];
    newerDiv.innerHTML = document.getElementById("NameInput").value;
    roundDiv.innerHTML = document.getElementById("NameInput").value[0];
    
    var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);

        // Create the RGB string
        var rgbColor = "rgb(" + r + "," + g + "," + b + ")";
    document.getElementById("NameInput").value = "";
    newDiv.setAttribute("style", `position: relative;
        text-align: center;
        top: 5px;
        left: 12px;
        width: 25px;
        height: 25px;
        background-color: white;
        padding: 15px;
        padding-top: 12px;
        padding-bottom: 17px;
        background-color: ${rgbColor};
        border-radius: 50px;
        margin-top: 10px;
        margin-bottom: 20px;
        cursor: pointer;
        overflow: hidden;
        font-size: 30px;`);
    newDiv.addEventListener("mouseover", function() {
        newDiv.setAttribute("style", 
        `text-align: center;
        position: relative;
            top: 5px;
            left: 6px;
            width: 25px;
            height: 25px;
            background-color: white;
            padding: 15px;
            padding-top: 12px;
            padding-bottom: 17px;
            
            border-radius: 50px;
            margin-top: 10px;
            margin-bottom: 20px;
            cursor: pointer;
            overflow: hidden;
            font-size: 30px;
        background-color: ${rgbColor};
        padding: 22px;
        padding-top: 18px;
        padding-bottom: 24px;
        `);
    });
    newDiv.addEventListener("mouseout", function() {
        newDiv.setAttribute("style", `position: relative;
            text-align: center;
            top: 5px;
            left: 12px;
            width: 25px;
            height: 25px;
            background-color: white;
            padding: 15px;
            padding-top: 12px;
            padding-bottom: 17px;
            background-color: ${rgbColor};
            border-radius: 50px;
            margin-top: 10px;
            margin-bottom: 20px;
            cursor: pointer;
            overflow: hidden;
            font-size: 30px;`);
    });
    newDiv.className = "generated";

    // Append the new div to the container
    // var container = document.getElementById("container");
    document.querySelector("#teams-container").appendChild(newDiv);

    newerDiv.setAttribute("style", 
        `margin-top: 10px;
        padding: 15px;
        padding-left: 50px;
        margin-bottom: 10px;
        border-radius: 20px;`);

        newerDiv.addEventListener("mouseover", function(){
            newerDiv.setAttribute("style", 
                `margin-top: 10px;
                color: black;
                background-color: rgb(44, 121, 202);
                margin-bottom: 10px;
                padding: 15px;
                padding-left: 50px;
                border-radius: 20px;`);
        });

        newerDiv.addEventListener("mouseout", function(){
            newerDiv.setAttribute("style", 
                `margin-top: 10px;
                color: black;
                margin-bottom: 10px;
                padding: 15px;
                padding-left: 50px;
                border-radius: 20px;`);
        });
        
        roundDiv.setAttribute("style", `
            width: 30px;
            text-align: center;
            border-radius: 50px;
            background-color: ${rgbColor};
            padding-top: 3px;
            padding-bottom: 3px;
            left: -50px;
            top: -35px;
            position: relative;
            margin: 10px;
            `);
        var n = 0;
    newerDiv.id = "generatedNew";
    document.getElementById("custom-team-container").appendChild(newerDiv);
    newerDiv.appendChild(roundDiv);

}

