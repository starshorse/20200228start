from typing import List, Optional

from sqlalchemy import Column, Computed, DECIMAL, Date, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, SmallInteger, String, Table, Unicode, text
from sqlalchemy.dialects.mssql import DATETIMEOFFSET, TINYINT, XML
from sqlalchemy.orm import Mapped, declarative_base, mapped_column, relationship
from sqlalchemy.orm.base import Mapped

Base = declarative_base()
metadata = Base.metadata


class DefectiveStock(Base):
    __tablename__ = 'Defective_Stock'
    __table_args__ = (
        PrimaryKeyConstraint('Df_ID', name='PK__Defectiv__8DF0E1D91168B687'),
    )

    Df_ID = mapped_column(Integer, Identity(start=1, increment=1))
    Df_Date = mapped_column(String(7, 'Korean_Wansung_CI_AS'))
    Df_Stock = mapped_column(String(50, 'Korean_Wansung_CI_AS'))
    Df_Qty = mapped_column(Integer)


class InTable(Base):
    __tablename__ = 'In_Table'
    __table_args__ = (
        PrimaryKeyConstraint('ID', name='PK__In_Table__3214EC275F7F36D7'),
    )

    ID = mapped_column(Integer, Identity(start=1, increment=1))
    In_Date = mapped_column(String(10, 'Korean_Wansung_CI_AS'))
    Employee = mapped_column(String(50, 'Korean_Wansung_CI_AS'))
    Stock = mapped_column(String(50, 'Korean_Wansung_CI_AS'))
    Qty = mapped_column(Integer)


class IndexLogs(Base):
    __tablename__ = 'index_logs'
    __table_args__ = (
        PrimaryKeyConstraint('log_id', name='PK__index_lo__9E2397E0CE200E04'),
    )

    log_id = mapped_column(Integer, Identity(start=1, increment=1))
    event_data = mapped_column(XML, nullable=False)
    changed_by = mapped_column(Unicode(128), nullable=False)


class Invoices(Base):
    __tablename__ = 'invoices'
    __table_args__ = (
        PrimaryKeyConstraint('id', name='PK__invoices__3213E83F623A6D77'),
    )

    id = mapped_column(Integer, Identity(start=1, increment=1))
    customer_id = mapped_column(Integer, nullable=False)
    total = mapped_column(DECIMAL(10, 2), nullable=False, server_default=text('((0))'))

    invoice_items: Mapped[List['InvoiceItems']] = relationship('InvoiceItems', uselist=True, back_populates='invoice')


class Messages(Base):
    __tablename__ = 'messages'
    __table_args__ = (
        PrimaryKeyConstraint('id', name='PK__messages__3213E83F1A871128'),
    )

    id = mapped_column(Integer, Identity(start=1, increment=1))
    message = mapped_column(String(255, 'Korean_Wansung_CI_AS'), nullable=False)
    created_at = mapped_column(DATETIMEOFFSET, nullable=False)


class Persons(Base):
    __tablename__ = 'persons'
    __table_args__ = (
        PrimaryKeyConstraint('person_id', name='PK__persons__543848DFF1BDA8A4'),
    )

    person_id = mapped_column(Integer, Identity(start=1, increment=1))
    first_name = mapped_column(Unicode(100), nullable=False)
    last_name = mapped_column(Unicode(100), nullable=False)
    full_name = mapped_column(Unicode(201), Computed("(([first_name]+' ')+[last_name])", persisted=True), nullable=False)
    dob = mapped_column(Date)
    age_in_years = mapped_column(Integer, Computed('((CONVERT([int],CONVERT([char](8),getdate(),(112)))-CONVERT([char](8),[dob],(112)))/(10000))', persisted=False))


t_product_master = Table(
    'product_master', metadata,
    Column('product_id', Integer, nullable=False),
    Column('product_name', String(255, 'Korean_Wansung_CI_AS'), nullable=False),
    Column('model_year', SmallInteger, nullable=False),
    Column('list_price', DECIMAL(10, 2), nullable=False),
    Column('brand_name', String(255, 'Korean_Wansung_CI_AS'), nullable=False),
    Column('category_name', String(255, 'Korean_Wansung_CI_AS'), nullable=False)
)


