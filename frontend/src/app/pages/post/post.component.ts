import {Component, OnInit} from '@angular/core';
import {Post, PostService} from "../../service/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Comment} from "../../shared/comment/comment.component";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post: Post;


  comments: Comment[] = [{
    id: 1,
    post: null,
    user: {
      username: 'test-user',
      email: 'test@local',
      rights: []
    },
    children: [
      {
        id: 2,
        post: null,
        user: {
          username: 'test-user2',
          email: 'test@local',
          rights: []
        },
        children: [
          {
            id: 1,
            post: null,
            user: {
              username: 'test-user',
              email: 'test@local',
              rights: []
            },
            children: [
              {
                id: 2,
                post: null,
                user: {
                  username: 'test-user2',
                  email: 'test@local',
                  rights: []
                },
                comment: 'This is my very important answer',
                timestamp: '2019-12-31T23:56:12'
              }
            ],
            comment: 'This is my very important comment',
            timestamp: '2019-12-31T23:55:12'
          }
        ],
        comment: 'This is my very important answer',
        timestamp: '2019-12-31T23:56:12'
      }
    ],
    comment: 'This is my very important comment',
    timestamp: '2019-12-31T23:55:12'
  },
    {
      id: 1,
      post: null,
      user: {
        username: 'test-user',
        email: 'test@local',
        rights: []
      },
      children: [
        {
          id: 2,
          post: null,
          user: {
            username: 'test-user2',
            email: 'test@local',
            rights: []
          },
          children: [
            {
              id: 1,
              post: null,
              user: {
                username: 'test-user',
                email: 'test@local',
                rights: []
              },
              children: [
                {
                  id: 2,
                  post: null,
                  user: {
                    username: 'test-user2',
                    email: 'test@local',
                    rights: []
                  },
                  comment: 'This is my very important answer',
                  timestamp: '2019-12-31T23:56:12'
                }
              ],
              comment: 'This is my very important comment',
              timestamp: '2019-12-31T23:55:12'
            }
          ],
          comment: 'This is my very important answer',
          timestamp: '2019-12-31T23:56:12'
        }
      ],
      comment: 'This is my very important comment',
      timestamp: '2019-12-31T23:55:12'
    }];

  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && !isNaN(Number(id))) {
      this.postService.getPostById(Number(id)).subscribe(
        value => this.post = value,
        () => this.router.navigateByUrl('/home')
      );
    } else {
      this.router.navigateByUrl('/home');
    }
  }
}
