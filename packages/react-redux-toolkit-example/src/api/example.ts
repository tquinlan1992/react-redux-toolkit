import { createApi } from 'react-redux-toolkit/createApi';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const exampleRTKApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/example' }),
  endpoints: (builder) => ({
    getExampleData: builder.query<{ property1: string }, { query: string }>({
      query: ({ query }) => ({
        url: `/`,
        params: { query },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
// export const { useGetExampleDataQuery } = exampleRTKApi;
