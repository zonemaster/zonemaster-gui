const TIMEOUT = 10000;
const random = "" + parseInt(Math.random() * 1000000);
const random1 = "" + parseInt(Math.random() * 1000000);
const random2 = "" + parseInt(Math.random() * 1000000);
const random3 = "" + parseInt(Math.random() * 1000000);

module.exports = {
  "Navigation": function(browser) {
     bindHelpers(browser);
    bindComponents(browser);

    var baseUrl = browser.launchUrl || `http://localhost:4200`;


    browser
      .url(`${baseUrl}/domain_check`, 1920, 687, `Load page...`)
      .pause(2000)
      .elTextIs(`div > div > div > div > a`, `CSS`, `En`, `El text is...`)
      .click(`div > div > div > div > a`, `CSS`, `Click element`)
      .elTextIs(`.ml-1`, `CSS`, `Options`, `El text is...`)
      .elTextIs(`.container-fluid > :nth-child(1) h4`, `CSS`, `About Zonemaster`, `El text is...`)
      .elementPresent(`.fa-arrow-up`, `CSS`, `El is present`)
      .click(`.navbar-nav > :nth-child(2) .nav-link`, `CSS`, `Click element`)
      .pathIs(`/faq`, `Path is...`)
      .elTextIs(`app-faq > :nth-child(2) h1`, `CSS`, `Zonemaster`, `El text is...`)
      .click(`div > ol > li:nth-of-type(7) > a`, `CSS`, `Click element`)
      .pathIs(`/faq`, `Path is...`)
      .elTextIs(`div > div > h4:nth-of-type(9)`, `CSS`, `9. Zonemaster and privacy`, `El text is...`)
      .click(`.fa-arrow-up`, `CSS`, `Click element`)
      .click(`div > div > div > div > a:nth-of-type(2)`, `CSS`, `Click element`)
      .click(`div > ol > li > a`, `CSS`, `Click element`)
      .pathIs(`/faq`, `Path is...`)
      .elTextIs(`div > div > h4:nth-of-type(2)`, `CSS`, `2. Qui se cache derrière Zonemaster ?`, `El text is...`)
      .click(`.fa-arrow-up`, `CSS`, `Click element`)
      .click(`.navbar-nav > :nth-child(1) .nav-link`, `CSS`, `Click element`)
      .pathIs(`/domain_check`, `Path is...`)
      .elTextIs(`div > app-form > div > div > div > h1`, `CSS`, `Nom de domaine`, `El text is...`)
      .click(`.slider`, `CSS`, `Click element`)
      .elTextIs(`.alert`, `CSS`, `Notice! More info on undelegated test`, `El text is...`)
      .click(`.navbar-nav > :nth-child(2) .nav-link`, `CSS`, `Click element`)
      .pathIs(`/faq`, `Path is...`)
      .click(`.navbar-nav > :nth-child(1) .nav-link`, `CSS`, `Click element`)
      .pathIs(`/domain_check`, `Path is...`)
      .inputValueAssert(`#advanced_checkbox`, `CSS`, `false`, `Input value is...`)
      .click(`#domain_check_name`, `CSS`, `Click element`)
      .changeInput(`#domain_check_name`, `CSS`, `afnic.fr`, `Change input`)
      .click(`.slider`, `CSS`, `Click element`)
      .click(`.fetchDataFromParent`, `CSS`, `Click element`)
      .pause(2000)
      .inputValueAssert(`div > div:nth-of-type(2) > div > div > form > div > div:nth-of-type(5) > input`, `CSS`, `ns3.nic.fr`, `Input value is...`)
      .click(`.ng-pristine > :nth-child(5) .fa-trash`, `CSS`, `Click element`)
      .click(`.ng-pristine > :nth-child(4) .fa-trash`, `CSS`, `Click element`)
      .click(`div:nth-of-type(2) > div > div > form > div > div:nth-of-type(3) > button > i`, `CSS`, `Click element`)
      .click(`.ng-pristine > :nth-child(2) .fa-trash`, `CSS`, `Click element`)
      .elementPresent(`app-form > div > div:nth-of-type(2) > div > div > form`, `CSS`, `El is present`)
      .scrollWindowToElement(`div > section > div > h4`, `CSS`, `Scroll win to el`)
      .click(`.fa-arrow-up`, `CSS`, `Click element`)
      .click(`#protocol_ipv4`, `CSS`, `Click element`)
      .changeInput(`#protocol_ipv4`, `CSS`, `on`, `Change input`)
      .click(`#protocol_ipv6`, `CSS`, `Click element`)
      .changeInput(`#protocol_ipv6`, `CSS`, `on`, `Change input`)
      .elTextIs(`.alert-danger`, `CSS`, `Choisissez au moins un protocole.`, `El text is...`)
      .click(`#protocol_ipv6`, `CSS`, `Click element`)
      .changeInput(`#protocol_ipv6`, `CSS`, `true`, `Change input`)
      .click(`#protocol_ipv4`, `CSS`, `Click element`)
      .changeInput(`#protocol_ipv4`, `CSS`, `true`, `Change input`)
      .click(`.launch`, `CSS`, `Click element`)
      .pause(1000)
      .elTextIs(`app-result > div > div > div:nth-of-type(2) > div:nth-of-type(2) > span`, `CSS`, `IPv4`, `El text is...`, 15000)
      .inputValueAssert(`#advanced_checkbox`, `CSS`, `false`, `Input value is...`)
      .click(`.logo`, `CSS`, `Click element`)
      .click(`div > div > ul > li > a`, `CSS`, `Click element`)
      .click(`#domain_check_name`, `CSS`, `Click element`)
      .click(`#domain_check_name`, `CSS`, `Click element`)
      .changeInput(`#domain_check_name`, `CSS`, `afnic.fr`, `Change input`)
      .click(`.launch`, `CSS`, `Click element`)
      .inputValueAssert(`advanced_checkbox`, `ID`, `false`, `Input value is...`)
      .end();
  }
};

