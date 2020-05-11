//=============================================================================
// ** WORLD MAP
//=============================================================================
$data_WorldMap={
	activeLocations:[true,true],
	pos:[1,380,90]
}:
//=============================================================================
// ** WORLD MAP EVENTS
//=============================================================================
$data_worldMap_Events={
	foot:[
		{
			name:"Attaque de Brigand",
			values:[],
			commonEventId:101
		},{
			name:"Rencontre de vagabond",
			value:[],
			commonEventId:102
		}
	],
	river:[
		{
			name:"Attaque de Pirate",
			commonEventId:151
		}
	]
};
//=============================================================================
// ** RACES
//=============================================================================
$data_races = [null,{
	id:1,
	name:"Lycans",
	inclinaison:"neutre-bon",
	desc:[
		"Les Lycans sont des êtres mi-loup mi-humain.",
		"Ils sont rude et courageux et leur conduite est souvent",
		"guidée par les principes de chevalerie Sfergrad.",
		"Honneur, Bravoure et Loyauté.",
		"Ils sont doué pour le combat, la chasse et la forge."
	],
	lordId: 51
}]
//=============================================================================
// ** FACTIONS
//=============================================================================	
$data_factions = [null,{
	id:1,
	name:"Royaume de Sfergrad",
	inclinaison:"bon",
	desc:[
		"Le Royaume de Sfergrad est gouverner par un système féodal,",
		"à la tête duquel Gwilth Blade règne sur une dizaine de vassaux.",
		"Il est essentiellement peuplé de Lycans."
	],
	lordId: 51
}];
//=============================================================================
// ** TRAVEL STEPS
//=============================================================================	
$data_travelSteps = [null,
	{
		id:1,
		x:360,
		y:100,
		events:{
			foot:[
				[1,10],//10% de chance de event foot 1
				[2,15]
			],
			river:[
				[1,10]//10% de chance de event foot 1
			]
		}
	},{
		id:2,
		x:370,
		y:110,
		events:{
			foot:[
				[1,15],//10% de chance de event foot 1
				[2,5]
			],
			river:[
				[1,15]//10% de chance de event foot 1
			]
		}
	},{
		{
		id:3,
		x:410,
		y:160,
		events:{
			foot:[
				[1,25],//10% de chance de event foot 1
			],
			river:[
				[1,15]//10% de chance de event foot 1
			]
		}
	}
	
]

//=============================================================================
// ** LOCATIONS
//=============================================================================	
$data_locations = [null,
//===============================================> Sfergrad
{
	id:1,
	name:"Sfergrad",
	desc:[
		"Sfergrad est la capitale du Royaume du même nom.",
		"C'est une cité fortifier spécialisée dans la chasse,",
		"l'exploitation minière, laforge et le travail du cuir.",
		"Elle est essentiellement peuplée de Lycans."
	],
	lordId: 51,
	factionId:1,
	worldMapLoc:{
		x:380,
		y:90,	
	},
	arrival:{
		mapId:10,
		foot:{
			x:25,
			y:65,
			dir:8
		},
		sea:{
			x:25,
			y:65,
			dir:8
		},
		fly:{
			x:25,
			y:65,
			dir:8
		},
		war:{
			x:25,
			y:65,
			dir:8
		}
	},
	travel:{
		foot:{
			dest:2,//2 = marais de Svaltrania
			time:144,//144hr 6jr de marche
			steps:[1,2,3]
		},
		river:{
			dest:2,//2 = marais de Svaltrania
			time:72,//144hr 3jr de nav
			steps:[1,2,3]
		},
		sea:{},
		fly:{}
	}
},
//===============================================> Svatrania
{
	id:2,
	name:"Marais de Svaltrania",
	desc:[
		"Svaltrania est un territoire marécageux peuplé de",
		"créatures monstrueuses et envahi par une végétation",
		"morribonde et veinéneuse.",
		"Ce territoire fait éponge entre Sfergrad et Wentang."
	],
	lordId: 51,
	factionId:1,
	worldMapLoc:{
		x:420,
		y:150,	
	},
	arrival:{
		mapId:10,
		foot:{
			x:25,
			y:65,
			dir:8
		},
		sea:{
			x:25,
			y:65,
			dir:8
		},
		fly:{
			x:25,
			y:65,
			dir:8
		}
	},
	travel:{
		foot:{
				dest:1,//2 = marais de Svaltrania
				time:7144,//144hr 3jr de nav
				steps:[3,2,1]
		},
		river:{
			dest:1,//2 = marais de Svaltrania
			time:72,//72hr 3jr de nav
			steps:[3,2,1]
		},
		sea:{},
		fly:{}
	}
}];





/*
{
	name:"Gouffre",
	x:790,
	y:1110,
	mapID:53,
	mapX:29,
	mapY:85,
	direction:8
},{
	name:"Yumashi",
	x:370,y:960,mapID:36,mapX:74,mapY:94,direction:8}

]	
    Moghunter.fastTravel_Towns[2] = ;
    Moghunter.fastTravel_Towns[3] = {name:"Sfergrad",x:380,y:90,mapID:46,mapX:25,mapY:65,direction:8};
	Moghunter.fastTravel_Towns[4] = {name:"Katal",x:785,y:620,mapID:59,mapX:30,mapY:76,direction:8};
	Moghunter.fastTravel_Towns[5] = {name:"Eleris",x:645,y:570,mapID:42,mapX:51,mapY:52,direction:8};
	Moghunter.fastTravel_Towns[6] = {name:"Wentang",x:510,y:150,mapID:60,mapX:15,mapY:40,direction:8};
	Moghunter.fastTravel_Towns[7] = {name:"Nogashi",x:365,y:1110,mapID:3,mapX:13,mapY:18,direction:8};
	Moghunter.fastTravel_Towns[8] = {name:"Kinbra",x:300,y:1010,mapID:63,mapX:6,mapY:1,direction:8};
	Moghunter.fastTravel_Towns[9] = {name:"Eskaly",x:1275,y:565,mapID:48,mapX:19,mapY:38,direction:8};
	Moghunter.fastTravel_Towns[10] = {name:"Eliburg",x:1100,y:310,mapID:50,mapX:7,mapY:13,direction:2};
	Moghunter.fastTravel_Towns[11] = {name:"FurikFor",x:1250,y:450,mapID:15,mapX:8,mapY:6,direction:8};
	Moghunter.fastTravel_Towns[12] = {name:"Folthag",x:1090,y:220,mapID:62,mapX:7,mapY:11,direction:8};
	Moghunter.fastTravel_Towns[13] = {name:"Mindonk",x:1180,y:190,mapID:62,mapX:7,mapY:11,direction:8};//
	Moghunter.fastTravel_Towns[14] = {name:"Aturyal",x:1170,y:245,mapID:25,mapX:8,mapY:7,direction:8};//
	Moghunter.fastTravel_Towns[15] = {name:"Saylve",x:350,y:520,mapID:47,mapX:19,mapY:38,direction:8};
	Moghunter.fastTravel_Towns[16] = {name:"Olk",x:485,y:310,mapID:47,mapX:19,mapY:38,direction:8};
	Moghunter.fastTravel_Towns[17] = {name:"Kralkgoor",x:515,y:280,mapID:30,mapX:24,mapY:85,direction:8};
    Moghunter.fastTravel_Towns[18] = {name:"Bellys",x:1310,y:820,mapID:57,mapX:15,mapY:8,direction:2};
    Moghunter.fastTravel_Towns[19] = {name:"Terfleurs",x:885,y:475,mapID:1,mapX:22,mapY:67,direction:6};
	Moghunter.fastTravel_Towns[20] = {name:"Arcania",x:895,y:445,mapID:1,mapX:22,mapY:67,direction:6};
	Moghunter.fastTravel_Towns[21] = {name:"Yerkta",x:770,y:65,mapID:1,mapX:22,mapY:67,direction:6};
	Moghunter.fastTravel_Towns[22] = {name:"Naya",x:370,y:490,mapID:1,mapX:22,mapY:67,direction:6};
	Moghunter.fastTravel_Towns[23] = {name:"Mektis",x:1105,y:1140,mapID:1,mapX:22,mapY:67,direction:6};
	Moghunter.fastTravel_Towns[24] = {name:"Féëria",x:915,y:400,mapID:1,mapX:22,mapY:67,direction:6};
	Moghunter.fastTravel_Towns[25] = {name:"Kaos",x:630,y:1095,mapID:1,mapX:22,mapY:67,direction:6};
	Moghunter.fastTravel_Towns[26] = {name:"Verbrume",x:1055,y:655,mapID:1,mapX:22,mapY:67,direction:6};
	Moghunter.fastTravel_Towns[27] = {name:"Tiarkal",x:870,y:140,mapID:1,mapX:22,mapY:67,direction:6};
	
//=============================================================================
// ** DUNGEONS
//=============================================================================	
	Moghunter.fastTravelDungeons[1] = {name:"Position actuelle",x:300,y:900,mapID:5,mapX:23,mapY:16,direction:4};
    Moghunter.fastTravelDungeons[2] = {name:"Gandara",x:1430,y:590,mapID:6,mapX:23,mapY:4,direction:4};
    Moghunter.fastTravelDungeons[3] = {name:"Kakhar Ice Caverns",x:1120,y:240,mapID:9,mapX:3,mapY:18,direction:8};
	Moghunter.fastTravelDungeons[4] = {name:"Lobari Hollows",x:210,y:740,mapID:10,mapX:7,mapY:7,direction:2};	
	Moghunter.fastTravelDungeons[5] = {name:"Jaia",x:1180,y:910,mapID:11,mapX:3,mapY:1,direction:2};
	Moghunter.fastTravelDungeons[6] = {name:"Fezebel Marsh",x:580,y:315,mapID:12,mapX:1,mapY:7,direction:6};
	 
//=============================================================================
// ** OTHER
//=============================================================================	

	Moghunter.fastTravelOther[1] = {name:"Gengi's Blacksmith Shop",x:450,y:320,mapID:18,mapX:15,mapY:7,direction:4};
    Moghunter.fastTravelOther[2] = {name:"Gengi's Blacksmith Shop",x:450,y:320,mapID:18,mapX:15,mapY:7,direction:4};
    Moghunter.fastTravelOther[3] = {name:"Battle Arena",x:825,y:560,mapID:19,mapX:7,mapY:11,direction:8};
	
*/
//*****************************************************************************
// ** SETUP *******************************************************************
//*****************************************************************************

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================

    Moghunter.fastTravel_lastIndex = true; 
    Moghunter.fastTravel_playBgm = true;
    Moghunter.fastTravel_BgmFileName =  "03Z_ship1";
	Moghunter.fastTravel_fadeBgm = true;
	Moghunter.fastTravel_MapMoveSpeed = 30;
    Moghunter.fastTravel_fadeSpeed = 30; 
    Moghunter.fastTravel_zoomAnime = true;
	Moghunter.fastTravel_rotationAnime = false;
    Moghunter.fastTravel_CenterX = 816;
	Moghunter.fastTravel_CenterY = 624;
    Moghunter.fastTravel_ListWidth = 300;
	Moghunter.fastTravel_ListHeight = 480;
    Moghunter.fastTravel_ListX = 800;
	Moghunter.fastTravel_ListY = 145;	
    Moghunter.fastTravel_ListSlide = true; 	
	Moghunter.fastTravel_ListLayoutX = 0;
	Moghunter.fastTravel_ListLayoutY = 0;
    Moghunter.fastTravel_prevSlide = true; 	
    Moghunter.fastTravel_Prev_X = 160;
	Moghunter.fastTravel_Prev_Y = 300;
    Moghunter.fastTravel_ComA_X = 800;
	Moghunter.fastTravel_ComA_Y = 8;	
    Moghunter.fastTravel_ComB_X = 900;
	Moghunter.fastTravel_ComB_Y = 8;	
    Moghunter.fastTravel_ComC_X = 1000;
	Moghunter.fastTravel_ComC_Y = 8;
	Moghunter.fastTravel_CursorX = 0; 	
	Moghunter.fastTravel_CursorY = 0 	
	Moghunter.fastTravel_CursorFloat = true;
	Moghunter.fastTravel_CursorBX = 0; 	
	Moghunter.fastTravel_CursorBY = 0; 	
	Moghunter.fastTravel_CursorBFloat = true; 	
	Moghunter.fastTravel_Comp_Show = true; 
    Moghunter.fastTravel_Comp_X = 800; 	
	Moghunter.fastTravel_Comp_Y = 490;
	Moghunter.fastTravel_Comp_FontSize = 22;
    Moghunter.fastTravelNewColor = 6;
	Moghunter.fastTravel_directionCancel = true; 	


//=============================================================================
// ** Game_System
//=============================================================================	

//==============================
// * Initialize
//==============================
var _mog_fastravel_gsys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _mog_fastravel_gsys_initialize.call(this);
    this._fastTravelTowns = [];
	this._fastTravelDungeons = [];
	this._fastTravelOther = [];
	this._fastTravelData = null;
	this._fastTravelSelection = [-1,""];
	this._fastTravelSelected = false;
    for (var i = 0; i < Moghunter.fastTravel_Towns.length; i++) {
		this._fastTravelTowns[i] = [false,Moghunter.fastTravel_Towns[i],false];
	}; 
	for (var i = 0; i < Moghunter.fastTravelDungeons.length; i++) {
		this._fastTravelDungeons[i] = [false,Moghunter.fastTravelDungeons[i],false];
	};
	for (var i = 0; i < Moghunter.fastTravelOther.length; i++) {
		this._fastTravelOther[i] = [false,Moghunter.fastTravelOther[i],false];
	};
	this._fastTravelComp = (Moghunter.fastTravel_Towns.length + Moghunter.fastTravelDungeons.length + Moghunter.fastTravelOther.length) - 3;
};

