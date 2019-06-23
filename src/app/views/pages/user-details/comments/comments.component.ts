import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'kt-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
	public _userComments: string;
	savEd = false;
	get userComments(): string {
		return this._userComments;
	}

	@Input()
	set userComments(userComments: string) {
		this._userComments = userComments;
	}

	@Input()
	set saved(data: boolean) {
		this.savEd = data;
	}
	@Output() comments = new EventEmitter();

	commentsChanged(comment) {
		this.comments.emit(comment);
	}

  	constructor() { }

  	submit(form: NgForm) {
		this.commentsChanged(form.value);
	}

}
