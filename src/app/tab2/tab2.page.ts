import { Category } from './../models/category';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  categories: Category[];

  constructor(
    private menu: MenuController,
    private categoriesService: CategoriesService
  ) {}

  async openMenu() {
    await this.menu.open();
  }

  ngOnInit() {
    this.categoriesService.getCategories().subscribe((res: Category[]) => {
      // console.log(res);
      this.categories = res['hydra:member'];
    })
  }

}
