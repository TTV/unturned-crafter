<?php

// perhaps from here too...
//   http://steamcommunity.com/sharedfiles/filedetails/?id=287691451

set_time_limit(0);
ob_start();

$base = "http://unturned-bunker.wikia.com/wiki/";

$pages = array(
"Animal Pants",
"Animal Pelt",
"Animal Shirt",
"Animalpack",
"Army Fatigues",
"Arrow",
"Bandage",
"Barbed Wire",
"Batteries",
"Binoculars",
"Blue Berries",
"Blue Sweatervest",
"Board",
"Bolts",
"Bonjour Clip",
"Boring Pants",
"Boring Suit",
"Bottled Water",
"Branch",
"Brazier",
"Brown Pants",
"Buckshot",
"Cabbage Seed",
"Caltrop",
"Campfire",
"Can",
"Canned Cola",
"Canteen",
"Car Jack",
"Carrot Seed",
"Chef Pants",
"Chef Shirt",
"Chest",
"Civilian Bullets",
"Cloth",
"Construction Helmet",
"Cooked Bacon",
"Cooked Venison",
"Corn Seed",
"Cot",
"Crate",
"Crushed Blue Berries",
"Crushed Green Berries",
"Crushed Pale Berries",
"Crushed Pink Berries",
"Crushed Purple Berries",
"Crushed Red Berries",
"Doctor Coat",
"Doctor Pants",
"Dressing",
"Duct Tape",
"Electric Fence",
"Electric Trap",
"Fancy Jeans",
"Fancy Suit",
"Fertilizer",
"Frag Grenade",
"Fresh Cabbage",
"Fresh Carrot",
"Fresh Corn",
"Fresh Potato",
"Fresh Tomato",
"Garage Door",
"Garage Port",
"Green Berries",
"Greenhouse Foundation",
"Greenhouse Platform",
"Grey Pants",
"Grocer Bottom",
"Grocer Top",
"Handlamp",
"Handsaw",
"Jumper Bottom",
"Jumper Top",
"Khaki Pants",
"Landmine",
"Lapua Magazine",
"Lapua Tracer",
"Lebel Magazine",
"Log",
"Longbow",
"Lumberjack Pants",
"MOAB",
"Metal Door",
"Metal Gate",
"Metal Locker",
"Metal Shield",
"Metal Shutter",
"Military Bullets",
"Milk",
"Miner Helmet",
"Moldy Bottled Water",
"Moldy Cabbage",
"Moldy Carrot",
"Moldy Corn",
"Moldy Milk",
"Moldy Orange Juice",
"Moldy Potato",
"Moldy Tomato",
"Muffler",
"NATO Drum",
"NATO Magazine",
"NATO Tracer",
"Nails",
"Orange Hoodie",
"Orange Juice",
"PDW Magazine",
"Pale Berries",
"Pink Berries",
"Pink Shirt",
"Plaid Shirt",
"Pocketknife",
"Police Uniform",
"Potato Seed",
"Purification Tablets",
"Purple Berries",
"RCMP Uniform",
"Rag",
"Raw Bacon",
"Raw Explosives",
"Raw Venison",
"Red Berries",
"Rock",
"Rope",
"Sailor Fatigues",
"Savage Drum",
"Savage Magazine",
"Scrap Metal",
"Shells",
"Sledgehammer",
"Sleeping Bag",
"Slug",
"Snare",
"Splint",
"Stick",
"Stone",
"Stone Cross",
"Stone Doorway",
"Stone Frame",
"Stone Pillar",
"Stone Plate",
"Stone Post",
"Stone Rampart",
"Stone Support",
"Stone Wall",
"Stone Window",
"Swift Magazine",
"Tactical Light",
"Tomato Seed",
"Torch",
"Tracer Bullets",
"Tripmine",
"Winchester Clip",
"Wire",
"Wire Fence",
"Wooden Cross",
"Wooden Door",
"Wooden Doorway",
"Wooden Foundation",
"Wooden Frame",
"Wooden Hole",
"Wooden Ladder",
"Wooden Pillar",
"Wooden Plate",
"Wooden Platform",
"Wooden Post",
"Wooden Ramp",
"Wooden Rampart",
"Wooden Shield",
"Wooden Shutter",
"Wooden Spike",
"Wooden Spike Trap",
"Wooden Support",
"Wooden Wall",
"Wooden Window",
"Work Jeans",
"Xtrmin Magazine",
"Yuri Magazine",
"Zoomomatic"
);

foreach ($pages as $p){
	$url = $base . $p;
	$url = str_replace(" ", "_", $url);
	//echo "<a href='" . $url . "'>" . $p . "</a><br />";
	$html = get_data($url);
	if ($html === false)
		//echo "cannot read page<br />";
		echo "";
	else {
		$done = false;
		do {
			$i = strpos($html, "image-thumbnail");
			if ($i !== false){
				$html = substr($html, $i + 15);
				$i = strpos($html, "</a>");
				if ($i !== false){
					$s = substr($html, 0, $i);
					$html = substr($html, $i);
					//
					$i = strpos($s, "<img");
					if ($i !== false){
						$s = substr($s, $i);
						$i = strpos($s, ">");
						if ($i !== false){
							$s = substr($s, 0, $i + 1);

							preg_match('#<img.*?(http://.*?\.(jpg|png|gif|jpeg))#', $s, $matches);
							$img = get_data($matches[1]);
							$img_name = basename($matches[1]);
							file_put_contents(dirname(__FILE__) . "/grabs/" . $img_name, $img);

							echo "Saved figure(s) of " . $p . "<br />";

							$done = true;
						}
					}
				}
			}
			if (!$done)
				echo "Cannot find figure of " . $p . "<br />";
			ob_flush();
		} while ($i !== false);
	}
}

ob_end_flush();

/* Curl to speed up grabbing */
function get_data($url) {
	$ch = curl_init();
	$timeout = 5;
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
	$data = curl_exec($ch);
	curl_close($ch);
	return $data;
}

?>