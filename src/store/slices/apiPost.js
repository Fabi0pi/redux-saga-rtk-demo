import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export const postSlice = createApi({
    reducerPath: 'postSlice',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes: ["POSTS", "POST"],
    endpoints: ({ query, mutation }) => ({
        getPosts: query({
            query: () => '/posts',
            providesTags: (result) => {
                const singlePostTag = result && result.map(({ id }) => ({ type: 'POST', id }))
                const tagsIfResult = [...singlePostTag, { type: 'POSTS', id: 'LIST' }]
                return result ? tagsIfResult : [{ type: 'POSTS', id: 'LIST' }]
            }
        }),
        getPostByID: query({
            query: (id) => `/posts/${id}`,
            providesTags: (result, error, id) => [{ type: 'POST', id }]
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
            query: (data) => ({
                url: `/posts/${data.id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: (result, error, { id }) => {
                return [
                { type: 'POST', id }, 
                { type: 'POSTS', id: 'LIST' } 
            ]},
            async onQueryStarted ({ id, ...data }, { dispatch, queryFulfilled }) {
                console.log("optimistich query")
                try {
                  // Aggiornamento ottimistico
                  dispatch(
                    postSlice.util.updateQueryData('getPostByID', id, (draft) => {
                      Object.assign(draft, data);
                    })
                  );
                  await queryFulfilled;
                } catch {
                  console.log("CATCH")
                }
              }
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