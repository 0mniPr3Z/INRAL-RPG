Game_Territories.prototype.intitializeData = function(){
	this._data =[{
		//GENERAL INFO
		"id":0,
		"name":["NameFR","NameEN","NameJP"],
		"climat":1;
		
		//===> TRAVELING
		"worldMapLoc":{
			"x":790,
			"y":1110,
			"mapID":53,
			"mapX":29,
			"mapY":85,
			"dir":8,
		},
		"travel":{
			"foot":[
				["(int)locationID", "(int)TimeTravel"],
				["(int)locationID", "(int)TimeTravel"],
				["(int)locationID", "(int)TimeTravel"]
			],
			"sea":[
				["(int)locationID", "(int)TimeTravel"],
				["(int)locationID", "(int)TimeTravel"],
				["(int)locationID", "(int)TimeTravel"]
			],
			"seaLong":[
				["(int)locationID", "(int)TimeTravel"],
				["(int)locationID", "(int)TimeTravel"],
				["(int)locationID", "(int)TimeTravel"]
			],
			"fly":[
				["(int)locationID", "(int)TimeTravel"],
				["(int)locationID", "(int)TimeTravel"],
				["(int)locationID", "(int)TimeTravel"]
			]
		},
		
		//===> RELATIONSHIP
		"factions":[
			["dominanteFactionId","Loyalty","Submission","influence"],
			["factionId","Loyalty","Submission","influence"],
			["factionId","Loyalty","Submission","influence"]
		],
		"races":[
			["raceId","Sympathie","influence"],
			["raceId","Sympathie","influence"],
			["raceId","Sympathie","influence"]
		]
	},{
	"name":["Gouffre","",""],
	"x":790,
	"y":1110,
	"mapID":53,
	"mapX":29,
	"mapY":85,
	"direction":8,
	"access":{
		"foot":[
			["locationID", ""]
		],
		"sea":[
		
		],
		"fly":[
		
		]
	}
},
    Moghunter.fastTravel_Towns[2] = {name:"Yumashi",x:370,y:960,mapID:36,mapX:74,mapY:94,direction:8};
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