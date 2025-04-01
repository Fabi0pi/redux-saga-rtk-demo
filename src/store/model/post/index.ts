export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }
  
  export type CreatePostRequest = Omit<Post, 'id'>;
  
  export type UpdatePostRequest = Partial<Post> & { id: number };
  
  export interface PostTag {
    type: 'POST' | 'POSTS';
    id?: number | 'LIST';
  }
  
  export interface GetPostsResponse extends Array<Post> {}
  
  export interface GetPostByIDResponse extends Post {}
  
  export type CreatePostResponse = Post;
  
  export type UpdatePostResponse = Post;
  