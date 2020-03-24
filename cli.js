#!/usr/bin/env node
'use strict'
const meow = require('meow')
const fn = require('./dist').default

const cli = meow(
  `
  Usage
  $ extract-react-intl-messages <input>
  $ extract-messages <input>

  Options
  -o, --output            Output directory [require: true]
  -l, --locales           locales [require: true]
  -f, --format            json | yaml [default: json]
  -d, --default-locale    default locale
  --overwriteDefault      [default: true]
  --flat                  json [default: true] | yaml [default: false]

  Example
  $ extract-messages --locales=ja,en --output app/translations 'app/**/*.js'
  $ extract-messages -l=ja,en -o app/translations -f yaml 'app/**/messages.js'
`,
  {
    flags: {
      flat: {
        type: 'boolean'
      },
      output: {
        type: 'string',
        alias: 'o'
      },
      locales: {
        type: 'string',
        alias: 'l'
      },
      format: {
        type: 'string',
        alias: 'f',
        default: 'json'
      },
      'default-locale': {
        type: 'string',
        alias: 'd'
      },
      overwriteDefault: {
        type: 'boolean',
        default: true
      },
      withDescriptions: {
        type: 'boolean',
        default: false
      },
      // babel-plugin-react-intl boolean options
      extractSourceLocation: {
        type: 'boolean',
        default: false
      },
      removeDefaultMessage: {
        type: 'boolean'
      },
      extractFromFormatMessageCall: {
        type: 'boolean',
        default: true
      }
    }
  }
)

const { output, locales } = cli.flags

if (!output) {
  console.log('ERROR: required output')
  process.exit(1)
}

if (!locales || typeof locales !== 'string') {
  console.log('ERROR: required locales')
  process.exit(1)
}

const localesMap = locales.split(',')

fn(localesMap, cli.input[0], output, cli.flags)
