import { create } from "@mui/material/styles/createTransitions";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://gateway.marvel.com/v1/public";

const createRequest = (url) => ({ url });

export const collectionApi = createApi({
  reducerPath: "collectionApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCollectionTerm: builder.query({
      query: ({ orderBy, limit, offset, searchTerm }) =>
        createRequest(
          `/characters?nameStartsWith=${searchTerm}orderBy=${orderBy}&limit=${limit}&offset=${offset}&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
        ),
    }),
  }),
});

export const { useGetCollectionTerm } = collectionApi;
