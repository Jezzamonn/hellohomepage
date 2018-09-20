#!/bin/bash
gsutil -m cp index.html gs://www.jezzamon.com/
gsutil -m cp preview.png gs://www.jezzamon.com/
gsutil -m cp -r build/ gs://www.jezzamon.com/
gsutil -m cp -r css/ gs://www.jezzamon.com/
gsutil -m acl ch -u AllUsers:R gs://www.jezzamon.com/index.html
gsutil -m acl ch -u AllUsers:R gs://www.jezzamon.com/preview.png
gsutil -m acl ch -r -u AllUsers:R gs://www.jezzamon.com/build/
gsutil -m acl ch -r -u AllUsers:R gs://www.jezzamon.com/css/
