
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPostsUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  notify() {
    this.postsUpdated.next([...this.posts]);
  }

  getPost(id: string) {
    return this.http.get<{_id: string, title: string, content: string}>('http://localhost:3000/api/posts/' + id);
  }

  getPosts() {
    this.http
      .get<{message: string, posts: any}>('http://localhost:3000/api/posts')
      .pipe(map((postData) => {
        return postData.posts.map(rawPost => {
            return {
              id: rawPost._id,
              title: rawPost.title,
              content: rawPost.content
            };
        });
      }))
      .subscribe((posts) => {
        this.posts = posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  addPost(post: Post) {
    this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
      .subscribe((res) => {
        post.id = res.postId;
        this.posts.push(post);
        this.notify();
      });
  }

  updatePost(post: Post) {
    this.http.put('http://localhost:3000/api/posts/' + post.id, post)
      .subscribe(res => {
        console.log(res);
        const postIndex = this.posts.findIndex(p => p.id === post.id);
        this.posts[postIndex] = post;
        this.notify();
      });
  }

  deletePost(id: string) {
    this.http.delete('http://localhost:3000/api/posts/' + id)
      .subscribe(() => {
        this.posts = this.posts.filter(post => post.id !== id);
        this.notify();
      });
  }
}
