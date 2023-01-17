import urllib.request,urllib.parse
from bs4 import BeautifulSoup

def CodeSearchOwn(query):
    arg_query = urllib.parse.quote_plus(query)
    url = 'https://searchcode.com/?q='+arg_query
    request = urllib.request.Request(url)
    request.add_header('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36')
    raw_response = urllib.request.urlopen(request).read()
    html = raw_response.decode("utf-8")
    soup = BeautifulSoup(html, 'html.parser')
    divs = soup.select(".chroma")
    if(divs==[]):
        return ""
    file=divs[0].find('a').get('href')
    sSlash = file.find('/',1)
    tSlash = file.find('/',sSlash+1)
    fileNo=file[sSlash:tSlash+1]
    urlCode = 'https://searchcode.com/codesearch/raw/'+fileNo
    # print(urlCode)
    request1 = urllib.request.Request(urlCode)
    request1.add_header('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36')
    raw_response = urllib.request.urlopen(request1).read()
    codeHtml = raw_response.decode("utf-8")
    codeSoup = BeautifulSoup(codeHtml, 'html.parser')
    # print(codeSoup)
    return str(codeSoup)


# print(CodeSearchOwn("for loop in python"))