class ProductionBrands(Base):
    __tablename__ = 'production.brands'
    __table_args__ = (
        PrimaryKeyConstraint('brand_id', name='PK__producti__5E5A8E2780B98236'),
    )

    brand_id = mapped_column(Integer)
    brand_name = mapped_column(String(255, 'Korean_Wansung_CI_AS'), nullable=False)

    production_products: Mapped[List['ProductionProducts']] = relationship('ProductionProducts', uselist=True, back_populates='brand')


class ProductionCategories(Base):
    __tablename__ = 'production.categories'
    __table_args__ = (
        PrimaryKeyConstraint('category_id', name='PK__producti__D54EE9B4E16212C1'),
    )

    category_id = mapped_column(Integer)
    category_name = mapped_column(String(255, 'Korean_Wansung_CI_AS'), nullable=False)

    production_products: Mapped[List['ProductionProducts']] = relationship('ProductionProducts', uselist=True, back_populates='category')


class ReportDailySales(Base):
    __tablename__ = 'report.daily_sales'
    __table_args__ = (
        PrimaryKeyConstraint('Id', name='PK__report.d__3214EC07B987314E'),
    )

    Id = mapped_column(Integer)
    Day = mapped_column(Date, nullable=False)
    Amount = mapped_column(DECIMAL(10, 2), nullable=False, server_default=text('((0))'))


class Salaries(Base):
    __tablename__ = 'salaries'
    __table_args__ = (
        PrimaryKeyConstraint('staff_id', name='PK__salaries__1963DD9CA6E34378'),
    )

    staff_id = mapped_column(Integer)
    hourly_rate = mapped_column(DECIMAL(18, 0))
    weekly_rate = mapped_column(DECIMAL(18, 0))
    monthly_rate = mapped_column(DECIMAL(18, 0))


class SalesCustomers(Base):
    __tablename__ = 'sales.customers'
    __table_args__ = (
        PrimaryKeyConstraint('customer_id', name='PK__sales.cu__CD65CB853EB6B22E'),
        Index('ix_cust_email_inc', 'email', unique=True),
        Index('ix_cust_email_local_part', 'email_local_part'),
        Index('ix_cust_phone', 'phone'),
        Index('ix_customers_city', 'city'),
        Index('ix_customers_name', 'last_name', 'first_name'),
        Index('nidx_fname', 'first_name'),
        Index('nidx_lname', 'last_name')
    )

    customer_id = mapped_column(Integer)
    first_name = mapped_column(String(255, 'Korean_Wansung_CI_AS'), nullable=False)
    last_name = mapped_column(String(255, 'Korean_Wansung_CI_AS'), nullable=False)
    email = mapped_column(String(255, 'Korean_Wansung_CI_AS'), nullable=False)
    phone = mapped_column(String(25, 'Korean_Wansung_CI_AS'))
    street = mapped_column(String(255, 'Korean_Wansung_CI_AS'))
    city = mapped_column(String(50, 'Korean_Wansung_CI_AS'))
    state = mapped_column(String(25, 'Korean_Wansung_CI_AS'))
    zip_code = mapped_column(String(5, 'Korean_Wansung_CI_AS'))
    email_local_part = mapped_column(String(255, 'Korean_Wansung_CI_AS'))

    sales_orders: Mapped[List['SalesOrders']] = relationship('SalesOrders', uselist=True, back_populates='customer')


class SalesStores(Base):
    __tablename__ = 'sales.stores'
    __table_args__ = (
        PrimaryKeyConstraint('store_id', name='PK__sales.st__A2F2A30CE1C01CE5'),
    )

    store_id = mapped_column(Integer)
    store_name = mapped_column(String(255, 'Korean_Wansung_CI_AS'), nullable=False)
    phone = mapped_column(String(25, 'Korean_Wansung_CI_AS'))
    email = mapped_column(String(255, 'Korean_Wansung_CI_AS'))
    street = mapped_column(String(255, 'Korean_Wansung_CI_AS'))
    city = mapped_column(String(255, 'Korean_Wansung_CI_AS'))
    state = mapped_column(String(10, 'Korean_Wansung_CI_AS'))
    zip_code = mapped_column(String(5, 'Korean_Wansung_CI_AS'))

    sales_staffs: Mapped[List['SalesStaffs']] = relationship('SalesStaffs', uselist=True, back_populates='store')
    production_stocks: Mapped[List['ProductionStocks']] = relationship('ProductionStocks', uselist=True, back_populates='store')
    sales_orders: Mapped[List['SalesOrders']] = relationship('SalesOrders', uselist=True, back_populates='store')


