CREATE TABLE products(
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(80) NOT NULL,
    price DECIMAL(13,2) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, price, department_name, stock_quantity) VALUES
	("Lifesaver Mints", 7.98, "Grocery", 50),
    ("Xbox one", 500.00, "Electronics", 4),
    ("Playstation Controller", 59.99, "Electronics", 15),
    ("Mac Book Pro", 3700.00, "Electronics", 2),
    ("Red Dead Redemption 2", 59.99, "Electronics", 100),
    ("Arduino", 38.50, "Electronics", 60),
    ("Amazon Echo", 43.29, "Electronics", 50),
    ("Chromecast", 48.89, "Electronics", 50),
    ("OLED Samsung 55 inch", 1199.00, "Electronics", 25),
    ("Fire TV Stick", 39.99, "Electronics", 28);
    
SELECT * FROM products 
WHERE item_id >= 5;

SELECT * FROM departments 
WHERE department_id >= 2;

UPDATE products
SET department_name = "Outdoors"
WHERE item_id = 11;

CREATE TABLE products(
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(80) NOT NULL,
    price DECIMAL(13,2) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL,
    PRIMARY KEY (item_id)
);

CREATE TABLE departments(
	department_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    over_head_costs DECIMAL(13,2) NOT NULL,
    PRIMARY KEY (department_id)
);

INSERT INTO departments(department_name, over_head_costs) VALUES
	("Outdoors", 200000.00),
    ("Electronics", 300000.00),
    ("Grocery", 250000.00),
    ("Sports", 100000.00);
   
ALTER TABLE products ADD COLUMN product_sales DECIMAL(13,2) DEFAULT 0.00;

ALTER TABLE products DROP COLUMN product_sales;

SELECT departments.department_id,products.department_name,departments.over_head_costs ,SUM(products.product_sales) AS product_sales , SUM(products.product_sales) - departments.over_head_costs AS total_profit
FROM products INNER JOIN departments
ON products.department_name = departments.department_name
GROUP BY departments.department_name;
