
console.log("✅ RUN.JS IS LOADED");



//...............................................
// 🎵 SOUND EFFECTS
//...............................................

const nextSound = new Audio("sounds.mp3/next page.mp3");

const backSound = new Audio("sounds.mp3/back4.mp3");

const envelopeSound = new Audio("sounds.mp3/letteropen.mp3");

const letterSound = new Audio("sounds.mp3/letter8.mp3");

//...............................................
// 🎶 BACKGROUND MUSIC
//...............................................

const backgroundMusic = new Audio("music/background.mp3");

backgroundMusic.loop = true;
backgroundMusic.volume = 0.25;



const owlVideo = document.querySelector("#welcomeScreen #owl");
if (owlVideo && owlVideo.tagName === "VIDEO") {
    owlVideo.muted = true;
    owlVideo.play().catch(function () {
        console.log("The owl video could not autoplay.");
    });
}

//...............................................
// 📊 VISITOR TRACKING
//...............................................

// Create one anonymous ID for this visitor
let visitorId =
    localStorage.getItem("birthday_visitor_id");

if (!visitorId) {

    visitorId =
        crypto.randomUUID();

    localStorage.setItem(
        "birthday_visitor_id",
        visitorId
    );

}


//...............................................
// 📊 VISITOR DEVICE INFORMATION
//...............................................

function getDeviceInfo() {

    const userAgent =
        navigator.userAgent;

    let device = "Desktop";

    if (/tablet|ipad/i.test(userAgent)) {

        device = "Tablet";

    }

    else if (
        /mobile|android|iphone|ipod/i.test(userAgent)
    ) {

        device = "Mobile";

    }


    let model = "Unknown";

    // Android device model
    const androidMatch =
        userAgent.match(
            /Android[^;]*;\s*(?:[^;]+;\s*)?([^;)]+)\)?\s*Build/i
        );

    if (androidMatch) {

        model =
            androidMatch[1].trim();

    }

    // iPhone
    else if (/iPhone/i.test(userAgent)) {

        model = "iPhone";

    }

    // iPad
    else if (/iPad/i.test(userAgent)) {

        model = "iPad";

    }


    let browser = "Unknown";

    if (/Edg\//i.test(userAgent)) {

        browser = "Microsoft Edge";

    }

    else if (/Chrome\//i.test(userAgent)) {

        browser = "Google Chrome";

    }

    else if (/Firefox\//i.test(userAgent)) {

        browser = "Mozilla Firefox";

    }

    else if (/Safari\//i.test(userAgent)) {

        browser = "Safari";

    }


    let platform =
        navigator.platform || "Unknown";


    let platformVersion =
        "Unknown";

    if (
        navigator.userAgentData &&
        navigator.userAgentData.platform
    ) {

        platform =
            navigator.userAgentData.platform;

    }


    return {

        device: device,

        model: model,

        browser: browser,

        platform: platform,

        platform_version:
            platformVersion,

        screen_width:
            window.screen.width,

        screen_height:
            window.screen.height

    };

}


//...............................................
// 📊 SEND DATA TO NETLIFY
//...............................................

function sendTrackingData(data) {

    const deviceInfo =
        getDeviceInfo();


    const trackingData = {

        visitor_id:
            visitorId,

        event_type:
            data.event_type,

        page:
            window.location.pathname,

        section:
            data.section || null,

        device:
            deviceInfo.device,

        model:
            deviceInfo.model,

        browser:
            deviceInfo.browser,

        platform:
            deviceInfo.platform,

        platform_version:
            deviceInfo.platform_version,

        screen_width:
            deviceInfo.screen_width,

        screen_height:
            deviceInfo.screen_height,

        time_spent_seconds:
            data.time_spent_seconds || null

    };


    fetch(
        "/.netlify/functions/track",
        {

            method: "POST",

            headers: {

                "Content-Type":
                    "application/json"

            },

            body:
                JSON.stringify(
                    trackingData
                )

        }
    )

    .then(function (response) {

        if (!response.ok) {

            console.error(
                "Tracking failed:",
                response.status
            );

        }

    })

    .catch(function (error) {

        console.error(
            "Tracking error:",
            error
        );

    });

}


