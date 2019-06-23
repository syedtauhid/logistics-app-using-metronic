// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './base/base.component';
import { ErrorPageComponent } from './content/error-page/error-page.component';
// Auth
import { AuthGuard } from '../../../core/auth';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { OverviewComponent } from '../../pages/user-details/overview/overview.component';
import {CreateContactPersonComponent} from '../../pages/user-details/contact-person/create/create.component';
import {AddEditComponent} from '../../pages/user-details/routes/add-edit/add-edit.component';

const routes: Routes = [
	{
		path: '',
		component: BaseComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: 'dashboard',
				loadChildren: 'app/views/pages/dashboard/dashboard.module#DashboardModule'
			},
			{
				path: 'user/:userId/overview',
				loadChildren: 'app/views/pages/user-details/user-details.module#UserDetailsModule'
			},
			{
				path: 'create-user',
				component: OverviewComponent
			},
			{
				path: 'user/:userId/contact-persons/add',
				component: CreateContactPersonComponent
			},
			{
				path: 'user/:userId/contact-persons/:contactPersonId',
				component: CreateContactPersonComponent
			},
			{
				path: 'user/:userId/routers/:routeId',
				component: AddEditComponent
			},
			{
				path: 'user/:userId/routers/add',
				component: AddEditComponent
			},
			{path: 'error/:type', component: ErrorPageComponent},
			{path: '', redirectTo: 'dashboard', pathMatch: 'full'},
			{path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagesRoutingModule {
}
