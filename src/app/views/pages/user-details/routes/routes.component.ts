import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent implements OnInit {
  displayedColumns = ['routeNumber', 'description', 'clientPrice', 'priceBasis', 'contractor', 'actions'];
  userId = '';
  routes = [];
	@Input() set id(id: string) {
		if (id) {
			this.userId = id;
			this.getRoutes(id);
		}
	}
  constructor(private userService: UserService,
			  public router: Router) { }

  ngOnInit() {

  }

  getRoutes(id) {
  	this.userService.getRoutes(id)
		.subscribe(data => {
			this.routes = data;
		});
  }

	openDialog() {
		this.router.navigate([`/user/${this.userId}/routers/add`]);
	}

	goToEditRoutes(id) {
		this.router.navigate([`/user/${this.userId}/routers/${id}`]);
	}

	deleteRoute(id) {
		this.userService.deleteRoute(id)
			.subscribe(data => {
				this.routes = [...this.routes.filter(route => route._id !== id)];
			});
	}
}
