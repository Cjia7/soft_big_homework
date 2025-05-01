from flask import Flask, request, redirect, url_for, render_template
from flask_sqlalchemy import SQLAlchemy
from email.header import Header
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import bcrypt
import subprocess
import random
import string
import smtplib

subprocess.run(["python", r"demo.py"])

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


def generate_random_string(length=5):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(80), nullable=False)

def init_db():
    db.create_all()  # Create tables if they don't exist
    if User.query.count() == 0:  # Check if the users table is empty
        users = [
            {'username': 'Alice', 'email': 'alice@example.com', 'password': 'password123'},
            {'username': 'Bob', 'email': 'bob@example.com', 'password': 'password123'},
            {'username': 'Carol', 'email': 'carol@example.com', 'password': 'password123'}
        ]

        for user in users:
            password_hash = bcrypt.hashpw(user['password'].encode('utf-8'), bcrypt.gensalt())
            new_user = User(username=user['username'], email=user['email'], password=password_hash)
            db.session.add(new_user)

        db.session.commit()



@app.route('/')
def index():
    return render_template('login.html')

@app.route('/register', methods=['POST'])
def register():
    # username = request.form['username']
    email = request.form['email']
    qqMail = smtplib.SMTP_SSL("smtp.qq.com", 465)
    mailUser = "1978236639@qq.com"
    mailPass = "swhneoxluwjtfjjg"
    global CAPTCHA
    CAPTCHA = generate_random_string(5)
    qqMail.login(mailUser, mailPass)

    sender = "1978236639@qq.com"
    receiver = email
    message = MIMEMultipart()

    message["Subject"] = Header("绿源视界网页浏览验证码")

    message["From"] = Header(f"NOASIS<{sender}>")
    # 将收件人信息写入 message["To"]
    message["To"] = Header(f"User<{receiver}>")

    textContent = "欢迎访问绿源视界数据可视化网页，您的验证吗为：" + CAPTCHA + "\n若非本人操作，则请无视本邮件。"
    mailContent = MIMEText(textContent, "plain", "utf-8")
    message.attach(mailContent)
    qqMail.sendmail(sender, receiver, message.as_string())
    # password = request.form['password'].encode('utf-8')

    # Encrypt the password
    # hashed = bcrypt.hashpw(password, bcrypt.gensalt())

    # new_user = User(username=username, email=email, password=hashed)
    # db.session.add(new_user)
    # db.session.commit()

    return redirect(url_for('index'))

@app.route('/login', methods=['POST'])
def login():
    # email = request.form['email']
    password = request.form['CAPTCHA']
    print(password)
    print(len(password))
    print(CAPTCHA)
    print(len(CAPTCHA))
    # user = User.query.filter_by(email=email).first()
    if password == CAPTCHA:
        return redirect('/home1.html')  # Assuming 'home1.html' is accessible
    return 'Login Failed'

@app.route('/home1.html')
def home():
    return render_template('home1.html')

@app.route('/china')
def china():
    return render_template('China.html')

@app.route('/province')
def province():
    data = request.values.get('data')
    return render_template('Province_Web.html', data=data)

@app.route('/world')
def world():
    return render_template('w.html')

if __name__ == '__main__':
    with app.app_context():
        init_db()  # Initialize the database with users only if needed
    app.run(debug=True, use_reloader=False)
