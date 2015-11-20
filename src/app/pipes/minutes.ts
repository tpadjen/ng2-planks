import {Pipe} from 'angular2/angular2';

@Pipe({
  name: 'minutes'
})
export class MinutesPipe {

  transform(value, args?) {
    if(!value || value == undefined || value == NaN) return "";

    var t = parseInt(value);
    var min = Math.floor(t / 60);
    var sec = t - 60*min;

    if(min > 0) {
      if (sec < 10) return min + ":" + "0" + sec;

      return min + ":" + sec;
    }
    return value;
  }

}