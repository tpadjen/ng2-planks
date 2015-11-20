import {Pipe} from 'angular2/angular2';

@Pipe({
  name: 'toTime'
})
export class ToTimePipe {

  transform(value, args?) {
    if(!value || value == undefined || value == NaN) return "00:00.0";

    var t = parseFloat(value);
    var min = Math.floor(t / 60);
    var sec = t - 60*min;
    sec = Math.floor(sec*10)/10;

    var m = min + "";
    var s = sec + "";

    if (min < 10) m = "0" + m
    if (sec < 10) s = "0" + s

    if (sec == Math.floor(sec)) s += ".0";

    return m + ":" + s;
  }

}