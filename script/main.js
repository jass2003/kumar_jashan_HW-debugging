let theThumbnails = document.querySelectorAll('#buttonHolder img'),
gameBoard = document.querySelector('.puzzle-board'),
pzlPieces = document.querySelectorAll('.puzzle-pieces img'),
dropZones = document.querySelectorAll('.drop-zone');
resetPieces = document.querySelector(".puzzle-pieces");

const resetBtn = document.querySelector('#resetBtn');


// FUNCTIONS:







function allowDrag(event) {


console.log('started draggin me');
//using setData and getData instead of global variable
event.dataTransfer.setData('draggedEl', this.id);

}



function allowDragOver(event) {
event.preventDefault();
console.log('started draggin over me');
}


// **working allowDrop with drop-prevent**:
function allowDrop(event) {


// this.classList.add('puzzle-pieces');

event.preventDefault();
let draggedElId = event.dataTransfer.getData('draggedEl');
const droppedZone = event.target.closest('.drop-zone');
if (droppedZone.firstChild) {
  // If there is already a piece in the drop zone, return the dragged piece to the puzzle pieces div
  resetPieces.appendChild(document.getElementById(draggedElId));
  console.log(`Puzzle piece ${draggedElId} was returned to puzzle pieces div because drop zone ${droppedZone.dataset.zone} already has a piece.`);
  return;
}
droppedZone.appendChild(document.getElementById(draggedElId));
console.log(`Puzzle piece ${draggedElId} was dropped into drop zone ${droppedZone.dataset.zone}`);
}



function resetDropZones() {
// Loop through all the drop zones
dropZones.forEach(zone => {
	// Remove all the child elements (puzzle pieces) from the drop zone
	while (zone.firstChild) {
		const piece = zone.firstChild;
	piece.removeAttribute('style'); // Remove any custom styles applied to the piece
	piece.classList.remove('correct'); // Remove the "correct" class if it was added
	resetPieces.appendChild(piece); 

	}
});
}


function changeImageSet() {
gameBoard.style.backgroundImage = `url(images/backGround${this.dataset.bgref}.jpg)`;


pzlPieces.forEach(piece => {
	const pieceId = piece.id;
	const newImageUrl = `images/${pieceId}${this.dataset.bgref}.jpg`;
	piece.src = newImageUrl;
});

resetDropZones();


} 


// events:



theThumbnails.forEach(image => image.addEventListener('click', changeImageSet));
pzlPieces.forEach(piece => piece.addEventListener('dragstart', allowDrag));
resetBtn.addEventListener('click', resetDropZones);

dropZones.forEach(zone => {
zone.addEventListener('dragover', allowDragOver);
zone.addEventListener('drop', allowDrop);
});