//...............................................
// 📊 TRACK INITIAL VISIT
//...............................................

sendTrackingData({

    event_type:
        "visit",

    section:
        "welcome"

});


//...............................................
// 📊 SECTION TIME TRACKING
//...............................................

let sectionStartTime =
    Date.now();


function trackSectionTime() {

    const seconds =
        Math.round(
            (Date.now() -
                sectionStartTime) /
            1000
        );


    sendTrackingData({

        event_type:
            "section_time",

        section:
            "chapter_" +
            (currentSection + 1),

        time_spent_seconds:
            seconds

    });


    sectionStartTime =
        Date.now();

}


//...............................................
// 1. GET HTML ELEMENTS
//...............................................

const welcomeScreen =
    document.getElementById("welcomeScreen");


const mainContent =
    document.getElementById("mainContent");


const startBtn =
    document.getElementById("startBtn");

    const portalIntro = document.getElementById("portalIntro");


const backBtn =
    document.getElementById("backBtn");


const nextBtn =
    document.getElementById("nextBtn");


const storySections = [

    document.getElementById("section1"),

    document.getElementById("section2"),

    document.getElementById("section3"),

    document.getElementById("section4")

];


const letterSection =
    document.getElementById("letterSection");


const envelopeBtn =
    document.getElementById("envelopeBtn");


const envelopeBackBtn =
    document.getElementById("envelopeBackBtn");


const letterOverlay =
    document.getElementById("letterOverlay");


const bigEnvelope =
    document.getElementById("bigEnvelope");


const closeLetter =
    document.getElementById("closeLetter");


const thankYouSection =
    document.getElementById("thankYouSection");


/*...............................................
   ❄️ MAGICAL SNOWFALL JAVASCRIPT
...............................................*/

const snowfallContainer =
    document.getElementById("snowfall-container");

if (snowfallContainer) {

    const snowSymbols = ["❄", "❅", "❆", "✧", "✦"];

    // Limit the number of snowflakes for mobile performance.
    const isMobile = window.matchMedia(
        "(max-width: 600px)"
    ).matches;

    const maxSnowflakes = isMobile ? 28 : 55;

    function createSnowflake() {

        if (
            document.hidden ||
            snowfallContainer.childElementCount >= maxSnowflakes
        ) {
            return;
        }

        const snowflake = document.createElement("span");

        const isSparkle = Math.random() < 0.22;

        snowflake.className = isSparkle
            ? "snowflake sparkle"
            : "snowflake";

        snowflake.textContent = isSparkle
            ? (Math.random() < 0.5 ? "✧" : "✦")
            : snowSymbols[
                Math.floor(Math.random() * 3)
            ];

        const size = isSparkle
            ? Math.random() * 8 + 8
            : Math.random() * 12 + 8;

        const duration = Math.random() * 6 + 7;

        snowflake.style.left =
            Math.random() * 100 + "%";

        snowflake.style.fontSize = size + "px";

        snowflake.style.animationDuration =
            duration + "s";

        snowflake.style.opacity =
            Math.random() * 0.55 + 0.35;

        snowfallContainer.appendChild(snowflake);

        snowflake.addEventListener("animationend", function () {
            snowflake.remove();
        }, { once: true });
    }

    // Create an initial layer of snow.
    for (let i = 0; i < maxSnowflakes; i++) {
        setTimeout(function () {
            createSnowflake();
        }, i * 120);
    }

    // Keep snow falling continuously.
    const snowfallInterval = setInterval(function () {
        if (!document.hidden) {
            createSnowflake();
        }
    }, isMobile ? 380 : 240);

    // Stop generating new snow while the tab is hidden.
    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            snowfallContainer.replaceChildren();
        } else {
            for (let i = 0; i < maxSnowflakes; i++) {
                setTimeout(createSnowflake, i * 80);
            }
        }
    });
}
//...............................................
// 2. WEBSITE VARIABLES
//...............................................

let currentSection = 0;


//...............................................
// 3. START BUTTON
//...............................................
backgroundMusic.play().catch(function (error) {
    console.log("Background music could not start:", error);
});


