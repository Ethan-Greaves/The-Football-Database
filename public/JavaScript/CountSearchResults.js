let playerData = document.getElementById(`playerData`);
let numOfResults = document.getElementById(`numOfResults`);
let counter = 0

playerData.forEach(element => {
    counter++;
});

numOfResults.innerHTML = counter;