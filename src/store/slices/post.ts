import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreatePostRequest, UpdatePostRequest, GetPostsResponse, GetPostByIDResponse, CreatePostResponse, UpdatePostResponse, PostTag } from '../model/post';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const postSlice = createApi({
    reducerPath: 'post',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes: ['POSTS', 'POST'] as const,
    endpoints: (builder) => ({
        getPosts: builder.query<GetPostsResponse, void>({
            query: () => '/posts',
            providesTags: (result): PostTag[] => {
                if (!result) {
                    return [{ type: 'POSTS', id: 'LIST' }];
                }
                return [
                    ...result.map(({ id }) => ({ type: 'POST', id } as PostTag)),
                    { type: 'POSTS', id: 'LIST' }
                ];
            }
        }),
        getPostByID: builder.query<GetPostByIDResponse, number>({
            query: (id) => `/posts/${id}`,
            providesTags: (result, error, id) => [{ type: 'POST', id }]
        }),
        createPost: builder.mutation<CreatePostResponse, CreatePostRequest>({
            query: (body) => ({
                url: '/posts',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'POSTS', id: 'LIST' }]
        }),
        updatePost: builder.mutation<UpdatePostResponse, UpdatePostRequest>({
            query: (data) => ({
                url: `/posts/${data.id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'POST', id },
                { type: 'POSTS', id: 'LIST' }
            ],
            async onQueryStarted({ id, ...data }, { dispatch, queryFulfilled }) {
                try {
                    dispatch(
                        postSlice.util.updateQueryData('getPostByID', id, (draft) => {
                            Object.assign(draft, data);
                        })
                    );
                    await queryFulfilled;
                } catch {
                    console.error('Optimistic update failed');
                }
            }
        })
    })
});

export const {
    useCreatePostMutation,
    useGetPostByIDQuery,
    useGetPostsQuery,
    useUpdatePostMutation,
    useLazyGetPostByIDQuery,
    useLazyGetPostsQuery
} = postSlice;

export const postSlicePath = postSlice.reducerPath;
export const postReducer = postSlice.reducer;
export const postMiddleware = postSlice.middleware;
