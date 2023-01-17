import json
intents = json.loads(open('./py_model/intents.json').read())
while True:
    tag=input('Please enter general category of your question  ')
    if(tag=="-1"):
        break
    flag=-1
    for i in range(len(intents['intents'])):
        if tag.lower() in intents['intents'][i]['tag']:
            intents['intents'][i]['patterns'].append(input('Enter your message: '))
            intents['intents'][i]['responses'].append(input('Enter expected reply: '))        
            flag=1

    if flag==-1:
        
        intents['intents'].append (
            {'tag':tag,
            'patterns': [input('Please enter your message')],
            'responses': [input('Enter expected reply')]
            })
        
    with open('./py_model/intents.json','w') as outfile:
        outfile.write(json.dumps(intents,indent=4))