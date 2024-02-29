let theThumbnails = document.querySelectorAll('#buttonHolder img'),
gameBoard = document.querySelector('.puzzle-board'),
pzlPieces = document.querySelectorAll('.puzzle-pieces img'),
dropZones = document.querySelectorAll('.drop-zone');
resetPieces = document.querySelector(".puzzle-pieces");


function changeImageSet() {
//using dataset here, instead of grabbing the id, just an alternative way of doing things.
//the dataset property provides read/write access to custom data attributes HTML on elements.
gameBoard.style.backgroundImage = `url(images/backGround${this.dataset.bgref}.jpg)`;
}

function allowDrag(event) {
console.log('started draggin me');
//using setData and getData instead of global variable
event.dataTransfer.setData('draggedEl', this.id);
}

function allowDragOver(event) {
event.preventDefault();
console.log('started draggin over me');
}

function allowDrop(event) {
event.preventDefault();		

let droppedElId = event.dataTransfer.getData('draggedEl');
this.appendChild(document.querySelector(`#${droppedElId}`));
}

theThumbnails.forEach(image => image.addEventListener('click', changeImageSet));
pzlPieces.forEach(piece => piece.addEventListener('dragstart', allowDrag));

dropZones.forEach(zone => {
zone.addEventListener('dragover', allowDragOver);
zone.addEventListener('drop', allowDrop);
});
