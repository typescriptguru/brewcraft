import { Component, OnInit, ViewChild } from '@angular/core';
import { Recipe, RecipeService, BrewService } from '../../../services';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  stylesOptions: Array<any> = [];

  recipes: Recipe[];
  availableRecipes: Recipe[];

  style: String;

  constructor(
    private recipeService: RecipeService,
  ) { }

  ngOnInit() {    
    this.recipeService.getRecipes()
      .then(res => {
        this.recipes = res.data;

        var styles = this.recipeService.getStyles(this.recipes);
        this.stylesOptions = new Array(styles.length);
        for (let i = 0; i < styles.length; i++) {
          this.stylesOptions[i] = {
            value: styles[i],
            label: '<span class="strong">Beer Type ' + (i + 1).toString() + ' - </span>' + styles[i]
          };
        }
        this.recipeService.updateRecipesSession(this.recipes);
      });
  }

  onStyleClear(item) {
    this.recipeService.updateRecipesSession(this.recipes);
  }

  onStyleSelected(item) {
    this.availableRecipes = [];
    var style = item.value;
    this.recipes.forEach(recipe => {
      if (recipe.style == style)
        this.availableRecipes.push(recipe);
    });
    this.recipeService.updateRecipesSession(this.availableRecipes);
  }

  private scrollToBottom(elem) {
    elem.scrollTop = elem.scrollHeight;
  }
}
