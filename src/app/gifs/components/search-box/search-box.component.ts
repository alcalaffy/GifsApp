import { Component, ElementRef, ViewChild} from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})

export class SearchBoxComponent {

  constructor(private gifService:GifsService){
  }

@ViewChild('inputGif')
public tagInput!:ElementRef<HTMLInputElement>;

  searchTag():void{
    let newTag=this.tagInput.nativeElement.value;
    this.gifService.searchTag(newTag);
    this.tagInput.nativeElement.value='';
  }
}
