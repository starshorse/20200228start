from .external import generate_models

try:
    VERSION = __import__("pkg_resources").get_distribution("madax_oaas").version
except Exception:
    VERSION = "unknown"


__version__ = VERSION

