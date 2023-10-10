import re 
regex = '^[1-9]{1}\d{0,1}|0{1}\.{1}\d{0,2}$'

# regex = '^[0-9]{1}'

print( re.match( regex, '0.756' ))
print( re.match( regex, '1.7'   ))


strs = '0.7'.split('.')
strs[1] = strs[1][0:2]
strs = '.'.join(strs)

print( strs )

