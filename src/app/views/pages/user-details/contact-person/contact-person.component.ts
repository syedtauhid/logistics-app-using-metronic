import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {CustomerModel} from '../../../../core/e-commerce';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../../services/user.service';

@Component({
  selector: 'kt-contact-person',
  templateUrl: './contact-person.component.html',
  styleUrls: ['./contact-person.component.scss']
})
export class ContactPersonComponent implements OnInit {
	userId = '';
	contactPersons: any;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	selection = new SelectionModel<CustomerModel>(true, []);
	name: string;

	constructor(
		public dialog: MatDialog,
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService,) {

		this.route.params.subscribe((params) => {
			this.userId = params['userId'];
			this.getContactPersonByUserId(this.userId);
		});
	}

	ngOnInit() {
		this.getContactPersonByUserId(this.userId);
	}
	ngOnDestroy() {}

	public getContactPersonByUserId(id) {
		this.userService
			.getContactPersonByUserId(id)
			.subscribe((data) => {
					this.contactPersons = data;
				},
				err => {

				});
	}

	public editContactPerson(id) {
		this.router.navigate([`/user/${this.userId}/contact-persons/${id}`]);
	}

	public createContactPerson() {
		this.router.navigate([`/user/${this.userId}/contact-persons/add`]);
	}

	public deleteContactPerson(id) {
		this.userService
			.deleteContactPerson(id)
			.subscribe((data) => {
					this.contactPersons = [...this.contactPersons.filter(route => route._id !== id)];
					console.log(data);
				},
				err => {

				});
	}

}
