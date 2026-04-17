import MoonapiSign
import time
import json
from bs4 import BeautifulSoup

#ApiId
apiId = 197

#TODO: KeyID，在http:#www.moonapi.com中生成的key id
accessKeyId = 687

#TODO: KeyCode，在http:#www.moonapi.com中生成的Key Code
accessKeySecret = "p8t3h4d2gqgtb6b7m8pvb4b3"

#0为简单签名模式, 直接将sign设置为Key Code即可, 1为认证方式二md5签名认证， 2为认证方式二hmac签名认证
signMethod = 0

parameters = {}
signParameters = {}
parameters["keyid"] = accessKeyId
parameters["_t"] = time.time()

#TODO: 此处添加其它参数, POST参数加入signParameters中以参与签名，GET参数加入parameters中以参与签名及URL组装
#TODO: 区域，填写省份或城市名
#parameters["area"] = "xxx"
#TODO: 流域河流
#parameters["river"] = "xxx"
#TODO: 水质等级，Ⅰ类 / Ⅱ类 / Ⅲ类 / Ⅳ类 / Ⅴ类 / 劣Ⅴ类
parameters["level"] = "劣Ⅴ"
#TODO: 断面名称
#parameters["name"] = "xxx"
#TODO: 分页结果当前页码
#parameters["page"] = "xxx"
#TODO: 分页结果每页显示行数
#parameters["rows"] = "xxx"

#sign
sign = accessKeySecret
if (signMethod == 1):
    sign = MoonapiSign.generateMd5Signature(parameters, accessKeySecret)
elif (signMethod == 2):
    sign = MoonapiSign.generateHmacSHA1Signature(parameters, accessKeySecret)

#组装URL
strParams = MoonapiSign.getUrlQueryFromParams(parameters)
urlApi = "http://api.moonapi.com/" + str(apiId) + "?" + strParams + "&sign=" + sign
print(urlApi)

import requests

url = urlApi

payload={}
headers = {}

response = requests.request("GET", url, headers=headers, data=payload)

# 将JSON数据解析为Python字典
data_dict = json.loads(response.text)

# 获取"data"键的值
data_values = data_dict["data"]

#严重、北京市、房山区、重度污染、15公里
update_data=[]

j = 1

# 遍历每个地区的数据并进行提取
for data in data_values:
    update_data.append(j)
    update_data.append(data["city"][:2])
    update_data.append(data["turbidity"][:4])
    update_data.append(data["nh3n"][:4])
    update_data.append(data["quality"][:4])
    update_data.append(data["total_nitrogen"][:4])
    j = j + 1

# for data in update_data:
#     print(data)

# exit()

i = 0

# Use the template file inside this project regardless of current working directory.
template_path = "templates/China.html"

# 读取原始HTML文件
with open(template_path, "r", encoding="utf-8") as file:
    fcontent = file.read()
    soup = BeautifulSoup(fcontent, 'html.parser')

    # 找到包含中文内容的<span>标签
    chinese_spans = soup.find_all('span', string = True)

    li_elements = soup.find_all('li')

    for li in li_elements:
        spans = li.find_all('span')
        for span in spans:
            # print(span.string)
            span.string.replace_with(str(update_data[i]))
            i = i + 1

# exit()

# 将修改后的HTML代码写入原始文件
with open(template_path, "w", encoding="utf-8") as file:
    file.write(soup.prettify())
    
