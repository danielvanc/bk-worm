import * as React from 'react';
import { useAuth } from 'context/auth';
import { useAsync } from 'utils/hooks'
import { fireFetch } from 'utils/utils'

const loadingBooks = [{}]

/* 
  Hook for displaying chosen book list. 
  Examples: All books, faved books list, recently read list etc

  Usage: const data = useBookList('""&maxResults=2')
*/
export function useBookList(endpoint = '""') {
  const listApi = process.env.NEXT_PUBLIC_ALL_BOOKS_API
  // Might need the users session details for finding faved books etc
  const { session } = useAuth()

  const [books, setBooks] = React.useState([])
  const { data, isIdle, isLoading, isError, isSuccess, run } = useAsync();
  
  
  React.useEffect(() => {
    if (session?.user) {
      const startUp = fireFetch(`${listApi}${endpoint}`)
      run(startUp)
    }
  }, [endpoint, listApi, run, session])
  

  React.useEffect(() => {
    if (data?.items) {
      setBooks(data.items)
    }
  }, [data])

  return {books: books ?? loadingBooks}
  
}