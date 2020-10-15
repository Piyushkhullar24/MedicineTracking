import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Medicine } from '../models/medicine';

@Component({
  selector: 'app-add-medicine-home',
  templateUrl: './add-medicine-home.component.html',
  styleUrls: ['./add-medicine-home.component.scss']
})
export class AddMedicineHomeComponent implements OnInit {
  public isSaved: boolean;
  public error: boolean;
  form = new FormGroup({
    fullName: new FormControl(''),
    brand: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl(''),
    expiryDate: new FormControl(''),
  });

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onSubmit() {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    // TODO: Use EventEmitter with form value
    this.http.post<Medicine>(
      `https://localhost:44313/api/MedicineTracking`,
      JSON.stringify(this.form.value),
      { headers, observe: "response" }
    ).subscribe((res: any) => {
      if (res.status = 200) {
        setTimeout(() => {
          this.isSaved = false;
        }, 5000);
        this.isSaved = true;
      } else {
        setTimeout(() => {
          this.error = false;
        }, 5000);
        this.error = true;
      }

    });
  }
}
