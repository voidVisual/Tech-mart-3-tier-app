-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS techmart;

USE techmart;

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category_id VARCHAR(255),
  price DECIMAL(10, 2) NOT NULL,
  images JSON,
  description TEXT,
  specs JSON,
  stock INT,
  ai_hint VARCHAR(255),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id VARCHAR(255),
  rating INT,
  text TEXT,
  author VARCHAR(255),
  avatar VARCHAR(255),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  quote TEXT,
  name VARCHAR(255),
  title VARCHAR(255),
  avatar VARCHAR(255)
);
