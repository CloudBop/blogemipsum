import { useState, useEffect } from "react";

import { PostDetail } from "./PostDetail";
import { useQuery, useQueryClient } from "react-query";
const maxPostPage = 10;

async function fetchPosts(pageNum) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${maxPostPage}&_page=${pageNum}`
  );
  return response.json();
}


export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  // prefetch pages
  const queryClient = useQueryClient();

  useEffect(() => {
    //everytime currentPage 
    if (currentPage < maxPostPage) {
      // increment
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(
        // react-query cached key+[dep]
        ["getPosts", nextPage],
        // if (stale) 
        () => fetchPosts(nextPage), {
        staleTime: 2000,
        keepPreviousData: true
      })
    }
    // return () => {
    //   cleanup
    // }
  }, [currentPage, queryClient])
  //
  const { data, isError, error, isLoading } = useQuery(["getPosts", currentPage], () => fetchPosts(currentPage), { staleTime: 5000, keepPreviousData: true });
  if (isLoading) return <h2>Loading....</h2>
  if (isError) return (
    <div>
      <h3>Ooops, something went wrong.</h3>
      <p>{error.toString()}</p>
    </div>)
  //
  return (
    (<>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button disabled={currentPage <= 1} onClick={() => {
          setCurrentPage(prev => prev - 1)
        }}>
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button disabled={currentPage >= maxPostPage} onClick={() => {
          setCurrentPage(prev => prev + 1)
        }}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>)
  );
}
