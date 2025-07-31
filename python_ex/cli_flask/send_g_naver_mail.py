import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
import os 

def send_mail(subject, body, to_addr_list, file_path, email_host, email_port, user, app_password):
    msg = MIMEMultipart()
    msg['From'] = user
    msg['To'] = ','.join(to_addr_list)
    msg['Subject'] = subject

    msg.attach(MIMEText(body, 'plain'))

    with open(file_path, 'rb') as log:
        part = MIMEBase('application', 'octet-stream')
        part.set_payload(log.read())
        encoders.encode_base64(part)
        part.add_header('Content-Disposition', f'attachment; filename={os.path.basename(file_path)}')
        msg.attach(part)

    server = smtplib.SMTP_SSL(email_host, email_port)
    server.login(user, app_password)
    server.sendmail(user, to_addr_list, msg.as_string())
    server.quit()

