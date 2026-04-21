const db = require("../config/db");

exports.createProduct = (req, res) => {
    const { name, description = null, price, cate_id } = req.body;
    const imagePath = req.file ? `/uploads/products/${req.file.filename}` : null;

    if (!name || price === undefined || !cate_id) {
        return res.status(400).json({
            message: "Thieu thong tin bat buoc: name, price, cate_id",
        });
    }

    const parsedPrice = Number(price);
    const parsedCateId = Number(cate_id);

    if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
        return res.status(400).json({ message: "price khong hop le" });
    }

    if (!Number.isInteger(parsedCateId) || parsedCateId <= 0) {
        return res.status(400).json({ message: "cate_id khong hop le" });
    }

    db.beginTransaction((transactionErr) => {
        if (transactionErr) {
            return res.status(500).json(transactionErr);
        }

        const productSql = `
            INSERT INTO product(name, description, price, cate_id)
            VALUES (?, ?, ?, ?)
        `;

        db.query(
            productSql,
            [name, description, parsedPrice, parsedCateId],
            (productErr, productResult) => {
                if (productErr) {
                    return db.rollback(() => res.status(500).json(productErr));
                }

                const productId = productResult.insertId;

                if (!imagePath) {
                    return db.commit((commitErr) => {
                        if (commitErr) {
                            return db.rollback(() => res.status(500).json(commitErr));
                        }

                        return res.status(201).json({
                            message: "Them san pham thanh cong",
                            product: {
                                id: productId,
                                name,
                                description,
                                price: parsedPrice,
                                cate_id: parsedCateId,
                                images: [],
                            },
                        });
                    });
                }

                const imageSql = `
                    INSERT INTO product_image(product_id, path, is_main)
                    VALUES (?, ?, ?)
                `;

                db.query(
                    imageSql,
                    [productId, imagePath, 1],
                    (imageErr, imageResult) => {
                        if (imageErr) {
                            return db.rollback(() => res.status(500).json(imageErr));
                        }

                        return db.commit((commitErr) => {
                            if (commitErr) {
                                return db.rollback(() => res.status(500).json(commitErr));
                            }

                            return res.status(201).json({
                                message: "Them san pham thanh cong",
                                product: {
                                    id: productId,
                                    name,
                                    description,
                                    price: parsedPrice,
                                    cate_id: parsedCateId,
                                    images: [
                                        {
                                            id: imageResult.insertId,
                                            path: imagePath,
                                            is_main: 1,
                                        },
                                    ],
                                },
                            });
                        });
                    }
                );
            }
        );
    });
};

exports.searchProducts = (req, res) => {
    const { q = "", cate_id, min_price, max_price, limit = 20, page = 1 } = req.query;

    const parsedLimit = Math.max(parseInt(limit, 10) || 20, 1);
    const parsedPage = Math.max(parseInt(page, 10) || 1, 1);
    const offset = (parsedPage - 1) * parsedLimit;

    const conditions = [];
    const params = [];

    if (q.trim()) {
        conditions.push("(p.name LIKE ? OR p.description LIKE ?)");
        const keyword = `%${q.trim()}%`;
        params.push(keyword, keyword);
    }

    if (cate_id) {
        conditions.push("p.cate_id = ?");
        params.push(cate_id);
    }

    if (min_price) {
        conditions.push("p.price >= ?");
        params.push(min_price);
    }

    if (max_price) {
        conditions.push("p.price <= ?");
        params.push(max_price);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const sql = `
        SELECT
            p.id,
            p.name,
            p.description,
            p.price,
            p.cate_id,
            c.name AS category_name,
            p.created_at,
            pi.path AS main_image
        FROM product p
        LEFT JOIN category c ON c.id = p.cate_id
        LEFT JOIN product_image pi ON pi.product_id = p.id AND pi.is_main = 1
        ${whereClause}
        ORDER BY p.id DESC
        LIMIT ? OFFSET ?
    `;

    db.query(sql, [...params, parsedLimit, offset], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            page: parsedPage,
            limit: parsedLimit,
            total: result.length,
            data: result,
        });
    });
};

exports.getProductDetail = (req, res) => {
    const { id } = req.params;

    const productSql = `
        SELECT
            p.id,
            p.name,
            p.description,
            p.price,
            p.cate_id,
            c.name AS category_name,
            p.created_at
        FROM product p
        LEFT JOIN category c ON c.id = p.cate_id
        WHERE p.id = ?
        LIMIT 1
    `;

    db.query(productSql, [id], (productErr, productResult) => {
        if (productErr) {
            return res.status(500).json(productErr);
        }

        if (productResult.length === 0) {
            return res.status(404).json({ message: "San pham khong ton tai" });
        }

        const product = productResult[0];

        const imageSql = `
            SELECT id, path, is_main
            FROM product_image
            WHERE product_id = ?
            ORDER BY is_main DESC, id ASC
        `;

        const stockSql = `
            SELECT
                ps.size_id,
                s.name AS size_name,
                ps.quantity
            FROM product_stock ps
            LEFT JOIN size s ON s.id = ps.size_id
            WHERE ps.product_id = ?
            ORDER BY ps.size_id ASC
        `;

        db.query(imageSql, [id], (imageErr, imageResult) => {
            if (imageErr) {
                return res.status(500).json(imageErr);
            }

            db.query(stockSql, [id], (stockErr, stockResult) => {
                if (stockErr) {
                    return res.status(500).json(stockErr);
                }

                res.json({
                    ...product,
                    images: imageResult,
                    stock: stockResult,
                });
            });
        });
    });
};
