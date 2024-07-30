from moviepy.editor import VideoFileClip

def convert_webm_to_mov(webm_path, mov_path):
    clip = VideoFileClip(webm_path)
    clip.write_videofile(mov_path, codec='libx264')

webm_path = "./uploads/video.webm"
mov_path = "./uploads/video.mov"

convert_webm_to_mov(webm_path, mov_path)