import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe, RecipeService, SharedService } from '../../../services';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  photo: any;
  recipe: Recipe;
  ingredientError: string = null;
  stepError: string = null;

  resizeOptions: ResizeOptions = {
    resizeMaxHeight: 600,
    resizeMaxWidth: 600
  };
  imageError: any;

  constructor(
    private router: Router,
    private recipeService: RecipeService,
    private sharedService: SharedService
  ) {
    this.recipe = new Recipe();
  }

  ngOnInit() {
  }

  submitRecipe() {
    this.recipe.photo = this.photo;
    this.recipe.brewer = this.sharedService.getUser().fullname;
    this.recipe.brewerID = this.sharedService.getUser().uid;
    this.recipeService.submitRecipe(this.recipe)
      .then(res => {
        this.router.navigate(['/dashboard/my-recipes']);
      });
  }

  addIngredient() {
    this.ingredientError = null;
    let last_ingredient = this.recipe.ingredients[this.recipe.ingredients.length - 1];
    if (last_ingredient.name == "" || last_ingredient.amount == "" || last_ingredient.type == "") {
      this.ingredientError = "Please fill out ingredient";
      return;
    }
    this.recipe.ingredients.push({
      amount: "",
      name: "",
      type: ""
    });
  }

  addStep() {
    this.stepError = null;
    let last_step = this.recipe.steps[this.recipe.steps.length - 1];
    if (last_step.name == "" || last_step.description == "" || last_step.step_temperature == "" || last_step.step_time == "" || last_step.notes == "") {
      this.stepError = "Please fill out step";
      return;
    }
    this.recipe.steps.push({
      name: "",
      description: "",
      step_temperature: "",
      step_time: "",
      notes: "",
    });
  }
  selected(imageResult: ImageResult) {
    this.photo = imageResult.resized
      && imageResult.resized.dataURL
      || imageResult.dataURL;
    this.imageError = null;
    if (imageResult.error) {
      this.imageError = "Only jpg, png, jpeg files are supported";
      return;
    }
  }
}
