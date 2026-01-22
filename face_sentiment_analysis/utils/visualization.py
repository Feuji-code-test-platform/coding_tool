import cv2

FACE_COLOR = (0, 255, 0)
WARNING_COLOR = (0, 0, 255)

# Yellow for both eye corners and iris
EYE_IRIS_COLOR = (0, 255, 255)

LEFT_EYE = [33, 133]
RIGHT_EYE = [362, 263]

LEFT_IRIS = [474, 475, 476, 477]
RIGHT_IRIS = [469, 470, 471, 472]

def draw_faces(frame, faces):
    """
    Draw bounding boxes around detected faces
    """
    for (x, y, w, h) in faces:
        cv2.rectangle(
            frame,
            (x, y),
            (x + w, y + h),
            FACE_COLOR,
            2
        )

def draw_eye_landmarks(frame, landmarks):
    h, w, _ = frame.shape

    # Draw eye corners
    for idx in LEFT_EYE + RIGHT_EYE:
        x = int(landmarks[idx].x * w)
        y = int(landmarks[idx].y * h)
        cv2.circle(frame, (x, y), 2, EYE_IRIS_COLOR, -1)

    # Draw iris
    for idx in LEFT_IRIS + RIGHT_IRIS:
        x = int(landmarks[idx].x * w)
        y = int(landmarks[idx].y * h)
        cv2.circle(frame, (x, y), 2, EYE_IRIS_COLOR, -1)

def draw_gaze_text(frame, direction):
    cv2.putText(
        frame,
        f"GAZE: {direction}",
        (30, 80),
        cv2.FONT_HERSHEY_SIMPLEX,
        1,
        (255, 255, 0),
        2
    )
    
def draw_gaze_counts(frame, counts):
    y = 120
    for direction, count in counts.items():
        cv2.putText(
            frame,
            f"{direction}: {count}",
            (30, y),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            (255, 255, 0),
            2
        )
        y += 30
        
def draw_total_gaze_count(frame, count):
    cv2.putText(
        frame,
        f"TOTAL EYE MOVEMENTS: {count}",
        (30, 120),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.9,
        (0, 255, 255),
        2
    )
