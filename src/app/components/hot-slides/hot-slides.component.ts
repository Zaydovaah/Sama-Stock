import { environment } from './../../../environments/environment';
import { Product } from './../../models/product';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hot-slides',
  templateUrl: './hot-slides.component.html',
  styleUrls: ['./hot-slides.component.scss'],
})
export class HotSlidesComponent implements OnInit {

  featuredProducts: Product[];
  thumbnailUrl = `${environment.baseUrl}/uploads/images/thumbnails`;
  // Optional parameters to pass to the swiper instance.
  // See http://idangero.us/swiper/api/ for valid options.
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    autoplay: {
      delay: 5000,
    },
  };

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.productsService.getFeaturedProducts().subscribe((res: Product[]) => {
      // console.log(res);
      this.featuredProducts = res['hydra:member'];
    })
  }

}
