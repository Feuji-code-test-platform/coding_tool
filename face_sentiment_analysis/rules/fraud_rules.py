import time

class FraudRules:
    def __init__(self, max_no_face_seconds=5, max_faces=1):
        self.max_no_face_seconds = max_no_face_seconds
        self.max_faces = max_faces
        self.no_face_start_time = None

    def evaluate(self, face_count):
        alerts = []

        # Rule 1: No face detected
        if face_count == 0:
            if self.no_face_start_time is None:
                self.no_face_start_time = time.time()
            else:
                elapsed = time.time() - self.no_face_start_time
                if elapsed > self.max_no_face_seconds:
                    alerts.append("❌ NO FACE DETECTED")
        else:
            self.no_face_start_time = None

        # Rule 2: Multiple faces detected
        if face_count > self.max_faces:
            alerts.append("👥 MULTIPLE FACES DETECTED")

        return alerts