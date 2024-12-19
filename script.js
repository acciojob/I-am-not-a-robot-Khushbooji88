//your code here
// Get all necessary elements from the DOM
const images = document.querySelectorAll('img');
const resetButton = document.getElementById('reset');
const verifyButton = document.getElementById('verify');
const para = document.getElementById('para');
const hText = document.getElementById('h');

// Variables to track the user state and selected images
let selectedImages = [];
let selectedIndices = new Set();

// Function to shuffle images and randomly duplicate one of them
function shuffleImages() {
    const imageArray = Array.from(images);
    const randomIndex = Math.floor(Math.random() * 5); // Random index for duplication
    const duplicate = imageArray[randomIndex].cloneNode(true); // Clone image to create a duplicate
    imageArray.push(duplicate); // Add duplicate image

    // Shuffle images randomly
    imageArray.sort(() => Math.random() - 0.5);

    // Reassign shuffled images to their positions
    images.forEach((img, idx) => {
        img.src = imageArray[idx].src;
        img.className = imageArray[idx].className; // Retain the original class for styling
    });
}

// Handle image click
function handleImageClick(event) {
    const clickedImage = event.target;

    // Ignore if the image is already clicked
    if (selectedIndices.has(clickedImage)) return;

    // Add the clicked image to selectedImages and selectedIndices
    selectedImages.push(clickedImage);
    selectedIndices.add(clickedImage);

    // Change state based on number of clicks
    if (selectedImages.length === 1) {
        // State 2: At least one image has been clicked
        state = 2;
        resetButton.style.display = 'block'; // Show the reset button
        hText.innerText = 'Please click on the identical tiles to verify that you are not a robot.';
    }

    // If two images are clicked, show the verify button
    if (selectedImages.length === 2) {
        // State 3: Two images selected
        verifyButton.style.display = 'block';
    }
}

// Reset the game to the initial state
function resetGame() {
    state = 1; // Reset state
    selectedImages = [];
    selectedIndices.clear();
    resetButton.style.display = 'none'; // Hide the reset button
    verifyButton.style.display = 'none'; // Hide the verify button
    para.style.display = 'none'; // Hide the result message

    hText.innerText = 'Please click on the identical tiles to verify that you are not a robot.';
    shuffleImages(); // Shuffle images again on reset

    // Re-enable image click listeners
    images.forEach(img => img.addEventListener('click', handleImageClick));
}

// Verify the selected tiles
function verifySelection() {
    const [first, second] = selectedImages;

    if (first.src === second.src) {
        para.style.display = 'block';
        para.innerText = 'You are a human. Congratulations!';
    } else {
        para.style.display = 'block';
        para.innerText = 'We can\'t verify you as a human. You selected the non-identical tiles.';
    }

    verifyButton.style.display = 'none'; // Hide the verify button after verification
}

// Event listeners
resetButton.addEventListener('click', resetGame);
verifyButton.addEventListener('click', verifySelection);

// Initialize the game by shuffling images
shuffleImages();
images.forEach(img => img.addEventListener('click', handleImageClick));

