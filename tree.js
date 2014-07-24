// UnTurned Dynamic, Recursive, Crafting Helper
// By TTV : http://cleggo.co.uk/unturned
// (C)TTV 2014
// --------------------------------------------
// ToDo...
// translation & rip images

var unturned = {

	version: "1.1.1",
	ut_version: "2.1.7",

	items: [],

	tools: [
		{name: "handsaw", imgXoffset: 0},
		{name: "fire", imgXoffset: 32},
		{name: "pocket knife", imgXoffset: 64}
	],

	atomic: [
		{name: "log", imgXoffset: 96},
		{name: "branch", imgXoffset: -32},
		{name: "rock", imgXoffset: -32},
		{name: "animal pants", imgXoffset: -32},
		{name: "cloth", imgXoffset: -32},
		{name: "can", imgXoffset: -32},
		{name: "construction helmet", imgXoffset: -32},
		{name: "torch", imgXoffset: -32},
		{name: "raw explosive", imgXoffset: -32},
		{name: "fresh carrot", imgXoffset: -32},
		{name: "moldy carrot", imgXoffset: -32},
		{name: "fresh tomato", imgXoffset: -32},
		{name: "moldy tomato", imgXoffset: -32},
		{name: "fresh corn", imgXoffset: -32},
		{name: "moldy corn", imgXoffset: -32},
		{name: "fresh cabbage", imgXoffset: -32},
		{name: "moldy cabbage", imgXoffset: -32},
		{name: "fresh potato", imgXoffset: -32},
		{name: "moldy potato", imgXoffset: -32},
		{name: "red berry", imgXoffset: -32},
		{name: "blue berry", imgXoffset: -32},
		{name: "pink berry", imgXoffset: -32},
		{name: "pale berry", imgXoffset: -32},
		{name: "green berry", imgXoffset: -32},
		{name: "purple berry", imgXoffset: -32},
		{name: "purification tablet", imgXoffset: -32},
		{name: "moldy bottled water", imgXoffset: -32},
		{name: "moldy milk", imgXoffset: -32},
		{name: "moldy orange juice", imgXoffset: -32},
		{name: "raw venison", imgXoffset: -32},
		{name: "raw bacon", imgXoffset: -32},
		{name: "battery", imgXoffset: -32},
		{name: "sledge hammer", imgXoffset: -32},
		{name: "canned cola", imgXoffset: -32},
		{name: "binocular", imgXoffset: -32},
		{name: "military bullets", imgXoffset: -32},
		{name: "nato magazine", imgXoffset: -32},
		{name: "nato drum", imgXoffset: -32},
		{name: "civilian bullets", imgXoffset: -32},
		{name: "swift magazine", imgXoffset: -32},
		{name: "bonjour clip", imgXoffset: -32},
		{name: "lebel magazine", imgXoffset: -32},
		{name: "tracer bullets", imgXoffset: -32},
		{name: "nato tracer magazine", imgXoffset: -32},
		{name: "savage magazine", imgXoffset: -32},
		{name: "savage drum", imgXoffset: -32},
		{name: "winchester clip", imgXoffset: -32},
		{name: "lapua magazine", imgXoffset: -32},
		{name: "lapua tracer magazine", imgXoffset: -32},
		{name: "yuri magazine", imgXoffset: -32},
		{name: "xtrmin magazine", imgXoffset: -32},
		{name: "pdw magazine", imgXoffset: -32},
		{name: "shell", imgXoffset: -32},
		{name: "vitamins", imgXoffset: -32}
	],

	contexts: [],

	addContextInfo: null,

	setAddContext: function(contextName){
		this.contexts.push(contextName);
		this.addContextInfo = contextName;
	},

	addItem: function(name, createCount, reqArr, imgOffset, minLvl){
		var itm = {
			name: name.toLowerCase(),
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
		var font_height = 15;
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
			var content_w = (settings.show_resources && resource_sz > tsz.width) ? resource_sz : tsz.width ;
			var sz = {
				w : (content_w + 2 + (box_padding * 2)),
				h: font_height + (settings.show_resources ? resource_sz : 0) + 2 + (box_padding * 2)
			};  // 6 = 2*border + 2*pad(2)
			var mulWidth = 0;
			var mulTxt = "";
			if (!tool){
				mulTxt += multiplier;
				var msz = ctx.measureText(mulTxt);
				mulWidth = msz.width + (box_padding * 2) + 1;
				sz.w += mulWidth;
			}
			var y_join_gap = Math.floor(sz.h / 2);
			if (tool)
				ctx.fillStyle = "rgb(172, 150, 124)";
			else
				ctx.fillStyle = "rgb(88, 78, 66)";
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
			ctx.fillStyle = "#FFFFFF";
			if (!tool){
				ctx.fillText(mulTxt, pos.x + 1 + box_padding, pos.y + ((sz.h - font_height) / 2) - 1);  // multiplier
			}
			ctx.fillText(nodeTxt, pos.x + 1 + box_padding + mulWidth + ((content_w - tsz.width) / 2), pos.y + sz.h - 2 - box_padding - font_height);  // name
			if (settings.show_resources)
				ctx.drawImage(images, unturned.itemNameToImageIdx(itemName), 0, resource_sz, resource_sz, pos.x + 1 + box_padding + mulWidth + ((content_w - resource_sz) / 2), pos.y + 1 + box_padding, resource_sz, resource_sz);
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
		c.width = $canvas.width();
		c.height = $canvas.height();
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
			sz2.w += bg_padding * 2 + 1;
			sz2.h += bg_padding * 2 + 1;
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
		// from  http://unturned-bunker.wikia.com/wiki/Crafting_Recipes
		// any source item (tool or element) without a constuctor must be atomic (log, branch, rock, cloth, can, construction helmet, torch etc.)
		// todo : some items can also be sporned (stick, board, nail, bolt)
		//supplies
		this.setAddContext("supplies");
		this.addItem("board", 4, ["1*log"], 128); // 4 boards = 1 log
		this.addItem("stick", 4, ["1*board", "handsaw"], 160); // 4 sticks = 1 board + handsaw
		this.addItem("nail", 2, ["1*scrap metal"], -32); // 2 nails = 1 scrap metal
		this.addItem("bolt", 2, ["1*scrap metal", "fire"], -32); // 2 bolts = 1 scrap metal + fire
		this.addItem("wood spike", 1, ["1*stick", "pocket knife"], -32); // 1 wooden spike = 2 sticks + pocket knife#
		this.addItem("stick", 3, ["1*branch"], -32); // 3 sticks = 1 branch
		this.addItem("stone", 3, ["1*rock"], -32); // 3 stone = 1 rock
		this.addItem("scrap metal", 1, ["2*stone", "fire"], -32); // 1 scrap metal = 2 stone + fire
		this.addItem("animal pelt", 1, ["1*animal pants"], -32); // 1 animal pelt = 1 animal pants
		this.addItem("wire", 3, ["1*scrap metal", "handsaw"], -32); // 3 wire = 1 scrap metal + handsaw
		this.addItem("rope", 2, ["1*cloth", "handsaw"], -32); // 2 rope = 1 cloth + handsaw
		this.addItem("duct tape", 2, ["1*animal pelt", "1*can"], -32); // 2 duct tape = 1 animal pelt + 1 can
		this.addItem("miner helmet", 1, ["1*construction helmet", "1*torch"], -32); // 1 miner helmet = 1 construction helmet + 1 torch
		// components
		this.setAddContext("components");
		this.addItem("wood plate", 1, ["2*board"], -32); // 1 wood plate = 2 board
		this.addItem("wood support", 1, ["2*stick"], -32); // 1 wood plate = 2 stick
		this.addItem("wood frame", 1, ["2*wood plate"], -32); // 1 wood frame = 2 wood plate
		this.addItem("wood cross", 1, ["2*wood support"], -32); // 1 wood cross = 2 wood support
		this.addItem("stone plate", 1, ["2*stone"], -32);
		this.addItem("stone support", 1, ["1*stone", "1*board"], -32);
		this.addItem("stone frame", 1, ["2*stone plate"], -32);
		this.addItem("stone cross", 1, ["2*stone support"], -32);
		// structures
		this.setAddContext("structures");
		this.addItem("wood foundation", 1, ["3*wood frame"], -32); // 1 wood foundation = 3 wood frame
		this.addItem("wood wall", 1, ["2*wood frame", "1*wood pillar"], -32); // 1 wood wall = 2 wood frame + 1 wood pillar
		this.addItem("wood doorway", 1, ["1*wood wall", "1*wood support"], -32);
		this.addItem("wood pillar", 1, ["2*wood support", "1*board"], -32); // 1 wood pillar = 2 wood support + 1 board
		this.addItem("wood platform", 1, ["3*wood plate", "1*wood cross"], -32);
		this.addItem("wood ramp", 1, ["1*wood platform", "2*wood support"], -32);
		this.addItem("greenhouse foundation", 1, ["1*wood foundation", "4*fertilizer"], -32);
		this.addItem("greenhouse platform", 1, ["1*wood platform", "4*fertilizer"], -32);
		this.addItem("wood hole", 1, ["1*wood platform", "1*wood frame"], -32);
		this.addItem("wood ladder", 1, ["9*stick", "1*duct tape"], -32);
		this.addItem("wood window", 1, ["1*wood doorway", "1*wood support"], -32);
		this.addItem("wood post", 2, ["1*wood pillar"], -32);
		this.addItem("wood rampart", 2, ["1*wood wall"], -32);
		this.addItem("stone rampart", 2, ["1*stone wall"], -32, 1); // 2 stone rampart = 1 stone wall. requires level 1 Craftsman or higher
		this.addItem("stone post", 2, ["1*stone pillar"], -32, 1);
		this.addItem("stone wall", 1, ["2*stone frame", "1*stone pillar"], -32, 1);
		this.addItem("stone doorway", 1, ["1*stone wall", "1*stone support"], -32, 1);
		this.addItem("stone window", 1, ["1*stone doorway", "1*stone support"], -32, 1);
		this.addItem("stone pillar", 1, ["2*stone support", "1*board"], -32, 1);
		this.addItem("dock foundation", 1, ["1*wood foundation", "2*wood ladder"], -32);
		this.addItem("brazier", 1, ["2*stick", "2*bolt"], -32); // Wall Mounted Torch
		this.addItem("garage port", 1, ["1*wood window", "1*wood support"], -32);
		this.addItem("stone garage port", 1, ["1*stone window", "1*stone support"], -32);
		// Barricades
		this.setAddContext("barricades");
		this.addItem("wood shield", 1, ["3*board", "1*nail"], -32);
		this.addItem("wood door", 1, ["1*wood frame", "1*bolt"], -32);
		this.addItem("caltrop", 1, ["2*nail"], -32);
		this.addItem("barbed wire", 1, ["2*wire"], -32);
		this.addItem("wood spike trap", 1, ["4*wood spike"], -32);
		this.addItem("snare", 1, ["1*can", "2*scrap metal"], -32);
		this.addItem("electric trap", 1, ["3*scrap metal", "2*wire"], -32);
		this.addItem("campfire", 1, ["4*stick", "4*stone"], -32);
		this.addItem("wood shutter", 1, ["1*wood door", "1*bolt"], -32);
		this.addItem("moab", 1, ["3*raw explosive", "2*duct tape"], -32, 2); // (requires level 2 Craftsman or higher)
		this.addItem("tripmine", 1, ["2*raw explosive", "4*wire"], -32, 2);
		this.addItem("landmine", 1, ["2*raw explosive", "1*can"], -32, 2);
		this.addItem("metal shield", 1, ["4*scrap metal", "2*bolt"], -32, 2);
		this.addItem("electric fence", 1, ["1*wire fence", "4*scrap metal"], -32);
		this.addItem("wire fence", 1, ["2*wood support", "3*barbed wire"], -32);
		this.addItem("wood garage door", 1, ["2*wood shutter", "2*bolt"], -32);
		this.addItem("metal door", 1, ["1*wood door", "3*scrap metal"], -32, 2);
		this.addItem("metal shutter", 1, ["1*wood shutter", "3*scrap metal"], -32);
		this.addItem("metal garage door", 1, ["2*metal shutter", "2*bolt"], -32);
		// Farming
		this.setAddContext("farming");
		this.addItem("carrot seed", 2, ["1*fresh carrot"], -32);
		this.addItem("carrot seed", 1, ["1*moldy carrot"], -32);
		this.addItem("tomato seed", 2, ["1*fresh tomato"], -32);
		this.addItem("tomato seed", 1, ["1*moldy tomato"], -32);
		this.addItem("corn seed", 2, ["1*fresh corn"], -32);
		this.addItem("corn seed", 1, ["1*moldy corn"], -32);
		this.addItem("cabbage seed", 2, ["1*fresh cabbage"], -32);
		this.addItem("cabbage seed", 1, ["1*moldy cabbage"], -32);
		this.addItem("potato seed", 2, ["1*fresh potato"], -32);
		this.addItem("potato seed", 1, ["1*moldy potato"], -32);
		this.addItem("fertilizer", 3, ["1*rope", "1*cloth"], -32);
		// Storage
		this.setAddContext("storage");
		this.addItem("crate", 1, ["2*wood frame", "3*wood cross"], -32, 1); // (requires level 1 Craftsman or higher)
		this.addItem("chest", 1, ["1*crate", "3*wood cross"], -32, 2); // (requires level 2 Craftsmam or higher)
		this.addItem("metal locker", 1, ["1*crate", "3*scrap metal"], -32, 2); // (requires level 2 Craftsman or higher)
		// Sleeping
		this.setAddContext("sleeping");
		this.addItem("cot", 1, ["8*cloth", "5*scrap metal"], -32);
		this.addItem("sleeping bag", 1, ["7*cloth", "2*duct tape"], -32);
		// Medical
		this.setAddContext("medical");
		this.addItem("rag", 1, ["2*cloth"], -32);
		this.addItem("bandage", 1, ["2*rag"], -32);
		this.addItem("dressing", 1, ["2*bandage"], -32);
		this.addItem("splint", 1, ["1*scrap metal", "2*stick"], -32);
		this.addItem("crushed red berry", 1, ["2*red berry", "1*stone"], -32);
		this.addItem("crushed blue berry", 1, ["2*blue berry", "1*stone"], -32);
		this.addItem("crushed pink berry", 1, ["2*pink berry", "1*stone"], -32);
		this.addItem("crushed pale berry", 1, ["2*pale berry", "1*stone"], -32);
		this.addItem("crushed green berry", 1, ["2*green berry", "1*stone"], -32);
		this.addItem("crushed purple berry", 1, ["2*purple berry", "1*stone"], -32);
		this.addItem("purification tablet", 1, ["1*fertilizer", "1*vitamins"], -32);
		// Water
		this.setAddContext("water");
		this.addItem("bottled water", 1, ["1*moldy bottled water", "1*purification tablet"], -32);
		this.addItem("milk", 1, ["1*moldy milk", "1*purification tablet"], -32);
		this.addItem("orange juice", 1, ["1*moldy orange juice", "1*purification tablet"], -32);
		// Food
		this.setAddContext("food");
		this.addItem("cooked venison", 1, ["1*raw venison", "fire"], -32);
		this.addItem("cooked bacon", 1, ["1*raw bacon", "fire"], -32);
		// Ammunition
		this.setAddContext("ammunition");
		this.addItem("full nato magazine", 1, ["2*military bullets", "1*nato magazine"], -32);
		this.addItem("full nato drum", 1, ["4*military bullets", "1*nato drum"], -32);
		this.addItem("full swift magazine", 1, ["1*civilian bullets", "1*swift magazine"], -32);
		this.addItem("full bonjour clip", 1, ["1*civilian bullets", "1*bonjour clip"], -32);
		this.addItem("full lebel magazine", 1, ["1*civilian bullets", "1*lebel magazine"], -32);
		this.addItem("full nato tracer magazine", 1, ["2*tracer bullets", "1*nato tracer magazine"], -32);
		this.addItem("full savage magazine", 1, ["2*civilian bullets", "1*savage magazine"], -32);
		this.addItem("full savage drum", 1, ["3*civilian bullets", "1*savage drum"], -32);
		this.addItem("full winchester clip", 1, ["1*civilian bullets", "1*winchester clip"], -32);
		this.addItem("full lapua magazine", 1, ["1*military bullets", "1*lapua magazine"], -32);
		this.addItem("full lapua tracer magazine", 1, ["1*tracer bullets", "1*lapua tracer magazine"], -32);
		this.addItem("full yuri magazine", 1, ["2*civilian bullets", "1*yuri magazine"], -32);
		this.addItem("full xtrmin magazine", 1, ["1*civilian bullets", "1*xtrmin magazine"], -32);
		this.addItem("full pdw magazine", 1, ["2*military bullets", "1*pdw magazine"], -32);
		this.addItem("arrow", 3, ["1*stick", "1*nail"], -32);
		this.addItem("buckshot", 6, ["1*shell", "2*nail"], -32);
		this.addItem("slug", 6, ["1*shell", "2*bolt"], -32);
		// Attatchments
		this.setAddContext("attachments");
		this.addItem("tactical light", 1, ["1*handlamp", "2*duct tape"], -32);
		this.addItem("muffler", 1, ["2*canned cola", "2*can", "fire"], -32);
		this.addItem("zoomomatic", 1, ["1*binocular", "2*duct tape"], -32);
		// Gear
		this.setAddContext("gear");
		this.addItem("handlamp", 1, ["1*battery", "2*scrap metal"], -32);
		this.addItem("longbow", 1, ["3*wood support", "2*rope"], -32);
		this.addItem("canteen", 1, ["1*can", "1*bottled water"], -32);
		this.addItem("frag grenade", 1, ["3*nail", "1*raw explosive"], -32, 1);  // (requires level 1 craftsman or higher)
		this.addItem("car jack", 1, ["1*sledge hammer", "4*scrap metal"], -32);
	}

};