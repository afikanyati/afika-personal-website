# Afika Nyati Personal Website
--------------------------
Afika Nyati's personal website, written as a Node.js application with use of ReactJS for front-end services. The application uses ES6 syntax.

## Workflow and versioning

Instructions for deploying are given near the end of this document. Deployment
corresponds to the tip of `master` branch. As such, development should occur on
branches other than `master`. The version number is kept in package.json.
Currently, there is no practice of tagging commits because merges into `master`
branch represent releases.

## Testing


### Tests particular client-side

To get the Selenium standalone server that the curator-portal configuration of
Nightwatch (http://nightwatchjs.org/) is expecting,

    ./get-testing-deps.sh

For end-to-end testing, install ChromeDriver
(https://sites.google.com/a/chromium.org/chromedriver/).
On an Ubuntu host, try

    sudo apt-get install chromium-chromedriver

On Debian GNU/Linux, use instead `apt-get install chromedriver`.

Note that nightwatch.json lists the path of the ChromeDriver executable as
/usr/lib/chromium-browser/chromedriver, which is consistent with the location
from the `chromium-chromedriver` deb package. You might need to change the path
on other systems.  In particular, on Debian, it is
/usr/lib/chromium/chromedriver.
