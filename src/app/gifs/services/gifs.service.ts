import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GifsService {

  private _tagsHistory:string[]=[''];

  get tagsHistory():string[]{
    return [...this._tagsHistory];
  }
  searchTag(tag:string):void{
    if(tag.length===0){return;}
    this.organizeHistory(tag);
  }
  private organizeHistory(tag:string){
    //minusculas para realizar busqueda
    tag=tag.toLowerCase();

    //si ya existe en el array: se filtra el array por los elementos distintos al tag
    if(this._tagsHistory.includes(tag)){

      this._tagsHistory=this._tagsHistory.filter(oldTag => oldTag !== tag);
    }

    //si no existe en el array se agrega en la posicion 0
    this._tagsHistory.unshift(tag);
    //
    this._tagsHistory=this.tagsHistory.splice(0,10);
  }

}
