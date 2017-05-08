import { Component, OnInit } from '@angular/core';
import { Recipe, RecipeService } from '../../../services';
import {Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  recipes: Recipe[];

  constructor(
    private recipeService: RecipeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.recipeService.getRecipes().then(res => {
      this.recipes = res.data;
    })
    this.recipeService.recipesListner().subscribe(res => {
      this.recipes = res;
    })
  }

  gotoRecipe(recipe: Recipe) {
    console.log(recipe)
    this.router.navigate(['/my-recipes/' + recipe.uid])
  }

  shareRecipe(recipe: Recipe) {
    
  }
}