//=============================================================================
// ** Window Travel List
//=============================================================================	
function Window_TravelList() {
    this.initialize.apply(this, arguments);
};

Window_TravelList.prototype = Object.create(Window_Selectable.prototype);
Window_TravelList.prototype.constructor = Window_TravelList;

//==============================
// * Initialize
//==============================
Window_TravelList.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
	this._infoID = 0;
	this.activate();
	this.select(0);	
	this.opacity = 0;
	this.refresh();
};

//==============================
// * data Is Avaliable
//==============================
Window_TravelList.prototype.dataIsAvailable = function(data) {
	if (!data) {return false};
	if (!data[0] || (data[0] && data[0] === false)) {return false};
	if (!data[1]) {return false};
	return true;
};

//==============================
// * data Is Avaliable
//==============================
Window_TravelList.prototype.setID = function(id) {
	this._infoID  = id;
	this.select(0);
	this.refresh();
};

//==============================
// * Make Data
//==============================
Window_TravelList.prototype.makeData = function() {
	this._data = [];
	if (this._infoID === 0) {
		var dataInfo = $gameSystem._fastTravelTowns;
	} else if (this._infoID === 1) {
		var dataInfo = $gameSystem._fastTravelDungeons;
	} else {
		var dataInfo = $gameSystem._fastTravelOther;
	};	
	for (var i = 0; i < dataInfo.length; i++) {
		var data = dataInfo[i + 1];
	    if (this.dataIsAvailable(data)) {this._data.push(data)};
	};
};

