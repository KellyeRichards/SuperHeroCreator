// Design Section
function previewCostume() {
  // Get the values of the selected color, pattern, and accessories
  const costumeColor = document.getElementById("costume-color").value;
  const costumePattern = document.getElementById("costume-pattern").value;
  const accessories = document.querySelectorAll(
    'input[name="accessory"]:checked'
  );

  // Construct the CSS styles for the costume preview area
  let previewStyle = `background-color: ${costumeColor};`;

  if (costumePattern !== "") {
    previewStyle += `background-image: url('${costumePattern}.png');`;
  }

  for (let accessory of accessories) {
    if (accessory.value === "cape") {
      previewStyle += 'background-image: url("cape.png");';
    } else if (accessory.value === "boots") {
      previewStyle += 'background-image: url("boots.png");';
    } else if (accessory.value === "gloves") {
      previewStyle += 'background-image: url("gloves.png");';
    } else if (accessory.value === "mask") {
      previewStyle += 'background-image: url("mask.png");';
    }
  }

  // Set the preview area's style attribute
  const previewArea = document.querySelector(".preview-area");
  previewArea.setAttribute("style", previewStyle);
}

// Power Section
function updatePoints() {
  // Get the values of the attribute sliders
  const strengthPoints = Number(
    document.getElementById("strength-slider").value
  );
  const speedPoints = Number(document.getElementById("speed-slider").value);
  const durabilityPoints = Number(
    document.getElementById("durability-slider").value
  );

  // Calculate the remaining points and display them
  const remainingPoints =
    30 - (strengthPoints + speedPoints + durabilityPoints);
  const remainingDisplay = document.getElementById("remaining-points");
  remainingDisplay.textContent = `Points Remaining: ${remainingPoints}`;

  // Disable or enable the attribute sliders based on remaining points
  const sliders = document.querySelectorAll('input[type="range"]');
  sliders.forEach((slider) => {
    const maxValue = Number(slider.max);
    if (remainingPoints === 0 && Number(slider.value) === maxValue) {
      slider.setAttribute("disabled", true);
    } else {
      slider.removeAttribute("disabled");
    }
  });
}

function savePower() {
  // Get the values of the selected attributes and point allocations
  const attributes = document.querySelectorAll(
    'input[name="attribute"]:checked'
  );
  const strengthPoints = Number(
    document.getElementById("strength-slider").value
  );
  const speedPoints = Number(document.getElementById("speed-slider").value);
  const durabilityPoints = Number(
    document.getElementById("durability-slider").value
  );
  const powerDescription = document.getElementById("power-description").value;

  // Construct the power object with the selected values
  const power = {
    attributes: [],
    strength: strengthPoints,
    speed: speedPoints,
    durability: durabilityPoints,
    description: powerDescription,
  };

  for (let attribute of attributes) {
    power.attributes.push(attribute.value);
  }

  // Display the power object as a JSON string in the console for testing
  console.log(JSON.stringify(power));

  // Reset the power form
  const powerForm = document.getElementById("power-form");
  powerForm.reset();
  updatePoints();
}

// Share Section
function saveStory() {
  // Get the values of the superhero costume and power
  const costumePreview = document
    .querySelector(".preview-area")
    .getAttribute("style");
  const powerJSON = document.querySelector("#share-power").textContent;
  const power = JSON.parse(powerJSON);

  // Get the value of the superhero story
  const storyDescription = document.getElementById("story-description").value;

  // Construct the share card with the selected values
  const shareCard = document.createElement("div");
  shareCard.classList.add("share-card");
  shareCardContent = `
      <h3>Your Superhero:</h3>
      <div class="share-image" style="${costumePreview}"></div>
      <p>${power.description}</p>
      <p>Attributes: ${power.attributes.join(", ")}</p>
      <p>Strength: ${power.strength}</p>
      <p>Speed: ${power.speed}</p>
      <p>Durability: ${power.durability}</p>
      <p>Story: ${storyDescription}</p>
    `;
  shareCard.innerHTML = shareCardContent;

  // Append the share card to the share area
  const shareArea = document.querySelector(".share-area");
  shareArea.appendChild(shareCard);

  // Reset the share form
  const shareForm = document.getElementById("share-form");
  shareForm.reset();

  // Scroll to the bottom of the share area to view the new share card
  shareArea.scrollTop = shareArea.scrollHeight;
}

// Add event listeners to the appropriate form elements
document
  .getElementById("costume-color")
  .addEventListener("input", previewCostume);
document
  .getElementById("costume-pattern")
  .addEventListener("change", previewCostume);
document
  .querySelectorAll('input[name="accessory"]')
  .forEach((accessory) => accessory.addEventListener("change", previewCostume));
document
  .querySelectorAll('input[type="range"]')
  .forEach((slider) => slider.addEventListener("input", updatePoints));
document.getElementById("power-form").addEventListener("submit", (event) => {
  event.preventDefault();
  savePower();
});
document.getElementById("share-form").addEventListener("submit", (event) => {
  event.preventDefault();
  saveStory();
});
