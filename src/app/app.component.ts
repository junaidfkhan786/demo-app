import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { NamepromptComponent } from './components/nameprompt/nameprompt.component';
import { ProductSchema } from './schema/product_schema';
import Swal from 'sweetalert2'
interface redeem {
  id: number,
  points: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'demo';
  redeemdata: redeem[] = []
  products: ProductSchema[] = []
  user = {
    name: '',
    coins: 0
  }
  constructor(
    private httpclient: HttpClient,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    var dialogref = this.dialog.open(NamepromptComponent, {
      disableClose: true,
      data: this.user
    })
    dialogref.afterClosed().subscribe((result) => {
      if (result) {
        this.user.name = result.name
        this.user.coins = result.points
      }
    })
    this.loadapi().subscribe((data) => {
      this.products = data
    })
  }

  loadapi(): Observable<ProductSchema[]> {
    return this.httpclient.get<ProductSchema[]>('https://demo7447528.mockable.io/product')
  }
  checkIfPresent(id: number, point: number) {
    if (this.redeemdata.some(data => data.id == id && data.points == point)) {
      return true
    } else {
      return false
    }
  }
  redeem(id: number, points: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Redeem!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.user.coins >= points) {
          this.user.coins = this.user.coins - points
          this.redeemdata.push({ id: id, points: points })
        } else {
          Swal.fire('Dont Have Enough Coints To Redeem','','info')
        }
      }
    })
  }

}
