// UnTurned Dynamic, Recursive, Crafting Helper
// By TTV : http://cleggo.co.uk/unturned
// (C)TTV 2014
// --------------------------------------------
// ToDo...
// item shopping lists

var unturned = {

	version: "1.2.3",
	ut_version: "2.2.0",

	language: "en",
	translationErrors: "none",

	items: [],

	tools: [
		{name: "handsaw", imgXoffset: 0x0},
		{name: "fire", imgXoffset: 0x20},
		{name: "pocket knife", imgXoffset: 0x40},
		{name: "hammer", imgXoffset: 0x60}
	],

	atomic: [
		{name: "log", imgXoffset: 0x80},
		{name: "branch", imgXoffset: 0xa0},
		{name: "rock", imgXoffset: 0xc0},
		{name: "animal pants", imgXoffset: 0xe0},
		{name: "cloth", imgXoffset: 0x100},
		{name: "animal pelt", imgXoffset: 0x120},
		{name: "construction helmet", imgXoffset: 0x140},
		{name: "torch", imgXoffset: 0x160},
		{name: "raw explosive", imgXoffset: 0x180},
		{name: "fresh carrot", imgXoffset: 0x1a0},
		{name: "moldy carrot", imgXoffset: 0x1c0},
		{name: "fresh tomato", imgXoffset: 0x1e0},
		{name: "moldy tomato", imgXoffset: 0x200},
		{name: "fresh corn", imgXoffset: 0x220},
		{name: "moldy corn", imgXoffset: 0x240},
		{name: "fresh cabbage", imgXoffset: 0x260},
		{name: "moldy cabbage", imgXoffset: 0x280},
		{name: "fresh potato", imgXoffset: 0x2a0},
		{name: "moldy potato", imgXoffset: 0x2c0},
		{name: "red berry", imgXoffset: 0x2e0},
		{name: "blue berry", imgXoffset: 0x300},
		{name: "pink berry", imgXoffset: 0x320},
		{name: "pale berry", imgXoffset: 0x340},
		{name: "green berry", imgXoffset: 0x360},
		{name: "purple berry", imgXoffset: 0x380},
		{name: "purification tablet", imgXoffset: 0x3a0},
		{name: "moldy bottled water", imgXoffset: 0x3c0},
		{name: "moldy milk", imgXoffset: 0x3e0},
		{name: "moldy orange juice", imgXoffset: 0x400},
		{name: "raw venison", imgXoffset: 0x420},
		{name: "raw bacon", imgXoffset: 0x440},
		{name: "battery", imgXoffset: 0x460},
		{name: "sledge hammer", imgXoffset: 0x480},
		{name: "canned cola", imgXoffset: 0x4a0},
		{name: "binocular", imgXoffset: 0x4c0},
		{name: "military bullets", imgXoffset: 0x4e0},
		{name: "nato magazine", imgXoffset: 0x500},
		{name: "nato drum", imgXoffset: 0x520},
		{name: "civilian bullets", imgXoffset: 0x540},
		{name: "swift magazine", imgXoffset: 0x560},
		{name: "bonjour clip", imgXoffset: 0x580},
		{name: "lebel magazine", imgXoffset: 0x5a0},
		{name: "tracer bullets", imgXoffset: 0x5c0},
		{name: "nato tracer magazine", imgXoffset: 0x5e0},
		{name: "savage magazine", imgXoffset: 0x600},
		{name: "savage drum", imgXoffset: 0x620},
		{name: "winchester clip", imgXoffset: 0x640},
		{name: "lapua magazine", imgXoffset: 0x660},
		{name: "lapua tracer magazine", imgXoffset: 0x680},
		{name: "yuri magazine", imgXoffset: 0x6a0},
		{name: "xtrmin magazine", imgXoffset: 0x6c0},
		{name: "pdw magazine", imgXoffset: 0x6e0},
		{name: "shells", imgXoffset: 0x700},
		{name: "vitamins", imgXoffset: 0x720}
	],

	contexts: [],

	user_settings: {
		lastVersion: "",	// the last displayed release notes
		hideSplash: false	// don't show splash
	},
	// ------------ utility cookie code
	// load options from cookie
	loadSettingsFromCookie: function(){
		var name = "utcrafter=";
		var ca = document.cookie.split(";");
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i].trim();
			if (c.indexOf(name) == 0){
				this.user_settings = $.extend(true, this.user_settings, $.parseJSON(c.substring(name.length,c.length)));
				break;
			}
		}
	},

	// save options to cookie
	storeSettingsInCookie: function(){
		var d = new Date();
		d.setTime(d.getTime() + ((365)*24*60*60*1000)); // 365 days from now
		document.cookie = "utcrafter=" + JSON.stringify(this.user_settings) + "; expires=" + d.toGMTString();
	},
	// ------------ utility cookie code

	addContextInfo: null,

	setAddContext: function(contextName){
		contextName = this.translate(contextName);
		this.contexts.push(contextName);
		this.addContextInfo = contextName;
	},

	addItem: function(name, createCount, reqArr, imgOffset, minLvl){
		var itm = {
			name: this.translate(name.toLowerCase()),
			count: createCount,
			context: this.addContextInfo,
			req: [],
			tool: null,
			minlvl: minLvl ? minLvl : 0,
			imgXoffset: (imgOffset ? imgOffset : 0)
		};
		for (var c = 0; c < reqArr.length; c++){
			var i = reqArr[c].split("*");
			var i2, cnt;
			if (i.length == 1){
				i2 = i[0];
				cnt = 1;
			} else {
				i2 = i[1];
				cnt = parseInt(i[0], 10);
			}
			i2 = i2.toLowerCase();
			var tl = this.findTool(i2);
			if (tl && (cnt > 1))
				alert("Cannot have multiple tools on [" + name + "]");
			i2 = this.translate(i2);
			if (tl)
				itm.tool = i2;
			else
				itm.req.push({name: i2, count: cnt});
		}
		this.items.push(itm);
	},

	dumpAll: function(){
		var r = "";
		for (var c = 0; c < this.items.length; c++){
			var itm = this.items[c];
			r += itm.count + " " + itm.name + " = ";
			for (var cc = 0; cc < itm.req.length; cc++){
				if (cc > 0)
					r += " + ";
				r += itm.req[cc].count + " * " + itm.req[cc].name;
			}
			if (itm.tool)
				r += " + " + itm.tool;
			r += "<br />";
		}
		return r;
	},

	populateSelect: function($sel){
		for (var c = 0; c < this.items.length; c++){
			var itm = this.items[c];
			$("<option value='" + itm.name + "'>" + itm.name + "</option>")
				.appendTo($sel);
		}
	},

	untranslated: [],

	translate: function(enString){
		for (var c = 0; c < translation.items.length; c++)
			if (translation.items[c].name == enString){
				if (translation.items[c].hasOwnProperty(this.language))
					return translation.items[c][this.language];
				// valid term but unsupported language!
				if ($.inArray(enString, this.untranslated) == -1)
					this.untranslated.push(enString);
				return enString;
			}
		// unknown term
		if ($.inArray(enString, this.untranslated) == -1)
			this.untranslated.push(enString);
		return enString;
	},

	getJStreeStruct: function(){
		var r = [];
		for (var c = 0; c < this.contexts.length; c++){
			var ctx = {
				text: this.contexts[c],
				icon: "images/context.png",
				children: []
			};
			var added = [];
			for (var cc = 0; cc < this.items.length; cc++)
				if (this.items[cc].context == this.contexts[c]){
					if ($.inArray(this.items[cc].name, added) == -1){
						ctx.children.push({
							id: this.items[cc].name,
							text: this.items[cc].name,
							icon: "images/item.png"
						});
						added.push(this.items[cc].name);
					}
				}
			r.push(ctx);
		}
		return r;
	},

	findTool: function(toolName){
		toolName.toLowerCase();
		for (var cc = 0; cc < this.tools.length; cc++)
			if (this.tools[cc].name == toolName)
				return this.tools[cc];
		return null;
	},

	findItem: function(name, multi){
		var r = [];
		for (var c = 0; c < unturned.items.length; c++)
			if (unturned.items[c].name == name){
				if (multi)
					r.push(unturned.items[c]);
				else
					return unturned.items[c];
			}
		if (multi && (r.length > 0))
			return r;
		else
			return null;
	},

	findAtomicItem: function(atomicItemName){
		atomicItemName.toLowerCase();
		for (var cc = 0; cc < this.atomic.length; cc++)
			if (this.atomic[cc].name == atomicItemName)
				return this.atomic[cc];
		return null;
	},

	draw: function($canvas, itemName, itemCnt, settings){
		var unturned = this;
		var font_height = 16;
		var sub_gap_x = 12;
		var box_padding = 2;
		var bg_padding = 4;
		var resource_sz = 32;
		var images = $("#resource_images").get(0);
		if (itemName == "")
			return;
		if (!itemCnt)
			itemCnt = 1;
		function drawItem(ctx, itemName, pos, multiplier){
			var itm;
			if (typeof itemName == "string")
				itm = unturned.findItem(itemName);
			else
				itm = itemName;
			if (!multiplier)
				multiplier = 1;
			var tool = $.isPlainObject(itemName) ? false : unturned.findTool(itemName);
			var nodeTxt = typeof itemName == "string" ? itemName : itemName.name;
			var tsz = ctx.measureText(nodeTxt);
			var content_w = (settings.show_resources && resource_sz > Math.floor(tsz.width)) ? resource_sz : Math.floor(tsz.width) ;
			if (content_w % 2 != 0)
				content_w++;
			var sz = {
				w : (content_w + 2 + (box_padding * 2)),
				h: font_height + (settings.show_resources ? resource_sz : 0) + 2 + (box_padding * 2)
			};
			var mulWidth = 0;
			var mulTxt = "";
			if (!tool){
				mulTxt += multiplier;
				var msz = ctx.measureText(mulTxt);
				mulWidth = Math.floor(msz.width) + (box_padding * 2) + 1;
				sz.w += mulWidth;
			}
			var y_join_gap = sz.h / 2;
			if (tool)
				ctx.fillStyle = "rgb(172, 150, 124)";
			else
				ctx.fillStyle = "#eef";
			ctx.fillRect(pos.x, pos.y, sz.w, sz.h);
			ctx.strokeStyle = "rgb(105, 96, 81)";
			ctx.strokeRect(pos.x, pos.y, sz.w, sz.h);
			if (!tool){
				ctx.fillStyle = "rgb(118, 118, 106)";
				ctx.fillRect(pos.x + 1, pos.y + 1, mulWidth - 2, sz.h - 2);
				ctx.moveTo(pos.x + mulWidth, pos.y + 1);
				ctx.lineTo(pos.x + mulWidth, pos.y + sz.h);
				ctx.stroke();
			}
			ctx.fillStyle = "#444";
			if (!tool){
				ctx.fillText(mulTxt, pos.x + 1 + box_padding, pos.y + ((sz.h - font_height) / 2) - 1);  // multiplier
			}
			ctx.fillText(nodeTxt, pos.x + 1 + box_padding + mulWidth + ((content_w - tsz.width) / 2), pos.y + sz.h - 2 - box_padding - font_height);  // name
			if (settings.show_resources)
				ctx.drawImage(images, unturned.itemNameToImageIdx(itemName), 0, resource_sz, resource_sz, pos.x + 1 + box_padding + mulWidth + ((content_w - resource_sz) / 2) + 0.5, pos.y + 1 + box_padding + 0.5, resource_sz, resource_sz);
			// minimum craftsman level
			if (itm && itm.minlvl){
				var s = "Level " + itm.minlvl;
				switch (itm.minlvl){
					case 1:
						ctx.fillStyle = "orange";
						break;
					case 2:
						ctx.fillStyle = "yellow";
						break;
				}
				ctx.fillText(s, pos.x, pos.y + sz.h);
				sz.h += font_height;
			}
			// multiplier
			if (!tool && itm && (itm.count > 1) && (multiplier > 0)){
				// we require multiple, but, we are also going to make multiple
				multiplier = Math.ceil(multiplier / itm.count);
			}			
			//
			var xx = pos.x + sz.w + sub_gap_x; // gap to sub level
			var yy = pos.y;
			if (itm){
				// non-atomic
				var sz2;
				var sw = 0;
				for (var c = 0; c < itm.req.length; c++){
					sz2 = drawItem(ctx, itm.req[c].name, {x: xx, y: yy}, itm.req[c].count * multiplier);
					// lines
					ctx.moveTo(pos.x + sz.w + 1, pos.y + y_join_gap);
					ctx.lineTo(xx - 1, yy + y_join_gap); // hack
					ctx.stroke();
					// gap and measure
					yy += sz2.h;
					if (sz2.w > sw)
						sw = sz2.w;
					if (c < itm.req.length - 1)
						yy += 6; // inter req gap
				}
				if (itm.tool){
					yy += 6; // inter req gap
					sz2 = drawItem(ctx, itm.tool, {x: xx, y: yy});
					// lines
					ctx.moveTo(pos.x + sz.w + 1, pos.y + y_join_gap);
					ctx.lineTo(xx - 1, yy + y_join_gap); // hack
					ctx.stroke();
					// gap and measure
					yy += sz2.h;
					if (sz2.w > sw)
						sw = sz2.w;
				}
				sz.w += sub_gap_x + sw;
			}
			if (pos.y + sz.h > yy)
				yy = pos.y + sz.h;
			return {w: sz.w, h: yy - pos.y};
		}
		var c = $canvas.get(0);
//		c.width = $canvas.width();
//		c.height = $canvas.height();
		var ctx = c.getContext("2d");
		ctx.translate(0.5, 0.5);
		ctx.font = font_height + "px Arial";
		ctx.textBaseline = "top";
		ctx.fillStyle = "rgb(132, 159, 170)";
		ctx.fillRect(-1, -1, $canvas.width() + 2, $canvas.height() + 2);
		var itms = this.findItem(itemName, true);
		var sz = {w: 0, h : 0};
		var yy = bg_padding;
		for (var c1 = 0; c1 < itms.length; c1++){
			var itm = itms[c1];
			var itm_cnt = itemCnt;
			if (itm_cnt == 1){
				// for 1 items, check that we dont create multiple by default
				if (itm.count > 1)
					itm_cnt = itm.count; // show count on root node
			}
			var sz2 = drawItem(ctx, itm, {x: bg_padding, y: yy}, itm_cnt);
			sz2.w += bg_padding * 2 + 2;
			sz2.h += bg_padding * 2 + 2;
			if (sz2.w > sz.w)
				sz.w = sz2.w;
			sz.h += sz2.h + bg_padding;
			yy += sz2.h + bg_padding;
		}
		if ((sz.w != $canvas.width()) || (sz.h != $canvas.height())){
			// resize
			$canvas.attr("width", sz.w);
			$canvas.attr("height", sz.h);
			this.draw($canvas, itemName, itemCnt, settings);
		}
	},

	itemNameToImageIdx: function(itemName){
		if ($.isPlainObject(itemName))
			return (itemName.imgXoffset ? itemName.imgXoffset : 0);
		var tool = this.findTool(itemName);
		if (tool)
			return (tool.imgXoffset ? tool.imgXoffset : 0);
		var itm = this.findItem(itemName);
		if (itm)
			return (itm.imgXoffset ? itm.imgXoffset : 0);
		itm = this.findAtomicItem(itemName);
		if (itm)
			return (itm.imgXoffset ? itm.imgXoffset : 0);
		return 0;
	},

	setup: function(){
		var c;
		// rip language from url
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for (var c = 0; c < vars.length; c++) {
    		var pair = vars[c].split("=");
			if (pair[0].toLowerCase() == "language")
				this.language = $.trim(pair[1].toLowerCase());
		} 
		// translate tools & atomics
		for (c = 0; c < this.tools.length; c++)
			this.tools[c].name = this.translate(this.tools[c].name);
		for (c = 0; c < this.atomic.length; c++)
			this.atomic[c].name = this.translate(this.atomic[c].name);
		// from  http://unturned-bunker.wikia.com/wiki/Crafting_Recipes
		// any source item (tool or element) without a constuctor must be atomic (log, branch, rock, cloth, can, construction helmet, torch etc.)
		// todo : some items can also be sporned (stick, board, nail, bolt)
		//supplies
		this.setAddContext("supplies");
		this.addItem("board", 4, ["1*log"], 0x740); // 4 boards = 1 log
		this.addItem("stick", 4, ["1*board", "handsaw"], 0x760); // 4 sticks = 1 board + handsaw
		this.addItem("nail", 2, ["1*scrap metal"], 0x780); // 2 nails = 1 scrap metal
		this.addItem("bolt", 2, ["1*scrap metal", "fire"], 0x7a0); // 2 bolts = 1 scrap metal + fire
		this.addItem("wood spike", 1, ["1*stick", "pocket knife"], 0x7c0); // 1 wooden spike = 2 sticks + pocket knife#
		this.addItem("stick", 3, ["1*branch"], 0x760); // 3 sticks = 1 branch
		this.addItem("stone", 3, ["1*rock"], 0x7e0); // 3 stone = 1 rock
		this.addItem("scrap metal", 1, ["2*stone", "fire"], 0x800); // 1 scrap metal = 2 stone + fire
		this.addItem("wire", 3, ["1*scrap metal", "handsaw"], 0x820); // 3 wire = 1 scrap metal + handsaw
		this.addItem("rope", 2, ["1*cloth", "handsaw"], 0x840); // 2 rope = 1 cloth + handsaw
		this.addItem("duct tape", 2, ["1*animal pelt", "1*can"], 0x860); // 2 duct tape = 1 animal pelt + 1 can
		this.addItem("miner helmet", 1, ["1*construction helmet", "1*torch"], 0x880); // 1 miner helmet = 1 construction helmet + 1 torch
		this.addItem("can", 1, ["2*scrap metal", "1*hammer"], 0x8a0);
		// components
		this.setAddContext("components");
		this.addItem("wood plate", 1, ["2*board"], 0x8c0); // 1 wood plate = 2 board
		this.addItem("wood support", 1, ["2*stick"], 0x8e0); // 1 wood plate = 2 stick
		this.addItem("wood frame", 1, ["2*wood plate"], 0x900); // 1 wood frame = 2 wood plate
		this.addItem("wood cross", 1, ["2*wood support"], 0x920); // 1 wood cross = 2 wood support
		this.addItem("stone plate", 1, ["2*stone"], 0x940);
		this.addItem("stone support", 1, ["1*stone", "1*board"], 0x960);
		this.addItem("stone frame", 1, ["2*stone plate"], 0x980);
		this.addItem("stone cross", 1, ["2*stone support"], 0x9a0);
		// structures
		this.setAddContext("structures");
		this.addItem("wood foundation", 1, ["3*wood frame"], 0x9c0); // 1 wood foundation = 3 wood frame
		this.addItem("wood wall", 1, ["2*wood frame", "1*wood pillar"], 0x9e0); // 1 wood wall = 2 wood frame + 1 wood pillar
		this.addItem("wood doorway", 1, ["1*wood wall", "1*wood support"], 0xa00);
		this.addItem("wood pillar", 1, ["2*wood support", "1*board"], 0xa20); // 1 wood pillar = 2 wood support + 1 board
		this.addItem("wood platform", 1, ["3*wood plate", "1*wood cross"], 0xa40);
		this.addItem("wood ramp", 1, ["1*wood platform", "2*wood support"], 0xa60);
		this.addItem("greenhouse foundation", 1, ["1*wood foundation", "4*fertilizer"], 0xa80);
		this.addItem("greenhouse platform", 1, ["1*wood platform", "4*fertilizer"], 0xaa0);
		this.addItem("wood hole", 1, ["1*wood platform", "1*wood frame"], 0xac0);
		this.addItem("wood ladder", 1, ["9*stick", "1*duct tape"], 0xae0);
		this.addItem("wood window", 1, ["1*wood doorway", "1*wood support"], 0xb00);
		this.addItem("wood post", 2, ["1*wood pillar"], 0xb20);
		this.addItem("wood rampart", 2, ["1*wood wall"], 0xb40);
		this.addItem("stone rampart", 2, ["1*stone wall"], 0xb60, 1); // 2 stone rampart = 1 stone wall. requires level 1 Craftsman or higher
		this.addItem("stone post", 2, ["1*stone pillar"], 0xb80, 1);
		this.addItem("stone wall", 1, ["2*stone frame", "1*stone pillar"], 0xba0, 1);
		this.addItem("stone doorway", 1, ["1*stone wall", "1*stone support"], 0xbc0, 1);
		this.addItem("stone window", 1, ["1*stone doorway", "1*stone support"], 0xbe0, 1);
		this.addItem("stone pillar", 1, ["2*stone support", "1*board"], 0xc00, 1);
		this.addItem("dock foundation", 1, ["1*wood foundation", "2*wood ladder"], 0xc20);
		this.addItem("brazier", 1, ["2*stick", "2*bolt"], 0xc40); // Wall Mounted Torch
		this.addItem("wood garage", 1, ["1*wood window", "1*wood support"], 0xc60);
		this.addItem("stone garage", 1, ["1*stone window", "1*stone support"], 0xc80);
		// Barricades
		this.setAddContext("barricades");
		this.addItem("wood shield", 1, ["3*board", "1*nail"], 0xca0);
		this.addItem("wood door", 1, ["1*wood frame", "1*bolt"], 0xcc0);
		this.addItem("caltrop", 1, ["2*nail"], 0xce0);
		this.addItem("barbed wire", 1, ["2*wire"], 0xd00);
		this.addItem("wood spike trap", 1, ["4*wood spike"], 0xd20);
		this.addItem("snare", 1, ["1*can", "2*scrap metal"], 0xd40);
		this.addItem("electric trap", 1, ["3*scrap metal", "2*wire"], 0xd60);
		this.addItem("campfire", 1, ["4*stick", "4*stone"], 0xd80);
		this.addItem("wood shutter", 1, ["1*wood door", "1*bolt"], 0xda0);
		this.addItem("moab", 1, ["3*raw explosive", "2*duct tape"], 0xdc0, 2); // (requires level 2 Craftsman or higher)
		this.addItem("tripmine", 1, ["2*raw explosive", "4*wire"], 0xde0, 2);
		this.addItem("landmine", 1, ["2*raw explosive", "1*can"], 0xe00, 2);
		this.addItem("metal shield", 1, ["4*scrap metal", "2*bolt"], 0xe20, 2);
		this.addItem("electric fence", 1, ["1*barbed fence", "4*scrap metal"], 0xe40);
		this.addItem("barbed fence", 1, ["2*wood support", "3*barbed wire"], 0xe60);
		this.addItem("wood gate", 1, ["2*wood shutter", "2*bolt"], 0xe80);
		this.addItem("metal door", 1, ["1*wood door", "3*scrap metal"], 0xea0, 2);
		this.addItem("metal shutter", 1, ["1*wood shutter", "3*scrap metal"], 0xec0);
		this.addItem("metal gate", 1, ["2*metal shutter", "2*bolt"], 0xee0);
		// Farming
		this.setAddContext("farming");
		this.addItem("carrot seed", 2, ["1*fresh carrot"], 0xf00);
		this.addItem("carrot seed", 1, ["1*moldy carrot"], 0xf00);
		this.addItem("tomato seed", 2, ["1*fresh tomato"], 0xf20);
		this.addItem("tomato seed", 1, ["1*moldy tomato"], 0xf20);
		this.addItem("corn seed", 2, ["1*fresh corn"], 0xf40);
		this.addItem("corn seed", 1, ["1*moldy corn"], 0xf40);
		this.addItem("cabbage seed", 2, ["1*fresh cabbage"], 0xf60);
		this.addItem("cabbage seed", 1, ["1*moldy cabbage"], 0xf60);
		this.addItem("potato seed", 2, ["1*fresh potato"], 0xf80);
		this.addItem("potato seed", 1, ["1*moldy potato"], 0xf80);
		this.addItem("fertilizer", 3, ["1*rope", "1*cloth"], 0xfa0);
		// Storage
		this.setAddContext("storage");
		this.addItem("crate", 1, ["2*wood frame", "3*wood cross"], 0xfc0, 1); // (requires level 1 Craftsman or higher)
		this.addItem("chest", 1, ["1*crate", "3*wood cross"], 0xfe0, 2); // (requires level 2 Craftsmam or higher)
		this.addItem("metal locker", 1, ["1*crate", "3*scrap metal"], 0x1000, 2); // (requires level 2 Craftsman or higher)
		// Sleeping
		this.setAddContext("sleeping");
		this.addItem("cot", 1, ["8*cloth", "5*scrap metal"], 0x1020);
		this.addItem("sleeping bag", 1, ["7*cloth", "2*duct tape"], 0x1040);
		// Medical
		this.setAddContext("medical");
		this.addItem("rag", 1, ["2*cloth"], 0x1060);
		this.addItem("bandage", 1, ["2*rag"], 0x1080);
		this.addItem("dressing", 1, ["2*bandage"], 0x10a0);
		this.addItem("splint", 1, ["1*scrap metal", "2*stick"], 0x10c0);
		this.addItem("crushed red berry", 1, ["2*red berry", "1*stone"], 0x10e0);
		this.addItem("crushed blue berry", 1, ["2*blue berry", "1*stone"], 0x1100);
		this.addItem("crushed pink berry", 1, ["2*pink berry", "1*stone"], 0x1120);
		this.addItem("crushed pale berry", 1, ["2*pale berry", "1*stone"], 0x1140);
		this.addItem("crushed green berry", 1, ["2*green berry", "1*stone"], 0x1160);
		this.addItem("crushed purple berry", 1, ["2*purple berry", "1*stone"], 0x1180);
		this.addItem("purification tablet", 1, ["1*fertilizer", "1*vitamins"], 0x3a0);
		// Water
		this.setAddContext("water");
		this.addItem("bottled water", 1, ["1*moldy bottled water", "1*purification tablet"], 0x11a0);
		this.addItem("milk", 1, ["1*moldy milk", "1*purification tablet"], 0x11c0);
		this.addItem("orange juice", 1, ["1*moldy orange juice", "1*purification tablet"], 0x11e0);
		// Food
		this.setAddContext("food");
		this.addItem("cooked venison", 1, ["1*raw venison", "fire"], 0x1200);
		this.addItem("cooked bacon", 1, ["1*raw bacon", "fire"], 0x1220);
		// Clothing
		this.setAddContext("clothing");
		this.addItem("animal shirt", 1, ["4*animal pelt"], 0x1240);
		this.addItem("animal pants", 1, ["3*animal pelt", "1*rope"], 0xe0);
		this.addItem("animal pack", 1, ["4*animal pelt", "1*duct tape"], 0x1260);
		// Ammunition
		this.setAddContext("ammunition");
		this.addItem("full nato magazine", 1, ["2*military bullets", "1*nato magazine"], 0x1280);
		this.addItem("full nato drum", 1, ["4*military bullets", "1*nato drum"], 0x12a0);
		this.addItem("full swift magazine", 1, ["1*civilian bullets", "1*swift magazine"], 0x12c0);
		this.addItem("full bonjour clip", 1, ["1*civilian bullets", "1*bonjour clip"], 0x12e0);
		this.addItem("full lebel magazine", 1, ["1*civilian bullets", "1*lebel magazine"], 0x1300);
		this.addItem("full nato tracer magazine", 1, ["2*tracer bullets", "1*nato tracer magazine"], 0x1320);
		this.addItem("full savage magazine", 1, ["2*civilian bullets", "1*savage magazine"], 0x1340);
		this.addItem("full savage drum", 1, ["3*civilian bullets", "1*savage drum"], 0x1360);
		this.addItem("full winchester clip", 1, ["1*civilian bullets", "1*winchester clip"], 0x1380);
		this.addItem("full lapua magazine", 1, ["1*military bullets", "1*lapua magazine"], 0x13a0);
		this.addItem("full lapua tracer magazine", 1, ["1*tracer bullets", "1*lapua tracer magazine"], 0x13c0);
		this.addItem("full yuri magazine", 1, ["2*civilian bullets", "1*yuri magazine"], 0x13e0);
		this.addItem("full xtrmin magazine", 1, ["1*civilian bullets", "1*xtrmin magazine"], 0x1400);
		this.addItem("full pdw magazine", 1, ["2*military bullets", "1*pdw magazine"], 0x1420);
		this.addItem("arrow", 3, ["1*stick", "1*nail"], 0x1440);
		this.addItem("buckshot", 6, ["1*shells", "2*nail"], 0x1460);
		this.addItem("slug", 6, ["1*shells", "2*bolt"], 0x1480);
		// Attatchments
		this.setAddContext("attachments");
		this.addItem("tactical light", 1, ["1*handlamp", "2*duct tape"], 0x14a0);
		this.addItem("muffler", 1, ["2*canned cola", "2*can", "fire"], 0x14c0);
		this.addItem("zoomomatic", 1, ["1*binocular", "2*duct tape"], 0x14e0);
		// Gear
		this.setAddContext("gear");
		this.addItem("handlamp", 1, ["1*battery", "2*scrap metal"], 0x1500);
		this.addItem("longbow", 1, ["3*wood support", "2*rope"], 0x1520);
		this.addItem("canteen", 1, ["1*can", "1*bottled water"], 0x1540);
		this.addItem("frag grenade", 1, ["3*nail", "1*raw explosive"], 0x1560, 1);  // (requires level 1 craftsman or higher)
		this.addItem("car jack", 1, ["1*sledge hammer", "4*scrap metal"], 0x1580);

		// handle missing translations
		if (this.untranslated.length > 0){
			var s;
			switch (this.translationErrors){
				case "show":
					s = "There were problems with translating the following...<br/>";
					for (c = 0; c < this.untranslated.length; c++)
						s += this.untranslated[c] + "<br>";
					$("#output_foot").html(s).height(200);
					break;
				case "code":
					s = "var translation = {\n" +
						"\titems: [\n";
					for (c = 0; c < this.untranslated.length; c++)
						s += "\t\t{\n\t\t\tname: \"" + this.untranslated[c] + "\",\n" +
							"\t\t\ten: \"" + this.untranslated[c].substr(0, 1).toUpperCase() + this.untranslated[c].substr(1) + "\"\n" +
							"\t\t},\n";
					s += "\t]\n};";
					$("#output_foot").html(s).height(200);
					break;
			}
		}
	}

};