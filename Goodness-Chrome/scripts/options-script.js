function sendMessage(message) {
	chrome.extension.sendRequest({message: message});
};

var filter = {
	setup: function() {
		filter.phraseList.node = $id('phraseList');
		filter.urlList.node = $id('urlList');
		filter.addMode.phrase.node = $id('phraseAdd');
		filter.addMode.phrase.button = $id('phraseAddButton');
		filter.addMode.url.node = $id('urlAdd');
		filter.addMode.url.button = $id('urlAddButton');
		
		if (localStorage.filterMode == 'add') {
			filter.setModeToAdd();
		} else {
			filter.setModeToEdit();
		}
		$id('filterModeToggle').onclick = function() { filter.toggleMode(); };
		
		console.log('The filter has been initialized.');
		return;
	},
	setModeToAdd: function() {
		$id('filterModeToggle').innerText = 'Switch to Edit Mode';
		$id('filterTitleCap').innerText = 'Items must be added one at a time.';
		$id('addModeContainer').style.display = '';
		$id('editModeContainer').style.display = 'none';
		localStorage.filterMode = 'add';
		filter.addMode.setup();
		$id('phraseAdd').focus();
		return;
	},
	setModeToEdit: function() {
		$id('filterModeToggle').innerText = 'Switch to Add Mode';
		$id('filterTitleCap').innerText = 'Please separate items with semicolons. (;)';
		$id('addModeContainer').style.display = 'none';
		$id('editModeContainer').style.display = '';
		localStorage.filterMode = 'edit';
		$id('phraseList').focus();
		return;
	},
	toggleMode: function() {
		if (localStorage.filterMode == 'add')
			filter.setModeToEdit();
		else
			filter.setModeToAdd();
	},
	addMode: {
		phrase: {
			node: undefined,
			button: undefined
		},
		url: {
			node: undefined,
			button: undefined
		},
		
		initialized: false,
		setup: function() {			
			if (!filter.addMode.initialized) {
				filter.addMode.phrase.node.onkeyup = function(event) {
					filter.addMode.determineState(event.target, filter.addMode.phrase.button); };
				filter.addMode.url.node.onkeyup = function(event) {
					filter.addMode.determineState(event.target, filter.addMode.url.button); };
				
				filter.addMode.phrase.button.onclick = function(event) {
					filter.addMode.buttonClickHandler(filter.phraseList, filter.addMode.phrase.node); };
				filter.addMode.url.button.onclick = function(event) {
					filter.addMode.buttonClickHandler(filter.urlList, filter.addMode.url.node); };
				
				console.log('The filter\'s Add Mode has been initialized.');
				filter.addMode.initialized = true;
			}
			return;
		},
		determineState: function(addNode, button) {
			if (!addNode.value) {
				button.disabled = true;
				button.style.color = null;
				button.title = '';
			} else if (addNode.value.search(';') != -1) {
				button.disabled = true;
				button.style.color = 'red';
				button.title = 'No semicolons, please.';
			} else {
				button.disabled = false;
				button.style.color = null;
				button.title = '';
			}
			return;
		},
		buttonClickHandler: function(listObject, addNode) {
			if (/\w|\d/.test(listObject.node.value.charAt(listObject.node.value.length -1 ))) // if the last char isn't whitespace
				listObject.node.value = listObject.node.value.concat('; ' + addNode.value); // append the Add input's text, w/ semicolon
			else
				listObject.node.value = listObject.node.value.concat(addNode.value);
			
			listObject.save();
			location.reload();
			return;
		},
		
	},
	asArray: function(nodeValue) {
		var response = nodeValue.trim();
		response = response.replace(/;{2,}/g, ';'); // Replace multiple semicolons with single
		// response = response.replace(/;$/, ''); // Remove ending semicolons
		response = response.replace(/ {2,}/g, ' '); // Remove multiple spaces
		response = response.match(expr);
		for (var k = 0; k < response.length; k++) {
			if (response[k] == ' ' || response[k] == '') {
				response.pop(k);
				k--;
			} else { 
				response[k] = response[k].trim();
			}
		}
		return response;
	},
	urlList: {
		node: undefined,
		save: function() {
			if (filter.urlList.node.value) {
				localStorage.urlsBlocked = JSON.stringify(filter.asArray(filter.urlList.node.value));
			} else {
				localStorage.urlsBlocked = '[{"empty": true}]';
			}
			console.log('URL list saved.');
		}
	},
	phraseList: {
		node: undefined,
		save: function() {
			if (filter.phraseList.node.value) {
				localStorage.phrasesBlocked = JSON.stringify(filter.asArray(filter.phraseList.node.value));
			} else {
				localStorage.urlsBlocked = '[{"empty": true}]';
			}
			console.log('Phrase list saved.');
		}
	}
}

// Creates the event listeners and initial content of the phrase list
//*** CONVERT TO OOP
function setupPhraseList() {
	$id('phraseList').onfocus = function(event) {
		filter.phraseList.save();
		$id('phraseListCap').style.opacity = 1;
	};
	$id('phraseList').onblur = function(event) {
		filter.phraseList.save();
		$id('phraseListCap').style.opacity = .6;
	};
	var currentData = JSON.parse(localStorage.phrasesBlocked);
	if (currentData[0].empty) return;
	else {
		$id('phraseList').value = currentData.join('; ');
	}
};

// Creates the event listeners and initial content of the URL list
//*** CONVERT TO OOP
function setupUrlList() {
	$id('urlList').onfocus = function(event) {
		filter.urlList.save();
		$id('urlListCap').style.opacity = 1;
	};
	$id('urlList').onblur = function(event) {
		filter.urlList.save();
		$id('urlListCap').style.opacity = .6;
	};
	var currentData = JSON.parse(localStorage.urlsBlocked);
	if (currentData[0].empty) return;
	else {
		$id('urlList').value = currentData.join('; ');
	}
};

// Regular expression for a semicolon-delimited list
var expr = /[^;\n\r]+/g;

// This function is called when the body is loaded.
function bodyOnLoad() {
	
	document.addEventListener('keyup', function(event) {
	// Hacked attempt to steal Ctrl-S functionality
		if (event.keyCode == '83' && event.ctrlKey) {
			event.preventDefault = true;
			event.preventDefault();
			alert('Settings saved.')
		}
	}, true);
	filter.setup();
	setupPhraseList();
	setupUrlList();
};

bodyOnLoad();
