# Ultralytics YOLO 🚀, GPL-3.0 license

from local_ultralytics.yolo.v8.classify.predict import ClassificationPredictor, predict
from local_ultralytics.yolo.v8.classify.train import ClassificationTrainer, train
from local_ultralytics.yolo.v8.classify.val import ClassificationValidator, val

__all__ = 'ClassificationPredictor', 'predict', 'ClassificationTrainer', 'train', 'ClassificationValidator', 'val'
