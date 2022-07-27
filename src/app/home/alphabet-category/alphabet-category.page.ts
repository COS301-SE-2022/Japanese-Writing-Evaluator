import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alphabet-category',
  templateUrl: './alphabet-category.page.html',
  styleUrls: ['./alphabet-category.page.scss'],
})
export class AlphabetCategoryPage implements OnInit {

  category: string;
  constructor(private route: ActivatedRoute ) { }

  ngOnInit() {
    this.category = this.route.snapshot.queryParamMap.get('category');
    console.log('category:' + this.category);
  }

}
