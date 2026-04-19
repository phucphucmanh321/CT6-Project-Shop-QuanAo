const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function normalizeBcryptHash(hash) {
    if (typeof hash !== "string") return hash;
    // Imported PHP bcrypt hashes often use $2y$, normalize for Node bcrypt.
    if (hash.startsWith("$2y$")) {
        return `$2b$${hash.slice(4)}`;
    }
    return hash;
}

// REGISTER
exports.register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Thiếu thông tin đăng ký" });
    }

    try {
        db.query(
            "SELECT * FROM user WHERE username = ?",
            [username],
            async (err, result) => {
                if (err) {
                    return res.status(500).json({
                        message: "Lỗi truy vấn người dùng",
                        error: err.message,
                    });
                }

                if (result.length > 0) {
                    return res.status(409).json({ message: "Username đã tồn tại" });
                }

                const hashedPassword = await bcrypt.hash(password, 10);

                db.query(
                    "INSERT INTO user(username,password,role) VALUES(?,?,?)",
                    [username, hashedPassword, "customer"],
                    (insertErr) => {
                        if (insertErr) {
                            return res.status(500).json({
                                message: "Lỗi tạo tài khoản",
                                error: insertErr.message,
                            });
                        }

                        return res.json({ message: "Đăng ký thành công" });
                    }
                );
            }
        );
    } catch (error) {
        return res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
    }
};

// LOGIN
exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Thiếu username hoặc password" });
    }

    db.query(
        "SELECT * FROM user WHERE username = ?",
        [username],
        async (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Lỗi truy vấn đăng nhập",
                    error: err.message,
                });
            }

            if (result.length === 0) {
                return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
            }

            try {
                const user = result[0];
                const normalizedHash = normalizeBcryptHash(user.password);
                const match = await bcrypt.compare(password, normalizedHash);

                if (!match) {
                    return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
                }

                const JWT_SECRET = process.env.JWT_SECRET;

                if (!JWT_SECRET) {
                    return res.status(500).json({ message: "Thiếu cấu hình JWT_SECRET" });
                }

                const token = jwt.sign(
                    { id: user.id, username: user.username },
                    JWT_SECRET,
                    { expiresIn: "1h" }
                );

                return res.json({
                    message: "Đăng nhập thành công",
                    token,
                    user: {
                        id: user.id,
                        username: user.username,
                        role: user.role,
                    },
                });
            } catch (compareError) {
                return res.status(500).json({
                    message: "Lỗi xử lý đăng nhập",
                    error: compareError.message,
                });
            }
        }
    );
};
