
function Scene_Splash(){
    this.initialize.apply(this, arguments);
}
Scene_Splash.prototype = Object.create(Scene_Base.prototype);
Scene_Splash.prototype.constructor = Scene_Splash;
// * Initialize
Scene_Splash.prototype.initialize								= function(){
										Scene_Base.prototype.initialize.call(this);
	
	this.init_scenario();
	this.init_fields();
	
	this._isFirstTimeStart = !DataManager.isAnySavefileExists();
	
	
	this._wait = 0;
	this.needToPressOk = false;
	this._text = [];
	this.create();
};
Scene_Splash.prototype.init_scenario								= function(){
	this._scenarStep = 0;
};
Scene_Splash.prototype.init_fields								= function(){
	
	this._fields = [];
	
	for( i=0; i<6; i++ ) {
		this._fields[i] = new Sprite();
		
		this._fields[i].imgName ='';
		
		this._fields[i].anchor.x = 0.5;
		this._fields[i].anchor.y = 0.5;
		
		this._fields[i].x = 640;
		this._fields[i].y = 360;
		this._fields[i].xTarget = 640;
		this._fields[i].yTarget = 360;
		
		this._fields[i].scale.x = 0;
		this._fields[i].scale.y = 0;
		this._fields[i].scaleXTarget = 0;
		this._fields[i].scaleYTarget = 0;
		
		this._fields[i].opacity = 0;
		this._fields[i].opacityTarget = 0;
		
		this._fields[i].frame = 0;
		this._fields[i].frameTarget = 0;
		this._fields[i].frameDisplayed= 0;
		this._fields[i].frameWait = 0;
		
		this._fields[i].transitionSpeed = 1;
		this._fields[i].moveSpeed = 4;
		
		this.addChild(this._fields[i]);
		this._fields[i]._needRefresh = false;
	}
	this._allNeedRefresh = false;
};
// * Create
Scene_Splash.prototype.create									= function(){
										Scene_Base.prototype.create.call(this);
	
	this._fields[4].bitmap = ImageManager.load_preload("PressOk");
	this._fields[5].bitmap = ImageManager.load_preload("Skip");
	
	this.refresh_scene();
};
// * Refresh
Scene_Splash.prototype.refresh_scene							= function(){
	SoundManager.playJingle();
	if($debug)console.log("refresh scene Step : "+this._scenarStep);
	while(this.isNot_terminate()){
		
		this.set_sequency();
	};
};
Scene_Splash.prototype.isNot_terminate							= function(){
   if (this._scenarStep >= 35) {
	   AudioManager.stopMe();
       DataManager.setupNewGame();
       SceneManager.goto(Scene_Title);
       return false;
   };
   return true;
};
Scene_Splash.prototype.set_sequency								= function (){
	//logo omniprez
	switch(this._scenarStep){
	
		case 0:
			this._fields[0].bitmap = ImageManager.load_preload("Splash1");
			this._fields[0].opacity = 0;
			this._fields[0].opacityTarget = 255;
		break;
		
		case 1:
			AudioManager.playPreload();
			this._fields[1].bitmap = ImageManager.load_preload("Splash2");
			this._fields[1].opacity = 0;
			this._fields[1].opacityTarget = 255;
			this._fields[0].opacityTarget = 0;
			this._fields[1].opacityTarget = 255;
			this._fields[3].wait = 5;
		break;
		
		case 2:
			this._fields[0].bitmap = ImageManager.load_preload("EndSplash");
			this._fields[0].transitionSpeed = 6;
			this._fields[0].opacity = 0;
			this._fields[0].opacityTarget = 255;
			this._fields[1].opacityTarget = 0;
		break;
		
		case 3:
			SoundManager.playMagicEvasion();
			this.needToPressOk = true;
			this._fields[2].moveSpeed = 15;
			this._fields[2].transitionSpeed = 7;
			this._fields[2].x =624;
			this._fields[2].y =816;
			this._fields[2].bitmap = ImageManager.load_preload("Cover_0");
			this._fields[2].opacityTarget = 255;
		break;
		
		case 4:
			this.needToPressOk = false;
			SoundManager.playSystem('book');
			this._fields[2].opacityTarget =0;
			this._fields[2].opacity =0;
			this._fields[1].bitmap = ImageManager.load_preload("Cover_0");
			this._fields[1].opacity = 255;
			this._fields[1].opacityTarget = 255;
			this._fields[1].imgName = 'Cover';
			this._fields[1].frame = 0;
			this._fields[1].frameDisplayed = 0;
			this._fields[1].frameWait = 8;
			this._fields[1].frameTarget = 4;
		break;
		
		case 5:
			SoundManager.playSystem('book');
			this._fields[1].bitmap = ImageManager.load_preload("Livre_0");
			this._fields[1].opacityTarget = 255;
			this._fields[1].opacity = 255;
			this._fields[1].imgName = 'Livre';
			this._fields[1].frame = 0;
			this._fields[1].frameDisplayed = 0;
			this._fields[1].frameWait = 6;
			this._fields[1].frameTarget = 4;
		break;
		
		case 6:
			this._fields[1].bitmap = ImageManager.load_preload("Livre_0");
			this._fields[1].opacity = 255;
			this._fields[1].opacityTarget = 255;
			this._fields[3].transitionSpeed = 5;
			this._fields[2].transitionSpeed = 5;
		break;
		
		case 7:
			this._fields[2].bitmap = ImageManager.load_preload("histoire_0");
			this._fields[2].opacity = 0;
			this._fields[2].opacityTarget = 255;
			this._fields[4].opacity =0;
			this.needToPressOk = true;
		break;
		
		case 8:
			this._fields[2].opacityTarget = 0;
			this._fields[3].bitmap = ImageManager.load_preload("histoire_1");
			this._fields[3].opacity = 0;
			this._fields[3].opacityTarget = 255;
		break;
		
		case 9:
			this._fields[3].opacityTarget = 0;
			this.needToPressOk = false;
		break;
		
		case 10:
			SoundManager.playSystem('book');
			this._fields[1].bitmap = ImageManager.load_preload("Livre_0");
			this._fields[1].opacityTarget = 255;
			this._fields[1].opacity = 255;
			this._fields[1].imgName = 'Livre';
			this._fields[1].frame = 0;
			this._fields[1].frameDisplayed = 0;
			this._fields[1].frameWait = 4;
			this._fields[1].frameTarget = 4;
		break;
		
		case 11:
			this._fields[1].bitmap = ImageManager.load_preload("Livre_0");
			this._fields[1].opacity = 255;
			this._fields[1].opacityTarget = 255;
			this._fields[3].transitionSpeed = 5;
			this._fields[2].transitionSpeed = 5;
		break;
		
		case 12:
			this.needToPressOk = true;
			this._fields[3].opacityTarget = 0;
			this._fields[2].bitmap = ImageManager.load_preload("histoire_2");
			this._fields[2].opacity = 0;
			this._fields[2].opacityTarget = 255;
			this._fields[4].opacity =0;
		break;
		
		case 13:
			this._fields[2].opacityTarget = 0;
			this._fields[3].bitmap = ImageManager.load_preload("histoire_3");
			this._fields[3].opacity = 0;
			this._fields[3].opacityTarget = 255;
			this._fields[4].opacity =0;
		break;
		
		//fin histoire
		case 14:
			this.needToPressOk = false;
			this._fields[3].opacityTarget = 0;
		break;
		
		//dernier page
		case 15:
			SoundManager.playSystem('book');
			this._fields[1].bitmap = ImageManager.load_preload("Livre_0");
			this._fields[1].opacityTarget = 255;
			this._fields[1].opacity = 255;
			this._fields[1].imgName = 'Livre';
			this._fields[1].frame = 0;
			this._fields[1].frameDisplayed = 0;
			this._fields[1].frameWait = 6;
			this._fields[1].frameTarget = 4;
		break;
		//
		case 16:
			this._fields[1].bitmap = ImageManager.load_preload("Livre_0");
			this._fields[1].opacity = 255;
			this._fields[1].opacityTarget = 255;
			this._fields[3].transitionSpeed = 5;
			this._fields[2].transitionSpeed = 5;
		break;
		
		case 17:
			this.needToPressOk = true;
			this._fields[3].opacityTarget = 0;
			this._fields[2].bitmap = ImageManager.load_preload("histoire_4");
			this._fields[2].opacity = 0;
			this._fields[2].opacityTarget = 255;
			this._fields[4].opacity =0;
		break;
		
		//debut formation
		case 18:
			this._fields[0].bitmap = ImageManager.load_preload("formation_0");
			this._fields[2].opacityTarget = 0;
			this._fields[2].imgName = 'Livre';
			this._fields[2].frame = 0;
			this._fields[2].frameTarget = 4;
			this._fields[2].frameDisplayed = 4;
			this._fields[2].frameWait = 5;
			SoundManager.playSystem('book');
			this._fields[1].opacityTarget = 0;
			this._fields[0].opacityTarget = 255;
			this.needToPressOk = false;
		break;
		
		case 19:
			this._fields[0].transitionSpeed = 5;
			this._fields[1].transitionSpeed = 5;
			this._fields[2].transitionSpeed = 5;
			this._fields[1].bitmap = ImageManager.load_preload("formation_1");
			this._fields[2].bitmap = ImageManager.load_preload("formation_text");
			this._fields[1].opacityTarget = 255;
			this._fields[2].opacityTarget = 255;
		break;
		
		case 20:
			this._fields[0].bitmap = ImageManager.load_preload("formation_2");
			this._fields[1].opacityTarget = 0;
		break;
		
		case 21:
			this._fields[1].bitmap = ImageManager.load_preload("formation_3");
			this._fields[1].opacityTarget = 255;
		break;
		
		case 22:
			this._fields[0].bitmap = ImageManager.load_preload("formation_4");
			this._fields[1].opacityTarget = 0;
		break;
		
		case 23:
			this._fields[1].bitmap = ImageManager.load_preload("formation_5");
			this._fields[1].opacityTarget = 255;
			this._fields[2].opacityTarget = 0;
		break;
		
		case 24:
			this._fields[2].bitmap = ImageManager.load_preload("formation_text2");
			this._fields[0].bitmap = ImageManager.load_preload("formation_6");
			this._fields[1].opacityTarget = 0;
		break;
		
		case 25:
			this._fields[2].opacityTarget = 255;
			this._fields[1].bitmap = ImageManager.load_preload("formation_6");
			this._fields[1].opacityTarget = 255;
		break;
		
		case 26:
			this._fields[0].bitmap = ImageManager.load_preload("formation_8");
			this._fields[1].opacityTarget = 0;
		break;
		
		case 27:
			this._fields[1].bitmap = ImageManager.load_preload("formation_9");
			this._fields[1].opacityTarget = 255;
		break;
		
		case 28:
			this._fields[0].bitmap = ImageManager.load_preload("formation_10");
			this._fields[1].opacityTarget = 0;
		break;
		case 29:
			this._fields[1].bitmap = ImageManager.load_preload("formation_11");
			this._fields[1].opacityTarget = 255;
		break;
		
		case 30:
			this._fields[0].bitmap = ImageManager.load_preload("formation_12");
			this._fields[1].opacityTarget = 0;
		break;
		
		case 31:
			this.needToPressOk = true;
			this._fields[4].opacity =0;
			this._fields[1].bitmap = ImageManager.load_preload("formation_13");
			this._fields[1].opacityTarget = 255;
		break;
		
		case 32:
			this._fields[0].bitmap = ImageManager.load_preload("KaosBack_0");
			this._fields[1].opacityTarget = 0;
			this._fields[2].transitionSpeed = 10;
			this._fields[2].opacityTarget = 0;
		break;
		
		case 33:
			this.frameWait = 10;
			this.frameDisplayed = 0;
			this._fields[1].bitmap = ImageManager.load_preload("KaosBack_1");
			this._fields[1].opacityTarget = 255;
		break;
		
		case 34:
			this._fields[0].opacity = 0;
			this._fields[0].opacityTarget = 0;
			this.needToPressOk = false;
			this.fadeOutAll();
		break;
		
		default:
		break;
	};
};
// * Start
Scene_Splash.prototype.start									= function(){
										Scene_Base.prototype.start.call(this);
    this.startFadeIn(2, false);
};
// * Update
Scene_Splash.prototype.update									= function(){
										Scene_Base.prototype.update.call(this);
	this.update_pressOk();
	this.update_sequency();
	
}
Scene_Splash.prototype.update_pressOk							= function(){
	
	if(this.needToPressOk){
		if(this._fields[4].opacity <= 100){
			this._fields[4].opacity += this._fields[4].transitionSpeed;
		}else{
			this._fields[4].opacity = 20;
		};
		
		if(!this._isFirstTimeStart && this._scenarStep >=1){
				this._fields[5].opacity =this._fields[4].opacity;
		};
	}else{
		this._fields[4].opacity=0;
		if(this._isFirstTimeStart && this._scenarStep >=1){
			if(this._fields[5].opacity <= 100){
				this._fields[5].opacity += this._fields[4].transitionSpeed;
			}else{
				this._fields[5].opacity =20;
			};
		}else{
			this._fields[4].opacity=0;
		};
	};
};
Scene_Splash.prototype.update_sequency							= function(){
	this._allNeedRefresh = true;
	
	for(i=0; i<4; i++){
		this._fields[i]._needRefresh = this.is_updated_field(i);
		if(!this._fields[i]._needRefresh)
			this._allNeedRefresh = false;
	}
	if(this._allNeedRefresh){
		this.update_sequency_input();
	}
	
	if(this._isFirstTimeStart){
		if (Input.isTriggered("cancel") || TouchInput.isCancelled()) {
			SoundManager.playBuzzer();
		};
	}else{
		if (Input.isTriggered("cancel") || TouchInput.isCancelled()) {
			this._scenarStep = 35;
			SoundManager.playCancel();
			this.refresh_splashScreen();
		};
	}
};
Scene_Splash.prototype.is_updated_field							= function(i){
	return
		this.is_updated_field_pos(i)
	&&	this.is_updated_field_frame(i)
	&&	this.is_updated_field_scale(i)
	&&	this.is_updated_field_opacity(i);
}
Scene_Splash.prototype.is_updated_field_pos						= function(i){
	var _cleared = true;
	
	if( this._fields[i].x <  this._fields[i].xFin){
		if(this._fields[i].x + this._fields[i].moveSpeed > this._fields[i].xFin){
			this._fields[i].x += this._fields[i].moveSpeed;
		}else{
			this._fields[i].x = this._fields[i].xFin;
		}
		_cleared =false;
	}else if ( this._fields[i].x >  this._fields[i].xFin){
		if(this._fields[i].x - this._fields[i].moveSpeed < this._fields[i].xFin){
			this._fields[i].x -= this._fields[i].moveSpeed;
		}else{
			this._fields[i].x = this._fields[i].xFin;
		}
		_cleared =false
	} 
		
	if( this._fields[i].y <  this._fields[i].yFin){
		if(this._fields[i].y + this._fields[i].moveSpeed < this._fields[i].yFin){
			this._fields[i].y += this._fields[i].moveSpeed;
		}else{
			this._fields[i].y = this._fields[i].yFin;
		}
		_cleared =false
	}else if ( this._fields[i].y >  this._fields[i].yFin){
		if(this._fields[i].y - this._fields[i].moveSpeed > this._fields[i].yFin){
			this._fields[i].y -= this._fields[i].moveSpeed;
		}else{
			this._fields[i].y = this._fields[i].yFin;
		}	
		_cleared =false
	}
	
	return _cleared;
};
Scene_Splash.prototype.is_updated_field_frame					= function(i){
	
	if(this._fields[i].frameWait > this._fields[i].frameDisplayed){
		this._fields[i].frameDisplayed++;
		return false;
	} else if ( this._fields[i].frame <  this._fields[i].frameTarget){
			this._fields[i].frame++;
			this._fields[i].frameDisplayed = 0;
			var _frameName = this._fields[i].imgName + "_" + this._fields[i].frame;
			this._fields[i].bitmap = ImageManager.load_preload(_frameName);
		return false;
	}
	
	return true;
};
Scene_Splash.prototype.is_updated_field_opacity					= function(i){
	
	if ( this._fields[i].opacity >  this._fields[i].opacityTarget){
		if ( this._fields[i].opacity- this._fields[i].transitionSpeed >  this._fields[i].opacityTarget){
			this._fields[i].opacity -= this._fields[i].transitionSpeed;
		}else {
			this._fields[i].opacity = this._fields[i].opacityTarget
		};
		return false;
	} else if ( this._fields[i].opacity <  this._fields[i].opacityTarget){
		if ( this._fields[i].opacity + this._fields[i].transitionSpeed <  this._fields[i].opacityTarget){
			this._fields[i].opacity += this._fields[i].transitionSpeed;
		} else {
			this._fields[i].opacity = this._fields[i].opacityTarget;
		};
		return false;
	} else {
		return true;
	};
};
Scene_Splash.prototype.update_sequency_input					= function(){

	if( !this.needToPressOk ){
		this._scenarStep++;
		this.refresh_scene();
	} else if (Input.isTriggered("ok") || TouchInput.isTriggered()) {
		this._scenarStep++;
		this.wait = 0;
		SoundManager.playCursor();
		this.refresh_scene();
	}else if(this.wait > 1500){
		this.wait = 0;
		this._scenarStep++;
		SoundManager.playCursor();
		this.refresh_scene();
	}else{
		this.wait++;
	};
};



