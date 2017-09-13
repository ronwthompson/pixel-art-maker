let currentColor = '#FFFFFF'
let isFill = false

document.addEventListener('DOMContentLoaded', function (){
	let canvasWidth = 60
	let canvasHeight = 40
	let canvasHTML = ''
	let colors = ['#FFFFFF','#C0C0C0','#808080','#000000','#FF0000','#800000','#FFFF00','#808000','#00FF00','#008000','#00FFFF','#008080','#0000FF','#000080','#FF00FF','#800080']
	let colorsHTML = ''
	let isDrawing = false

	document.getElementById('pixel-canvas').addEventListener('mousedown',function(){
		isDrawing = true
	})

	document.getElementById('pixel-canvas').addEventListener('mouseup',function(){
		isDrawing = false
	})

	document.getElementById('customInput').addEventListener("change", colorChange, false);
	document.getElementById('saveButton').addEventListener("click", saveData, false);
	document.getElementById('loadButton').addEventListener("click", loadData, false);
	document.getElementById('toggleFill').addEventListener("click", fillToggle, false);

	for (let i = 1; i <= canvasHeight; i++){ //make pixel canvas
		for (let o = 1; o <= canvasWidth; o++){
			canvasHTML += '<div class="pixel" id="pixel'+o+'x'+i+'"></div>'
		}
	}
	document.getElementById('pixel-canvas').innerHTML = canvasHTML

	for (let i = 1; i <= colors.length; i++){ //make color palette html
		colorsHTML += '<div class="palette" id="color'+i+'"></div>'
	}
	document.getElementById('color-palette').innerHTML = colorsHTML

	for (let i = 0; i < colors.length; i++){ //add background colors to color palette and add listeners
		document.getElementById('color'+(i+1)).style.backgroundColor = colors[i]
		document.getElementById('color'+(i+1)).addEventListener('click',function(){
			currentColor = colors[i]
			document.getElementById('currentColor').style.backgroundColor = colors[i]
		})
	}
	
	let pixels = document.getElementsByClassName('pixel') //add listeners to pixels in canvas
	for (let i = 0; i < pixels.length; i++){
		pixels[i].style.backgroundColor = currentColor
		pixels[i].addEventListener('click',function(){
			if (isFill){
				floodFill(pixels[i],pixels[i].style.backgroundColor,currentColor)
			} else {
				pixels[i].style.backgroundColor = currentColor
			}
		})
		pixels[i].addEventListener('mouseenter',function(){
			if (isDrawing){
				pixels[i].style.backgroundColor = currentColor
			}
		})
	}
})

function colorChange(event){
	currentColor = event.target.value
	document.getElementById('currentColor').style.backgroundColor = currentColor
}

function saveData(){
	let savePixels = document.getElementsByClassName('pixel')
	let saveData = []
	for (let i = 0; i < savePixels.length; i++){
		saveData.push(savePixels[i].style.backgroundColor)
	}
	localStorage.setItem("painting", JSON.stringify(saveData))
	alert("Your painting has been saved!")
}

function loadData(){
	let loadData = JSON.parse(localStorage.getItem("painting"))
	let loadPixels = document.getElementsByClassName('pixel')
	for (let i = 0; i < loadData.length; i++){
		loadPixels[i].style.backgroundColor = loadData[i]
	}
	alert("Your painting has been loaded!")
}

function fillToggle(){
	if (isFill) {
		isFill = false
		document.getElementById('fillDisplay').innerHTML = 'Off'
	} else {
		isFill = true
		document.getElementById('fillDisplay').innerHTML = 'On'
	}

	if (isFill) {
		document.getElementById('pixel-canvas').style.cursor = 'move'
	} else {
		document.getElementById('pixel-canvas').style.cursor = 'auto'
	}
}

function floodFill(node, targetColor, replacementColor){
	if (targetColor == replacementColor){
		return
	}
	if (targetColor != node.style.backgroundColor){
		return
	}
	node.style.backgroundColor = replacementColor
	let nodeCoords = node.id.match(/(\d)+/g)
	let nodeNorth = document.getElementById('pixel'+nodeCoords[0]+'x'+(parseInt(nodeCoords[1])+1))
	let nodeEast = document.getElementById('pixel'+(parseInt(nodeCoords[0])+1)+'x'+nodeCoords[1])
	let nodeSouth = document.getElementById('pixel'+nodeCoords[0]+'x'+(parseInt(nodeCoords[1])-1))
	let nodeWest = document.getElementById('pixel'+(parseInt(nodeCoords[0])-1)+'x'+nodeCoords[1])
	if (nodeCoords[1] < 40) {
		floodFill(nodeNorth, targetColor, replacementColor)
	}
	if (nodeCoords[0] < 60) {
		floodFill(nodeEast, targetColor, replacementColor)
	}
	if (nodeCoords[1] > 1) {
		floodFill(nodeSouth, targetColor, replacementColor)
	}
	if (nodeCoords[0] > 1) {
		floodFill(nodeWest, targetColor, replacementColor)
	}
}