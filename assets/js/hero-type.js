document.addEventListener("DOMContentLoaded", function () {
    const jobTitles = ["Web Developer", "Programmer", "Hobbyist"];
    const typeItInstance = new TypeIt("#heading", {
        speed: 50,
        startDelay: 900,
        lifeLike: true,
        afterComplete: () => {
            const typeItInstance2 = new TypeIt("#titles", {
                loop: true,
                speed: 50,
                lifeLike: true,
            });
            for (let i = 0; i < jobTitles.length; i++) {
                typeItInstance2
                    .type(jobTitles[i], { delay: 200 })
                    .pause(1000)
                    .delete(jobTitles[i].length, { delay: 200 });
            }
            typeItInstance2.go();
        },
    })
        .type("I'm kira Kenjiro", { delay: 100 })
        .move(-11, { delay: 200 })
        .delete(1)
        .type("K", { delay: 225 })
        .pause(200)
        .move(null, { to: "END", instant: true })
        .pause(50)
        .type("!", { delay: 200 })
        .type('<br>I\'m a <span id="titles"></span>');

    // finish the initial TypeIt instance
    typeItInstance.go();
});