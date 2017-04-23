import { Component, OnInit } from '@angular/core';
import { Recipe, RecipeService } from '../../services';

@Component({
  selector: 'app-my-recipe',
  templateUrl: './my-recipe.component.html',
  styleUrls: ['./my-recipe.component.css']
})
export class MyRecipeComponent implements OnInit {

  recipes: Recipe[];

  constructor(
    private recipeService: RecipeService,
  ) {
  }

  ngOnInit() {
    this.recipeService.getRecipes()
      .then(res => {
        this.recipes = res.data;
        console.log(this.recipes);
      });
  }

  getTimeDiff(date: Date) {
    var today = new Date();
    var diffMs = (today.getTime() - new Date(date).getTime()); // milliseconds between now & Christmas

    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    if (diffDays != 0)
      return diffDays + ' days ago';
    if (diffHrs != 0)
      return diffHrs + ' hours ago';
    if (diffMins != 0)
      return diffMins + ' mins ago';
    else
      return Math.floor(diffMs / 1000) + ' secs ago';
  }
}
