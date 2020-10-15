import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Medicine } from '../models/medicine';

@Component({
  selector: 'app-medicine-record',
  templateUrl: './medicine-record.component.html',
  styleUrls: ['./medicine-record.component.scss']
})
export class MedicineRecordComponent implements OnInit {
public record: Medicine;
  constructor(private http: HttpClient,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.http.get(
          `https://localhost:44313/api/MedicineTracking/${params.order}`
        ).subscribe((res: Medicine)=> {
          this.record = res;
          
        });
      }
    );
  }

}
