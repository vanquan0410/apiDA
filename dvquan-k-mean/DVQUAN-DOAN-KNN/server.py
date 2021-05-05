import knn
from flask import Flask, jsonify, request
from flask_cors import CORS
from requests.exceptions import ConnectionError

#sử dụng flask api để viết api cung cấp cho bên khác gọi
app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:8080"}})

#api kiểm tra tình trạng của serve
#createdby:dvquan(27/4/2021)
@app.route('/health', methods=['GET'])
def getHealth():
    try:
        return jsonify('sucess')
    except :
        return jsonify('failed')

#api lấy nhãn của 1 sản phẩm
#id các thông số của sản phẩm truyền lên
#CREATEDBY:DVQUAN(27/4/2021)
@app.route('/day/<id>', methods=['GET'])
def getDay(id):
    try:
        assert id == request.view_args['id']
        data=knn.getData(id)
        print(type(data))
        return jsonify(data.tolist())
    except:
        print("failed to load service knn");


#api trả về lable của 1 sản phẩm khi xem chi tiết sản phẩm đó
#param tham số của sản phẩm truyền lên
#createdby:dvquan
@app.route('/api/knn/<param>', methods=['GET'])
def getLable(param):
    try:
        assert param == request.view_args['param']
        data = knn.getData(param)
        print(type(data))
        return jsonify(data.tolist())
    except:
        print('falied to call service knn')



#api trả về lable của 1 sản phẩm khi thêm sản phẩm mới
#param tham số của sản phẩm truyền lên
#createdby:dvquan
@app.route('/api/knn/<param>', methods=['POST'])
def getLableAdd(param):
    try:
        assert param == request.view_args['param']
        data = knn.getData(param)
        print(type(data))
        return jsonify(data.tolist())
    except:
        print('falied to call service knn')

if __name__ == "__main__":
    app.run(host='localhost', port=4000, debug=False, threaded=False)
