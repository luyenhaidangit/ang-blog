import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MaxValidator, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

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
  postForm: any;
  post: any;
  formStatus: string = "Add New";

  constructor(private categoryService:CategoriesService, private fb:FormBuilder, private postService:PostsService,private route: ActivatedRoute) {
    this.route.queryParams.subscribe(val => {
      this.postService.loadOneData(val['id']).subscribe(post => {
        this.post = post;

        console.log(this.post)
        
        this.postForm = this.fb.group({
          title: [this.post.title,[Validators.required,Validators.minLength(10)]],
          permalink: [this.post.permalink,[Validators.required]],
          excerpt: [this.post.excerpt,[Validators.required,Validators.minLength(50)]],
          category: [`${this.post.category.categoryId}-${this.post.category.category}`,[Validators.required]],
          postImg: ['',[]],
          content: [this.post.content,[]]
        })

        this.imgSrc = this.post.postImgPath;
        this.formStatus = "Edit";
      });
    })
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
      excerpt:this.postForm.value.excerpt,
      content:this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createAt: new Date()
    }
    console.log(postData)

    this.postService.uploadImage(this.selectedImg,postData);

    this.postForm.reset();

    this.imgSrc = './assets/image-not-found.png';
  }
}
