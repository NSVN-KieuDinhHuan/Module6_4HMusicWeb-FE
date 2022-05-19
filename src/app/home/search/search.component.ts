import {Component, OnInit} from '@angular/core';
import {SearchItem} from '../../model/search-item';
import {SearchService} from '../../service/search/search.service';
import {ActivatedRoute} from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchItem: SearchItem = {};

  constructor(private searchService: SearchService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const q = paramMap.get('q');
      this.getSearchItem(q);
    });
  }

  ngOnInit() {
  }

  getSearchItem(q) {
    this.searchService.getSearchItem(q).subscribe((searchItem) => {
      this.searchItem = searchItem;
    });
  }

}
