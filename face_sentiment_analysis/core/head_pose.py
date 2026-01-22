import cv2
import numpy as np

class HeadPoseEstimator:
    def __init__(self):
        # 3D model points (approximate human face)
        self.model_points = np.array([
            (0.0, 0.0, 0.0),        # Nose tip
            (0.0, -330.0, -65.0),   # Chin
            (-225.0, 170.0, -135.0),# Left eye corner
            (225.0, 170.0, -135.0), # Right eye corner
            (-150.0, -150.0, -125.0),# Left mouth corner
            (150.0, -150.0, -125.0) # Right mouth corner
        ], dtype="double")

        # MediaPipe landmark indices
        self.landmark_ids = [1, 152, 33, 263, 61, 291]

    def estimate(self, landmarks, frame_shape):
        h, w, _ = frame_shape

        image_points = np.array([
            (landmarks[i].x * w, landmarks[i].y * h)
            for i in self.landmark_ids
        ], dtype="double")

        focal_length = w
        center = (w / 2, h / 2)

        camera_matrix = np.array([
            [focal_length, 0, center[0]],
            [0, focal_length, center[1]],
            [0, 0, 1]
        ], dtype="double")

        dist_coeffs = np.zeros((4, 1))

        success, rotation_vec, _ = cv2.solvePnP(
            self.model_points,
            image_points,
            camera_matrix,
            dist_coeffs,
            flags=cv2.SOLVEPNP_ITERATIVE
        )

        if not success:
            return None, None

        rotation_mat, _ = cv2.Rodrigues(rotation_vec)
        angles, _, _, _, _, _ = cv2.RQDecomp3x3(rotation_mat)

        pitch, yaw, roll = angles
        return pitch, yaw
