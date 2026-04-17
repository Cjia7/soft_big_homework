# 绿源视界（LYSJ）

一个基于 Flask 的水资源与环境可视化项目，包含登录页、世界资源页面、中国水资源页面和省份查询页面。

项目启动时会自动执行 `demo.py`，从 MoonAPI 拉取数据并写回 `templates/China.html`。

## 功能概览

- 邮箱验证码登录（QQ SMTP）
- 世界资源与环境可视化
- 中国水资源环境监测可视化
- 省份下钻查询
- 启动自动刷新中国页面部分数据

## 技术栈

- Python 3
- Flask
- Flask-SQLAlchemy（SQLite）
- requests
- BeautifulSoup4
- bcrypt
- ECharts + Bootstrap

## 快速开始（本地运行）

### 1. 进入项目目录

```powershell
cd D:\codes\soft_big_work\LYSJ
```

### 2. 创建并激活虚拟环境

```powershell
python -m venv .venv
Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned
.\.venv\Scripts\Activate.ps1
```

### 3. 安装依赖

```powershell
pip install -U pip
pip install flask flask_sqlalchemy bcrypt requests beautifulsoup4
```

### 4. 启动服务

```powershell
python app.py
```

### 5. 打开浏览器

访问：

- http://127.0.0.1:5000

## 使用流程

1. 打开登录页后，先点击 **GET CAPTCHA**。
2. 输入邮箱，系统会发送验证码邮件。
3. 在 **Sign In** 中输入验证码并登录。
4. 进入首页后可查看：
   - 世界资源与环境状况
   - 中国水资源环境监测
   - 省份查询

## 必改配置（部署或二次开发前）

### 1) 邮件配置（`app.py`）

当前代码中写死了 QQ 邮箱账号和授权码，建议改成你自己的账号并放到环境变量中：

- `mailUser`
- `mailPass`

如果验证码发送失败，请确认：

- QQ 邮箱已开启 SMTP 服务
- 使用的是邮箱授权码而不是登录密码
- 目标收件邮箱可正常接收外部邮件

### 2) MoonAPI 配置（`demo.py`）

当前代码中包含示例 key，请替换为你自己的：

- `apiId`
- `accessKeyId`
- `accessKeySecret`
- `signMethod`

并确认当前网络可访问 MoonAPI。

## 主要路由

- `/`：登录页
- `/register`：发送验证码
- `/login`：验证码登录
- `/home1.html`：首页
- `/world`：世界资源页面
- `/china`：中国资源页面
- `/province?data=省份名`：省份页面

## 目录说明

```text
LYSJ/
├─ app.py                 # Flask 入口
├─ demo.py                # 启动时拉取 API 数据并更新 China.html
├─ MoonapiSign.py         # MoonAPI 签名工具
├─ templates/             # HTML 模板
├─ static/                # CSS/JS/图片
├─ instance/              # SQLite 数据库目录（运行后生成 users.db）
└─ setup.py               # 打包配置（演示用途）
```

## 常见问题

### Q1：启动时报找不到模板文件或路径错误

请确保在 `LYSJ` 目录下启动：

```powershell
cd D:\codes\soft_big_work\LYSJ
python app.py
```

### Q2：点击登录后显示 Login Failed

请先执行 **GET CAPTCHA**，并输入刚收到的最新验证码。

### Q3：验证码邮件收不到

优先检查 SMTP 配置与邮箱授权码是否正确。

### Q4：启动很慢或启动时报 API 错误

`app.py` 启动时会执行 `demo.py` 拉取远程数据。若网络不稳定，可先注释掉：

- `subprocess.run(["python", r"demo.py"])`

## 安全提示

当前仓库代码中存在硬编码账号/密钥示例，不建议直接用于生产环境。建议：

- 使用环境变量管理敏感信息
- 增加 `.env` 和 `.gitignore` 规则
- 仅在安全网络中测试

## 许可

当前仓库未附带 License。若计划公开分发，建议补充 LICENSE 文件。