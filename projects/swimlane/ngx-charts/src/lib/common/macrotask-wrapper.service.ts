import { Injectable } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';

/**
 * A service that wraps a promise in a macrotask, to force angular universal to wait for its execution
 */
@Injectable({
  providedIn: 'root'
})
export class MacroTaskWrapperService {
  taskProcessor: SSRMacroTaskProcessor;
  constructor() {
    this.taskProcessor = new SSRMacroTaskProcessor();
  }

  doTask<T>(promise: Promise<T>) {
    return <Observable<T>>this.taskProcessor.doTask(promise);
  }
}

declare const Zone: any;

export abstract class ZoneMacroTaskWrapper<S, R> {
  wrap(request: S): Observable<R> {
    return new Observable((observer: Observer<R>) => {
      let task;
      let scheduled = false;
      let sub: Subscription | null = null;
      let savedResult: any = null;
      let savedError: any = null;

      // tslint:disable-next-line:no-shadowed-variable
      const scheduleTask = (_task: any) => {
        task = _task;
        scheduled = true;

        const delegate = this.delegate(request);
        sub = delegate.subscribe(
          res => (savedResult = res),
          err => {
            if (!scheduled) {
              throw new Error("An http observable was completed twice. This shouldn't happen, please file a bug.");
            }
            savedError = err;
            scheduled = false;
            task.invoke();
          },
          () => {
            if (!scheduled) {
              throw new Error("An http observable was completed twice. This shouldn't happen, please file a bug.");
            }
            scheduled = false;
            task.invoke();
          }
        );
      };

      // tslint:disable-next-line:no-shadowed-variable
      const cancelTask = (_task: any) => {
        if (!scheduled) {
          return;
        }
        scheduled = false;
        if (sub) {
          sub.unsubscribe();
          sub = null;
        }
      };

      const onComplete = () => {
        if (savedError !== null) {
          observer.error(savedError);
        } else {
          observer.next(savedResult);
          observer.complete();
        }
      };

      // MockBackend for Http is synchronous, which means that if scheduleTask is by
      // scheduleMacroTask, the request will hit MockBackend and the response will be
      // sent, causing task.invoke() to be called.
      const _task = Zone.current.scheduleMacroTask(
        'ZoneMacroTaskWrapper.subscribe',
        onComplete,
        {},
        () => null,
        cancelTask
      );
      scheduleTask(_task);

      return () => {
        if (scheduled && task) {
          task.zone.cancelTask(task);
          scheduled = false;
        }
        if (sub) {
          sub.unsubscribe();
          sub = null;
        }
      };
    });
  }

  protected abstract delegate(request: S): Observable<R>;
}

export class SSRMacroTaskProcessor extends ZoneMacroTaskWrapper<Promise<any>, any> {
  constructor() {
    super();
  }

  // your public task invocation method signature
  doTask(request: Promise<any>): Observable<any> {
    // call via ZoneMacroTaskWrapper
    return this.wrap(request);
  }

  // delegated raw implementation that will be called by ZoneMacroTaskWrapper
  protected delegate(request: Promise<any>): Observable<any> {
    return new Observable<any>((observer: Observer<any>) => {
      // calling observer.next / complete / error
      request
        .then(result => {
          observer.next(result);
          observer.complete();
        })
        .catch(error => observer.error(error));
    });
  }
}
