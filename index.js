let myTabs = []

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteAllBtn = document.getElementById("delete-all-btn")
const pinTabBtn = document.getElementById("pin-tab-btn")

const tabsFromLocalStorage = JSON.parse(localStorage.getItem("myTabs"))

if (tabsFromLocalStorage) {
    myTabs = tabsFromLocalStorage
    render(myTabs)
}

inputBtn.addEventListener("click", function() {
    const tabID = Date.now().toString()
    let userInput = inputEl.value
    if (!userInput.startsWith("http")) {
        userInput = "https://" + userInput
    }
    if(!userInput.includes(".")) {
        alert("Please enter a valid URL")
        return
    }
    myTabs.push({ tabID, tabURL: userInput })
    localStorage.setItem("myTabs", JSON.stringify(myTabs) )

    inputEl.value = ""
    render(myTabs)
})

pinTabBtn.addEventListener("click", function(){
    const tabID = Date.now().toString()  
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myTabs.push({ tabID, tabURL: tabs[0].url })
        localStorage.setItem("myTabs", JSON.stringify(myTabs))
        render(myTabs)
    })
})

deleteAllBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myTabs = []
    render(myTabs)
})

function render(tabs) {
    let listItems = ""
    for (let i = 0; i < tabs.length; i++) {
        const tabID = tabs[i].tabID
        const tabURL = tabs[i].tabURL
        listItems += `
            <li>
                <a target='_blank' href='${tabURL}'>
                    ${tabURL}
                </a>
                <button class="delete-x" data-tabID="${tabID}">X</button>
            </li>
        `
    }
    ulEl.innerHTML = listItems

    document.querySelectorAll('.delete-x').forEach(button => {
        button.addEventListener('click', function() {
          const tabID = this.getAttribute('data-tabID');
          deleteTab(tabID);
        });
      });
}

function deleteTab(delTabID) {
    console.log("deleting tab", delTabID)
    myTabs = myTabs.filter(tab => tab.tabID !== delTabID)
    localStorage.setItem("myTabs", JSON.stringify(myTabs))
    render(myTabs)
}