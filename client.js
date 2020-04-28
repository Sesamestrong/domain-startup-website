const display = document.querySelector("#display");
const domainList = document.querySelector("#domainDisplay");
const freenomUsername = document.querySelector("#freenomUsername");
const freenomPassword = document.querySelector("#freenomPassword");
async function startupDomain() {
    const info = await new Promise((resolve) => {
        const buh = setTimeout(() => fetch("https://domain-startup.herokuapp.com/ping"), 1000 * 10);
        (fetch("https://domain-startup.herokuapp.com/setup", {
            method: "POST",
            body: new FormData(document.domainInfo)
        }))
            .then(b => {
                clearTimeout(buh);
                resolve(b.json())
            });
    });
    domainList.innerHTML = "";
    for (let { herokuAppId, id } of info.domains) {
        const li = document.createElement("li");
        const heroku = document.createElement("input");
        const cloudflare = document.createElement("input");
        heroku.value = herokuAppId;
        cloudflare.value = id;
        heroku.readOnly = true;
        cloudflare.readOnly = true;
        li.appendChild(heroku);
        li.appendChild(cloudflare);
        domainList.appendChild(li);
    }
    freenomUsername.value = info.freenom.username;
    freenomPassword.value = info.freenom.password;
    alert("Finished!");
}
