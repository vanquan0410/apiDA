const express = require('express');
const apriori = require('simple-apriori');
const configs = require("../config/config.json");
const cors = require('cors');
const app = express();
app.use(cors({
    origin: '*'
}));
const sql = require('mssql/msnodesqlv8');
const sqlConnect = require("../config/config.json");


/**
 * api tìm các tập phổ biến trong một bộ dữ liệu(lấy tập dữ liệu đi kèm)
 * rep: request truyền lên
 * res: response trả về
 * careatedby:dvquan
 */
app.get('/api/apriori', async (rep, res) => {
    try {

        //test cpnnect sql
        sql.connect(sqlConnect.SQLServerConnection).then(async () => {
            const result = await sql.query(`
            SELECT DISTINCT 
            SUBSTRING(
            (
                SELECT ',' + od1.ProductID
                FROM OrderDetail od1
                WHERE od1.OrderID=od.OrderID
                ORDER BY od1.OrderID
                FOR XML PATH('')
            ),2,1000) AS  "Apriori"
          FROM OrderDetail od;`);
            //console.log(result);
            var dataset = [
                '1, 17, 5, 7',
                '1, 5', '10, 7',
                '2, 27, 3, 5, 7',
                '20, 21',
                '1, 17, 5, 7, 2, 3',
                '1, 17, 5, 7, 4',
                '1, 17, 5, 7, 6',
                '1, 2, 5, 7',
                '3, 3, 5, 2',
                '1, 8, 5, 7',
                '1, 3, 4, 2',
                '3, 5, 5, 1',
                '3, 9, 5, 7',
                '5, 3, 5, 3',
                '1, 8, 5, 7',
                '4, 9, 5, 2',
                '2, 1, 5, 3',
                '9, 2, 5, 1',
                '5,6,7'
            ];
            // result.recordset.map((res, index) => {
            //     //console.log(res.Apriori)
            //     dataset.push(res.Apriori);
            // })
            // console.log(dataset);
            var support = 30;
            var confidence = 40;
            var x = apriori.getApriori(dataset, support, confidence);
            console.log(x);
            return res.status(200).json({ sucess: x });
        })



























        // var dataset = [
        //     'Pecel, Nasi Goreng, Tahu Campur, Tahu Telor, Sate, Bebek, Rawon, Rujak Cingur',
        //     'Nasi Goreng, Sego Sambel, Rujak Cingur, Bebek, Lontong Balap, Tahu Telor',
        //     'Rujak Cingur, Sego Sambel, Nasi Goreng, Sate, Bebek, Lontong Balap, Pecel',
        //     'Tahu Campur, Sate, Nasi Goreng',
        //     'Sego Sambel, Sate, Rujak Cingur, Nasi Goreng',
        //     'Tahu Campur, Nasi Goreng, Sate, Tahu Telor, Lontong Balap, Bebek',
        //     'Tahu Campur, Pecel, Sego Sambel, Rujak Cingur, Sate',
        //     'Bebek, Sego Sambel',
        //     'Nasi Goreng, Sego Sambel, Tahu Campur, Tahu Telor',
        //     'Sego Sambel, Rujak Cingur'
        // ];

        // var support = 40;
        // var confidence = 40;

        // apriori.getApriori(dataset, support, confidence);
        // var x = apriori.getApriori(dataset, support, confidence);
        // //console.log(x);
        // console.log('call api success');
        // //return res.status(200).json({ sucess: x });
    } catch (error) {
        console.log(error)
    }
})

app.listen(configs.application.port, () => {
    console.info(`App is running on port ${configs.application.port}. Click ${configs.application.host}/api/apriori`);
})