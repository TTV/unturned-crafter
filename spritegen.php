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
	if (array_search($val, $items) === false)
		$items[] = $val;
// rip the recipies
preg_match_all("/this\.addItem\(\"(.*?)\"/", $js, $matches);
// loop through the "recipies"
foreach ($matches[1] as $val)
	if (array_search($val, $items) === false)
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
		echo "missing: " . $item . ".png<br />";
	}
	$x += 32;
}
// write out the sprite
imagepng($output, $outputFn);
// hack js
$x = 0;
foreach($items as $i){
	$start = 0;
	do {
		$found = false;
		$p = strpos($js, '{name: "' . $i . '"', $start);
		if ($p !== false){
			// it is tool or atomic
			// echo $i . " is a tool / atomic<br>";
			$p2 = strpos($js, '0x', $p);
			$p3 = strpos($js, '}', $p2);
			if ($p3 === false)
				echo $i . " -- error -- could not find close<br>";
			else
				$js = substr($js, 0, $p2) . "0x" . dechex($x) . substr($js, $p3);
			$found = true;
		} else {
			$p = strpos($js, 'this.addItem("' . $i . '"', $start);
			if ($p !== false){
				// it is recipie
				// echo $i . " is a recipie<br>";
				$p2 = strpos($js, '0x', $p);
				$p3 = strpos($js, ')', $p2);
				$p4 = strpos($js, ',', $p2);
				if ($p4 && ($p4 < $p3))
					$p3 = $p4;
				if ($p3 === false)
					echo $i . " -- error -- could not find close<br>";
				else
					$js = substr($js, 0, $p2) . "0x" . dechex($x) . substr($js, $p3);
				$found = true;
			}
		}
		if ($found)
			$start = $p + 1;
	} while ($found);
	$x += 32;
}
/*
echo $js;
*/ 
// rename old tree.js
if (@is_file("tree_old.js"))
	unlink("tree_old.js");
rename("tree.js", "tree_old.js");
// write new tree.js
file_put_contents("tree.js", $js);
/* */
// report
echo("--------- Report ---------<br>");
echo("Total items: " . $spritecount . "<br>");
echo("Processed: " . $handled . "<br>");
echo("Missing: " . ($spritecount - $handled) . "<br>");
?>