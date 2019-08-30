# Grpc

## 安装

* `pip install grpcio` 安装grpcio框架
* `pip install grpcio-tools` 安装grpc工具

## 示例

````protobuf
syntax = "proto3";

service UserData {
    // 返回单个用户
    rpc GetUser (UserId)  returns (User) {}

    // 返回用户列表
    rpc GetUserList (Page) returns (UserList) {}
}

// 用户id
message UserId {
    int32 id = 1;
}

// 页码数
message Page {
    int32 page = 1;
}

// 单个用户信息
message User {
    int32 id = 1;
    string name = 2;
    int32 age = 3;
    string sex = 4;
}

// // 用户信息的集合
 message UserList{
     repeated User user_list = 1;
     int32 count = 2;
 }
````

* `python -m grpc_tools.protoc -I./ --python_out=./grpcdir --grpc_python_out=./grpcdir ./data.proto`

`````python
# -*- coding:utf-8 -*-
import time
from concurrent import futures

import grpc
import logging

from grpcdir import data_pb2
from grpcdir import data_pb2_grpc

_ONE_DAY_IN_SECONDS = 60 * 60 * 24

__Author__ = "xinneirong"
__Email__ = "xinneirong@gmail.com"
__Time__ = "2019/8/21 14:02"


class UserData(data_pb2_grpc.UserDataServicer):
    def GetUser(self, request, context):
        # print(request.id)
        return data_pb2.User(id=1, name='辛丙亮', age=2, sex='男')

    def GetUserList(self, request, context):
        # data_list = data_pb2.UserList(user_list=[data_pb2.User(id=1, name='辛丙亮', age=2, sex='男'
        #                                                        ), data_pb2.User(id=2, name='辛丙亮', age=2, sex='男')], count=1)
        data_list = data_pb2.UserList(user_list=[{"id": 1, "name": '辛丙亮', "age": 2, "sex": '男'}, {"id": 1, "name": '辛丙亮', "age": 2, "sex": '男'}], count=1)
        return data_list


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    data_pb2_grpc.add_UserDataServicer_to_server(UserData(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    try:
        while True:
            time.sleep(_ONE_DAY_IN_SECONDS)
    except KeyboardInterrupt:
        server.stop(0)

if __name__ == '__main__':
    logging.basicConfig()
    serve()
`````

````python
# -*- coding:utf-8 -*-
import logging
import grpc

from grpcdir import data_pb2_grpc
from grpcdir import data_pb2

__Author__ = "xinneirong"
__Email__ = "xinneirong@gmail.com"
__Time__ = "2019/8/21 14:02"

def run():
    with grpc.insecure_channel('localhost:50051') as channel:
        stub = data_pb2_grpc.UserDataStub(channel)
        response = stub.GetUserList(data_pb2.Page(page=1))

    print(response.user_list[0].id)

if __name__ == '__main__':
    logging.basicConfig()
    run()
````