import { Category, Product } from '../types/types';

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const createCategory = (name: string, description: string): Category => ({
  id: generateId(),
  name,
  description,
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const createProduct = (categoryId: string, name: string, description: string, image: string): Product => ({
  id: generateId(),
  categoryId,
  name,
  description,
  image,
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const updateCategory = (category: Category, updates: Partial<Category>): Category => ({
  ...category,
  ...updates,
  updatedAt: new Date(),
});

export const updateProduct = (product: Product, updates: Partial<Product>): Product => ({
  ...product,
  ...updates,
  updatedAt: new Date(),
});