/*
 * Components
 */

function bindComponents(browser) {

  browser.components = {};


}

/*
 * Auto-Generated helper code
 */





function bindHelpers(browser) {


  var oldUrl = browser.url;
  var oldBack = browser.back;
  var oldForward = browser.forward;
  var oldRefresh = browser.refresh;
  const POLLING_RATE = 1000;

  var snptGetElement =
    `(function() {

      var w = window, d = w.document;

      function xp(x) { var r = d.evaluate(x, d.children[0], null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); return r.snapshotItem(0) };

      return w["snptGetElement"] = function(s, t) {
        try {
          return t === "XPATH" ? xp(s) :
                 t === "ID" ? d.querySelector("#" + s) :
                 t === "ATTR" ? d.querySelector("[" + s + "]") :
                 t === "NAME" ? d.querySelector("[name=\\"" + s + "\\"]") :
                 t === "TEXT" ? xp("//*[contains(text(), '" + s + "')]")
                 : d.querySelector(s); }
        catch(e) {
          return null
        }

      }

    })();`

  function prepStringFuncForExecute(funcToExecute) {
    return 'var passedArgs = Array.prototype.slice.call(arguments,0); return ' + funcToExecute + '.apply(window, passedArgs);';
  };

  function stringFormat(string) {
    var replacers = Array.prototype.slice.call(arguments, 1)

    replacers.forEach((replacer) => {
      string = string.replace("%s", replacer);
  });

    return string;

  };

  function noop() {};

  browser.url = function(pathname, width, height, description) {
    browser.perform(() => comment(description));
    oldUrl(pathname);
    browser.resizeWindow(width, height);
    return this;
  };

  browser.back = function(description) {
    browser.perform(() => comment(description));
    browser.pause(5);
    oldBack();
    return this;
  };

  browser.refresh = function(description) {
    browser.perform(() => comment(description));
    oldRefresh();
    return this;
  };

  browser.forward = function(description) {
    browser.perform(() => comment(description));
    oldForward();
    return this;
  };

  browser.pathIs = function(pathname, description, timeout) {

    var techDescription = stringFormat(" (Path matches '%s')", pathname);

    var attempts = parseInt((timeout || TIMEOUT) / POLLING_RATE);
    var currentAttempt = 0;

    function checkForPageLoadWithPathname(pathname) {
      browser.execute(prepStringFuncForExecute(`function() {
        return {
          pathname: window.location.pathname,
          readyState: document.readyState
        };
      }`), [], function(result) {
        if (result.value.readyState === "complete" && (pathname instanceof RegExp ? pathname.test(result.value.pathname) : result.value.pathname === pathname)) {
          this.assert.ok(true, description + techDescription)
        } else if (currentAttempt === attempts) {
          this.assert.ok(false, description + techDescription)
        } else {
          currentAttempt++;
          browser.pause(POLLING_RATE);
          checkForPageLoadWithPathname(pathname);
        }
      });
    }

    checkForPageLoadWithPathname(pathname);

    browser.execute(prepStringFuncForExecute(`function() {
      window.alert = function() {};
      window.confirm = function() {
        return true;
      };
    }`), []);

    return this;

  };

  browser.executeScript = function(description, script) {
    browser.perform(() => comment(description));
    browser.execute(script, [], function(result) {
      if (result) {
        browser.assert.ok(result, description)
      }
    });

    return this;
  };

  browser.switchToWindow = function(windowIndex, description) {
    browser.perform(() => comment(description));

    browser.windowHandles(function(result) {
      this.switchWindow(result.value[windowIndex]);
    });

    return this;
  };

  browser.scrollWindow = function(x, y, description) {
    browser.perform(() => comment(description));
    browser.execute(prepStringFuncForExecute(`function(x, y) {
      window.scrollTo(x, y);
    }`), [x, y], function(result) {});

    return this;
  };

  browser.scrollElement = function(selector, selectorType = "CSS", x, y, description, timeout) {

    var techDescription = stringFormat("(Scrolling element at '%s' using '%s')", selector, selectorType);

    browser._elementPresent(selector, selectorType, null, timeout, () => {
      browser.assert.ok(false, stringFormat("FAILED: '%s' - Couldn't find element. %s", description, techDescription));
  });

    browser.execute(prepStringFuncForExecute(`function(selector, selectorType, x, y) {

      ${snptGetElement}

      (function(el, x, y) {
        el.scrollLeft = x;
        el.scrollTop = y;
      })(snptGetElement(selector, selectorType), x, y);
    }`), [selector, selectorType, x, y], function(result) {});

    return this;
  };

  browser.scrollWindowToElement = function(selector, selectorType = "CSS", description, timeout) {

    var techDescription = stringFormat("(Scrolling window to el '%s' using '%s')", selector, selectorType);

    browser._elementPresent(selector, selectorType, null, timeout, () => {
      browser.assert.ok(false, stringFormat("FAILED: '%s' - Couldn't find element. %s", description, techDescription));
  });

    browser.execute(prepStringFuncForExecute(`function(selector, selectorType, value) {

      ${snptGetElement}

      (function(el) {
        if (el) {
          var elsScrollY = el.getBoundingClientRect().top + window.scrollY - el.offsetHeight;
          window.scrollTo(0, elsScrollY);
        }
      })(snptGetElement(selector, selectorType), value);
    }`), [selector, selectorType]);

    return this;
  };

  browser.click = function(selector, selectorType = "CSS", description, timeout) {

    var techDescription = stringFormat("(Click '%s' using '%s')", selector, selectorType);

    browser._elementPresent(selector, selectorType, null, timeout, () => {
      browser.assert.ok(false, stringFormat("FAILED: '%s' - Couldn't find element to click. %s", description, techDescription));
  });

    browser.execute(prepStringFuncForExecute(`function(selector, selectorType) {

      ${snptGetElement}

      (function(element) {

        function triggerMouseEvent(node, eventType) {
          var clickEvent = document.createEvent('MouseEvents');
          clickEvent.initEvent(eventType, true, true);
          node.dispatchEvent(clickEvent);
        }

        triggerMouseEvent(element, "mouseover");
        triggerMouseEvent(element, "mousedown");
        triggerMouseEvent(element, "mouseup");
        triggerMouseEvent(element, "click");

      })(snptGetElement(selector, selectorType));

    }`), [selector, selectorType], function(result) {
      if (result.state === "success") {
        this.assert.ok(description + "; " + techDescription);
      }
    });

    return this;

  };

  browser.changeInput = function(selector, selectorType = "CSS", value, description, timeout) {

    var techDescription = stringFormat("(Change input '%s' using '%s')", selector, selectorType);

    browser._elementPresent(selector, selectorType, null, timeout, () => {
      browser.assert.ok(false, stringFormat("FAILED: '%s' - Couldn't find element. %s", description, techDescription));
    });

    browser.execute(prepStringFuncForExecute(`function(selector, selectorType, value) {

      ${snptGetElement}

      (function(el) {
        function triggerKeyEvent(node, eventType) {
          var keydownEvent = document.createEvent( 'KeyboardEvent' );
          keydownEvent.initEvent( eventType, true, false, null, 0, false, 0, false, 66, 0 );
          node.dispatchEvent( keydownEvent );
        }

        if (el) {
          triggerKeyEvent(el, "keydown");
          el.focus();
          el.value = value;
          el.dispatchEvent(new Event('change', {bubbles: true}));
          el.dispatchEvent(new Event('input', {bubbles: true}));
          triggerKeyEvent(el, "keyup");
          triggerKeyEvent(el, "keypress");
        }
      })(snptGetElement(selector, selectorType), value);

    }`), [selector, selectorType, value], function(result) {
      if (result.state === "success") {
        this.assert.ok(description + "; " + techDescription);
      }
    });

    return this;

  };

  browser.elStyleIs = function(selector, selectorType = "CSS", style, value, description, timeout) {

    var techDescription = stringFormat("(Style is '%s' at '%s' using '%s')", value, selector, selectorType);

    browser._elementPresent(selector, selectorType, null, timeout, () => {
      browser.assert.ok(false, stringFormat("FAILED: '%s' - Couldn't find element. %s", description, techDescription));
    });

    var attempts = parseInt((timeout || TIMEOUT) / POLLING_RATE);
    var currentAttempt = 0;

    function checkforStyle(selector, selectorType, style, value) {
      browser.execute(prepStringFuncForExecute(`function(selector, selectorType, style) {
        ${snptGetElement}
        var el = snptGetElement(selector, selectorType);
        return window.getComputedStyle(el, null).getPropertyValue(style);
      }`), [selector, selectorType, style], function(result) {
        if (value instanceof RegExp ? value.test(result.value) : value === result.value) {
          this.assert.ok(true, description + techDescription)
        } else if (currentAttempt === attempts) {
          this.assert.ok(false, description + techDescription)
        } else {
          currentAttempt++;
          console.log("Attempt %s: Actual %s, Expected %s", currentAttempt, result.value, value)
          browser.pause(POLLING_RATE);
          checkforStyle(selector, selectorType, style, value);
        }
      });
    }

    checkforStyle(selector, selectorType, style, value);

    return this;

  };

  browser.inputValueAssert = function(selector, selectorType = "CSS", value, description, timeout) {

    var techDescription = stringFormat("(Assert value '%s' at '%s' using '%s')", value, selector, selectorType);

    browser._elementPresent(selector, selectorType, null, timeout, () => {
      browser.assert.ok(false, stringFormat("FAILED: '%s' - Couldn't find element. %s", description, techDescription));
    });

    var attempts = parseInt((timeout || TIMEOUT) / POLLING_RATE);
    var currentAttempt = 0;

    function checkforValue(selector, selectorType, value) {
      browser.execute(prepStringFuncForExecute(`function(selector, selectorType) {

        ${snptGetElement}

        var el = snptGetElement(selector, selectorType);

        if (el) {
          if (el.type === 'checkbox' || el.type === 'radio') {
            return el.checked ? "true" : "false";
          } else {
            return el.value;
          }
        } else return null;
      }`), [selector, selectorType], function(result) {
        if (value instanceof RegExp ? value.test(result.value) : value === result.value) {
          this.assert.ok(true, description)
        } else if (currentAttempt === attempts) {
          this.assert.ok(false, description)
        } else {
          currentAttempt++;
          browser.pause(POLLING_RATE);
          checkforValue(selector, selectorType, value);
        }
      });
    }

    checkforValue(selector, selectorType, value);

    return this;

  };

  browser.elementPresent = function(selector, selectorType = "CSS", description, timeout) {

    var techDescription = stringFormat("(Element exists' at '%s' using '%s')", selector, selectorType);

    browser._elementPresent(selector, selectorType, null, timeout, () => {
      browser.assert.ok(false, stringFormat("'%s' - Couldn't find element. %s", description, techDescription));
  }, () => {
      browser.assert.ok(true, stringFormat("'%s' - %s", description, techDescription));
    });

    return this;

  };

  browser._elementPresent = function(selector, selectorType = "CSS", description, timeout, onFail = noop, onSuccess = noop) {

    var attempts = parseInt((timeout || TIMEOUT) / POLLING_RATE);
    var currentAttempt = 0;

    function checkforEl(selector) {
      browser.execute(
        prepStringFuncForExecute(`function(selector, selectorType) {
          ${snptGetElement}
          return !!snptGetElement(selector, selectorType);
        }`), [selector, selectorType],
        function(result) {

          if (!result.value && currentAttempt < attempts) {
            currentAttempt++;
            browser.pause(POLLING_RATE);
            checkforEl(selector);
          } else if (!result.value) {
            onFail();
          } else {
            onSuccess();
          }

        });
    }

    checkforEl(selector);

    return this;

  };

  browser.elementNotPresent = function(selector, selectorType = "CSS", description, timeout) {
    browser.perform(() => comment(description));
    browser.waitForElementNotPresent(selector, timeout || TIMEOUT);
    return this;
  };

  browser.focusOnEl = function(selector, selectorType = "CSS", description, timeout) {

    var techDescription = stringFormat("(Focus '%s' at '%s' using '%s')", value, selector, selectorType);

    browser._elementPresent(selector, selectorType, null, timeout, () => {
      browser.assert.ok(false, stringFormat("FAILED: '%s' - Couldn't find element. %s", description, techDescription));
  });

    browser.execute(prepStringFuncForExecute(`function(selector, selectorType) {

      ${snptGetElement}

      (function(el) {
        var event = new FocusEvent('focus');
        el.dispatchEvent(event);
      })(snptGetElement(selector, selectorType));
    }`), [selector, selectorType], function(result) {
      if (result.state === "success") {
        this.assert.ok(description + "; " + techDescription);
      }
    });

    return this;
  };

  browser.formSubmit = function(selector, selectorType = "CSS", description, timeout) {

    var techDescription = stringFormat("(Form Submit at '%s' using '%s')", selector, selectorType);

    browser._elementPresent(selector, selectorType, null, timeout, () => {
      browser.assert.ok(false, stringFormat("FAILED: '%s' - Couldn't find element. %s", description, techDescription));
  });

    browser.execute(prepStringFuncForExecute(`function(selector, selectorType) {

      ${snptGetElement}

      (function(el) {
        var event = new Event('submit');
        el.dispatchEvent(event);
      })(snptGetElement(selector, selectorType));

    }`), [selector, selectorType], function(result) {
      if (result.state === "success") {
        this.assert.ok(description + "; " + techDescription);
      }
    });

    return this;
  };

  browser.blurOffEl = function(selector, selectorType = "CSS", description, timeout) {

    var techDescription = stringFormat("(blur '%s' using '%s')", selector, selectorType);

    browser._elementPresent(selector, selectorType, null, timeout, () => {
      browser.assert.ok(false, stringFormat("FAILED: '%s' - Couldn't find element. %s", description, techDescription));
  });

    browser.execute(prepStringFuncForExecute(`function(selector, selectorType) {

      ${snptGetElement}

      (function(el) {
        var event = new FocusEvent('blur');
        el.dispatchEvent(event);
      })(snptGetElement(selector, selectorType));

    }`), [selector, selectorType], function(result) {
      if (result.state === "success") {
        this.assert.ok(description + "; " + techDescription);
      }
    });

    return this;
  };

  browser._getElText = function(selector, selectorType = "CSS", onSuccess = noop) {

    browser.execute(prepStringFuncForExecute(`function(selector, selectorType) {

    ${snptGetElement}

    return (function(element) {
      if (!element) return null;
      var text = "";
      for (var i = 0; i < element.childNodes.length; ++i)
        if (element.childNodes[i].nodeType === 3)
          if (element.childNodes[i].textContent)
            text += element.childNodes[i].textContent;
      text = text.replace(/(\\r\\n|\\n|\\r)/gm, "");
      return text.trim();
    })(snptGetElement(selector, selectorType));
  }`), [selector, selectorType], function(result) {
      onSuccess(result.value);
    });

    return this;

  };

  browser.elTextIs = function(selector, selectorType = "CSS", assertText, description, timeout) {

    var techDescription = stringFormat("(Assert text matches '%s' at '%s' using '%s')", assertText.toString(), selector, selectorType);

    browser._elementPresent(selector, selectorType, null, timeout, () => {
      browser.assert.ok(false, stringFormat("FAILED: '%s' - Couldn't find element. %s", description, techDescription));
  });

    var attempts = parseInt((timeout || TIMEOUT) / POLLING_RATE);
    var currentAttempt = 0;

    function checkforText(selector, selectorType, assertText) {
      browser._getElText(selector, selectorType, function(elsText) {
        if (assertText instanceof RegExp ? assertText.test(elsText) : assertText === elsText) {
          browser.assert.ok(true, description)
        } else if (currentAttempt === attempts) {
          browser.assert.ok(false, description)
        } else {
          currentAttempt++;
          browser.pause(POLLING_RATE);
          checkforText(selector, selectorType, assertText);
        }
      });
    }

    checkforText(selector, selectorType, assertText);

    return this;

  };

  function comment(description) {
    if (description) {
      console.log(description);
    }
  }

  browser.capabilities['networkConnectionEnabled'] = true;
  browser.capabilities['browserConnectionEnabled'] = true;

};
