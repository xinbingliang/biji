`````python
# -*- coding:utf-8 -*-
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

__Author__ = "xinneirong"
__Email__ = "xinneirong@gmail.com"
__Time__ = "2019/6/12 13:53"

Base = declarative_base()

class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(25), nullable=False)

engine = create_engine("mysql+cymysql://root:root@localhost:3306/test")

# Base.metadata.create_all(engine)

Dbsession = sessionmaker(bind=engine)

session = Dbsession()
new_user = User(name='辛丙亮')
session.add(new_user)
session.commit()
session.close()
`````

