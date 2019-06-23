import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../../../core/auth';
import { UserService } from '../../../../../services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'kt-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
	public routeId = '';
	public userId = '';
	public route: any = {
		clientId: "",
		routeNumber: null,
		description: "",
		clientPrice: "",
		priceBasis: "",
		tourType: "",
		comment: "",
		validFrom: "",
		validTo: "",
		contractor: "",
		contractorPriceWeek: null,
		contractorPriceWeekend: null,
		day: []
	};
  constructor(private acRoute: ActivatedRoute, private userService: UserService) {
	  acRoute.params.subscribe((params) => {
		  this.routeId = params['routeId'];
		  this.userId = params['userId'];
		  if (this.routeId && this.routeId !== 'add') {
		  	this.getRoute(this.routeId);
		  }
	  });
  }

  ngOnInit() {
  }

  goBack() {
  	history.back();
  }

  getRoute(id) {
	  this.userService
		  .getRoute(id)
		  .subscribe(data => {
		  	this.route = data;
		  });
  }

  submitt(form: NgForm) {
  	// (this.routeId ? this.editRoute : this.addRoute)(form);
	  if (form.value.email === "") {
		  delete form.value.email;
	  }
	  form.value.clientId = this.userId;
    if (this.routeId && this.routeId !== 'add') {
		this.editRoute(form);
	} else {
		this.addRoute(form)
	}
  }

  editRoute(form) {
  	this.userService
		.editRoute(this.routeId, form.value)
		.subscribe(data => {
			this.goBack();
		});
  }

  addRoute(form) {
	  this.userService
		  .addRoute(form.value)
		  .subscribe(data => {
			  this.goBack();
		  });
  }
}
