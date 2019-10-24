import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Post, PostService} from "../../service/post.service";

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  id: number;

  titleFormControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(80)]);
  contentFormControl: FormControl = new FormControl('', [Validators.required]);
  formGroup: FormGroup = new FormGroup({title: this.titleFormControl, content: this.contentFormControl});
  isInProgress: boolean = false;

  private post: Post = {title: null, content: null, id: null};

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private postService: PostService) {
  }

  ngOnInit() {
  }

  savePost() {
    if (this.formGroup.valid) {
      this.post.title = this.formGroup.value.title;
      this.post.content = this.formGroup.value.content;
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
