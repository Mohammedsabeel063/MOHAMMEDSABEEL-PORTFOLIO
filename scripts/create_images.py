import os
from PIL import Image

pub_dir = r"b:\Portfolio_new\portfolio\public"
bust_png = os.path.join(pub_dir, "portrait-bust.png")

if os.path.exists(bust_png):
    img = Image.open(bust_png)
    # create portrait-bust.webp (480x600)
    resized_bust = img.resize((480, 600), Image.Resampling.LANCZOS)
    resized_bust.save(os.path.join(pub_dir, "portrait-bust.webp"), "WEBP", quality=90)
    print("Created portrait-bust.webp")

    # create og.jpg (1200x630)
    og_img = Image.new("RGB", (1200, 630), color=(244, 242, 238)) # --paper color
    # paste bust in center/right or center
    bust_og = img.resize((400, 500), Image.Resampling.LANCZOS)
    og_img.paste(bust_og, (700, 65))
    og_img.save(os.path.join(pub_dir, "og.jpg"), "JPEG", quality=90)
    print("Created og.jpg")
