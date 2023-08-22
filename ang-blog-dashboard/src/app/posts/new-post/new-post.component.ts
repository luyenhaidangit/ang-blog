import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MaxValidator, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post';
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
  postForm: FormGroup;

  constructor(private categoryService:CategoriesService, private fb:FormBuilder) {
    this.postForm = this.fb.group({
      title: ['',[Validators.required,Validators.minLength(10)]],
      permalink: ['',[Validators.required]],
      excerpt: ['',[Validators.required,Validators.minLength(50)]],
      category: ['',[Validators.required]],
      postImg: ['',[]],
      content: ['',[]]
    })

    console.log(this.postForm.controls);
  }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe(val=>{
      this.categories = val;
    });
  }

  get fc(){
    return this.postForm.controls;
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

  onSubmit(){
    let splitted = this.postForm.value.category.split('-');

    const postData:Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: splitted[0],
        category: splitted[1]
      },
      postImgPath: '',
      exerpt:this.postForm.value.excerpt,
      content:this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createAt: new Date()
    }
    console.log(postData)
  }
}
