// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// NgBootstrap
import {NgbModule, NgbProgressbarModule} from '@ng-bootstrap/ng-bootstrap';
// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
// import {HttpLoaderFactory} from '../../../app.module';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {
	MatCardModule,
	MatButtonModule,
	MatDialogModule,
	MatMenuModule,
	MatInputModule,
	MatTableModule,
	MatAutocompleteModule,
	MatRadioModule,
	MatNativeDateModule,
	MatProgressBarModule,
	MatDatepickerModule,
	MatPaginatorModule,
	MatSortModule,
	MatCheckboxModule,
	MatProgressSpinnerModule,
	MatSnackBarModule, MatTooltipModule
} from '@angular/material';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { UserDetailsComponent } from './user-details.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { OverviewComponent } from './overview/overview.component';
import { BasicDataComponent } from './basic-data/basic-data.component';
import { CommentsComponent } from './comments/comments.component';
import { ContactPersonComponent } from './contact-person/contact-person.component';
import { RoutesComponent } from './routes/routes.component';
import { UserService } from '../../../services/user.service';
import {MatSelectModule} from '@angular/material/select';
import {NgxPermissionsModule} from 'ngx-permissions';
import {environment} from '../../../../environments/environment';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {FakeApiService} from '../../../core/_base/layout';
import {CreateContactPersonComponent} from './contact-person/create/create.component';

import { AddEditComponent } from './routes/add-edit/add-edit.component';
export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http);
}
@NgModule({
	imports: [
		CommonModule,
		PartialsModule,
		CoreModule,
		MatCardModule,
		MatIconModule,
		FormsModule,
		MatSelectModule,
		HttpClientModule,
		MatTabsModule,
		MatDialogModule,
		CommonModule,
		HttpClientModule,
		PartialsModule,
		NgxPermissionsModule.forChild(),
		FormsModule,
		ReactiveFormsModule,
		TranslateModule.forChild(),
		MatButtonModule,
		MatMenuModule,
		MatSelectModule,
		MatInputModule,
		MatTableModule,
		MatAutocompleteModule,
		MatRadioModule,
		MatIconModule,
		MatNativeDateModule,
		MatProgressBarModule,
		MatDatepickerModule,
		MatCardModule,
		MatPaginatorModule,
		MatSortModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatTabsModule,
		MatTooltipModule,
		NgbProgressbarModule,
		environment.isMockEnabled ? HttpClientInMemoryWebApiModule.forFeature(FakeApiService, {
			passThruUnknownUrl: true,
			dataEncapsulation: false
		}) : [],
		TranslateModule.forRoot({
			loader: {provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient]}
		}),
		NgbModule,
		FormsModule,
		RouterModule.forChild([
			{
				path: '',
				component: UserDetailsComponent
			},
		])
	],
	providers: [UserService],
	declarations: [
		UserDetailsComponent,
		BasicDataComponent,
		CommentsComponent,
		OverviewComponent,
		ContactPersonComponent,
		RoutesComponent,
		CreateContactPersonComponent,
		AddEditComponent
	], exports: [UserDetailsComponent]
})
export class UserDetailsModule {
}
