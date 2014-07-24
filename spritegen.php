<?php

/* this file is only applicable for initial setup at present as it assumes order of input file */

// globals
$base = "images/perfect images"; // the folder that holds the images
$outputFn = "images/resources.png"; // output image filename
$jsFn = "tree.js"; // the maser tree draw javascript filename

// read the main js file
$js = file_get_contents($jsFn);
// build a list of required files
$items = array();
// rip the tools & atomics
preg_match_all("/{name: \"(.*?)\", imgXoffset: .*?}/i", $js, $matches);
// loop through the "names"
foreach ($matches[1] as $val)
	$items[] = $val;
// rip the recipies
preg_match_all("/this\.addItem\(\"(.*?)\"/", $js, $matches);
// loop through the "recipies"
foreach ($matches[1] as $val)
	$items[] = $val;
// OK, we now have a list of items ;-) On with the show
/* -- debug --
foreach($items as $i)
	echo $i . "<br>";
die;
*/
// count the sprites
$spritecount = count($items);
// create the sprite
$output = imagecreate($spritecount * 32, 32);
// ok, grab the order
$x = 0;
$handled = 0;
foreach ($items as $item){
	$fn = $base . "/" . $item . ".png";
	if (is_file($fn)){
		$single = imagecreatefrompng($fn);
		imagecopy($output, $single, $x, 0, 0, 0, 32 ,32);
		$handled++;
	} else {
		echo "missing item image for [" . $item . "]<br />";
	}
	$x += 32;
}
// write out the sprite
imagepng($output, $outputFn);
// report
echo("--------- Report ---------<br>");
echo("Total items: " . $spritecount . "<br>");
echo("Processed: " . $handled . "<br>");
echo("Missing: " . ($spritecount - $handled) . "<br>");
?>