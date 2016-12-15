# Pure Masonry

Masonry DOM effect with pure JavaScript

**Installation**

```bash
npm install --save-dev pure-masonry
```

**Usage**

**1.**
Add pureMasonry.min.css and pureMasonry.min.js to you project code.
```html
<head>
	...
	<link rel="stylesheet" href="node_modules/pure-masonry/src/pureMasonry.min.css">
	...
</head>
<body>
	...
	<script type="text/javascript" src="node_modules/pure-masonry/src/pureMasonry.min.js"></script>
</body>
```
**2.**
Add a container wall to your html body with bricks inside:
(The container's size is under your control, feel free to make it absolute (px) or relative (vw, vh, %).)
```html
<div ID="masonry-wall">
	<div class="brick">
		...
	</div>
	(more bricks... )
</div>
```
**3.**
Initialise Pure Masonry with your preferred brick width, gap size between columns and gap size under each brick (all values in px):
```javascript
mason.grabTrowel(brickWidth, horizontalGutter, verticalGutter);
```
**4.**
You can programmatically suspend Pure Masonry by setting the variable 'mason.options.underConstruction to false'. This prevents the rearrangement of bricks on browser resize.