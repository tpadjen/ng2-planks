import {Component, NgIf, Input, EventEmitter, Output} from 'angular2/angular2';

let styles = require('./modal.css');

@Component({
  selector: 'modal',
  directives: [NgIf],
  pipes: [],
  styles: [styles],
  template: `
    <div class="modal" [class.hidden]="!showing">
      <div class="background" (click)="onCancel($event)">
        <div class="window" (click)="$event.stopPropagation()">
          <header><h1 class="title">{{ title }}</h1></header>
          <hr>
          <div class="content">
            <ng-content>My Content</ng-content>
          </div>
          <div class="buttons">
            <button
              class="btn btn-success confirm"
              (click)="onConfirm($event)"
              [class.disabled]="!confirmable">{{ confirmButtonText }}</button>
            <button
              class="btn btn-danger cancel"
              (click)="onCancel($event)">{{ cancelButtonText }}</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class Modal {
  @Input() title: string = "Modal Title";
  @Input() confirmButtonText: string = "OK";
  @Input() cancelButtonText: string = "Cancel";
  @Input() confirmable: boolean;

  @Output() confirm: EventEmitter = new EventEmitter();
  @Output() cancel: EventEmitter = new EventEmitter();

  showing: boolean = false;

  constructor() {}

  onConfirm(event) {
    event.stopPropagation();
    if (this.confirmable){
      this.confirm.next(null);
      this.hide();
    }
  }

  onCancel(event) {
    event.stopPropagation();
    this.cancel.next(null);
    this.hide();
  }

  show() {
    this.showing = true;
  }

  hide() {
    this.showing = false;
  }

}