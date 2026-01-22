import cv2

class VideoService:
    def __init__(self, camera_id=0):
        self.cap = cv2.VideoCapture(camera_id)

        if not self.cap.isOpened():
            raise RuntimeError("❌ Cannot open webcam")

    def read(self):
        return self.cap.read()

    def release(self):
        self.cap.release()
        cv2.destroyAllWindows()
