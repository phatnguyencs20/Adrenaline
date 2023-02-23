import serial.tools.list_ports
import random
import time
import  sys
from  Adafruit_IO import  MQTTClient

AIO_FEED_IDS = ["humidity", "temperature", "minifan"]
AIO_USERNAME = "phatnt"
AIO_KEY = "aio_xVna17f5ZfmsGHob3HMGeZ7dryiT"

def connected(client):
    print("Ket noi thanh cong...")
    for feed in AIO_FEED_IDS:
        client.subscribe(feed)

def  subscribe(client , userdata , mid , granted_qos):
    print("Subscribe thanh cong...")

def  disconnected(client):
    print("Ngat ket noi...")
    sys.exit (1)

def  message(client , feed_id , payload):
    print("Nhan du lieu: " + payload)
    if isMicrobitConnected:
        ser.write((str(payload) + "#").encode())

client = MQTTClient(AIO_USERNAME , AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()

def getPort():
    ports = serial.tools.list_ports.comports()
    N = len(ports)
    commPort = "None"
    for i in range(0, N):
        port = ports[i]
        strPort = str(port)
        if "USB Serial Device" in strPort:
            splitPort = strPort.split(" ")
            commPort = (splitPort[0])
    return commPort

isMicrobitConnected = False
if getPort() != "None":
    ser = serial.Serial( port=getPort(), baudrate=115200)
    isMicrobitConnected = True

ser = serial.Serial(port = getPort(), baudrate = 115200)

mes = ""
temp_data = 0
def processData(data):
    data = data.replace("!", "") // !
    data = data.replace("#", "") // #
    splitData = data.split(":") // #:
    print(splitData)
    if splitData[1] == "TEMP":
        client.publish("temperature", splitData[2])
        temp_data = splitData[2]

fan_on = True
fan_off = False
def isFanRun(fan_signal):
    if fan_signal == False 
        client.publish ("minifan", fan_off)
    elif fan_signal == True
        client.publish ("minifan", fan_on)

def TempToFan(temp_data):
    if temp_data >= 25 & temp_data <= 30
        isFanRun(1)
        time.sleep(5)

mes = ""
def readSerial():
    bytesToRead = ser.inWaiting()
    if (bytesToRead > 0):
        global mes
        mes = mes + ser.read(bytesToRead).decode("UTF-8")
        while ("#" in mes) and ("!" in mes):
            start = mes.find("!")
            end = mes.find("#")
            processData(mes[start:end + 1])
            if (end == len(mes)):
                mes = ""
            else:
                mes = mess[end+1:]

while True:
    if isMicrobitConnected:
        readSerial()
    time.sleep(1)
