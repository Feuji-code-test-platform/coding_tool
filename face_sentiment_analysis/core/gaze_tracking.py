import mediapipe as mp
import numpy as np

class GazeTracker:
    def __init__(self):
        self.last_direction = "CENTER"
        self.total_movements = 0
        self.mp_face_mesh = mp.solutions.face_mesh
        self.face_mesh = self.mp_face_mesh.FaceMesh(
            refine_landmarks=True,   # REQUIRED for iris landmarks
            max_num_faces=1,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        )

    def process(self, frame_rgb):
        return self.face_mesh.process(frame_rgb)
    
    def get_gaze_direction(self, landmarks, eps=0.012):
        LEFT_EYE = [33, 133]
        RIGHT_EYE = [362, 263]

        LEFT_IRIS = [474, 475, 476, 477]
        RIGHT_IRIS = [469, 470, 471, 472]

        def center(points):
            return np.mean(points, axis=0)

        # Eye centers
        left_eye = [(landmarks[i].x, landmarks[i].y) for i in LEFT_EYE]
        right_eye = [(landmarks[i].x, landmarks[i].y) for i in RIGHT_EYE]

        # Iris centers
        left_iris = [(landmarks[i].x, landmarks[i].y) for i in LEFT_IRIS]
        right_iris = [(landmarks[i].x, landmarks[i].y) for i in RIGHT_IRIS]

        eye_cx, eye_cy = center(left_eye + right_eye)
        iris_cx, iris_cy = center(left_iris + right_iris)

        dx = iris_cx - eye_cx
        dy = iris_cy - eye_cy

        if abs(dx) < eps and abs(dy) < eps:
            return "CENTER", dx, dy

        if abs(dx) > abs(dy):
            return ("RIGHT" if dx > 0 else "LEFT"), dx, dy
        else:
            return ("DOWN" if dy > 0 else "UP"), dx, dy
        
    def update_total_count(self, direction):
            if direction != self.last_direction:
                if direction != "CENTER":
                    self.total_movements += 1
                self.last_direction = direction

            return self.total_movements
        
    def update_counts(self, direction):
        """
        Count gaze direction transitions
        """
        if direction != self.last_direction:
            if direction in self.counts:
                self.counts[direction] += 1
            self.last_direction = direction

        return self.counts
