#!/usr/bin/env python3
import json
import logging
import sys
from argparse import ArgumentParser, FileType
from pathlib import Path

import yaml

LOG = logging.getLogger('genlore')


def create_parser(prog_name):
    parser = ArgumentParser(prog=prog_name, description='Generate GeoJSON from Markdown')
    parser.add_argument('--output', '-o', metavar='PATH', type=FileType('w'), default=sys.stdout,
                        help='The path to which to store output')
    parser.add_argument('--input', '-i', metavar='PATH', default='lore',
                        help='The path from which to load Markdown')
    parser.add_argument('--quiet', '-q', action='store_true', default='False',
                        help='Make the application quieter')
    return parser


def transform_feature(feature):
    coords = feature.pop('coordinates')
    link = feature.pop('link', None)
    if link:
        name = feature.get('name')
        desc = feature.get('description')
        if name and desc:
            replacement = '<a href="{}" target="blank">{}</a>'.format(link, name)
            feature['description'] = desc.replace(name, replacement)
    return {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': coords
        },
        'properties': feature,
    }


def parse_lore(path):
    geojson = None
    with path.open() as f:
        lore = yaml.load(f, Loader=yaml.SafeLoader)
    if lore:
        geojson = {
            'type': 'FeatureCollection',
            'features': [transform_feature(feature) for feature in lore]
        }
    return geojson


def parse_many_lore(path, stream):
    if path.is_dir():
        prefix = ''
        for lorepath in path.rglob('*.yaml'):
            lore = parse_lore(lorepath)
            if lore:
                print(f'{prefix}var geo{lorepath.stem} = ', file=stream, end='')
                json.dump(lore, stream, indent=2)
                print(';', file=stream)
                prefix = '\n'
    else:
        lore = parse_lore(path)
        if lore:
            print(f'var geo{path.stem} = ', file=stream, end='')
            json.dump(lore, stream, indent=2)
            print(';', file=stream)


def setup_logging(quiet=False):
    logging.basicConfig(format='%(levelname)s: %(message)s', stream=sys.stderr)
    LOG.setLevel(logging.WARNING if quiet else logging.INFO)


def main():
    parser = create_parser(sys.argv[0])
    args = parser.parse_args(sys.argv[1:])
    setup_logging(args.quiet)

    path = Path(args.input)
    if not path.exists():
        LOG.error('%s: does not exist', path.to_posix())
    parse_many_lore(path, args.output)


if __name__ == '__main__':
    main()
