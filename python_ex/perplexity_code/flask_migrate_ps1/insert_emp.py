
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

app = Flask(__name__)
db_path = os.path.join(os.getcwd(), 'instance', 'test.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# --- 필요한 모델만 정의 ---

class TB_Auth_Organization(db.Model):
    __tablename__ = 'TB_Auth_Organization'
    seq = db.Column(db.Integer, primary_key=True)
    orgSeq = db.Column(db.Integer, unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)             # 조직명
    # 필요하면 컬럼 추가 가능

class TB_Auth_Machine(db.Model):
    __tablename__ = 'TB_Auth_Machine'
    id = db.Column(db.Integer, primary_key=True)
    orgSeq = db.Column(db.Integer, nullable=False)
    authOrgSeq = db.Column(db.Integer, nullable=False)
    userSeq = db.Column(db.Integer, nullable=False)
    authOrgUserSeq = db.Column(db.Integer, nullable=False)
    isUnattended = db.Column(db.Boolean, default=False)
    machAuthSecret = db.Column(db.String(512), unique=True, nullable=False)
    machAuthSecretExpiredDateTime = db.Column(db.DateTime, nullable=False)
    machInfo = db.Column(db.String(100))

def insert_auth_machine_fixed_user():
    user_id = 'richard.choi@ez-office.co.kr'  # 고정값

    # authOrgUserSeq 값 (예: 24로 고정, 실제 데이터에 맞게 조정 필요)
    auth_org_user_seq = 24

    # -- TB_Auth_Organization 중 orgSeq=1 인 데이터 조회 --
    auth_org = TB_Auth_Organization.query.filter_by(orgSeq=1).first()
    if not auth_org:
        print("Auth organization with orgSeq=1 not found.")
        return []

    print( auth_org.name );
    # 임의 userSeq 생성 (예: 임의값 999)
    user_seq = 999

    # 고유 train된 machAuthSecret 생성 (유니크값 보장용)
    mach_auth_secret = f'fixed-secret-token-{datetime.utcnow().strftime("%Y%m%d%H%M%S")}'

    # INSERT
    new_machine = TB_Auth_Machine(
        orgSeq=auth_org.orgSeq,
        authOrgSeq=auth_org.seq,
        userSeq=user_seq,
        authOrgUserSeq=auth_org_user_seq,
        isUnattended=False,
        machAuthSecret=mach_auth_secret,
        machAuthSecretExpiredDateTime=datetime(2024, 12, 31),
        machInfo='multiDB'
    )
    db.session.add(new_machine)
    db.session.commit()
    print(f"Inserted TB_Auth_Machine ID: {new_machine.id}")

    # 삽입된 데이터 조회 (authOrgUserSeq 기준)
    inserted_machines = TB_Auth_Machine.query.filter_by(authOrgUserSeq=auth_org_user_seq).all()
    return inserted_machines


if __name__ == '__main__':
    with app.app_context():
        # 사전에 테이블 생성되어 있어야 합니다. (필요 시 db.create_all() 호출)
        # db.create_all()

        results = insert_auth_machine_fixed_user()

        if results:
            print(f"Inserted and queried {len(results)} record(s):")
            for m in results:
                print(f"id={m.id}, machAuthSecret={m.machAuthSecret}, expire={m.machAuthSecretExpiredDateTime}")
        else:
            print("No records found or insert failed.")

