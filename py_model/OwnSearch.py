import urllib.request,urllib.parse
def GoogleSearchOwn(query):
    arg_query = urllib.parse.quote_plus(query)
    url = 'https://google.com/search?q='+arg_query
    request = urllib.request.Request(url)
    request.add_header('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36')
    raw_response = urllib.request.urlopen(request).read()
    html = raw_response.decode("utf-8")
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(html, 'html.parser')
    divs = soup.select("#search div.g")
    search_list = []
    for div in divs:
        for link in div.findAll('a'):
            search_list.append(link.get('href'))
    return search_list