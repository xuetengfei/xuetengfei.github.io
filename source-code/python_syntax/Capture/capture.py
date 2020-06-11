from lxml import html
import requests

page = requests.get('http://econpy.pythonanywhere.com/ex/001.html')
tree = html.fromstring(page.text)

# 这将创建buyers的列表：
buyers = tree.xpath('//div[@title="buyer-name"]/text()')
# 这将创建prices的列表：
prices = tree.xpath('//span[@class="item-price"]/text()')

print('Buyers: ', buyers)
print('Prices: ', prices)

response = requests.get('https://httpbin.org/ip')
# print('Your IP is {0}'.format(response.json()['origin']))
