import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Post, PostService} from "../../service/post.service";
import {Observable} from "rxjs";
import {Category, CategoryService} from "../../service/category.service";

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  id: number;

  titleFormControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(80)]);
  contentFormControl: FormControl = new FormControl('', [Validators.required]);
  categoryFormControl: FormControl = new FormControl('', [Validators.required]);

  formGroup: FormGroup = new FormGroup({title: this.titleFormControl, content: this.contentFormControl, category: this.categoryFormControl});
  isInProgress: boolean = false;

  private post: Post = {title: null, content: null, id: null};
  categories: Observable<Category[]>;

  constructor(private router: Router, private route: ActivatedRoute, private postService: PostService, private categoryService: CategoryService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && !isNaN(Number(id))) {
      this.id = Number(id);
      this.postService.getPostById(Number(id)).subscribe(
        value => {
          this.post = value;
          this.titleFormControl.setValue(value.title);
          this.contentFormControl.setValue(value.content);
          this.categoryFormControl.setValue(value.category);
        },
        () => this.router.navigateByUrl('/home')
      );
    } else if (id && isNaN(Number(id))) {
      this.router.navigateByUrl('/home');
    }
    this.categories = this.categoryService.getAllCategories();
  }

  savePost() {
    if (this.formGroup.valid) {
      this.post.title = this.formGroup.value.title;
      this.post.content = this.formGroup.value.content;
      this.post.category = this.formGroup.value.category;
      this.isInProgress = true;
      if (this.id) {
        this.postService.updatePost(this.post).subscribe(() => {
          this.router.navigateByUrl('/home')
        }, () => {
          this.isInProgress = false;
          alert('Something went wrong. Please try again.')
        });
      } else {
        this.postService.createPost(this.post).subscribe(() => {
          this.router.navigateByUrl('/home')
        }, () => {
          this.isInProgress = false;
          alert('Something went wrong. Please try again.')
        });
      }
    }
  }
}
