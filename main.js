
var htmlContentAddNew = '<div class="cardAdd" onclick="openModalForAddNewBlock()"><p>Add a New Bookmark</p></div>';
var htmlContent = [''];

function addNewBlock() {
	htmlContent.push(document.getElementById("inputNameBlock").value);
	render(makeStringFromArray(htmlContent));
	document.getElementById("inputNameBlock").value = "";
	modalin();
}

function swapBlock(foregroundBlockId, backgroundBlocId) {
	swapArray(htmlContent, foregroundBlockId, backgroundBlocId);
	render(makeStringFromArray(htmlContent));
}

function makeStringFromArray(array) {
	var content = htmlContentAddNew;
	for (let i = 1; i < array.length; i++) {
	  content = content + '<div class="card"><p>' + array[i] + '</p><div style="display: flex;"><a href="#" class="btn" onClick="openModalForEditTheBlock(' + i + ')">Edit</a></div></div>';
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