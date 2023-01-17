from dataclasses import replace
import sys
import os
import json
import random
import numpy as np
import pickle
from OwnSearch import GoogleSearchOwn
from CodeSearch import CodeSearchOwn
import nltk
from nltk.stem import WordNetLemmatizer
from keras.models import load_model

class HiddenPrints:
    def __enter__(self):
        self._original_stdout = sys.stdout
        sys.stdout = open(os.devnull, 'w')

    def __exit__(self,a,b,c):
        sys.stdout.close()
        sys.stdout = self._original_stdout


nltk.download('punkt',quiet=True)
nltk.download('wordnet',quiet=True)
lemmatizer=WordNetLemmatizer()
model = load_model('./py_model/mymodel.h5')
intents = json.loads(open('./py_model/intents.json').read())
words = pickle.load(open('./py_model/words.pkl','rb'))
classes = pickle.load(open('./py_model/classes.pkl','rb'))

#Predict
def clean_up(sentence):
    sentence_words=nltk.word_tokenize(sentence)
    sentence_words=[ lemmatizer.lemmatize(word.lower()) for word in sentence_words]
    return sentence_words

def create_bow(sentence,words):
    sentence_words=clean_up(sentence)
    bag=list(np.zeros(len(words)))
    
    for s in sentence_words:
        for i,w in enumerate(words):
            if w == s: 
                bag[i] = 1
    return np.array(bag)

def predict_class(sentence,model):
    p=create_bow(sentence,words)
    res=model.predict(np.array([p]))[0]
    threshold=0.8
    results=[[i,r] for i,r in enumerate(res) if r>threshold]
    results.sort(key=lambda x: x[1],reverse=True)
    return_list=[]
    
    for result in results:
        return_list.append({'intent':classes[result[0]],'prob':str(result[1])})
    return return_list

def get_response(query,return_list,intents_json):
    
    if len(return_list)==0:
        tag='misc'
    else:    
        tag=return_list[0]['intent']

    if tag=='google':
        query = query.replace('google','').replace('search','')
        rs = GoogleSearchOwn(query)
        if len(rs)>0:
            return "Are you looking for this?: "+rs[0]
        else:
            tag = 'misc'
    if tag=='code':
        rs = CodeSearchOwn(query)
        if rs!=None and len(rs)>0:
            return "This is what I can come up with:\n"+rs
        else:
            return'I\'m not skilled enough to write such complex codes'

    else:
        list_of_intents= intents_json['intents']    
        for i in list_of_intents:
            if tag==i['tag'] :
                result= random.choice(i['responses'])
        return result

def response(text):
    return_list=predict_class(text,model)
    response=get_response(text,return_list,intents)
    return response

def main(name):
    with HiddenPrints():
        name = name.lower()
        reply=response(name)
    print(reply)
    sys.stdout.flush()

main(sys.argv[1])
# main("for loop in python")