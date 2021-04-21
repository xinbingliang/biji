# 说明

## 常用命令

### pipenv

* `pip install pipenv==2018.10.13`

### python 

`````
pipenv install grpclib
pipenv install grpcio
pipenv install grpcio-tools
`````

一般生成

* `python -m grpc_tools.protoc --python_out=. --grpc_python_out=. -I. *.proto`

asyncio生成

* `python -m grpc_tools.protoc --python_out=. --grpclib_python_out=. -I. *.proto`

### go

````
docker pull znly/protoc
````

生成

* `docker run --rm -v $(pwd):$(pwd) -w $(pwd) znly/protoc -I. --go_out=plugins=grpc:. *.proto`