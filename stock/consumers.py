import json
from random import randint
from time import sleep
import requests
from datetime import datetime

from channels.generic.websocket import WebsocketConsumer




class GraphConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        while True:
            sleep(3)

            now = datetime.now()

            current_time = now.strftime("%H:%M:%S")



            url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
            coin_data = requests.get(url).json()

            coin_data[0]['time_now']= current_time
            self.send(json.dumps(coin_data))


        # for i in range(10):
        #     self.send(json.dumps({'value': randint(-20,20)}))
        #     sleep(1)
