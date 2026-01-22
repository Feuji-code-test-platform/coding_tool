import cv2

from services.video_service import VideoService
from core.face_detection import FaceDetector
from core.gaze_tracking import GazeTracker
from utils.visualization import (
    draw_faces,
    draw_eye_landmarks,
    draw_gaze_text,
    draw_total_gaze_count
)
from core.head_pose import HeadPoseEstimator


def main():
    video = VideoService()
    detector = FaceDetector()
    gaze_tracker = GazeTracker()
    head_pose = HeadPoseEstimator()


    print("✅ Webcam started. Click the video window and press 'q' to quit.")

    while True:
        ret, frame = video.read()
        if not ret:
            break

        # ----------------------------
        # Face detection
        # ----------------------------
        faces = detector.detect(frame)
        draw_faces(frame, faces)

        # ----------------------------
        # Gaze tracking
        # ----------------------------
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        gaze_result = gaze_tracker.process(frame_rgb)

        gaze_direction = "CENTER"
        total_movements = gaze_tracker.total_movements

        if gaze_result.multi_face_landmarks:
            landmarks = gaze_result.multi_face_landmarks[0].landmark

            # Draw eye + iris landmarks
            draw_eye_landmarks(frame, landmarks)

            # Get gaze direction + debug values
            gaze_direction, dx, dy = gaze_tracker.get_gaze_direction(landmarks)

            # Update TOTAL eye movement count
            total_movements = gaze_tracker.update_total_count(gaze_direction)

            # Debug overlay (VERY IMPORTANT)
            cv2.putText(
                frame,
                f"dx={dx:.3f}, dy={dy:.3f}",
                (30, 160),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.7,
                (0, 255, 255),
                2
            )

        # ----------------------------
        # Visualization
        # ----------------------------
        draw_gaze_text(frame, gaze_direction)
        draw_total_gaze_count(frame, total_movements)

        cv2.imshow("Face Proctoring + Gaze Tracking", frame)

        # Quit
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # 🔴 IMPORTANT: release AFTER loop
    video.release()


if __name__ == "__main__":
    main()
