import { newsArticles, type NewsArticle, type InsertNewsArticle } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<any | undefined>;
  getUserByUsername(username: string): Promise<any | undefined>;
  createUser(user: any): Promise<any>;
  
  // News article methods
  getNewsArticles(params: {
    category?: string;
    page?: number;
    pageSize?: number;
    search?: string;
  }): Promise<NewsArticle[]>;
  createNewsArticle(article: InsertNewsArticle): Promise<NewsArticle>;
  updateNewsArticle(id: number, updates: Partial<NewsArticle>): Promise<NewsArticle | undefined>;
  deleteNewsArticle(id: number): Promise<boolean>;
  getNewsArticleById(id: number): Promise<NewsArticle | undefined>;
  bookmarkArticle(id: number, isBookmarked: boolean): Promise<NewsArticle | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, any>;
  private newsArticles: Map<number, NewsArticle>;
  private currentUserId: number;
  private currentArticleId: number;

  constructor() {
    this.users = new Map();
    this.newsArticles = new Map();
    this.currentUserId = 1;
    this.currentArticleId = 1;
  }

  async getUser(id: number): Promise<any | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<any | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: any): Promise<any> {
    const id = this.currentUserId++;
    const user: any = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getNewsArticles(params: {
    category?: string;
    page?: number;
    pageSize?: number;
    search?: string;
  }): Promise<NewsArticle[]> {
    let articles = Array.from(this.newsArticles.values());

    // Filter by category
    if (params.category && params.category !== 'all') {
      articles = articles.filter(article => 
        article.category === params.category ||
        article.keywords?.some(keyword => 
          keyword.toLowerCase().includes(params.category!.toLowerCase())
        )
      );
    }

    // Filter by search term
    if (params.search) {
      const searchTerm = params.search.toLowerCase();
      articles = articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm) ||
        article.description?.toLowerCase().includes(searchTerm) ||
        article.keywords?.some(keyword => 
          keyword.toLowerCase().includes(searchTerm)
        )
      );
    }

    // Sort by publishedAt (most recent first)
    articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    // Pagination
    const page = params.page || 1;
    const pageSize = params.pageSize || 20;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return articles.slice(startIndex, endIndex);
  }

  async createNewsArticle(insertArticle: InsertNewsArticle): Promise<NewsArticle> {
    const id = this.currentArticleId++;
    const article: NewsArticle = {
      id,
      title: insertArticle.title,
      description: insertArticle.description ?? null,
      content: insertArticle.content ?? null,
      url: insertArticle.url,
      urlToImage: insertArticle.urlToImage ?? null,
      publishedAt: insertArticle.publishedAt,
      sourceName: insertArticle.sourceName,
      category: insertArticle.category,
      keywords: insertArticle.keywords ?? null,
      isBookmarked: false,
    };
    this.newsArticles.set(id, article);
    return article;
  }

  async updateNewsArticle(id: number, updates: Partial<NewsArticle>): Promise<NewsArticle | undefined> {
    const existing = this.newsArticles.get(id);
    if (!existing) return undefined;

    const updated = { ...existing, ...updates };
    this.newsArticles.set(id, updated);
    return updated;
  }

  async deleteNewsArticle(id: number): Promise<boolean> {
    return this.newsArticles.delete(id);
  }

  async getNewsArticleById(id: number): Promise<NewsArticle | undefined> {
    return this.newsArticles.get(id);
  }

  async bookmarkArticle(id: number, isBookmarked: boolean): Promise<NewsArticle | undefined> {
    return this.updateNewsArticle(id, { isBookmarked });
  }
}

export const storage = new MemStorage();