// START — 🪄 CINEMATIC PORTAL TRANSITION
startBtn.addEventListener("click", function () {
    // Hide welcome screen and prepare Chapter 1
    welcomeScreen.classList.add("hidden");
    mainContent.classList.remove("hidden");

    currentSection = 0;
    showSection(currentSection);

    // Start background music if you added it earlier
    if (typeof backgroundMusic !== "undefined") {
        backgroundMusic.play().catch(function (error) {
            console.log("Background music could not start:", error);
        });
    }

    // If the portal HTML is missing, start normally
    if (!portalIntro) {
        return;
    }

    // Show the magical portal over the website
    portalIntro.classList.remove("hidden");
    portalIntro.setAttribute("aria-hidden", "false");

    // Reveal Chapter 1 after the 5-second cinematic intro
    setTimeout(function () {
        portalIntro.classList.add("hidden");
        portalIntro.setAttribute("aria-hidden", "true");
    }, 5000);
});

    



//...............................................
// 4. SHOW STORY SECTION
//...............................................

function showSection(sectionNumber) {

    storySections.forEach(
        function (section) {

            section.classList.add(
                "hidden-section"
            );

        }
    );


    storySections[sectionNumber]
        .classList.remove(
            "hidden-section"
        );


    // Track which chapter was viewed
    sendTrackingData({

        event_type:
            "section_view",

        section:
            "chapter_" +
            (sectionNumber + 1)

    });

}


//...............................................
// 5. NEXT BUTTON
//...............................................

nextBtn.addEventListener(
    "click",
    function () {

        nextSound.currentTime = 0;

        nextSound.play();


        // Record time spent on current chapter
        trackSectionTime();


        const currentPage =
            storySections[currentSection];


        currentPage.classList.add(
            "chapter-exit"
        );


        setTimeout(
            function () {

                currentPage.classList.remove(
                    "chapter-exit"
                );


                if (
                    currentSection <
                    storySections.length - 1
                ) {

                    currentSection++;

                    showSection(
                        currentSection
                    );

                }

                else {

                    openLetterSection();

                }

            },
            750
        );

    }
);


//...............................................
// 6. BACK BUTTON
//...............................................

backBtn.addEventListener(
    "click",
    function () {

        if (
            currentSection === 0
        ) {

            return;

        }


        backSound.currentTime = 0;

        backSound.play();


        // Record time spent on current chapter
        trackSectionTime();


        const currentPage =
            storySections[currentSection];


        currentPage.classList.add(
            "chapter-exit"
        );


        setTimeout(
            function () {

                currentPage.classList.remove(
                    "chapter-exit"
                );


                currentSection--;

                showSection(
                    currentSection
                );

            },
            750
        );

    }
);


// 💗 Hearts appear 20 seconds after opening the letter
let letterHeartTimer = null;
let letterHeartInterval = null;

function startLetterHeartSurprise() {
    clearTimeout(letterHeartTimer);
    clearInterval(letterHeartInterval);

    letterHeartTimer = setTimeout(function () {
        letterHeartInterval = setInterval(function () {
            const heart = document.createElement("span");
            heart.className = "letter-heart";

            const hearts = ["💗", "💕", "💖", "💘", "♥️"];
            heart.textContent =
                hearts[Math.floor(Math.random() * hearts.length)];

            heart.style.left = Math.random() * 95 + "vw";
            heart.style.animationDuration =
                (4 + Math.random() * 3) + "s";

            document.body.appendChild(heart);

            setTimeout(function () {
                heart.remove();
            }, 7500);
        }, 350);
    }, 20000);
}




//...............................................
// 7. OPEN ENVELOPE SECTION
//...............................................

function openLetterSection() {

    storySections.forEach(
        function (section) {
            section.classList.add(
                "hidden-section"
            );
        }
    );

    nextBtn.classList.add("hidden");
    backBtn.classList.add("hidden");

    letterSection.classList.remove(
        "hidden-section"
    );

    // 💗 Start the 20-second heart timer
    startLetterHeartSurprise();

    sendTrackingData({
        event_type: "envelope_section",
        section: "envelope"
    });

}


//...............................................
// 8. BACK FROM ENVELOPE
//...............................................

