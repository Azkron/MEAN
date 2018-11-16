import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PostsService } from '../posts.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.css']
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  post: Post = {id: '', title: '', content: ''};
  isLoading = false;
  private mode = 'create';
  private postId: string;

  constructor(public postService: PostsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId)
          .subscribe( postData => {
            this.post = {id: postData._id, title: postData.title, content: postData.content};
            this.isLoading = false;
          });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSavePost(form: NgForm) {
    if (!form.invalid) {
      // no need to isLoadign = false because we exit the component after
      this.isLoading = true;
      if (this.mode === 'create') {
        console.log(this.post);
        this.postService.addPost(this.post);
      } else {
        this.postService.updatePost(this.post);
      }
      form.resetForm();
    }
  }
}
