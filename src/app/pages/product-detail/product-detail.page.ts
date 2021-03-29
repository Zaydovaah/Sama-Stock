import { environment } from './../../../environments/environment';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  id: any;
  product: Product;
  thumbnailUrl = `${environment.baseUrl}/uploads/images/thumbnails`;
  productImageUrl = `${environment.baseUrl}/uploads/images/products`;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    this.productsService.getProduct(this.id).subscribe((res: Product) => {
      console.log(res);
      this.product = res;
    });
  }

}
