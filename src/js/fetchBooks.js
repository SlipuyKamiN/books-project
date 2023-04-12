import axios from 'axios';

class FetchBooks {
  async getCategoriesList() {
    const categoriesList = await axios.get(
      'https://books-backend.p.goit.global/books/category-list'
    );
    return categoriesList.data;
  }

  async getBestSellers() {
    const bestSellers = await axios.get(
      'https://books-backend.p.goit.global/books/top-books'
    );
    return bestSellers.data;
  }

  async getBooksByCategory(categoryName) {
    const booksByCategory = await axios.get(
      `https://books-backend.p.goit.global/books/category?category=${categoryName}`
    );
    return booksByCategory.data;
  }

  async getBookById(bookId) {
    const booksByCategory = await axios.get(
      `https://books-backend.p.goit.global/books/${bookId}`
    );
    return booksByCategory.data;
  }
}

export const fetchBooks = new FetchBooks();
