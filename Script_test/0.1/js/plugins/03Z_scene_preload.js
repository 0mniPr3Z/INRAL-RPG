function Scene_Splash() {
    this.initialize.apply(this, arguments);
}
Scene_Splash.prototype = Object.create(Scene_Base.prototype);
Scene_Splash.prototype.constructor = Scene_Splash;
// * Initialize
Scene_Splash.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
	DataManager.loadDatabase();
    ConfigManager.load();
	this._all_need_refresh = false;
	this._finScenario = 34; /* A FAIRE */
	this._scenario = 0;
	this._couche = [];
	this._text = [];
	this.attente = 0;
	this.needToPressOk = false;
};
// * Create
Scene_Splash.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
	//On initialize les variables
	this.isNotFirstParty = DataManager.isAnySavefileExists();
	this.create_couche();
	this.preload_bitmap();
	this.refresh_splashScreen();
	this.create_window();
};
Scene_Splash.prototype.create_window = function(){
	this._textWindow = new Sprite(new Bitmap(Graphics.width, Graphics.height));
	this._textWindow.bitmap.outlineWidth = 0;
	this.addChild(this._textWindow);
}
Scene_Splash.prototype.create_couche = function(){
	for( i=0; i<6; i++ ) {
	
		this._couche[i] = new Sprite();
		
		this._couche[i].anchor.x = 0.5;
		this._couche[i].anchor.y = 0.5;
		
		this._couche[i].scale.x = 1;
		this._couche[i].scale.y = 1;
		this._couche[i].scaleXFin = 1;
		this._couche[i].scaleYFin = 1;
		
		this._couche[i].x = 640;
		this._couche[i].y = 360;
		this._couche[i].xFin = 640;
		this._couche[i].yFin = 360;
		
		this._couche[i].frameActuelle = 0;
		this._couche[i].framesFin = 0
		
		this._couche[i].vitesseDeFondu = 1;
		this._couche[i].vitesseDeplacement = 4;
		this._couche[i].vitesseDeScale = 0.1;
		this._couche[i].frameAttendu= 0;
		this._couche[i].frameAttente = 0;
		
		this._couche[i].opacity = 0;
		this._couche[i].opacityFin = 0;

		this._couche[i].imgName ='';
		
		this._couche[i]._need_refresh = false;
		
		this.addChild(this._couche[i]);
	}
};
Scene_Splash.prototype.preload_bitmap = function(){
	//ImageManager.reservePreload("preload/PressOk");
};
// * Refresh
Scene_Splash.prototype.refresh_splashScreen = function() {
	// si la variable scenario  >= fin du load_preload on passe à la scene du titre
	if (this._scenario > this._finScenario) {
	   this.end_scene();
	}else{
		this.set_sequency();
	}
};
Scene_Splash.prototype.end_scene = function(){
	AudioManager.stopMe();
	DataManager.setupNewGame();
	SceneManager.goto(Scene_Title);
	Window_TitleCommand.initCommandPosition();
	return;
}
Scene_Splash.prototype.play_intro_bgm = function(){
	_currentBgm = {
		name: '03Z_intro',
		volume: 100,
		pitch: 60,
		pan: 50,
		pos: 0};
	AudioManager.playBgm(_currentBgm);
};
Scene_Splash.prototype.set_sequency = function (){

	switch(this._scenario){

		case 0: //logo omniprez
			SoundManager.play_jingle();
			
			this._couche[0].bitmap = ImageManager.load_preload("Splash1");
			this._couche[0].opacity = 0;
			this._couche[0].opacityFin = 255;
			this._couche[0].scale.x = 0.1;
			this._couche[0].scale.y = 0.1
			this._couche[0].scaleXFin = 1;
			this._couche[0].scaleYFin = 1;
			
			var _now = new Date();
			this._outlineColor = 'black';
			this._text[0] = {
				active:true,
				text:"Inral©"+_now.getFullYear()+" RPG version demo.0.0.1 - Edited by 0mnipr3z©"+_now.getFullYear()+".",
				x: 40,
				y: 645,
				width:1200,
				fontsize:10,
				align:'center'
			};
			this._text[1] = {
				active:true,
				text:"Inral©"+_now.getFullYear()+" RPG, 0mnipr3z©"+_now.getFullYear()+", and derivations are creation and property of ©"+_now.getFullYear()+"0mnipr3z Game Studion",
				x: 40,
				y: 658,
				width:1200,
				fontsize:10,
				align:'center'
			}
			this._text[2] = {
				active:true,
				text:"All contents of this game is creation of artists. Consult the game credits to have more information about the usage right.",
				x: 40,
				y: 671,
				width:1200,
				fontsize:10,
				align:'center'
			}
			this._text[3] = {
				active:true,
				text:"www.0mnipr3z.com / contact@0mnipr3z.com",
				x: 40,
				y: 684,
				width:1200,
				fontsize:10,
				align:'center'
			}
		break;
		
		case 1:
			this.play_intro_bgm();
			
			this._couche[0].opacityFin = 0;
			
			this._couche[1].bitmap = ImageManager.load_preload("Splash2");
			this._couche[1].opacity = 0;
			this._couche[1].opacityFin = 255;
			this._couche[1].scale.x = 0.2;
			this._couche[1].scaleXFin = 1;
			this._couche[1].scale.y = 0.2;
			this._couche[1].scaleYFin = 1;
			
			this._couche[3].attente = 5;
			
			this._text=[];
			
		break;
		
		case 2: //splash2
			this._couche[0].bitmap = ImageManager.load_preload("EndSplash");
			this._couche[0].vitesseDeFondu = 6;
			this._couche[0].opacity = 0;
			this._couche[0].opacityFin = 255;

			this._couche[1].opacityFin = 0;
		break;

		case 3://cover arrive
			SoundManager.playMagicEvasion();
			
			this.needToPressOk = true;
			
			this._couche[2].vitesseDeplacement = 15;
			this._couche[2].vitesseDeFondu = 7;
			this._couche[2].x =624;
			this._couche[2].y =816;
			this._couche[2].bitmap = ImageManager.load_preload("Cover_0");
			this._couche[2].opacityFin = 255;
		break;
		
		case 4:
			this.needToPressOk = false;
			
			SoundManager.play_sound('book');
			
			this._couche[2].opacityFin =0;
			this._couche[2].opacity =0;
			
			this._couche[1].bitmap = ImageManager.load_preload("Cover_0");
			this._couche[1].opacity = 255;
			this._couche[1].opacityFin = 255;
			this._couche[1].imgName = 'Cover';
			this._couche[1].frameActuelle = 0;
			this._couche[1].frameAttendu = 0;
			this._couche[1].frameAttente = 8;
			this._couche[1].framesFin = 4;
		break;
		
		case 5:
			SoundManager.play_sound('book');
			
			this._couche[1].bitmap = ImageManager.load_preload("Livre_0");
			this._couche[1].opacityFin = 255;
			this._couche[1].opacity = 255;
			this._couche[1].imgName = 'Livre';
			this._couche[1].frameActuelle = 0;
			this._couche[1].frameAttendu = 0;
			this._couche[1].frameAttente = 6;
			this._couche[1].framesFin = 4;
		break;
		
		case  6:
			this._couche[1].bitmap = ImageManager.load_preload("Livre_0");
			this._couche[1].opacity = 255;
			this._couche[1].opacityFin = 255;
			
			this._couche[3].vitesseDeFondu = 5;
			
			this._couche[2].vitesseDeFondu = 5;
		break;
		
		case  7:
			this._couche[2].bitmap = ImageManager.load_preload("story_0");
			this._couche[2].opacity = 0;
			this._couche[2].opacityFin = 255;
			
			this._couche[2].x = 810;
			this._couche[2].y = 325;
			this._couche[2].xFin = 810;
			this._couche[2].yFin = 325;
			
			this._couche[4].opacity =0;
			
			this.needToPressOk = true;
			
			this._outlineColor = 'white';
			this._textColor = this.textColor(18);
			
			this._text[0] = {
				active:true,
				text:"A l'Aube des temps,",
				x: 350,
				y: 200,
				width:230,
				fontsize:8,
				align:'center'
			};
			this._text[1] = {
				active:true,
				text:"l'univers était une masse inerte,",
				x: 350,
				y: 230,
				width:230,
				fontsize:10,
				align:'center'
			};
			this._text[2] = {
				active:true,
				text:"opaque, et sans vie.",
				x: 350,
				y: 260,
				width:230,
				fontsize:10,
				align:'center'
			};
			this._text[3] = {
				active:true,
				text:"Il y eu une déflagration",
				x: 350,
				y: 320,
				width:230,
				fontsize:10,
				align:'center'
			}
			this._text[4] = {
				active:true,
				text:"et il devint une masse difforme",
				x: 350,
				y: 350,
				width:230,
				fontsize:10,
				align:'center'
			}
			this._text[5] = {
				active:true,
				text:"en perpetuel mouvement.",
				x: 350,
				y: 380,
				width:230,
				fontsize:10,
				align:'center'
			}
			this._text[6] = {
				active:true,
				text:"Le Divina fut créé.",
				x: 350,
				y: 440,
				width:230,
				fontsize:10,
				align:'center'
			}
			
		break;
		
		case  8:
			this._couche[2].opacityFin = 0;
			
			this._couche[3].bitmap = ImageManager.load_preload("story_1");
			this._couche[3].x = 810;
			this._couche[3].y = 275;
			this._couche[3].xFin = 810;
			this._couche[3].yFin = 275;
			this._couche[3].opacity = 0;
			this._couche[3].vitesseDeFondu = 30;
			this._couche[3].opacityFin = 255;
			
			this._text[0] = {
				active:true,
				text:"Le Divina fraquassait l'univers,",
				x: 350,
				y: 200,
				width:230,
				fontsize:8,
				align:'center'
			};
			this._text[1] = {
				active:true,
				text:"au hasard de sa course folle.",
				x: 350,
				y: 230,
				width:230,
				fontsize:10,
				align:'center'
			};
			this._text[2] = {
				active:true,
				text:"C'est de cette confusion",
				x: 350,
				y: 300,
				width:230,
				fontsize:10,
				align:'center'
			};
			this._text[3] = {
				active:true,
				text:"que naquit la première divinité.",
				x: 350,
				y: 330,
				width:230,
				fontsize:10,
				align:'center'
			}
			this._text[4] = {
				active:true,
				text:"Ainsi, Kaos avait prit vie.",
				x: 350,
				y: 390,
				width:230,
				fontsize:10,
				align:'center'
			}
			this._text[5] = {};
			this._text[6] = {};
			
		break;
		
		case  9:
			this._couche[3].opacityFin = 0;
			
			this.needToPressOk = false;
		break;
		
		case  10:
			SoundManager.play_sound('book');
			
			this._couche[1].bitmap = ImageManager.load_preload("Livre_0");
			this._couche[1].opacityFin = 255;
			this._couche[1].opacity = 255;
			this._couche[1].imgName = 'Livre';
			this._couche[1].frameActuelle = 0;
			this._couche[1].frameAttendu = 0;
			this._couche[1].frameAttente = 4;
			this._couche[1].framesFin = 4;
		break;
		
		case  11:
			this._couche[1].bitmap = ImageManager.load_preload("Livre_0");
			this._couche[1].opacity = 255;
			this._couche[1].opacityFin = 255;
			
			this._couche[3].vitesseDeFondu = 5;
			
			this._couche[2].vitesseDeFondu = 5;
		break;
		
		case  12:
			this.needToPressOk = true;
			
			this._couche[3].opacityFin = 0;
			
			this._couche[2].bitmap = ImageManager.load_preload("story_2");
			this._couche[2].opacity = 0;
			this._couche[2].opacityFin = 255;
			this._couche[3].x = 810;
			this._couche[3].y = 340;
			this._couche[3].xFin = 810;
			this._couche[3].yFin = 340;
			
			this._couche[4].opacity =0;
		break;
		
		case  13:
			this._couche[2].opacityFin = 0;
			
			this._couche[3].bitmap = ImageManager.load_preload("story_3");
			this._couche[3].x = 730;
			this._couche[3].y = 250;
			this._couche[3].xFin = 784;
			this._couche[3].yFin = 294;
			this._couche[3].opacity = 0;
			this._couche[3].opacityFin = 255;
			
			this._couche[4].opacity =0;
		break;
		
		case 14: //fin histoire
			this.needToPressOk = false;
			
			this._couche[3].opacityFin = 0;
		break;
		
		case 15:
			SoundManager.play_sound('book');
			
			this._couche[1].bitmap = ImageManager.load_preload("Livre_0");
			this._couche[1].opacityFin = 255;
			this._couche[1].opacity = 255;
			this._couche[1].imgName = 'Livre';
			this._couche[1].frameActuelle = 0;
			this._couche[1].frameAttendu = 0;
			this._couche[1].frameAttente = 6;
			this._couche[1].framesFin = 4;
		break;
		
		case  16:
			this._couche[1].bitmap = ImageManager.load_preload("Livre_0");
			this._couche[1].opacity = 255;
			this._couche[1].opacityFin = 255;
			
			this._couche[3].vitesseDeFondu = 5;
			
			this._couche[2].vitesseDeFondu = 5;
		break;
		
		case  17:
			this.needToPressOk = true;
			
			this._couche[3].opacityFin = 0;
			
			this._couche[2].bitmap = ImageManager.load_preload("histoire_4");
			this._couche[2].opacity = 0;
			this._couche[2].opacityFin = 255;
			
			this._couche[4].opacity =0;
		break;
		
		case  18: //debut formation
			SoundManager.play_sound('book');
			
			this._couche[0].bitmap = ImageManager.load_preload("formation_0");
			this._couche[0].opacityFin = 255;
			
			this._couche[1].opacityFin = 0;
			
			this._couche[2].opacityFin = 0;
			this._couche[2].imgName = 'Livre';
			this._couche[2].frameActuelle = 0;
			this._couche[2].framesFin = 4;
			this._couche[2].frameAttendu = 4;
			this._couche[2].frameAttente = 5;

			this.needToPressOk = false;
		break;
		
		case  19:
			this._couche[0].vitesseDeFondu = 5;
			
			this._couche[1].vitesseDeFondu = 5;
			this._couche[1].bitmap = ImageManager.load_preload("formation_1");
			this._couche[1].opacityFin = 255;
			
			this._couche[2].vitesseDeFondu = 5;
			this._couche[2].bitmap = ImageManager.load_preload("formation_text");
			this._couche[2].opacityFin = 255;
		break;
		
		case  20:
			this._couche[0].bitmap = ImageManager.load_preload("formation_2");
			
			this._couche[1].opacityFin = 0;
		break;
		
		case  21:
			this._couche[1].bitmap = ImageManager.load_preload("formation_3");
			this._couche[1].opacityFin = 255;
		break;
		
		case  22:
			this._couche[0].bitmap = ImageManager.load_preload("formation_4");
			
			this._couche[1].opacityFin = 0;
		break;
		
		case  23:
			this._couche[1].bitmap = ImageManager.load_preload("formation_5");
			this._couche[1].opacityFin = 255;
			
			this._couche[2].opacityFin = 0;
		break;
		
		case  24:
			this._couche[0].bitmap = ImageManager.load_preload("formation_6");
			
			this._couche[1].opacityFin = 0;
			
			this._couche[2].bitmap = ImageManager.load_preload("formation_text2");
		break;
		
		case  25:
			this._couche[1].bitmap = ImageManager.load_preload("formation_6");
			this._couche[1].opacityFin = 255;
			
			this._couche[2].opacityFin = 255;
		break;
		
		case 26:
			this._couche[0].bitmap = ImageManager.load_preload("formation_8");
			
			this._couche[1].opacityFin = 0;
		break;
		
		case  27:
			this._couche[1].bitmap = ImageManager.load_preload("formation_9");
			this._couche[1].opacityFin = 255;
		break;
		
		case  28:
			this._couche[0].bitmap = ImageManager.load_preload("formation_10");
			
			this._couche[1].opacityFin = 0;
		break;
		
		case  29:
			this._couche[1].bitmap = ImageManager.load_preload("formation_11");
			this._couche[1].opacityFin = 255;
		break;
		
		case  30:
			this._couche[0].bitmap = ImageManager.load_preload("formation_12");

			this._couche[1].opacityFin = 0;
		break;
		
		case  31:
			this.needToPressOk = true;

			this._couche[4].opacity =0;

			this._couche[1].bitmap = ImageManager.load_preload("formation_13");
			this._couche[1].opacityFin = 255;
		break;
		
		case  32:
			this._couche[0].bitmap = ImageManager.load_preload("KaosBack_0");
			
			this._couche[1].opacityFin = 0;
			
			this._couche[2].vitesseDeFondu = 10;
			this._couche[2].opacityFin = 0;
		break;
		
		case  33:
			this.frameAttente = 10;
			this.frameAttendu = 0;
			
			this._couche[1].bitmap = ImageManager.load_preload("KaosBack_1");
			this._couche[1].opacityFin = 255;
		break;
		
		case  34:
			this._couche[0].opacity = 0;
			this._couche[0].opacityFin = 0;
			
			this.needToPressOk = false;
			
			this.fadeOutAll();
			
			for(i=0; i<this._couche.length; i++){
				this._couche[i].opacityFin = 0;
			};
		break;
		
		default:
		break;
	}

};
// * Start
Scene_Splash.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    this.startFadeIn(2, false);
};
// * Update
Scene_Splash.prototype.update = function() {
	//if(this._scenario == -1){this.refresh_splashScreen}
	Scene_Base.prototype.update.call(this);
	
	this._all_need_refresh = true;
	
	for(i=0; i<4; i++){
		if(	!this.is_positioned(i)
		||	!this.is_frame_ready(i)
		||	!this.is_scale_ready(i)
		||	!this.is_opacity_ready(i))
			this._all_need_refresh = false;
	}
	this.is_text_Ready();
	this.set_press_ok();
	
	if(this._all_need_refresh)
		this.get_next();
		
	this.get_skip();
};
Scene_Splash.prototype.is_positioned = function(i){

	var _ready = true;
	
	if( this._couche[i].x <  this._couche[i].xFin){
		if(this._couche[i].x + this._couche[i].vitesseDeplacement < this._couche[i].xFin){
			this._couche[i].x += this._couche[i].vitesseDeplacement;
		}else{
			this._couche[i].x = this._couche[i].xFin;
		}
		_ready = false;
	};
	
	if ( this._couche[i].x >  this._couche[i].xFin){
		if(this._couche[i].x - this._couche[i].vitesseDeplacement > this._couche[i].xFin){
			this._couche[i].x -= this._couche[i].vitesseDeplacement;
		}else{
			this._couche[i].x = this._couche[i].xFin;
		}
		_ready = false;
	}
	
	if( this._couche[i].y <  this._couche[i].yFin){
		if(this._couche[i].y + this._couche[i].vitesseDeplacement < this._couche[i].yFin){
			this._couche[i].y += this._couche[i].vitesseDeplacement;
		}else{
			this._couche[i].y = this._couche[i].yFin;
		}
		_ready = false;
	}
	
	if ( this._couche[i].y >  this._couche[i].yFin){
		if(this._couche[i].y - this._couche[i].vitesseDeplacement > this._couche[i].yFin){
			this._couche[i].y -= this._couche[i].vitesseDeplacement;
		}else{
			this._couche[i].y = this._couche[i].yFin;
		}
		_ready = false;
	}
	
	return _ready;
};
Scene_Splash.prototype.is_frame_ready = function(i){
	if(this._couche[i].frameAttente > this._couche[i].frameAttendu){
		this._couche[i].frameAttendu++;	
		return false;
	} else if ( this._couche[i].frameActuelle <  this._couche[i].framesFin){
		this._couche[i].frameActuelle++;
		this._couche[i].frameAttendu = 0;
		var _frameName = this._couche[i].imgName + "_" + this._couche[i].frameActuelle;
		this._couche[i].bitmap = ImageManager.load_preload(_frameName);
		return false;
	}
	return true;
};
Scene_Splash.prototype.is_opacity_ready = function(i){
	if ( this._couche[i].opacity >  this._couche[i].opacityFin){
		if ( this._couche[i].opacity- this._couche[i].vitesseDeFondu >  this._couche[i].opacityFin){
			this._couche[i].opacity -= this._couche[i].vitesseDeFondu;
		}else {
			this._couche[i].opacity = this._couche[i].opacityFin
		};
		return false;
	} else if ( this._couche[i].opacity <  this._couche[i].opacityFin){
		if ( this._couche[i].opacity + this._couche[i].vitesseDeFondu <  this._couche[i].opacityFin){
			this._couche[i].opacity += this._couche[i].vitesseDeFondu;
		} else {
			this._couche[i].opacity = this._couche[i].opacityFin;
		};
		return false;
	}
	return true;
};
Scene_Splash.prototype.is_scale_ready = function(i){

	var _ready = true;
	
	if( this._couche[i].scale.x <  this._couche[i].scaleXFin){
		if(this._couche[i].scale.x + this._couche[i].vitesseDeScale < this._couche[i].scaleXFin){
			this._couche[i].scale.x += this._couche[i].vitesseDeScale;
		}else{
			this._couche[i].scale.x = this._couche[i].scaleXFin;
		}
		_ready = false;
	};
	
	if ( this._couche[i].scale.x >  this._couche[i].scaleXFin){
		if(this._couche[i].scale.x - this._couche[i].vitesseDeScale > this._couche[i].scaleXFin){
			this._couche[i].scale.x -= this._couche[i].vitesseDeScale;
		}else{
			this._couche[i].scale.x = this._couche[i].scaleXFin;
		}
		_ready = false;
	}
	
	if( this._couche[i].scale.y <  this._couche[i].scaleYFin){
		if(this._couche[i].scale.y + this._couche[i].vitesseDeplacement < this._couche[i].scaleYFin){
			this._couche[i].scale.y += this._couche[i].vitesseDeplacement;
		}else{
			this._couche[i].scale.y = this._couche[i].scaleYFin;
		}
		_ready = false;
	}
	
	if ( this._couche[i].scale.y >  this._couche[i].scaleYFin){
		if(this._couche[i].scale.y - this._couche[i].vitesseDeplacement > this._couche[i].scaleYFin){
			this._couche[i].scale.y -= this._couche[i].vitesseDeplacement;
		}else{
			this._couche[i].scale.y = this._couche[i].scaleYFin;
		}
		_ready = false;
	}
	
	return _ready;
};
Scene_Splash.prototype.is_text_Ready = function(){
	this._textWindow.bitmap.clearRect(0, 0, this.width, this.height);
	//this._textWindow.bitmap.outlineColor = this._outlineColor;
	if(this._textColor)this._textWindow.bitmap.textColor = this._textColor;
	for(i = 0; i < this._text.length; i++){
		if(this._text[i].active){
			this._textWindow.bitmap.drawText(
				this._text[i].text,
				this._text[i].x,
				this._text[i].y,
				this._text[i].width,
				this._text[i].fontsize,
				this._text[i].align);
		};
	}
};
// * Command
Scene_Splash.prototype.get_next = function(){
	if( !this.needToPressOk ){
		this._scenario++;
		this.refresh_splashScreen();
	} else if (Input.isTriggered("ok") || TouchInput.isTriggered()) {
		this._scenario++;
		this.attente = 0;
		SoundManager.playCursor();
		this.refresh_splashScreen();
	}else if(this.attente > 1500){
		this.attente = 0;
		this._scenario++;
		SoundManager.playCursor();
		this.refresh_splashScreen();
	}else{
		this.attente++;
	};
}
Scene_Splash.prototype.get_skip = function(){
	if(this.isNotFirstParty){
		if (Input.isTriggered("cancel") || TouchInput.isCancelled()) {
			this._scenario = this._finScenario;
			SoundManager.playCancel();
			this.refresh_splashScreen();
		};
	}else{
		if (Input.isTriggered("cancel") || TouchInput.isCancelled()) {
			SoundManager.playBuzzer();
		};
	};
}
Scene_Splash.prototype.set_press_ok = function(){
	if(this.needToPressOk){
		if(this._couche[4].opacity <= 100){
			this._couche[4].opacity += this._couche[4].vitesseDeFondu;
		}else{
			this._couche[4].opacity = 20;
		}
		if(this.isNotFirstParty && this._scenario >=1){
				this._couche[5].opacity =this._couche[4].opacity;
		}
	}else{
		this._couche[4].opacity=0;
		if(this.isNotFirstParty && this._scenario >=1){
			if(this._couche[5].opacity <= 100){
				this._couche[5].opacity += this._couche[4].vitesseDeFondu;
			}else{
				this._couche[5].opacity =20;
			};
		}else{
			this._couche[4].opacity=0;
		}
	}
};
// * Tools
Scene_Splash.prototype.textColor = function(n) {
    var px = (n % 8) * 12 + 6;
    var py = Math.floor(n / 8) * 12 + 6;
	this.colorSource = new Bitmap (ImageManager.loadSystem("colorfont"));
    return this.colorSource.getPixel(px, py);
};