class Sysdiagrams(Base):
    __tablename__ = 'sysdiagrams'
    __table_args__ = (
        PrimaryKeyConstraint('diagram_id', name='PK__sysdiagr__C2B05B61F407D94E'),
        Index('UK_principal_name', 'principal_id', 'name', unique=True)
    )

    name = mapped_column(Unicode(128), nullable=False)
    principal_id = mapped_column(Integer, nullable=False)
    diagram_id = mapped_column(Integer, Identity(start=1, increment=1))
    version = mapped_column(Integer)
    definition = mapped_column(LargeBinary)


t_t1 = Table(
    't1', metadata,
    Column('id', Integer, Identity(start=1, increment=1), nullable=False),
    Column('a', Integer),
    Column('b', Integer),
    Index('ix_uniq_ab', 'a', 'b', unique=True)
)


t_t2 = Table(
    't2', metadata,
    Column('c', String(50, 'Korean_Wansung_CI_AS')),
    Index('a_uniq_t2', 'c', unique=True)
)


t_t3 = Table(
    't3', metadata,
    Column('c', String(50, 'Korean_Wansung_CI_AS'))
)


class InvoiceItems(Base):
    __tablename__ = 'invoice_items'
    __table_args__ = (
        ForeignKeyConstraint(['invoice_id'], ['invoices.id'], ondelete='CASCADE', onupdate='CASCADE', name='FK__invoice_i__invoi__5E8A0973'),
        PrimaryKeyConstraint('id', 'invoice_id', name='PK__invoice___BD4B37EB83F3919C')
    )

    id = mapped_column(Integer, nullable=False)
    invoice_id = mapped_column(Integer, nullable=False)
    item_name = mapped_column(String(100, 'Korean_Wansung_CI_AS'), nullable=False)
    amount = mapped_column(DECIMAL(10, 2), nullable=False)
    tax = mapped_column(DECIMAL(4, 2), nullable=False)

    invoice: Mapped['Invoices'] = relationship('Invoices', back_populates='invoice_items')


class ProductionProducts(Base):
    __tablename__ = 'production.products'
    __table_args__ = (
        ForeignKeyConstraint(['brand_id'], ['production.brands.brand_id'], ondelete='CASCADE', onupdate='CASCADE', name='FK__productio__brand__4D94879B'),
        ForeignKeyConstraint(['category_id'], ['production.categories.category_id'], ondelete='CASCADE', onupdate='CASCADE', name='FK__productio__categ__4CA06362'),
        PrimaryKeyConstraint('product_id', name='PK__producti__47027DF5F5AC1952')
    )

    product_id = mapped_column(Integer)
    product_name = mapped_column(String(255, 'Korean_Wansung_CI_AS'), nullable=False)
    brand_id = mapped_column(Integer, nullable=False)
    category_id = mapped_column(Integer, nullable=False)
    model_year = mapped_column(SmallInteger, nullable=False)
    list_price = mapped_column(DECIMAL(10, 2), nullable=False)

    brand: Mapped['ProductionBrands'] = relationship('ProductionBrands', back_populates='production_products')
    category: Mapped['ProductionCategories'] = relationship('ProductionCategories', back_populates='production_products')
    production_stocks: Mapped[List['ProductionStocks']] = relationship('ProductionStocks', uselist=True, back_populates='product')
    sales_order_items: Mapped[List['SalesOrderItems']] = relationship('SalesOrderItems', uselist=True, back_populates='product')


class SalesStaffs(Base):
    __tablename__ = 'sales.staffs'
    __table_args__ = (
        ForeignKeyConstraint(['manager_id'], ['sales.staffs.staff_id'], name='FK__sales.sta__manag__3B75D760'),
        ForeignKeyConstraint(['store_id'], ['sales.stores.store_id'], ondelete='CASCADE', onupdate='CASCADE', name='FK__sales.sta__store__3A81B327'),
        PrimaryKeyConstraint('staff_id', name='PK__sales.st__1963DD9CCFC22EFE'),
        Index('UQ__sales.st__AB6E6164B4031426', 'email', unique=True)
    )

    staff_id = mapped_column(Integer)
    first_name = mapped_column(String(50, 'Korean_Wansung_CI_AS'), nullable=False)
    last_name = mapped_column(String(50, 'Korean_Wansung_CI_AS'), nullable=False)
    email = mapped_column(String(255, 'Korean_Wansung_CI_AS'), nullable=False)
    active = mapped_column(TINYINT, nullable=False)
    store_id = mapped_column(Integer, nullable=False)
    phone = mapped_column(String(25, 'Korean_Wansung_CI_AS'))
    manager_id = mapped_column(Integer)

    manager: Mapped[Optional['SalesStaffs']] = relationship('SalesStaffs', remote_side=[staff_id], back_populates='manager_reverse')
    manager_reverse: Mapped[List['SalesStaffs']] = relationship('SalesStaffs', uselist=True, remote_side=[manager_id], back_populates='manager')
    store: Mapped['SalesStores'] = relationship('SalesStores', back_populates='sales_staffs')
    sales_orders: Mapped[List['SalesOrders']] = relationship('SalesOrders', uselist=True, back_populates='staff')


