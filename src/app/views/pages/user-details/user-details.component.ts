// Angular
import {Component, OnInit, ViewChild} from '@angular/core';
// Lodash
import { shuffle } from 'lodash';
// Services
import { LayoutConfigService } from '../../../core/_base/layout';
// Widgets model
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../../services/lang.service';
import {UserService} from '../../../services/user.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
	selector: 'user-details',
	templateUrl: './user-details.component.html',
	styleUrls: ['user-details.component.scss'],
})
export class UserDetailsComponent {
	userId = '';
	user: any;
	saved = false;
	userComments: string;
	@ViewChild('createClient') public createClient;
	constructor(private layoutConfigService: LayoutConfigService,
				private translate: TranslateService,
				private route: ActivatedRoute,
				private router: Router,
				private languageService: LanguageService,
				private userService: UserService) {
		localStorage.setItem('lang', 'en');

		this.languageService.data.subscribe(data => {
			if (data) {
				translate.setDefaultLang(`${data}`);
			}
		});

		this.route.params.subscribe((params) => {
			this.userId = params['userId'];
			this.getUser(this.userId);
		});
	}

	getUser(id) {
		this.userService.getUser(id)
			.subscribe(data => {
				if(data) {
					this.user = data;
					this.userComments = data.comments;
				}
			});
	}
	commentsChanged(e) {
		this.user.comments = e.comments;
		this.userService.editUser(this.userId, this.user)
			.subscribe(data => {
				this.saved = true;
				setTimeout(() => {
					this.saved = false;
				}, 2000);
			});

	}

}
