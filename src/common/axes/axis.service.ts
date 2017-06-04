import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AxisService {

    private subject = new Subject<any>();

    setXaxis(value: string) {
        this.subject.next({ transform: `translate(${value}, 0)`, value: `${value}` });
    }

    getXaxis() {
        return this.subject.asObservable();
    }
}
