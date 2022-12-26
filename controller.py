from concurrent.futures import thread
import cv2
from api import post_command
import time
import mediapipe as mp

#Checking Camera is Opened or Not

def compare_prev_command(prev_text, text_command):
    return not (prev_text == text_command)




def post_command_value(text_command):
    post_val = ""
    if(text_command == "UP"):
        post_val = "W"
    elif(text_command == "RIGHT"):
        post_val = "D"
    elif(text_command == "LEFT"):
        post_val = "A"
    else:
        post_val = "S"
    return post_val
def capture_run(m):
    text_command , prev_text, prev_pause, pause = "starting", "", "", ""
    cap = cv2.VideoCapture(0)
    cmp = True
    while (cap.isOpened()):
        success , img = cap.read() # reading Frame 
        converted_image = cv2.cvtColor(img,cv2.COLOR_BGR2RGB) # converting BGR to RGB
        results = Hands.process(converted_image) # Processing Image for Tracking 
        location = []
        if results.multi_hand_landmarks: # Getting Landmark(location) of Hands if Exists 
            for hand_in_frame in results.multi_hand_landmarks: # looping through hands exists in the Frame 
                mpDraw.draw_landmarks(img,hand_in_frame, mpHands.HAND_CONNECTIONS) # drawing Hand Connections
            for id,lm in enumerate(results.multi_hand_landmarks[0].landmark):
                h,w,c=img.shape
                cx,cy=int(lm.x*w),int(lm.y*h)
                location.append([cx,cy])
        if(len(location) > 10):
            print(f"location9 {location[9]}")
            print(f"location 8{location[8]}")
            print(f"prevtext {prev_text}")
            print(f"text_command {text_command}")
            print(f"pause or not {pause}")
            if(cmp):
                if((location[9][0])/m < location[9][1] and -(location[9][0])/m + 720 > location[9][1]):
                    text_command = "RIGHT"
                elif(location[9][0]/m < location[9][1] and -(location[9][1])/m + 720 < location[9][1]):
                    text_command = "DOWN"
                elif(location[9][0]/m > location[9][1] and (-(location[9][0])/m) + 720 < location[9][1]):
                    text_command = "LEFT"
                elif(location[9][0]/m > location[9][1] and -(location[9][1])/m + 720 > location[9][1]):
                    text_command = "UP"
                if((location[9][1] < location[8][1])):
                    pause="PAUSE"
                else:
                    pause = "CONT"
        if (prev_text != text_command):
            cmp = False
            prev_text = text_command
            post_command(text_command)
            print(text_command)
        else:
            cmp = True
        if (prev_pause != pause):
            prev_pause = pause
            post_command(pause)
        img = cv2.circle(img, (640,360), radius=0, color=(0, 0, 255), thickness=50)
        cv2.putText(img, text=text_command, thickness=5, org = (1100, 600), fontFace=cv2.FONT_HERSHEY_SIMPLEX, color=(0,0,255), fontScale=1)
        cv2.putText(img, text=pause, thickness=5, org = (500, 500), fontFace=cv2.FONT_HERSHEY_SIMPLEX, color=(0,0,255), fontScale=1)
        cv2.line(img, (640, 360), (0, 0), (0, 255, 0), thickness=2) # from center to top-left
        cv2.line(img, (640, 360), (1280, 0), (0, 255, 0), thickness=2) # from center to top right
        cv2.line(img, (640, 360), (0, 720), (0, 255, 0), thickness=2) # from center to bot left
        cv2.line(img, (640, 360), (1280, 720), (0, 255, 0), thickness=2) #from center to bot right
        cv2.imshow("Hand played snake game", img) # showing Video
        if cv2.waitKey(1) == 113: 
            break

if __name__ == "__main__":
    mpHands = mp.solutions.hands
    Hands = mpHands.Hands()
    mpDraw = mp.solutions.drawing_utils
    m = 1280/720
    capture_run(m)
    post_command("UP")
    time.sleep(2)
    post_command("DOWN")
    post_command("LEFT")
    time.sleep(2)
    post_command("RIGHT")
    post_command("PAUSE")
    time.sleep(2)
    post_command("CONT")