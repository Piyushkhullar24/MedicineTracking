import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import * as moment from 'moment';

@Component({
  selector: 'app-medicine-home',
  templateUrl: './medicine-home.component.html',
  styleUrls: ['./medicine-home.component.scss']
})
export class MedicineHomeComponent implements OnInit {
  @ViewChild("agGrid", { static: false }) agGrid: AgGridAngular;
  title = "medicine-store";
  public overlayNoRowsTemplate;
  public searchValue;
  private gridApi;
  rowData: any;
  columnDefs = [
    {
      headerName: "FullName",
      field: "fullName",
      sortable: true,
      filter: true,
      checkboxSelection: true,
    },
    { headerName: "Brand", field: "brand", sortable: true, filter: false },
    { headerName: "Price", field: "price", sortable: true, filter: false },
    {
      headerName: "Quantity", field: "quantity", sortable: true, filter: true,
      cellStyle: (params) => {
        if (params.value < 10) {
          return { backgroundColor: '#FFFF00' }
        }
      },
      cellClass: (params) => { return this.getColor(params); }
    },
    {
      headerName: "ExpiryDate", field: "expiryDate", sortable: true, filter: false,
      valueFormatter: function (params) {
        return moment(params.value).format("DD/MM/YYYY");
    },
      cellStyle: (params) => {
        var today = new Date();
        if (params.value <new Date().setDate(today.getDate()-30)) {
          return { backgroundColor: '#FF0000' }
        }
      }
    },
  ];

  /**
   *
   */
  constructor(private http: HttpClient,
    private router: Router) { }

  private getColor(params: any) {
    return (params.value === 0 ? 'my-class-1' : 'my-class-2');
  }

  ngOnInit() {
    this.http.get(
      "https://localhost:44313/api/MedicineTracking"
    ).subscribe(res => {
      this.rowData = res;
    });
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);

    const selectedDataStringPresentation = selectedData
      .map((node) => node.make + " " + node.model)
      .join(", ");
    this.router.navigate(["medicine-record"], {
      queryParams: { order: selectedData[0].fullName }
    });
  }

  OnGridReady(params) {
    this.gridApi = params.api;
  }

  quickSearch() {
    this.gridApi.setQuickFilter(this.searchValue);
  }
}
