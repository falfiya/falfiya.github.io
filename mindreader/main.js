var urlPlay;
var battery = {};
navigator.getBattery().then((batteryManager) => {
  battery.charging = batteryManager.charging;
  battery.percent = batteryManager.level * 100;
  if (battery.charging) {
    battery.time = batteryManager.chargingTime;
  } else {
    battery.time = batteryManager.dischargingTime;
  }
  batteryManager.onlevelchange = function () {
    battery.percent = batteryManager.level * 100;
  };
  batteryManager.onchargingchange = function () {
    battery.charging = batteryManager.charging;
    if (battery.charging) {
      battery.time = batteryManager.chargingTime;
    } else {
      battery.time = batteryManager.dischargingTime;
    }
  };
  batteryManager.onchargingtimechange = batteryManager.ondischargingtimechange = function () {
    if (battery.charging) {
      battery.time = batteryManager.chargingTime;
    } else {
      battery.time = batteryManager.dischargingTime;
    }
  };
}, (err) => {
  console.error('Failed to get Battery');
  console.error(err);
});

var os = navigator.userAgent.slice(navigator.userAgent.indexOf('(') + 1, navigator.userAgent.indexOf(')'));

var theScreen = {
  avail: {
    top: screen.availTop,
    left: screen.availLeft,
    height: screen.availHeight,
    width: screen.availWidth,
  },
  dims: {
    top: 0,
    left: 0,
    height: screen.height,
    width: screen.width,
  },
  orient: screen.orientation,
  turnOff() {
    if (screen.mozEnabled) {
      screen.mozEnabled = false;
    }
    if (screen.webkitEnabled) {
      screen.webkitEnabled = false;
    }
    if (screen.enabled) {
      screen.enabled = false;
    }
  },
  canTurnOff() {
    return typeof (screen.enabled || screen.mozEnabled || screen.webkitEnabled) !== 'undefined';
  },
  depth: {
    pixel: screen.pixelDepth,
    color: screen.colorDepth,
  },
};

var permissions = {};
function permission(name, uvo) {
  navigator.permissions.query({ name, userVisibleOnly: uvo }).then((result) => {
    switch (result.state) {
      case 'granted':
        permissions[name] = true;
        break;
      case 'denied':
        permissions[name] = false;
        break;
      case 'prompt':
        permissions[name] = null;
        break;
      default:
        console.error(`Unknown state ${result.state}`);
        break;
    }
  }, (err) => {
    console.error(`Failed to get permission '${name}'.`);
    console.error(err);
  });
}

// Permissions:
//  + geolocation
permission('geolocation');
//  + notifications
permission('notifications');
//  + push
permission('push', true);
//  + midi
permission('midi');

var connection = {
  onLine: navigator.onLine,
  type: navigator.connection.type,
};
navigator.connection.onchange = function () {
  connection.onLine = navigator.onLine;
};
navigator.connection.ontypechange = function () {
  connection.type = navigator.connection.type;
};
var cookies = navigator.cookieEnabled;
function pushHistory(str) { history.pushState({}, '', str); }

var d = document,
  gebc = 'getElementsByClassName',
  geti = 'getElementById',
  items = {
    Info: d[gebc]('Info')[0],
    Battery: d[gebc]('Battery')[0],
    OS: d[gebc]('OS')[0],
    Geolocation: d[gebc]('Geolocation')[0],
    Connection: d[gebc]('Connection')[0],
    Screen: d[gebc]('Screen')[0],
    History: d[gebc]('History')[0],
  },
  text = {
    Info,
    Battery,
    OS,
    Geolocation,
    Connection,
    Screen: d[geti]('Screen'),
    History: d[geti]('History'),
  };
current = items.Info;
textCurrent = text.Info;
function menu(str) {
  var c = current,
    i = items[str],
    q = textCurrent,
    t = text[str];
  c.style = ''; q.style = ''; i.style = 'border:2px solid white; border-bottom: 2px solid black;'; t.style = 'display:block';
  current = i;
  textCurrent = t;
  console.log(str);
}
var b = {
    percent: batteryPercent,
    charging: batteryCharging,
    time: batteryMinutes,
    mode: batteryTimeMode,
  },
  w = {
    online: connectionInternet,
    type: connectionType,
  },
  s = {
    height: screenHeight,
    width: screenWidth,
  };
function writeToDom() {
  b.percent.innerHTML = battery.percent;
  b.charging.innerHTML = battery.charging ? 'plugged in' : 'not plugged in';
  b.time.innerHTML = battery.time;
  b.mode.innerHTML = battery.charging ? 'charge' : 'discharge';
  osOS.innerHTM = os;
  w.online.innerHTML = connection.onLine ? '' : 'not ';
  if (connection.onLine)w.type.innerHTML = `Your connection type is ${connection.type}.`;
  s.height.innerHTML = theScreen.avail.height;
  s.width.innerHTML = theScreen.avail.width;
}
var h = ['w', 'wo', 'woa', 'woah', 'woah!', 'woah', 'woa', 'wo', 'w', 'l', 'lo', 'loo', 'look', 'look-', 'look-a', 'look-at', 'look-at-', 'look-at-t', 'look-at-th', 'look-at-thi', 'look-at-that', 'look-at-this!'],
  hcount = -1;
function floodHistory() {
  hcount++;
  if (h[hcount]) { pushHistory(h[hcount]); } else { hcount = -1; clearInterval(urlPlay); pushHistory('/mindreader'); }
}
setInterval(writeToDom, 300);
