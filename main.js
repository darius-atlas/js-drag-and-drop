
var htmlContentAddNew = '<div class="cardAdd" onclick="openModalForAddNewBlock()"><p>Add a New Bookmark</p></div>';
var htmlContent = [''];

function addNewBlock() {
	htmlContent.push(document.getElementById("inputNameBlock").value);
	render(makeStringFromArray(htmlContent));
	document.getElementById("inputNameBlock").value = "";
	modalin();
}


// Drag and Drop

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.currentTarget.id);
}

function drop(ev, thisId) {
    ev.preventDefault();
    var foregroundBlockIdData = ev.dataTransfer.getData("text");
    swapBlock(foregroundBlockIdData, thisId);
}



function swapBlock(foregroundBlockId, backgroundBlocId) {
	swapArray(htmlContent, foregroundBlockId, backgroundBlocId);
	render(makeStringFromArray(htmlContent));
}

function makeStringFromArray(array) {
	var content = htmlContentAddNew;
	for (let i = 1; i < array.length; i++) {
	  content = content + 
	  '<div class="card" draggable="true" id="' + i + '" ondragstart="drag(event)" ondrop="drop(event, ' + i + ')" ondragover="allowDrop(event)">' + 
	  	'<div class="card-scroll">' + 
	  		'<p>' + array[i] + '</p>' + 
	  	'</div>' +
	  	'<div class="card-button" style="display: flex;">' + 
	  		'<a href="#" class="btn btn-block" onClick="openModalForEditTheBlock(' + i + ')">Edit</a>' + 
	  		'<a href="#" class="btn btn-block" onClick="openModalViaDeliteBlockById(' + i + ')">Delete</a>' + 
	  	'</div>' + 
	  '</div>';
	}
	return content;
}

function swapArray(array, firstId, secondId) {
	var buffer = array[firstId];
	array[firstId] = array[secondId];
	array[secondId] = buffer;
}

function render(content) {
	var block = document.getElementById('renderBlock');
	block.innerHTML = content;
}

window.onload = function() {
	render(htmlContentAddNew);
}

function editBlockByArrayId(id) {
	htmlContent[id] = document.getElementById("inputNameBlock").value;
	render(makeStringFromArray(htmlContent));
	modalin();
}


function deleteBlockByArrayId(id) {
	htmlContent.splice(id, 1);

	render(makeStringFromArray(htmlContent));
	modalin();
}




var modalStatus = false;

function setContextForModal(title, contextButton, inputValue) {
	document.getElementById("ModalTitle").innerHTML = title;
	document.getElementById("contextModalButton").innerHTML = contextButton;
	document.getElementById("inputNameBlock").value = inputValue;

}

function openModalForAddNewBlock() {
	setContextForModal("Add a New Block", "Add a New Block", "");
	document.getElementById("contextModalButton").setAttribute("onClick", "addNewBlock()");
	modalin();
}

function openModalForEditTheBlock(id) {
	setContextForModal("Edit the Block", "Save Changes", htmlContent[id]);
	document.getElementById("contextModalButton").setAttribute("onClick", "editBlockByArrayId(" + id +")");
	modalin();
}

function openModalViaDeliteBlockById(id) {
	setContextForModal("Are you realy wont to delte this block?", "Yes, delete this!", null);
	document.getElementById("contextModalButton").setAttribute("onClick", "deleteBlockByArrayId(" + id +")");
	modalin();
}

function modalin() {
    let divModal = document.getElementById('modalItem0');
    if(modalStatus) {
        divModal.setAttribute("style", "display: none;");
        modalStatus = false;
    } else {
        divModal.setAttribute("style", "display: block; top: 0; left: 0; z-index: 9999; position: fixed;");
        modalStatus = true;
    }
}