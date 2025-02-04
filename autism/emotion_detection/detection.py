from pathlib import Path

import click
import cv2
from matplotlib import pyplot as plt

from fer import FER
from fer.utils import draw_annotations
from fer.classes import Video

mtcnn_help = "Use slower but more accurate mtcnn face detector"


@click.group()
def cli():
    pass


@cli.command()
@click.argument("device", default=0, help="webcam device (usually 0 or 1)")
@click.option("--mtcnn", is_flag=True, help=mtcnn_help)
def webcam(device, mtcnn):
    detector = FER(mtcnn=mtcnn)
    cap = cv2.VideoCapture(device)

    if not cap.isOpened():
        print("Cannot open camera")
        exit()

    while True:
        # Capture frame-by-frame
        ret, frame = cap.read()

        if not ret:
            print("Can't receive frame (stream end?). Exiting ...")
            break

        frame = cv2.flip(frame, 1)
        emotions = detector.detect_emotions(frame)
        frame = draw_annotations(frame, emotions)

        # Display the resulting frame
        cv2.imshow("frame", frame)
        if cv2.waitKey(1) == ord("q"):
            break

    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    cli()