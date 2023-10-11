import express from "express";
import db from "../module/connect.js";
import upload from "../module/upload-imgs.js";

const restaurantRouter = express.Router();

restaurantRouter.post(
  "/member-register",
  upload.array("photo"),
  async (req, res) => {
    let { email, password, name, address, city, district, description, phone } =
      req.body;
    const output = {
      success: false,
      errors: {},
      result: {},
      postData: {} // 除錯檢查用
    };

    const sql =
      "INSERT INTO `restaurant_user`(`restaurant_name`, `restaurant_password_hash`, `restaurant_email`, `restaurant_phone`, `restaurant_city`, `restaurant_district`, `restaurant_address`, `restaurant_info`) VALUES (?,?,?,?,?,?,?,?)";

    let result;

    try {
      [result] = await db.query(sql, [
        name,
        password,
        email,
        phone,
        city,
        district,
        address,
        description,
      ]);
      output.success = !!result.affectedRows;
      output.result = result;

      // 自增ID
      const restaurantId = result.insertId;


      const files = req.files;
console.log(req.files)
      if (files && files.length > 0) {
        files.forEach(async (file) => {
          const { filename } = file;

          const sql2 =
            "INSERT INTO `r_img` (`restaurant_id`, `r_img_route`, `r_img_isValid`) VALUES (?, ?, ?)";

          try {
            [result] = await db.query(sql2, [restaurantId, filename, 1]);
            console.log(`File ${filename} inserted into database.`);
          } catch (err) {
            console.error(`Error inserting file ${filename} into database: ${err}`);
          }
        });
      }
    } catch (err) {
      output.errors = "SQL 錯誤";
      output.err = err;

    }

    res.json(output);
  }
);

restaurantRouter.post("/image-upload",upload.single("image"),async (req,res) =>{
  console.log(req.file)
})

export default restaurantRouter;