class ProductionStocks(Base):
    __tablename__ = 'production.stocks'
    __table_args__ = (
        ForeignKeyConstraint(['product_id'], ['production.products.product_id'], ondelete='CASCADE', onupdate='CASCADE', name='FK__productio__produ__5CD6CB2B'),
        ForeignKeyConstraint(['store_id'], ['sales.stores.store_id'], ondelete='CASCADE', onupdate='CASCADE', name='FK__productio__store__5BE2A6F2'),
        PrimaryKeyConstraint('store_id', 'product_id', name='PK__producti__E68284D373ACE50C')
    )

    store_id = mapped_column(Integer, nullable=False)
    product_id = mapped_column(Integer, nullable=False)
    quantity = mapped_column(Integer)

    product: Mapped['ProductionProducts'] = relationship('ProductionProducts', back_populates='production_stocks')
    store: Mapped['SalesStores'] = relationship('SalesStores', back_populates='production_stocks')


class SalesOrders(Base):
    __tablename__ = 'sales.orders'
    __table_args__ = (
        ForeignKeyConstraint(['customer_id'], ['sales.customers.customer_id'], ondelete='CASCADE', onupdate='CASCADE', name='FK__sales.ord__custo__52593CB8'),
        ForeignKeyConstraint(['staff_id'], ['sales.staffs.staff_id'], name='FK__sales.ord__staff__5441852A'),
        ForeignKeyConstraint(['store_id'], ['sales.stores.store_id'], ondelete='CASCADE', onupdate='CASCADE', name='FK__sales.ord__store__534D60F1'),
        PrimaryKeyConstraint('order_id', name='PK__sales.or__46596229617E44B5')
    )

    order_id = mapped_column(Integer)
    order_status = mapped_column(TINYINT, nullable=False)
    order_date = mapped_column(Date, nullable=False)
    required_date = mapped_column(Date, nullable=False)
    store_id = mapped_column(Integer, nullable=False)
    staff_id = mapped_column(Integer, nullable=False)
    customer_id = mapped_column(Integer)
    shipped_date = mapped_column(Date)

    customer: Mapped[Optional['SalesCustomers']] = relationship('SalesCustomers', back_populates='sales_orders')
    staff: Mapped['SalesStaffs'] = relationship('SalesStaffs', back_populates='sales_orders')
    store: Mapped['SalesStores'] = relationship('SalesStores', back_populates='sales_orders')
    sales_order_items: Mapped[List['SalesOrderItems']] = relationship('SalesOrderItems', uselist=True, back_populates='order')


class SalesOrderItems(Base):
    __tablename__ = 'sales.order_items'
    __table_args__ = (
        ForeignKeyConstraint(['order_id'], ['sales.orders.order_id'], ondelete='CASCADE', onupdate='CASCADE', name='FK__sales.ord__order__5812160E'),
        ForeignKeyConstraint(['product_id'], ['production.products.product_id'], ondelete='CASCADE', onupdate='CASCADE', name='FK__sales.ord__produ__59063A47'),
        PrimaryKeyConstraint('order_id', 'item_id', name='PK__sales.or__837942D4388CABD8')
    )

    order_id = mapped_column(Integer, nullable=False)
    item_id = mapped_column(Integer, nullable=False)
    product_id = mapped_column(Integer, nullable=False)
    quantity = mapped_column(Integer, nullable=False)
    list_price = mapped_column(DECIMAL(10, 2), nullable=False)
    discount = mapped_column(DECIMAL(4, 2), nullable=False, server_default=text('((0))'))

    order: Mapped['SalesOrders'] = relationship('SalesOrders', back_populates='sales_order_items')
    product: Mapped['ProductionProducts'] = relationship('ProductionProducts', back_populates='sales_order_items')
