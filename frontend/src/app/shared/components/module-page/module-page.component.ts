import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cwl-module-page',
  templateUrl: './module-page.component.html',
  styleUrls: ['./module-page.component.scss'],
})
export class ModulePageComponent implements OnInit {
  @Input() header: string = '';

  constructor() {}

  ngOnInit(): void {}
}
