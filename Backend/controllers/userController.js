const db = require("../config/db");

//Lấy tất cả users
exports.getAllUsers = (req, res) => {
    db.query("SELECT id, username, role FROM user", (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
};

//Lấy user theo id
exports.getUserById = (req, res) => {
    const id = req.params.id;

    db.query(
        "SELECT id, username, role FROM user WHERE id = ?",
        [id],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            if (result.length === 0) {
                return res.status(404).json({ message: "User không tồn tại" });
            }

            res.json(result[0]);
        }
    );
};
