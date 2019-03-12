const seleniumServer = require("selenium-server");
const chromedriver = require("chromedriver");

module.exports = {
  "src_folders": ["src"],
  "output_folder": "reports",
  "page_objects_path": "pages",

  "selenium": {
    "start_process": true,
    "server_path": seleniumServer.path,
    "log_path": "",
    "host": "127.0.0.1",
    "port": 4444, // standard selenium port
    "cli_args": {
      "webdriver.chrome.driver": chromedriver.path
    }
  },

  "test_settings": {
    "default": {
      "launch_url": "http://localhost",
      "selenium_port"  : 4444,
      "selenium_host"  : "localhost",
      "silent": true,
      "screenshots": {
        "enabled": false,
        "path": ""
      },
      "desiredCapabilities": {
        "browserName": "firefox",
        "javascriptEnabled": true,
        "acceptSslCerts": true,
        "firefoxOptions": {
          "args": [
            "--window-size=1280,1024"
          ]
        }
      },
      "globals": {
        "waitForConditionTimeout": 5000 // sometimes internet is slow so wait.
      }
    },

    "chrome": {
      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled": true,
        "acceptSslCerts": true,
        "chromeOptions": {
          "args": [
            "--window-size=1280,1024"
          ]
        }
      }
    }
  }
};
