var recognition = new webkitSpeechRecognition();
recognition.lang = "bn-bd";
recognition.continuous = false;
recognition.interimResults = true;

document.querySelectorAll(".collapsible-body").forEach((body) => {
  body.style.display = "none";
});

document.querySelectorAll(".collapsible-header").forEach((header) => {
  header.addEventListener("click", () => {
    const body = header.nextElementSibling;
    document.querySelectorAll(".collapsible-body").forEach((otherBody) => {
      if (otherBody !== body) {
        otherBody.style.display = "none";
      }
    });
    body.style.display = body.style.display === "block" ? "none" : "block";
  });
});

var interval;
var scrollInterval;
var mode = "";
function closeMenu() {
  $(".menu").removeClass("active");
}

function start() {
  recognition.stop();
  var micOn = document.getElementById("mic-on");
  var micOff = document.getElementById("mic-off");
  micOff.style.display = "none";
  micOn.style.display = "block";
  recognition.start();
  console.log("hi");

  recognition.onresult = function (event) {
    console.log("chatting");

    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        var res = event.results[i][0].transcript.toLowerCase().trim();
        res = res.replace(/[\.。।]$/, "");
        console.log(res); // what was said

        if (res === "পরের পেজ") {
          $(".menu").addClass("active");
          speak("menu loaded. make your selection.");
        } else if (res === "লিংক এক" || res === "ওয়ান") {
          document.getElementById("link").click();
          speak("navigating to the first link");
        } else if (res === "এখন আমি কি করবো") {
          gotoItem("#three");
          speak("এখন আমি কি করবো");
        } else if (res === "ক্লিক" || res === "ক্লিক") {
          gotoItem("#four");
          speak("three. is the magic number");
        } else if (res === "চার" || res === "four") {
          gotoItem("#five");
          speak("heading to the fourth link");
        } else if (res === "পাঁচ" || res === "five") {
          gotoItem("#six");
          speak("last but not least");
        } else if (res === "থামো") {
          stop();
        } else if (res === "নিচে") {
          // Start auto scrolling
          mode = "scroll";
          scrollInterval = setInterval(function () {
            window.scrollBy(0, 40); // Scroll down by 10px
          }, 100); // Every 100ms
          speak("Auto scrolling started.");
        } else if (res === "থামো" && mode === "স্ক্রল") {
          // Stop auto scrolling
          clearInterval(scrollInterval);
          mode = "";
          speak("Auto scrolling stopped.");
        } else if (res === "দ্রুত" && mode === "স্ক্রল") {
          // Increase scrolling speed
          clearInterval(scrollInterval);
          scrollInterval = setInterval(function () {
            window.scrollBy(0, 20); // Scroll down by 20px
          }, 100); // Every 100ms
          speak("Scrolling speed increased.");
        } else if (res === "আস্তে" && mode === "স্ক্রল") {
          // Decrease scrolling speed
          clearInterval(scrollInterval);
          scrollInterval = setInterval(function () {
            window.scrollBy(0, 5); // Scroll down by 5px
          }, 100); // Every 100ms
          speak("Scrolling speed decreased.");
        }
        console.log("going");
        interval = setInterval(getRid, 3000);
      }
    }
  };
}
function getRid() {
  console.log("gone");
  clearInterval(interval);
  start();
}

function stop() {
  speak("do not say this is goodbye. it is more of a see you later");
  recognition.stop();
  var micOn = document.getElementById("mic-on");
  var micOff = document.getElementById("mic-off");
  micOn.style.display = "none";
  micOff.style.display = "block";
  console.log("bye");
  gotoItem("#one");
}

// talkback
var button = document.getElementById("speak");
var speechMsgInput = document.getElementById("speech-msg");
var voiceSelect = document.getElementById("voice");
var volumeInput = document.getElementById("volume");
var rateInput = document.getElementById("rate");
var pitchInput = document.getElementById("pitch");

function speak(text) {
  var msg = new SpeechSynthesisUtterance();
  msg.text = text;
  msg.volume = 1;
  msg.voice = speechSynthesis.getVoices().filter(function (voice) {
    return voice.name == "Fred";
  })[0];
  window.speechSynthesis.speak(msg);
}

function gotoItem(which) {
  closeMenu();
  $(which)[0].scrollIntoView(true);
}

$("nav ul")
  .find("a")
  .click(function () {
    var $href = $(this).attr("href");
    gotoItem($href);
    return false;
  });
