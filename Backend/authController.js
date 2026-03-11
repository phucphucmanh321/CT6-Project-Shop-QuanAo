const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//REGISTER
exports.register = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.json({ message: "Thiếu thông tin đăng ký" });
    }
    try {
        db.query(
            "SELECT * FROM user WHERE username=?", [username],
            async (err, result) => {
                if (result.length > 0) {
                    return res.json({ message: "Username đã tồn tại" });
                }
                const hashedPassword = await bcrypt.hash(password, 10);
                db.query(
                     "INSERT INTO user(username,password,role) VALUES(?,?,?)",
                    [username, hashedPassword, "customer"],
                    (err,result)=>{
                        if(err) return res.json(err);
                        res.json({message: "Đăng ký thành công"});
                    }
                );
            }
        );
    }catch(error){
        res.status(500).json(error);
    }
}

//LOGIN
exports.login = async (req, res)=>{
    const{username,password}=req.body;

    db.query(
        "SELECT * FROM user WHERE username = ?",
        [username],
        async(err,result)=>{
            if(result.length===0){
                return res.json({message: "Sai tài khoản hoặc mật khẩu"});
            }

            const user = result[0];

            const match=await bcrypt.compare(password,user.password);

            if(!match){
                return res.json({message: "Sai tài khoản hoặc mật khẩu"});
            }

            const JWT_SECRET = process.env.JWT_SECRET;

            const token = jwt.sign(
                {id: user.id, username: user.username },
                JWT_SECRET,
                {expiresIn: "1h"}
            );

            res.json({
                message: "Đăng nhập thành công",
                token: token,
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role
                }
            });

        }
    );
}