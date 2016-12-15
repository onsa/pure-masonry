'use strict';

//	get container element
var brickContainer = document.getElementById('masonry-wall');

var build = function(options) {

	//	get each brick
	var bricks = [];
	for (var brickIndex = 0; brickIndex < brickContainer.children.length; brickIndex++) {
		var classNames = brickContainer.children[brickIndex].className.split(' ');
		if (classNames.indexOf('brick') > -1) {
			brickContainer.children[brickIndex].style.width = options.brickWidth + 'px';
			bricks.push(brickContainer.children[brickIndex]);
		}
	}

	var grossWidth = options.brickWidth + options.horizontalGutter;

	//	calculate the number of bricks in each row
	var bricksPerRow = Math.floor(parseInt(brickContainer.clientWidth) / grossWidth);

	//	initialise array to keep track of column height
	var columnHeight = Array(bricksPerRow).fill(0);

	//	populate first row starting with first (0th) brick
	var brickIndex = 0;
	for (var column = 0; column < bricksPerRow; column++) {
		if (brickIndex < bricks.length) {
			//	set coordinates for brick
			bricks[brickIndex].style.left = column * grossWidth + 'px';
			bricks[brickIndex].style.top = '0px';
			//	update the height of the column just appended
			columnHeight[column] = bricks[brickIndex].offsetHeight;
			brickIndex++;
		}
	}

	//	place remaining bricks
	while (brickIndex < bricks.length) {
		//	get shortest column
		var minColumnValue = Math.min.apply(Math, columnHeight);
		var minColumnKey;
		for (var column = 0; column < bricksPerRow; column++) {
			//	find the key for the minimum value
			if (columnHeight[column] === minColumnValue) {
				minColumnKey = column;
				//	use the leftmost in case several columns have the same height
				break;
			}
		}
		//	set coordinates for brick
		bricks[brickIndex].style.left = minColumnKey * grossWidth + 'px';
		bricks[brickIndex].style.top = columnHeight[minColumnKey] + options.verticalGutter + 'px';
		//	update the height of the column just appended
		columnHeight[minColumnKey] += bricks[brickIndex].offsetHeight + options.verticalGutter;
		brickIndex++;
	}
}

//	if browser is resized
window.onresize = function() {
	//	if masonry is not disabled
	if (mason.options.underConstruction) {
		var widthBefore = brickContainer.clientWidth;			//	get width before resizing
		//	if already called within last second, reset timer
		if (waitingForResize) {
			clearTimeout(waitingForResize);
		}
		var waitingForResize = setTimeout(function() {
			//	if container width has changed in the last second
			if (widthBefore !== brickContainer.clientWidth) {
				build(mason.options);
			}
		}, 1000);
    }
};

//	initialise main object
var mason = {
	options: {},

	grabTrowel: function(brickWidth, horizontalGutter, verticalGutter) {
		this.options = {
			brickWidth:	brickWidth,
			horizontalGutter:	horizontalGutter,
			verticalGutter:	verticalGutter,
			underConstruction: true
		};

		build(this.options);
	}
};