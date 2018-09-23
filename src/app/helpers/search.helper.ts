import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

export class Search {

  keyUp: Subject<any>;

  constructor(fn: Function) {

    this.keyUp = new Subject();
    this.keyUp
      .map(event => event.target.value)
      .distinctUntilChanged()
      .debounceTime(500)
      .subscribe(data => {
        setTimeout(() => fn(), 0);
      });
    return this;
  }

  next(e) {
    this.keyUp.next(e);
  }
}
