document.addEventListener("DOMContentLoaded", () => {
    const monsterContainer = document.getElementById("monster-container");
    const createMonsterDiv = document.getElementById("create-monster");
    const backBtn = document.getElementById("back");
    const forwardBtn = document.getElementById("forward");
    let currentPage = 1;
  
    // Function to fetch and display monsters
    function fetchMonsters(page) {
      fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then((response) => response.json())
        .then((monsters) => {
          monsterContainer.innerHTML = "";
          monsters.forEach((monster) => {
            const monsterCard = createMonsterCard(monster);
            monsterContainer.appendChild(monsterCard);
          });
        });
    }
  
    // Function to create a monster card
    function createMonsterCard(monster) {
      const card = document.createElement("div");
      card.classList.add("monster-card");
      card.innerHTML = `
        <h2>${monster.name}</h2>
        <h4>Age: ${monster.age}</h4>
        <p>Description: ${monster.description}</p>
      `;
      return card;
    }
  
    // Function to create a new monster
    function createMonster() {
      const monsterName = document.getElementById("monster-name").value;
      const monsterAge = document.getElementById("monster-age").value;
      const monsterDescription = document.getElementById("monster-description").value;
  
      const newMonster = {
        name: monsterName,
        age: parseInt(monsterAge),
        description: monsterDescription,
      };
  
      fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newMonster),
      })
        .then(() => {
          fetchMonsters(currentPage);
          createMonsterDiv.reset();
        });
    }
  
    // Event listener for the "Create Monster" form
    createMonsterDiv.addEventListener("submit", (event) => {
      event.preventDefault();
      createMonster();
    });
  
    // Event listeners for navigation buttons
    backBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        fetchMonsters(currentPage);
      }
    });
  
    forwardBtn.addEventListener("click", () => {
      currentPage++;
      fetchMonsters(currentPage);
    });
  
    // Initial load of monsters
    fetchMonsters(currentPage);
  });
  