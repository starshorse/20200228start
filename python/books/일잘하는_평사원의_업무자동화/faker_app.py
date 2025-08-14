import pdb 
from faker import Faker
fake = Faker()
pdb.set_trace()
for i in range(10):
    rand_date = fake.date_between( start_date = 'today' , end_date ='+30d')
    print( rand_date) 

