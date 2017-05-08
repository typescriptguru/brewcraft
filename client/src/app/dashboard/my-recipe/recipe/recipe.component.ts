import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService, Recipe, BrewService } from '../../../services';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  uid: string;
  private sub: any;
  recipe: Recipe;
  review: string = "";
  reviews: Array<any> = [];

  reviewLimit: number = 2;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private brewService: BrewService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.uid = params['uid'];
      this.recipeService.getRecipe(this.uid)
        .then(res => {
          this.recipe = res.data[0];
          this.getReviews();
          setTimeout(() => {
            $('.vertical-bar').height($('.detail').height());
          }, 200);
        });
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  submitReview() {
    this.recipeService.submitReview(this.review, this.recipe)
      .then(res => {
        this.review = '';
        this.getReviews();
      });
  }

  getReviews() {
    this.recipeService.getReviews(this.recipe)
      .then(res => {
        this.reviews = res;
        console.log(this.reviews);
      });
  }

  loadMoreReviews() {
    if(this.reviewLimit >= this.reviews.length )
      return;
    this.reviewLimit += 2;
  }
}