//==============================
// * MaxCols
//==============================
Window_TravelList.prototype.maxCols = function() {
    return 1;
};

//==============================
// * MaxItems
//==============================
Window_TravelList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

//==============================
// * IsCurrentItemEnabled
//==============================
Window_TravelList.prototype.item = function(i) {
    return this._data[i + 1];
};

//==============================
// * Refresh
//==============================
Window_TravelList.prototype.refresh = function() {
	this.makeData();
	this.contents.clear();	
	this.createContents();	
	this.contents.fontItalic = true;
    this.drawAllItems();
};

//==============================
// * DrawItem
//==============================
Window_TravelList.prototype.drawItem = function(i) {
	var rect = this.itemRect(i);
	rect.width -= this.textPadding();	
	this.changeTextColor(this.normalColor());
	if (!this._data[i][2]) {this.changeTextColor(this.textColor(Moghunter.fastTravelNewColor))}
	this.drawText(this._data[i][1].name , rect.x, rect.y,rect.width,"center");
};

//==============================
// * Process OK
//==============================
Window_TravelList.prototype.processOk = function() {
	 if (this._data.length === 0) {return}
	 $gameSystem._fastTravelSelected = true;
	 this.deactivate();
	 this.visible = false;
	 if (String(Moghunter.fastTravel_fadeBgm) === "true") {AudioManager.fadeOutBgm(2);};
	 SoundManager.playOk();
	 this.enableMapColor();
};

//==============================
// * enable Map Color
//==============================
Window_TravelList.prototype.enableMapColor = function() {
	var dataMap = [];
	if (this._infoID === 0) {
		var dataInfo = $gameSystem._fastTravelTowns;
	} else if (this._infoID === 1) {
		var dataInfo = $gameSystem._fastTravelDungeons;
	} else {
		var dataInfo = $gameSystem._fastTravelOther;
	};	
	for (var i = 0; i < dataInfo.length; i++) {
		 var data = dataInfo[i];
		 if (data && data[1]) {
		     if (data[1].name === this._data[this._index][1].name) {
					if (this._infoID === 0) {
						$gameSystem._fastTravelTowns[i][2] = true;
					} else if (this._infoID === 1) {
						$gameSystem._fastTravelDungeons[i][2] = true;
					} else {
						$gameSystem._fastTravelOther[i][2] = true;
					};				  
			  };
	      };
	};
};

//==============================
// * isOKEnable
//==============================
Window_TravelList.prototype.isOkEnabled = function() {
    return true;
};

