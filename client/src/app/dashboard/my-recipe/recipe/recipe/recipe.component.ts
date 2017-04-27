import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService, Recipe, BrewService } from '../../../../services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  uid: string;
  private sub: any;
  recipe: Recipe;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private brewService: BrewService) { }

  ngOnInit() {
    this.recipe = new Recipe();
    this.sub = this.route.params.subscribe(params => {
      this.uid = params['uid'];
      this.recipeService.getRecipe(this.uid)
        .then(res => this.recipe = res.data[0]);
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  brew() {
    this.brewService.setRecipe(this.recipe);
    this.router.navigate(['/dashboard/brew']);
  }
}
