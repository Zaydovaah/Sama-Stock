import { environment } from './../../../environments/environment';
import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {

  products: Product[];

  thumbnailUrl = `${environment.baseUrl}/uploads/images/thumbnails`;

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

  filterProducts(searchTerm) {
    return this.products.filter(product => {
      return product.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

}
