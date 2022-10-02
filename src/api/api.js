// import axios from 'axios';

// export const fetchArticlesWithQuery = async searchQuery => {
//   const response = axios.get(`/search?query=${searchQuery}`);
//   return response.data.hits;
// };

function fetchImages(searchQuery, page) {
  return fetch(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=29344544-28f8077a689a3611398a04467&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Nothing to show for "${searchQuery}`));
  });
}

export default { fetchImages };
