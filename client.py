# client
import socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
host = 'localhost'
port = 1234
s.connect((host, port))

while True:
    data = input('Write to server: ')
    if not data:
        s.close()
    data = str.encode(data)
    s.send(data)
tm = s.recv(1024)

s.close()

print("The time from the server is %s" % tm.decode('ascii'))