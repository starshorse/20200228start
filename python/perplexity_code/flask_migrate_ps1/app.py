from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import datetime, timedelta

app = Flask(__name__)

# DB 설정 (SQLite 예시, 필요시 다른 DB로 변경)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# 조직 테이블
class TB_Auth_Organization(db.Model):
    __tablename__ = 'TB_Auth_Organization'
    seq = db.Column(db.Integer, primary_key=True, autoincrement=True)
    orgSeq = db.Column(db.Integer, unique=True, nullable=False)  # 조직 고유 코드
    name = db.Column(db.String(100), nullable=False)             # 조직명

    # 조직과 머신 관계 설정
    machines = db.relationship('TB_Auth_Machine', backref='organization', lazy=True)

    def __repr__(self):
        return f'<Org seq={self.seq} orgSeq={self.orgSeq} name={self.name}>'

# 머신 테이블
class TB_Auth_Machine(db.Model):
    __tablename__ = 'TB_Auth_Machine'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    orgSeq = db.Column(db.Integer, db.ForeignKey('TB_Auth_Organization.orgSeq'), nullable=False)
    authOrgSeq = db.Column(db.Integer, nullable=False)
    userSeq = db.Column(db.Integer, nullable=False)
    authOrgUserSeq = db.Column(db.Integer, nullable=False)
    isUnattended = db.Column(db.Boolean, default=False)
    machAuthSecret = db.Column(db.String(512), unique=True, nullable=False)  # 고유 토큰 값
    machAuthSecretExpiredDateTime = db.Column(db.DateTime, nullable=False)
    machInfo = db.Column(db.String(100), nullable=True)

    def __repr__(self):
        return f'<Machine id={self.id} machAuthSecret={self.machAuthSecret}>'

# 더미 데이터 10개 생성 및 DB에 저장
def insert_dummy_data():
    # 조직 2개 생성
    org1 = TB_Auth_Organization(orgSeq=1, name='CompanyA')
    org2 = TB_Auth_Organization(orgSeq=2, name='CompanyB')
    db.session.add_all([org1, org2])
    db.session.commit()

    # 머신 10개 생성
    for i in range(10):
        secret_value = f'secret-token-{i}-{datetime.utcnow().strftime("%Y%m%d%H%M%S")}'
        expire_dt = datetime.utcnow() + timedelta(days=365)

        machine = TB_Auth_Machine(
            orgSeq=1 if i < 5 else 2,
            authOrgSeq=10 + i,
            userSeq=100 + i,
            authOrgUserSeq=200 + i,
            isUnattended=(i % 2 == 0),
            machAuthSecret=secret_value,
            machAuthSecretExpiredDateTime=expire_dt,
            machInfo='multiDB'
        )
        db.session.add(machine)
    db.session.commit()
    print("더미 데이터 10개 삽입 완료")

if __name__ == "__main__":
    with app.app_context():
        # 첫 실행 시에는 마이그레이션을 수행(아래 명령어 참고 후 실행)
        # 마이그레이션이 완료된 후에 insert_dummy_data() 실행 권장

        insert_dummy_data()

        # 데이터 확인
        machines = TB_Auth_Machine.query.all()
        for m in machines:
            print(m)

