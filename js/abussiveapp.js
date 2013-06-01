var maxQuestions = 10;
var activeQuestion = 0;
var amountN = 0;
var amountW = 0;
var amountA = 0;
var amountV = 0;

var dataQuestions;

function init() {
	
	$.ajax({
		type: "POST",
		url: 'questions_'+ lang +'.json',
			dataType: 'json'
		}).done(function( data ) {
			
			dataQuestions = data;
		});
}

function setup() {
	$("#formAnswer0").submit(function() { clicksound.playclip(); submitQuestion(0); return false;});
	$("#formAnswer1").submit(function() { clicksound.playclip(); submitQuestion(1); return false;});
	$("#formAnswer2").submit(function() { clicksound.playclip(); submitQuestion(2); return false;});
	$("#formAnswer3").submit(function() { clicksound.playclip(); submitQuestion(3); return false;});
	
	$(".btnStart").click(function(){ clicksound.playclip(); openPageQuestion(); })
	$(".btnKnow").click(function(){ clicksound.playclip(); openPageKnow(); })
	$(".btnSign").click(function(){ clicksound.playclip(); openPageSign(); })
	$(".btnPlan").click(function(){ clicksound.playclip(); openPagePlan(); })
	$(".btnNumbers").click(function(){ clicksound.playclip(); openPageNumbers(); })
	$(".btnExtras").click(function(){ clicksound.playclip(); openPageExtras(); })
	$(".btnShare").click(function(){ clicksound.playclip(); openPageShare(); })
	$(".btnHome").click(function(){ clicksound.playclip(); openPageHome(); })
	$(".btnJenniferAnn").click(function(){ clicksound.playclip(); openPageJenniferAnn(); })
	$(".btnLanguage").click(function(){ clicksound.playclip(); openLanguage(); })	
}

function scrollUp() {
	
	$('html, body').animate({scrollTop:0}, 200);
}

function initVariables() {
	activeQuestion = 0;
	amountN = 0;
	amountW = 0;
	amountA = 0;
	amountV = 0;
	loadQuestion();
}

function openPageJenniferAnn() {
	window.location.href = "http://www.jenniferann.org/"; 
}

function openLanguage() {
	var langTo = "";
	if (lang == "es") { langTo = "en";} else { langTo = "es";}
	window.location.href = "index_"+langTo+".html"; 
}

function openPageHome() {
	scrollUp();
	$("#headerQuiz").hide();
	$("#pageHome").fadeIn();
	$("#pageQuestion").hide();
	$("#pageResult").hide();
	$("#pageExtra").hide();
	$("#footerStart").fadeIn();
	$("#footerInfo").hide();
	$("#headerQuiz").hide();
	$("#pageKnow").hide();
	$("#bannerJennifer").hide();
	$("#pageShare").hide();	
	$("#footerQuiz").hide();
	$("#submenu").hide();
}

function openPageQuestion() {
	
	initVariables();
	$("#headerQuiz").fadeIn();
	$("#pageQuestion").fadeIn();
	$("#pageHome").hide();
	$("#footerStart").hide();
	$("#footerQuiz").fadeIn();
}

function openPageResult() {
	$("#pageProcesing").hide();
	$("#pageResult").fadeIn();
	$("#bannerJennifer").fadeIn();
	$("#footerQuiz").fadeIn();
	$("#footerQuiz").fadeIn();
	$("#resultLineRegular").addClass("noticeRegular");
	$("#resultLineWolfman").addClass("noticeRegular");
	$("#resultLineAbusive").addClass("noticeRegular");
	$("#resultLineVampire").addClass("noticeRegular");

	$(".imageResult").removeClass("resultWerewolf");
	$(".imageResult").removeClass("resultZombie");
	$(".imageResult").removeClass("resultAgresive");
	$(".imageResult").removeClass("resultVampire");
	$("#advVampire").hide();
	$("#advWerewolf").hide();
	$("#advAbusive").hide();
	$("#advRegular").hide();
	
	if (amountN >= amountW && amountN >= amountA && amountN >= amountV) {
		//Normal
		$("#resultLineRegular").removeClass("noticeRegular");
		$(".imageResult").addClass("resultZombie");
		$("#advRegular").fadeIn();
	}
	else if (amountW >= amountN && amountW >= amountA && amountW >= amountV) {
		//Hombre lobo
		$("#resultLineWolfman").removeClass("noticeRegular");
		$(".imageResult").addClass("resultWerewolf");
		$("#advWerewolf").fadeIn();
	}
	else if (amountA >= amountN && amountA >= amountW && amountA >= amountV) {
		//Agresive
		$("#resultLineAbusive").removeClass("noticeRegular");
		$(".imageResult").addClass("resultAgresive");
		$("#advAbusive").fadeIn();
	}
	else if (amountV >= amountN && amountV >= amountW && amountV >= amountA) {
		//Vampiro
		$("#resultLineVampire").removeClass("noticeRegular");
		$(".imageResult").addClass("resultVampire");
		$("#advVampire").fadeIn();
	}
	
	$("#resultLineRegular span").html(amountN*10);
	$("#resultLineWolfman span").html(amountW*10);
	$("#resultLineVampire span").html(amountV*10);
	$("#resultLineAbusive span").html(amountA*10);
	
	if (amountA > 0) {
		alarmsound.playclip();
		$("#resultLineAbusive").addClass("error errorBigger");
		$("#btnAbusive").fadeIn();
		$("#btnNotAbusive").hide();
	}
	else {
		$("#resultLineAbusive").removeClass("error errorBigger");
		$("#btnAbusive").hide();
		$("#btnNotAbusive").fadeIn();
	}
}

