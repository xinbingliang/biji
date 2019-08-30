FROM python:3.6

COPY . /app
WORKDIR /app
RUN pip install flask redis
EXPOSE 80


ENTRYPOINT [ "python", "app.py" ]
