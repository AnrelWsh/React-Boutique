// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const productAPI = createApi({
  reducerPath: 'productAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://iim.etherial.fr' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `products`,
      providesTags: ["products"] //on set tag pour product
    }),
    getComments: builder.query({
        query: (id) => {
            return `products/${id}/comments`;
        },
        providesTags: ["comments"]
    }),
/*    createProduct: builder.mutation({
        query: (data) => ({
            url: '/products',
            method: 'POST',
            body: data
        }),
        invalidatesTags: ["products"] //on valide tag
    }),*/
    createComment: builder.mutation({
      query: (data) => ({
        url: `/products/${data.id}/comments`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['comments']
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductsQuery, useGetCommentsQuery, useCreateCommentMutation } = productAPI
