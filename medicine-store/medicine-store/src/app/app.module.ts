import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from '@angular/router';
import { AgGridModule } from "ag-grid-angular";
import { AddMedicineHomeComponent } from './add-medicine-home/add-medicine-home.component';
import { AppComponent } from "./app.component";
import { MedicineHomeComponent } from './medicine-home/medicine-home.component';
import { MedicineRecordComponent } from './medicine-record/medicine-record.component';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [
  { path: "medicine-record", component: MedicineRecordComponent },
  { path: "add-medicine-record", component: AddMedicineHomeComponent },
  { path: "", component: MedicineHomeComponent },
  {path: '**', component: NotFoundComponent }
];
@NgModule({
  declarations: [AppComponent, MedicineRecordComponent, MedicineHomeComponent, AddMedicineHomeComponent, NotFoundComponent],
  imports: [BrowserModule, AgGridModule.withComponents([]), HttpClientModule, FormsModule, ReactiveFormsModule,
  RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
