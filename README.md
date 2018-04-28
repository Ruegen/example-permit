# Authentication example for node

## Packages
- express
- [permit](https://github.com/ianstormtaylor/permit)

## Why Permit?
- alternative to passport js
- less tightly coupled to express (can be used elsewhere)
- simpler

## Concepts
### login
login via query strings, basic email and password authentication

### authentication
using jwt sent via the Bearer header, each jwt is verified
if the jwt fails, authentication fails



