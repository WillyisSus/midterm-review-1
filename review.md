# Sinh models từ database
- Sử dụng sequelize-auto (cài đặt bằng npm install -d)
- Câu lệnh: `npx sequelize-auto -o \"./models\" -d midterm-review-1 -h localhost -u myuser -x mypassword -p 5432 -e postgres -l esm`
- sử dụng model sequelize được config => xem file `utils/db` => initialize models bằng hàm `initModels` trước khi sử dụng.

#