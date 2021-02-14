#!/usr/bin/env python3
import logging
import sys
from argparse import ArgumentParser

LOG = logging.getLogger('gentiles')


def create_parser(prog_name):
    parser = ArgumentParser(prog=prog_name, description='Generate GeoJSON from Markdown')
    parser.add_argument('output', metavar='OUTPUT', help='The path to which to store output')
    parser.add_argument('--input', '-i', metavar='PATH', default='lore',
                        help='The path from which to load Markdown')
    parser.add_argument('--quiet', '-q', action='store_true', default='False',
                        help='Make the application quieter')
    return parser


def setup_logging(quiet=False):
    logging.basicConfig(format='%(levelname)s: %(message)s', stream=sys.stderr)
    LOG.setLevel(logging.WARNING if quiet else logging.INFO)


def main():
    parser = create_parser(sys.argv[0])
    opts = parser.parse_args(sys.argv[1:])
    setup_logging(opts.quiet)
    LOG.error('Not yet implemented')


if __name__ == '__main__':
    main()
