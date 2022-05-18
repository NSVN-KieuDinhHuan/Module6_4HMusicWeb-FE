import {Component, OnInit} from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchName = '';

  constructor() {
  }

  ngOnInit() {
    this.getNameSearch();
  }

  getNameSearch() {
    this.searchName = $('#search').val();
  }

}
