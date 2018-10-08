//var server_ip = "http://10.3.2.184/tvod_2012_03_05";
var server_ip = "http://tvod.vn";
var urlLogin1 = server_ip + "/?q=external_device/login&user_name=";
var urlLogout = server_ip + "/?q=external_device/logout";

var urlGetUserProfile = server_ip + "/?q=external_device/get_user_detail";

//url get child category
var urlGetChildCategory = server_ip + "/?q=external_device/list_category&device=1&filter=all&parent_category=";

//url get video list with filter: all,most view, newest,..
var urlGetListVideo = server_ip + "/?q=external_device/list_video&device=1&category=";
//var urlGetListVideo = server_ip + "/?q=external_device/list_video_i&category=";

var urlGetVideoStream = server_ip + "/?q=external_device/getURL&video_id=";
var urlGetRegisterMessage = server_ip + "/?q=external_device/get_register_message";
var urlGetTopupMessage = server_ip + "?q=external_device/get_topup_message";

var urlGetListDrama = server_ip + "?q=external_device/list_drama_samsung&";
var urlGetListVideoFollowDrama = server_ip + "?q=external_device/list_video_follow_drama_samsung&drama=";//10690&filter=newest&page=1";