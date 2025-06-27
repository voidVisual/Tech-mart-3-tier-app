
const mysql = require('mysql2/promise');
const { config } = require('dotenv');

config({ path: '.env' });

const { categories, products, testimonials } = require('./data-to-seed');

async function main() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: process.env.MYSQL_PORT,
    });
    console.log('Connected to MySQL database.');

    // Seed Categories
    console.log('Seeding categories...');
    for (const category of categories) {
      await connection.execute(
        'INSERT INTO categories (id, name, description) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE name=VALUES(name), description=VALUES(description)',
        [category.id, category.name, category.description]
      );
    }
    console.log('Categories seeded.');

    // Seed Products
    console.log('Seeding products...');
    for (const product of products) {
      await connection.execute(
        'INSERT INTO products (id, name, category_id, price, images, description, specs, stock, ai_hint) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=VALUES(name), category_id=VALUES(category_id), price=VALUES(price), images=VALUES(images), description=VALUES(description), specs=VALUES(specs), stock=VALUES(stock), ai_hint=VALUES(ai_hint)',
        [
          product.id,
          product.name,
          product.category,
          product.price,
          JSON.stringify(product.images),
          product.description,
          JSON.stringify(product.specs),
          product.stock,
          product.aiHint,
        ]
      );

      // Seed Reviews for the product
      for (const review of product.reviews) {
        await connection.execute(
          'INSERT INTO reviews (product_id, rating, text, author, avatar) VALUES (?, ?, ?, ?, ?)',
          [product.id, review.rating, review.text, review.author, review.avatar]
        );
      }
    }
    console.log('Products and reviews seeded.');

    // Seed Testimonials
    console.log('Seeding testimonials...');
    for (const testimonial of testimonials) {
      await connection.execute(
        'INSERT INTO testimonials (id, quote, name, title, avatar) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE quote=VALUES(quote), name=VALUES(name), title=VALUES(title), avatar=VALUES(avatar)',
        [testimonial.id, testimonial.quote, testimonial.name, testimonial.title, testimonial.avatar]
      );
    }
    console.log('Testimonials seeded.');

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed.');
    }
  }
}

main();
