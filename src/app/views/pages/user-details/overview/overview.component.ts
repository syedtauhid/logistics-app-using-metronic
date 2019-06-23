import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { NgForm } from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../../../services/lang.service';

@Component({
  selector: 'kt-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
	responsibleUsers = [
		{_id: "5d0a5033e8f7e85a18b0845a", name: "Jone", number: "6546578", phone: "(541) 789-3890"},
		{_id: "5d0a5033e8f7e85a18b08459", name: "Sem", number: "798546241", phone: "(541) 958-5810"},
		{_id: "5d0a5033e8f7e85a18b08459", name: "Sindy", number: "7874267", phone: "(541) 498-3058"},
		{_id: "5d0a5033e8f7e85a18b08459", name: "Vahe", number: "5678786", phone: "(541) 553-3010"},
		{_id: "5d0a5033e8f7e85a18b08459", name: "Karen", number: "8575785", phone: "(541) 654-3810"},
	];
	public _user: any = {
		alternativeInvoiceRecipientName: "",
		alternativeInvoiceRecipientNumber: "",
		bank: "",
		bic: "",
		billedFromDate: "",
		billedToDate: "",
		billingCycle: "",
		cancellation: "",
		clientNumber: null,
		comments: "",
		contract: " ",
		contractEnd: "",
		contractStart: "",
		createdAt: "",
		creditorNumber: "",
		currency: "",
		email: "",
		fax: "",
		iban: "",
		name1: "",
		name2: "",
		payingCycle: "",
		phone1: "",
		phone2: "",
		responsibleName: "",
		responsibleNumber: "",
		responsiblePerson: this.responsibleUsers,
		state: "",
		street: "",
		taxNumber: "",
		taxNumber2: "",
		taxSubject: "",
		zipCodeOrCity: "",
		_id: ""
	};
	emptyResponsibleUsers = [];

	get user(): any {
		return this._user;
	}
	@Input('ifCreate') ifCreate = true;
	@Input() set user(user: any) {
		if (user) {
			this._user = user;
			if (user.responsiblePerson && !user.responsiblePerson.length) {
				this._user.responsiblePerson = this.responsibleUsers;
			}
		}
	}
	@ViewChild('createClientForm') public createClientForm;

	constructor(private route: ActivatedRoute,
				public router: Router,
				private userService: UserService,
				private translate: TranslateService,
				private languageService: LanguageService) {
		localStorage.setItem('lang', 'en');

		this.languageService.data.subscribe(data => {
			if (data) {
				translate.setDefaultLang(`${data}`);
			}
		});
	}

  ngOnInit() {
  }
  submit(form: NgForm) {
	  if (form.value.email === "") {
		delete form.value.email;
	  }
	  if (this.ifCreate) {
	  	this.saveClient(form);
	  } else {
		  this.editClient(form);
	  }
  }

  saveClient(form: NgForm) {
	  form.value.responsiblePerson = this.emptyResponsibleUsers;
	  this.userService.createUser(form.value)
		  .subscribe(data => {
			  this.router.navigate([`dashboard`]);
		  });

  }

  editClient(form) {
	  form.value.responsiblePerson = this.responsibleUsers;
		  this.userService.editUser(this._user._id, form.value)
			  .subscribe(data => {
				  this.router.navigate([`dashboard`]);
			  });

  }
}
