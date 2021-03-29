import { environment } from './../../../environments/environment';
import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {

  products: Product[];
  thumbnailUrl = `${environment.baseUrl}/uploads/images/thumbnails`;
  filterTerm: string;

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getProducts().subscribe((res: Product[]) => {
      console.log(res);
      this.products = res['hydra:member'];
    })
  }

}
