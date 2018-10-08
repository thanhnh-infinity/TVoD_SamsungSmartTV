var Audio =
{
    plugin : null
}

Audio.init = function()
{
    var success = true;
    
    this.plugin = document.getElementById("pluginAudio");
    
    if (!this.plugin)
    {
        success = false;
    }

    return success;
}

Audio.setRelativeVolume = function(delta)
{
    this.plugin.SetVolumeWithKey(delta);
   // Display.setVolume( this.getVolume() );

}

Audio.getVolume = function()
{
    logger("Volume : " +  this.plugin.GetVolume());
    return this.plugin.GetVolume();
}
Audio.getMute = function()
{
	return this.plugin.GetUserMute();
}
Audio.setMute = function()
{
	logger("set mute");
	if(this.plugin.GetUserMute() == 0)
		this.plugin.SetUserMute(1);
	else this.plugin.SetUserMute(0);
}