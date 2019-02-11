from __future__ import absolute_import
from celery import shared_task
from .stencil_algorythm import *

def read_colors_from_json(color_list):
    color_sets = []
    for pix in color_list:
        color_sets.append((pix[0], pix[1], pix[2]))
    return color_sets

@shared_task # Make asynchronous function
def find_color_edges(stencil_info):
    im = Image.open(stencil_info['directory'] + '/' + stencil_info['img'])
    colors = read_colors_from_json(stencil_info['colors'])

    merged_colors = split_img_in_colors(im, colors)
    merged_colors_smooth = merged_colors
    #merged_colors_smooth = merged_colors.filter(ImageFilter.ModeFilter(size = 20))
    separate_clrs_pics = get_separate_colors(merged_colors_smooth, colors)
    edges = get_color_edge(separate_clrs_pics, (255, 0, 0))
    for i in range(len(edges)):
        edges[i].save(stencil_info['directory'] + '/' + str(i) + '.jpg', "JPEG")
        merged_colors_smooth.save(stencil_info['directory'] + '/' + stencil_info['stencil'])
    return stencil_info['id']
