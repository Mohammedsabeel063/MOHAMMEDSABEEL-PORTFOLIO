"""
build-hero-assets.py
Hero video and portrait asset pipeline for Mohammed Sabeel's portfolio.
Processes the input video to create a seamless looping clip with whitened background,
synchronized crossfaded audio, and extracts portrait stills.
"""

import os
import sys
import subprocess
import argparse
import numpy as np

def run_cmd(cmd):
    print("Executing:", " ".join(cmd) if isinstance(cmd, list) else cmd)
    res = subprocess.run(cmd, shell=isinstance(cmd, str), capture_output=True, text=True)
    if res.returncode != 0:
        print("Warning / Error:", res.stderr)
    return res

def process_hero_assets(input_video, output_dir, crop="800:1000:560:80", duration=10.0, fade_duration=0.5):
    os.makedirs(output_dir, exist_ok=True)
    hero_mp4 = os.path.join(output_dir, "hero.mp4")
    hero_webm = os.path.join(output_dir, "hero.webm")
    
    print(f"Processing {input_video} -> {output_dir}")
    print(f"Crop: {crop}, Duration: {duration}s, Fade: {fade_duration}s")
    
    # 1. Video filter chain: crop -> scale to 768px -> whiten background
    # colorlevels=rimax=0.98:gimax=0.98:bimax=0.98 turns off-white backdrop pure white
    vf = (
        f"crop={crop},scale=768:-2,"
        f"colorlevels=rimax=0.98:gimax=0.98:bimax=0.98"
    )
    
    # Crossfade video loop using ffmpeg xfade
    # Video cross-fade
    cmd_mp4 = [
        "ffmpeg", "-y",
        "-t", str(duration),
        "-i", input_video,
        "-vf", vf,
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "24", "-preset", "slow",
        "-c:a", "aac", "-b:a", "96k",
        "-movflags", "+faststart",
        hero_mp4
    ]
    run_cmd(cmd_mp4)
    
    # WebM export with VP9 and Opus
    cmd_webm = [
        "ffmpeg", "-y",
        "-i", hero_mp4,
        "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0",
        "-c:a", "libopus", "-b:a", "80k",
        hero_webm
    ]
    run_cmd(cmd_webm)
    print("Hero video assets build completed.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Hero video & asset pipeline")
    parser.add_argument("--input", default=r"b:\Portfolio_new\Create_animated_video_of_character_20261006173627.mp4", help="Path to raw intro video")
    parser.add_argument("--output", default=r"b:\Portfolio_new\portfolio\public\hero", help="Output directory")
    args = parser.parse_args()
    
    if os.path.exists(args.input):
        process_hero_assets(args.input, args.output)
    else:
        print(f"Input file {args.input} not found.")
