import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recipe-select',
  templateUrl: './recipe-select.component.html',
  styleUrls: ['./recipe-select.component.css']
})
export class RecipeSelectComponent implements OnInit {

  form: FormGroup;
  options0: Array<any> = [];
  selection: Array<string>;

  @ViewChild('preSingle') preSingle;

  constructor() { 
    let numOptions = 100;
    let opts = new Array(numOptions);

    for (let i = 0; i < numOptions; i++) {
      opts[i] = {
        value: i.toString(),
        label: '<span class="strong">Beer Type ' + (i + 1).toString() + ' - </span>' + 'Lorem Ipsum'
      };
    }

    this.options0 = opts.slice(0);
  }

  ngOnInit() {
    this.form = new FormGroup({});
    this.form.addControl('selectSingle', new FormControl(''));;
  }
  onSingleOpened() {
  }

  onSingleClosed() {
  }

  onSingleSelected(item) {
  }

  onSingleDeselected(item) {
  }

  private scrollToBottom(elem) {
    elem.scrollTop = elem.scrollHeight;
  }
}
