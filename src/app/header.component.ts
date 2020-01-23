import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { debugOutputAstAsTypeScript } from '@angular/compiler';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() featureSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onSelectFeature(feature: string) {
    this.featureSelected.emit(feature);
  }

}
