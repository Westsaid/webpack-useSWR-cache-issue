function addCss(src) {
  document.querySelector(
    "head"
  ).innerHTML += `<link rel="stylesheet" href="${src}" type="text/css" />`;
}

function addJS(src) {
  const script = document.createElement("script");
  script.setAttribute("src", src);
  document.body.appendChild(script);
}

function buildHeader(templates) {
  Promise.all(
    templates.reverse().map((template) => {
      return fetch(template)
        .then((data) => data.text())
        .then((content) => {
          // const body = document.getElementById(url);
          document.getElementsByTagName("body")[0].innerHTML =
            content + document.getElementsByTagName("body")[0].innerHTML;
        });
    })
  );
}

function buildFooter(templates) {
  Promise.all(
    templates.map((template) => {
      return fetch(template)
        .then((data) => data.text())
        .then((content) => {
          // const body = document.getElementById(url);
          document.getElementsByTagName("body")[0].innerHTML += content;
        });
    })
  );
}

function buildContent(templates) {
  function fetchPage(url) {
    // const placeholder = document.createElement('div');
    // placeholder.id = url;
    // document.getElementById('root').appendChild(placeholder);

    return fetch(url)
      .then((data) => data.text())
      .then((content) => {
        // const body = document.getElementById(url);
        document.getElementById("root").innerHTML += content;
      });
  }

  Promise.all(templates.map((template) => fetchPage(template))).then(() => {
    addJS("/scripts/vendors.js");
    addJS("/scripts/main.js");
  });
}
