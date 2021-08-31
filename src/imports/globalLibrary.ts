
//return the normaliced direction vector from point1 to point2
function directionVectorBetweenTwoPoints(point1: Vector3, point2: Vector3) {
    return Vector3.Normalize(new Vector3(point2.x - point1.x, point2.y - point1.y, point2.z - point1.z));
}

function lerp (start: float, end: float, amt: float){
  return (1-amt)*start+amt*end
}

function clamp(num: number, min: number, max: number) {
  return num <= min ? min : num >= max ? max : num;
}

function randomIntFromInterval(min: number, max: number) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function millisToMinutesAndSeconds(millis: number) {
  var minutes = Math.floor(millis / 60000)
  var seconds = ((millis % 60000) / 1000)
  var secondsString = seconds.toFixed(0)
  return (minutes < 10 ? '0' : '')+ minutes + ":" + (seconds < 10 ? '0' : '') + secondsString;
}
function millisToMinutesAndSecondsAndMilis(millis: number) {
  var minutes = Math.floor(millis / 60000)
  var seconds = ((millis % 60000) / 1000)
  var secondsString = seconds.toFixed(0)
  return (minutes < 10 ? '0' : '')+ minutes + ":" + (seconds < 10 ? '0' : '') + secondsString + ":" + (millis % 1000);
}

function millisToMillisAndSeconds(millis: number) {
  var seconds = Math.floor(millis / 1000)
  var secondsString = seconds.toFixed(0)
  return (seconds < 10 ? '0' : '') + secondsString + ":"+(millis % 1000);
}
function millisToSeconds(millis: number) {
  var seconds = Math.floor(millis / 1000)
  var secondsString = seconds.toFixed(0)
  return (seconds < 10 ? '0' : '') + secondsString;
}

function insertLineJumps(text:string, lineCharLimit: number): string {
  var nLines = 1
  var lines = []
  var lastPosition = 0
  var lastSpacePosition = 0
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i)==" ") {
      lastSpacePosition = i
    }
    if (i>(lineCharLimit*nLines)) {
      if (text.charAt(i)==" ") {
        lines.push(text.substring(lastPosition, i) + "\n")
        lastPosition = i
        nLines = nLines + 1
      }
      else if (i-lastSpacePosition<15 && lastPosition<lastSpacePosition) {
        lines.push(text.substring(lastPosition, lastSpacePosition) + "\n")
        lastPosition = lastSpacePosition
        nLines = nLines + 1
      }
      else{
        lines.push(text.substring(lastPosition, i) + "\n")
        lastPosition = i
        nLines = nLines + 1
      }
    }
  }

  if (lastPosition<text.length) {
    lines.push(text.substring(lastPosition))
  }

  return lines.join('')
}

function console_log(...args: any[]){
  console.log(...args)
}