import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export const postSlice = createApi({
    reducerPath: 'postSlice',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    endpoints: ({query, mutation}) => ({
        getPosts: query({
            query: () => '/posts',
            providesTags: (result) => {
                const singlePostTag = result.map(({id})=> ({ type: 'POST', id }))
                const tagsIfResult = [...singlePostTag, {type: 'POSTS', id: 'LIST'}]
                return result ? tagsIfResult : [{type: 'POSTS', id: 'LIST'}]
            }
        }),
        getPostByID: query({
            query: (id) => `/posts/${id}`,
            providesTags: (result, error, id) => [{type: 'POST', id}]
        }),
        createPost: mutation({
            query: (body) => ({
                url: '/posts',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'POSTS', id: 'LIST' }]
        }),
        updatePost: mutation({
            query: ({id, ...data}) => ({
                url: `/posts/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: (result, error, { id }) => [{type: 'POST', id}]
        })
    })
})

export const {
    useCreatePostMutation,
    useGetPostByIDQuery,
    useGetPostsQuery,
    useUpdatePostMutation,
    useLazyGetPostByIDQuery,
    useLazyGetPostsQuery
} = postSlice