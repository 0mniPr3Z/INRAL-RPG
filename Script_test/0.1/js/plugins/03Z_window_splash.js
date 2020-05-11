function Window_Splash() {
    this.initialize.apply(this, arguments);
}

Window_TitleCommand.prototype = Object.create(Window_Base.prototype);
Window_TitleCommand.prototype.constructor = Window_TitleCommand;

Window_TitleCommand.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.updatePlacement();
    this.openness = 0;
};

Window_TitleCommand.prototype.windowWidth = function() {
    return 1280;
};

Window_TitleCommand.prototype.updatePlacement = function() {
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = Graphics.boxHeight - this.height - 96;
};