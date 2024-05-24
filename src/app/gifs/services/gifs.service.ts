import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';

@Injectable({providedIn: 'root'})
export class GifsService {

  constructor(private http:HttpClient){
    this.loadLocalStorage();
  }
  private _tagsHistory:string[]=[];
  private apiKey:string='Lzaje5s143Hq3d2FAQw0Ae9NEtdcUGFB';
  private serviceUrl:string='https://api.giphy.com/v1/gifs';
  public gifsList:Gif[]=[];
  get tagsHistory():string[]{
    return [...this._tagsHistory];
  }

  searchTag(tag:string):void{
    if(tag.length===0){return;}
    this.organizeHistory(tag);

    const params=new HttpParams()
      .set('api_key',this.apiKey)
      .set('limit','10')
      .set('q',tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
      .subscribe(resp=>{
        this.gifsList=resp.data;
      })
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

    //corta el array desde el principio hasta la posicion numero 10
    //de esta forma limita el dom a 10 elementos
    //se iran removiendo los ultimos elementos del array ya que se inserta en la posicion 0
    this._tagsHistory=this.tagsHistory.splice(0,10);

    //guardamos el array en el localStorage usando stringify
    this.saveLocalStorage();
  }
  private saveLocalStorage():void{
    localStorage.setItem('history',JSON.stringify(this._tagsHistory));
  }
  private loadLocalStorage():void{
    if(!localStorage.getItem('history')){return}
    this._tagsHistory=JSON.parse(localStorage.getItem('history')!);
    if(this._tagsHistory.length===0){
      return;
    }
    this.searchTag(this._tagsHistory[0]);
  }
}
