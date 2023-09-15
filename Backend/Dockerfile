FROM python:3.11.5-alpine3.18
WORKDIR /app
COPY ./requirements.txt .

RUN apk add g++ jpeg-dev zlib-dev libjpeg make


RUN pip install --no-cache-dir -r requirements.txt
RUN apk add tk
COPY . ./bmsim
WORKDIR ./bmsim

RUN python manage.py makemigrations
RUN python manage.py migrate
EXPOSE 80

CMD ["python","manage.py" ,"runserver", "0.0.0.0:80"]





