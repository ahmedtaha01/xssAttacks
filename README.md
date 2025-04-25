steps to run the project , insure that you have python 3.9 or lower <a href="https://www.python.org/ftp/python/3.9.0/python-3.9.0-amd64.exe">here</a>

## 📦 Installation  

### 1 Clone the Repository 

 git clone https://github.com/ahmedtaha01/xssAttacks.git

### 2 Move into the directory
 
 cd xssAttacks

### 3 just use docker to install it

docker build -t flask-app .

docker run --name flask-app-container -v /home/sherif/Desktop/python_projects/xssAttacks:/app  -d -p 4000:5001 flask-app
