import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit{
  permalink:string = '';
  imgSrc:any = './assets/image-not-found.png';
  selectedImg:any;
  categories: any[] = [];

  constructor(private categoryService:CategoriesService) {}

  ngOnInit(): void {
    this.categoryService.loadData().subscribe(val=>{
      this.categories = val;
    });
  }

  onTitleChanged($event:any){
    console.log($event);
    const title = $event.target.value;

    this.permalink = title.replace(/\s/g,'-');
  }

  showPreview($event:any){
    const reader = new FileReader();
    reader.onload = (e) =>{
      console.log(e);
      this.imgSrc = e.target?.result;
    }

    reader.readAsDataURL($event?.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }
}