function openPageKnow() {
	scrollUp();
	$("#submenu").fadeIn();
	$("#pageKnow").fadeIn();
	$("#pageResult").hide();
	$("#pageSign").hide();
	$("#pageNumbers").hide();
	$("#pagePlan").hide();
	$("#bannerJennifer").hide();
	$("#pageShare").fadeIn();	
}

function openPageSign() {
	scrollUp();
	$("#pageSign").fadeIn();
	$("#pageKnow").hide();
	$("#pageNumbers").hide();
	$("#pagePlan").hide();
	$("#footerQuiz").hide();
	$("#footerInfo").fadeIn();
	$("#pageShare").hide();	
}

function openPagePlan() {
	scrollUp();
	$("#pagePlan").fadeIn();
	$("#pageSign").hide();
	$("#pageKnow").hide();
	$("#pageNumbers").hide();
	$("#footerQuiz").hide();
	$("#footerInfo").fadeIn();	
	$("#pageShare").hide();	
}

function openPageNumbers() {
	scrollUp();
	$("#pageNumbers").fadeIn();
	$("#pageResult").hide();
	$("#pagePlan").hide();
	$("#pageKnow").hide();
	$("#pageSign").hide();
	$("#footerQuiz").hide();
	$("#footerInfo").fadeIn();	
	$("#pageShare").hide();	
}

function openPageExtras() {
	scrollUp();
	$("#headerQuiz").fadeIn();
	$("#pageKnow").fadeIn();
	$("#submenu").fadeIn();
	$("#bannerJennifer").fadeIn();
	$("#pageShare").fadeIn();	
	$("#footerQuiz").fadeIn();
	$("#youMention").hide();
	$("#pageHome").hide();
	$("#footerStart").hide();
	
	
	$("#pagePlan").hide();
	$("#footerInfo").hide();	
	$("#pageSign").hide();
	$("#pageNumbers").hide();
}

function openPageShare() {
	scrollUp();
	$("#pageShare").fadeIn();	
	$("#pageNumbers").hide();
	$("#pageResult").hide();
	$("#pagePlan").hide();
	$("#pageSign").hide();
	$("#footerQuiz").hide();
	$("#footerInfo").fadeIn();	
}

function loadQuestion() {
	scrollUp();
	$("#question").html(dataQuestions.questions[activeQuestion].title);
	for(var i=0;i<4;i++) {
		$("#answer"+ i).html(dataQuestions.questions[activeQuestion].options[i].text);
		$("#formAnswer"+ i + " #n").val(dataQuestions.questions[activeQuestion].options[i].n);
		$("#formAnswer"+ i + " #w").val(dataQuestions.questions[activeQuestion].options[i].w);
		$("#formAnswer"+ i + " #a").val(dataQuestions.questions[activeQuestion].options[i].a);
		$("#formAnswer"+ i + " #v").val(dataQuestions.questions[activeQuestion].options[i].v);
	}
}

function submitQuestion(formId) {
	scrollUp();
	
	var aN = parseInt($("#formAnswer"+ formId + " #n").val());
	var aW = parseInt($("#formAnswer"+ formId + " #w").val());
 	var aA = parseInt($("#formAnswer"+ formId + " #a").val());
 	var aV = parseInt($("#formAnswer"+ formId + " #v").val());
 	
	amountN += aN;
	amountW += aW;
 	amountA += aA;
 	amountV += aV;
 	
 	if (aA > 0 ) {
 		//Setear	
 		$("#know_q_"+activeQuestion).removeClass("noSignText");
 		$("#know_q_"+activeQuestion + " i").addClass("icon-ok");
 		$("#know_q_"+activeQuestion + " i").removeClass("icon-remove");
 	}
 	else {
 		$("#know_q_"+activeQuestion).addClass("noSignText");
 		$("#know_q_"+activeQuestion + " i").removeClass("icon-ok");
 		$("#know_q_"+activeQuestion + " i").addClass("icon-remove");
 	}
 	
 	activeQuestion++;
 	if (activeQuestion <= (maxQuestions-1)) {
 		loadQuestion();
 	}
 	else {
 		$("#footerQuiz").hide();
 		$("#pageQuestion").hide();
 		$("#bannerJennifer").fadeIn();
		$("#pageProcesing").fadeIn();
 		setTimeout(function(){
 			openPageResult();
		}, 2000);
 	}
}

/* ************************************************************************************* */
var html5_audiotypes={ //define list of audio file extensions and their associated audio types. Add to it if your specified audio file isn't on this list:
	"mp3": "audio/mpeg",
	"mp4": "audio/mp4",
	"ogg": "audio/ogg",
	"wav": "audio/wav"
}

function createsoundbite(sound){
	var html5audio=document.createElement('audio')
	if (html5audio.canPlayType){ //check support for HTML5 audio
		for (var i=0; i<arguments.length; i++){
			var sourceel=document.createElement('source')
			sourceel.setAttribute('src', arguments[i])
			if (arguments[i].match(/\.(\w+)$/i))
				sourceel.setAttribute('type', html5_audiotypes[RegExp.$1])
			html5audio.appendChild(sourceel)
		}
		html5audio.load()
		html5audio.playclip=function(){
			html5audio.pause()
			html5audio.currentTime=0
			html5audio.play()
		}
		return html5audio
	}
	else{
		return {playclip:function(){}}
	}
}
//Initialize two sound clips with 1 fallback file each:

var clicksound=createsoundbite("click.ogg", "click.mp3")
var alarmsound=createsoundbite("alarm.ogg", "alarm.mp3")