/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

function getParameterByName(queryString, name) {
  // Escape special RegExp characters
  name = name.replace(/[[^$.|?*+(){}\\]/g, "\\$&");
  // Create Regular expression
  var regex = new RegExp("(?:[?&]|^)" + name + "=([^&#]*)");
  // Attempt to get a match
  var results = regex.exec(queryString);
  return decodeURIComponent(results[1].replace(/\+/g, " ")) || "";
}

selectCard = (item, e) => {
  console.log("selectCard:", e);
  return new Promise((t, l) => {
    try {
      //document.getElementsByClassName("_awwm2v").item(1).getElementsByClassName("_1kf6gff").item(e).click();

      //document.getElementsByClassName("_1kf6gff").item(e).click();

      item.click();

      t(true);
    } catch (e) {
      console.log("selectCard error:", e);
      t(false);
    }
  });
};

timeout = (e) => {
  return new Promise((t, l) => {
    try {
      setTimeout(function () {
        t();
      }, e);
    } catch (e) {
      console.log(e);
    }
  });
};

scrapCurrentPage = (item, cardIndex) => {
  return new Promise(async (l, a) => {
    try {
      if (document.getElementsByClassName("_r47nf").length >= 2) {
        let a = {};

        const card = document.getElementsByClassName("_r47nf").item(1);

        try {
          //if (null === card.getElementsByClassName("_tvxwjf").item(0)) {

          a.name = item
            .getElementsByClassName("_zjunba")
            .item(0)
            .querySelector("a > span > span").innerText;

          // a.name = card
          // .getElementsByTagName("_49kxlr")
          // .item(0)
          //   .getElementsByTagName("_tvxwjf")
          //   .item(0)
          //   .getElementsByTagName("span")
          //   .item(0).innerText;
          a.find = "true";
          //}
        } catch (e) {
          console.log("name: error: ", e);
        }

        try {
          null !==
            card
              .getElementsByClassName("_1pfef7u")
              .item(0)
              .getElementsByClassName("_jspzdm")
              .item(0) &&
            (a.rating = card
              .getElementsByClassName("_1pfef7u")
              .item(0)
              .getElementsByClassName("_jspzdm")
              .item(0).innerText);

          if (a.rating) {
            //a.rating = a.rating.match(/[0-9]+/g);
            a.rating = a.rating.replace(/[^0-9]/g, "");
          }
        } catch (e) {
          console.log("rating: error: ", e);
        }

        try {
          null !==
            card
              .getElementsByClassName("_1pfef7u")
              .item(0)
              .getElementsByClassName("_y10azs")
              .item(0) &&
            (a.review = card
              .getElementsByClassName("_1pfef7u")
              .item(0)
              .getElementsByClassName("_y10azs")
              .item(0).innerText);

          // if (a.review) {
          //   //a.review.replace(" reviews", "");
          //   a.review = a.review.replace(/[^0-9]/g, "");
          // }
        } catch (e) {
          console.log("review: error: ", e);
        }

        try {
          // a.business = card
          //   .getElementsByClassName("_1tfwnxl")
          //   .item(0)
          //   .getElementsByClassName("_1w9o2igt")
          //   .item(0).innerText;

          a.business = item
            .getElementsByClassName("_1idnaau")
            .item(0)
            .querySelector("span").innerText;
        } catch (e) {
          console.log("business: error: ", e);
        }

        try {
          a.address = item
            .getElementsByClassName("_1w9o2igt")
            .item(0).innerText;
          // const addressLine1 =  card.getElementsByClassName('_49kxlr').item(0).getElementsByClassName(
          //   '_13eh3hvq'
          // ).item(0).getElementsByClassName("_er2xx9").item(0).getElementsByClassName("a")
          // .item(0)
          // .innerText;

          // const addressLine2 =  card.getElementsByClassName('_49kxlr').item(0).getElementsByClassName(
          //   '_13eh3hvq'
          // ).item(0).getElementsByClassName("_1p8iqzw").item(0).innerText;

          // const addressLine3 =  card.getElementsByClassName('_49kxlr').item(0).getElementsByClassName(
          //   '_13eh3hvq'
          // ).item(0).getElementsByClassName("_1p8iqzw").item(1).innerText;

          // const addressLine4 =  card.getElementsByClassName('_49kxlr').item(0).getElementsByClassName(
          //   '_13eh3hvq'
          // ).item(1).innerText;

          // a.address = addressLine1+", "+addressLine2+", "+addressLine3+", "+addressLine4;
        } catch (e) {
          console.log("address: error: ", e);
        }



        try {

          var contactUrls =  card
          .querySelectorAll("._49kxlr a");

          contactUrls = [...contactUrls];

          a.phone = [];
          a.website = [];


          console.log("contactUrls: ", contactUrls.length);

          if(contactUrls.length > 0){
            await asyncForEach(contactUrls, async (aTag, i) => {

              const url = aTag.getAttribute("href");
              const target = aTag.getAttribute("target");

              //console.log("contactUrls: "+i, url);

              if (url.startsWith("tel")) {
                a.phone.push(url.replace("tel:", ""));
              }else if(url.startsWith("http") && target === "_blank"){
                a.website.push(aTag.innerText);
              }

            })
          }


          // const urls = card
          //   .getElementsByClassName("_49kxlr")
          //   .item(2)
          //   .querySelectorAll("a");
          // //.getAttribute("href");

          // a.phone = [];
          // if (urls.length > 0) {
          //   await asyncForEach(urls, async (aTag, i) => {
          //     const url = aTag.getAttribute("href");

          //     if (url.startsWith("tel")) {
          //       a.phone.push(url.replace("tel:", ""));
          //     }
          //   });
          // }

          a.phone = a.phone.join(",");
          a.website = a.website.join(",");
        } catch (e) {
          console.log("phone and website: error: ", e);
        }

        // try {
        //   var startIndex = a.phone ? 3 : 2;

        //   const card4 = card
        //     .getElementsByClassName("_49kxlr")
        //     .item(startIndex)
        //     .querySelector("a");

        //   if (card4 != null) {
        //     if (card4.innerText !== "Consumer rights feedback") {
        //       a.website = card4.innerText;
        //     }
        //   }

        //   const card5 = card
        //     .getElementsByClassName("_49kxlr")
        //     .item(startIndex + 1)
        //     .querySelector("a");

        //   if (card5 != null) {
        //     if (card5.innerText !== "Consumer rights feedback") {
        //       a.website = card5.innerText;
        //     }
        //   }
        // } catch (e) {
        //   console.log("website: error: ", e);
        // }

        try {
          const urlPath = window.location.pathname.split("?")[0];
          const lastPath = urlPath.split("/").reverse()[0];

          a.latitude = lastPath.split("%2C")[0];
          a.longitude = lastPath.split("%2C")[1];
        } catch (e) {
          console.log("latitude-longitude: error: ", e);
        }

        l(a);
      } else a("Does not find card");
    } catch (e) {
      console.log("scrapCurrentPage error:", e);
      a("error");
      return null;
    }
  });
};

const insertItem = (keyword, data) => {
  console.log("insertItem:", JSON.stringify(data));

  chrome.storage.local.get("scrap", function (res) {
    if (res.scrap.hasOwnProperty(keyword)) {
      //if (typeof res.scrap[keyword] !== "undefined") {
      if (res.scrap[keyword].data instanceof Array) {
        //res.scrap[keyword].data = [...res.scrap[keyword].data,data];
        res.scrap[keyword].data.push(data);
      } else {
        res.scrap[keyword].data = [data];
      }
    } else {
      res.scrap[keyword] = {
        name: keyword,
        data: [data],
      };
    }
    chrome.storage.local.set({ scrap: res.scrap });
  });
};

startScraping = (keyword, setting) => {
  console.log("startScraping start");

  return new Promise(async (resolve, reject) => {
    const items1 = document.getElementsByClassName("_1kf6gff");
    const items2 = document.getElementsByClassName("_5b28jpo");

    const items = [...items1, ...items2];

    if (
      null !== document.getElementsByClassName("_n5hmn94").item(0) ||
      items.length > 0
    ) {
      console.log("startScraping next page exist");

      //start scraping

      const totalCards = items.length;

      console.log("startScraping total card:", totalCards);

      var keywordData = [];

      await timeout(1000);

      //for (let i = 0; i < totalCards; i++) {
      //items.item(i).click();

      await asyncForEach(items, async (item, i) => {
        const selectCardSuccess = await selectCard(item, i);

        await timeout((setting.delay ?? 1) * 2000);

        if (selectCardSuccess) {
          // goLoop = true;
          // var cardPopupResult = null;
          // while (goLoop) {
          //await timeout((setting.delay ?? 1) * 1000);
          cardPopupResult = await scrapCurrentPage(item, i);

          console.log(
            "startScraping cardPopupResult:",
            JSON.stringify(cardPopupResult)
          );

          //   if (cardPopupResult) {
          //     goLoop = false;
          //     //keywordData.push(cardPopupResult)
          //   }
          // }

          if (cardPopupResult) {
            await insertItem(keyword, cardPopupResult);
          } else {
            console.log(
              "startScraping card " + i + ": data not found",
              totalCards
            );
          }
        } else {
          console.log("select card failed");
          //resolve(false);
        }
      });

      //await insertItem(keyword, keywordData);

      resolve(true);
    } else {
      resolve(false);
    }
  });
};

(async () => {
  console.log("Scraping Started");

  console.log("URI:", location.href);

  const inputKeyword = location.href.split("/").reverse()[0];

  const keyword = decodeURIComponent(inputKeyword)
    .replace(/ /g, "_")
    .toLowerCase(); //getParameterByName(location.href, "keyword");
  console.log("Scraping keyword:", keyword);
  const { setting } = await chrome.storage.local.get("setting");
  console.log("Scraping setting:", setting);
  var isDone = false;
  var page = 1;

  while (!isDone) {
    const result = await startScraping(keyword, setting);

    console.log("startScraping response:", result);

    if (!result) {
      isDone = true;
    } else {
      //next page
      try {
        //disable - _7q94tr
        //enable - _n5hmn94

        const disablePage = "_7q94tr";
        const enablePage = "_n5hmn94";

        const pageBox = document.getElementsByClassName("_5ocwns").item(0);
        //const prevPageClass = pageBox.querySelectorAll("div")[0].className;
        const nextPageClass = pageBox.querySelectorAll("div")[1].className;

        const nextBtn = document.getElementsByClassName("_n5hmn94");

        //1st page
        if (nextPageClass === enablePage && nextBtn.length > 0) {
          // if(page === 2 && false){
          //   alert("This is a trial demo you can't scrape more then 2 pages")
          //   isDone = true;
          // }else{
          pageBox.querySelectorAll("div")[1].click();
          page = page + 1;
          await timeout(2000);
          //}
        } else {
          isDone = true;
        }

        // if (nextPageFound) {
        //   await timeout(2000);
        // } else {
        //   isDone = true;
        // }
      } catch (e) {
        console.log(e);
        isDone = true;
      }
    }
  }

  //auto download file
  chrome.runtime.sendMessage({
    type: "download",
    keyword: keyword,
  });

  console.log("Scraping done:", isDone);
})();

(async () => {
  try {
    chrome.storage.onChanged.addListener(function (e, t) {
      let l = document.getElementsByClassName("collectedData").item(0),
        a = parseInt(l.innerText);
      l.innerText = ++a;
    });
  } catch (e) {
    console.log(e);
  }
})();
