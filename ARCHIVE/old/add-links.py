import bs4, sys


for file in sys.argv[1],:
	page = bs4.BeautifulSoup(open(file),features='html5lib',preserve_whitespace_tags='html')

	cons,vowels = page.find_all('table')

	places = [th.decode_contents() for th in cons.find_all('tr')[1].find_all('th') ]
	for tr in cons.find_all('tr')[2:]:
		manner = tr.find_all('th')[-1].decode_contents()
		for place,td in zip(places,tr.find_all('td')):
			if td.decode_contents():
				innerHTML = (
					'\\n'
					+',\\n'.join([
						'\\t'*5+f'<a href="https://en.wikipedia.org/wiki/{voicing}_{place}_{manner}">{phone}</a>'.lower()
						for voicing,phone in reversed(list(zip('Voiced Voiceless'.split(),reversed(td.decode_contents().split(',')))))
					])
					+'\\n'
					+'\\t'*4
				)
				td.clear()
				td.append(bs4.BeautifulSoup(innerHTML,features='html.parser',preserve_whitespace_tags=''))
	#print( cons.decode_contents().replace('\\t','\t').replace('\\n','\n') )

	backnesses = [th.decode_contents() for th in vowels.find_all('tr')[0].find_all('th') ]
	for tr in vowels.find_all('tr')[1:]:
		openness = tr.find_all('th')[-1].decode_contents()
		for backness,td in zip(backnesses,tr.find_all('td')):
			phone = td.decode_contents()
			if td.decode_contents():
				innerHTML = f'<a href="https://en.wikipedia.org/wiki/near-{openness}_{backness}_unrounded_vowel">{phone}</a>'.lower().replace('near-mid','open-mid')
				td.clear()
				td.append(bs4.BeautifulSoup(innerHTML,features='html.parser',preserve_whitespace_tags=''))
	print( vowels.decode_contents().replace('\\t','\t').replace('\\n','\n') )
