let currentColor = '#FFFFFF'

document.addEventListener('DOMContentLoaded', function (){
	let canvasWidth = 60
	let canvasHeight = 40
	let canvasHTML = ''
	let colors = ['#FFFFFF','#C0C0C0','#808080','#000000','#FF0000','#800000','#FFFF00','#808000','#00FF00','#008000','#00FFFF','#008080','#0000FF','#000080','#FF00FF','#800080']
	let colorsHTML = ''

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
		})
	}
	
	let pixels = document.getElementsByClassName('pixel') //add listeners to pixels in canvas
	for (let items in pixels){
		pixels[items].addEventListener('click',function(){
			pixels[items].style.backgroundColor = currentColor
		})
	}
})