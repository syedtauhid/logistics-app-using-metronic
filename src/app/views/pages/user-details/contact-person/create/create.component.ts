import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'kt-create-contact-person',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateContactPersonComponent implements OnInit {
	userId = '';
	contactPersonId = '';
	public contactPerson: any = {
		clientId: "",
		comment: "",
		department: "",
		email: "",
		fax: "",
		firstName: "",
		mobileNumber: null,
		name: "",
		phone: null,
		title: ""
	};

    constructor(private userService: UserService,
			  private route: ActivatedRoute,
			  private router: Router,
			  private activatedRoute: ActivatedRoute) {
	   this.route.params.subscribe((params) => {
		   this.userId = params['userId'];
	   });
	   activatedRoute.params.subscribe((params) => {
		   this.contactPersonId = params['contactPersonId'];
		   if (this.contactPersonId && this.contactPersonId !== "add") {
			   this.getContactPersonByContactPersonId(this.contactPersonId);
		   }
	   });
    }

	goBack() {
		history.back();
	}

    ngOnInit() {

    }

	submit(form: NgForm) {
		// form.value.clientId = this.userId;
		if (form.value.email === "") {
			delete form.value.email;
		}
		if (this.contactPersonId && this.contactPersonId !== 'add') {
			this.editContact(form);
		} else {
			this.addContact(form)
		}
	}


	editContact(form) {
		this.userService
			.editContactPerson(this.contactPersonId, form.value, this.userId)
			.subscribe(data => {
				this.goBack();
			});
	}

	addContact(form) {
		this.userService
			.createContactPerson(this.userId, form.value)
			.subscribe(data => {
				this.goBack();

			})
	}

	getContactPersonByContactPersonId(id) {
		this.userService
			.getContactPersonByContactPersonId(id)
			.subscribe(data => {
				this.contactPerson = data;
			});
	}
}
