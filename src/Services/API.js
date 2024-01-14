import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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

export const { useGetProductsQuery, useGetCommentsQuery, useCreateCommentMutation } = productAPI
