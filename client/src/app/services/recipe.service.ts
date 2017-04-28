import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CONFIG } from '../common/config';

@Injectable()
export class RecipeService {

  constructor(
    private http: Http
  ) { }

  submitRecipe(recipe: Recipe):Promise<any> {
    var url = CONFIG.SERVER_URL + '/recipes/submit';
    return this.http.post(url, recipe)
      .toPromise()
      .then(res => res.json());
  }

  getRecipes() {
    var url = CONFIG.SERVER_URL + '/recipes/get';
    return this.http.get(url)
      .toPromise()
      .then(res => res.json());
  }

  getRecipe(uid: string) {
    var url = CONFIG.SERVER_URL + '/recipes/get/' + uid;
    return this.http.get(url)
      .toPromise()
      .then(res => res.json());    
  }

  searchRecipes(keyword) {
    var url = CONFIG.SERVER_URL + '/recipes/search';
    return this.http.post(url, {
      keyword: keyword
    }).toPromise().then(res => res.json());
  }
}


export class Recipe {
  photo: string;
  name: string = "";
  style: string = "";
  type: string = "";
  batch_size: string = "";
  boil_size: string = "";
  boil_time: string = "";
  end_of_boil_vol: string = "";
  final_bottling_vol: string = "";
  fermentation: string = "";
  created_date: Date = new Date();
  brewer: string = "";
  brewerID: string = "";
  assist_brewer: string = "";
  equipment: string = "";
  efficiency: string = "";
  mash_efficiency: string = "";
  taste_rating: string = "";
  note: string = "";
  taste_note: string = "";
  community_rating: string = "";
  gravity_alcohol_content_color: Object = {
    est_original_gravity: "",
    est_final_gravity: "",
    est_alcohol_by_vol: "",
    measured_original_gravity: "",
    measured_final_gravity: "",
    actual_alcohol_by_vol: "",
    bitterness: "",
    color: "",
    calories: ""
  };
  mash_profile: Object = {
    mash_name: "",
    total_grain_weight: "",
    sparge_water: "",
    grain_temperature: "",
    sparge_temperature: "",
    tun_temperature: "",
    adjust_temperature_for_equipment: true,
    targe_mash_PH: "",
    estimated_mash_PH: "",
    mash_acid_addition: "",
    measured_mash_PH: "",
    sparge_acid_addition: "",
  };
  ingredients: Array<any> = [
    {
      amount: "",
      name: "",
      type: ""
    }
  ];
  carbonation_and_storage: Object = {
    carbonation_type: "",
    volumes_of_CO2: "",
    pressure_weight: "",
    carbination_est: "",
    bottling_temperature: "",
    carbination: "",
    fermintation: "",
    age_for: "",
    fermenter: "",
    storage_temperature: ""
  };
  steps: Array<any> = [
    {
      name: "",
      description: "",
      step_temperature: "",
      step_time: 0,
      notes: "",
    }
  ]
}
