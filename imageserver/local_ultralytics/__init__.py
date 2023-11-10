# Ultralytics YOLO 🚀, GPL-3.0 license

__version__ = '8.0.59'

# from imageserver.local_ultralytics.yolo.engine.model import YOLO
# from imageserver.local_ultralytics.yolo.utils.checks import check_yolo as checks
from local_ultralytics.yolo.engine.model import YOLO
from local_ultralytics.yolo.utils.checks import check_yolo as checks

__all__ = '__version__', 'YOLO', 'checks'  # allow simpler import