envelopeBackBtn.addEventListener(
    "click",
    function () {

        letterSection.classList.add(
            "hidden-section"
        );


        currentSection =
            storySections.length - 1;


        sectionStartTime =
            Date.now();


        showSection(
            currentSection
        );


        nextBtn.classList.remove(
            "hidden"
        );


        backBtn.classList.remove(
            "hidden"
        );


        sendTrackingData({

            event_type:
                "envelope_back",

            section:
                "chapter_4"

        });

    }
);


//...............................................
// 9. SMALL ENVELOPE CLICK
//...............................................


envelopeBtn.addEventListener("click", function () {
    // Prevent repeated clicks during the opening animation
    if (letterOverlay.classList.contains("letter-opening")) {
        return;
    }

    envelopeSound.currentTime = 0;
    envelopeSound.play().catch(function (error) {
        console.log("Envelope sound could not play:", error);
    });

    // Show the existing letter overlay
    letterOverlay.classList.remove("hidden");
    letterOverlay.classList.add("letter-opening");
    letterOverlay.setAttribute("aria-hidden", "false");
    // 💗 Start hearts 20 seconds after the letter popup opens
startLetterHeartSurprise();

    // Reset the envelope for a fresh opening
    bigEnvelope.classList.remove("open");

    // Open the envelope and play your existing letter sound
    setTimeout(function () {
        bigEnvelope.classList.add("open");

        letterSound.currentTime = 0;
        letterSound.play().catch(function (error) {
            console.log("Letter sound could not play:", error);
        });
    }, 300);

    // End the opening sequence while keeping the letter visible
    setTimeout(function () {
        letterOverlay.classList.remove("letter-opening");
    }, 3200);
});



// 💌 Shake the letter when clicked
bigEnvelope.addEventListener("click", function () {
    // Ignore clicks while the letter overlay is closed
    if (letterOverlay.classList.contains("hidden")) return;

    // Restart the animation on every click
    bigEnvelope.classList.remove("letter-shaking");
    void bigEnvelope.offsetWidth;
    bigEnvelope.classList.add("letter-shaking");
});

// Clean up after each shake
bigEnvelope.addEventListener("animationend", function (event) {
    if (event.animationName === "magical-letter-shake") {
        bigEnvelope.classList.remove("letter-shaking");
    }
});

//...............................................
// 10. CLOSE LETTER
//...............................................

closeLetter.addEventListener(
    "click",
    function () {

        letterOverlay.classList.add(
            "hidden"
        );


        bigEnvelope.classList.remove(
            "open"
        );


        thankYouSection.classList.remove(
            "hidden-section"
        );


        sendTrackingData({

            event_type:
                "thank_you",

            section:
                "thank_you"

        });

    }
);


//...............................................
// 11. TRACK WHEN VISITOR LEAVES
//...............................................

window.addEventListener(
    "beforeunload",
    function () {

        const seconds =
            Math.round(
                (Date.now() -
                    sectionStartTime) /
                1000
            );


        const deviceInfo =
            getDeviceInfo();


        const trackingData = {

            visitor_id:
                visitorId,

            event_type:
                "site_exit",

            page:
                window.location.pathname,

            section:
                "chapter_" +
                (currentSection + 1),

            device:
                deviceInfo.device,

            model:
                deviceInfo.model,

            browser:
                deviceInfo.browser,

            platform:
                deviceInfo.platform,

            platform_version:
                deviceInfo.platform_version,

            screen_width:
                deviceInfo.screen_width,

            screen_height:
                deviceInfo.screen_height,

            time_spent_seconds:
                seconds

        };


        navigator.sendBeacon(

            "/.netlify/functions/track",

            new Blob(
                [
                    JSON.stringify(
                        trackingData
                    )
                ],
                {
                    type:
                        "application/json"
                }
            )

        );

    }
);


//...............................................
// 12. INITIAL WEBSITE STATE
//...............................................

welcomeScreen.classList.remove(
    "hidden"
);


mainContent.classList.add(
    "hidden"
);


letterSection.classList.add(
    "hidden-section"
);


letterOverlay.classList.add(
    "hidden"
);


thankYouSection.classList.add(
    "hidden-section"
);


currentSection = 0;


showSection(
    currentSection
);


//...............................................
// 🦉 JAVASCRIPT END
//...............................................